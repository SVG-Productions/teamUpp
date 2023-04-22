const knex = require("../dbConfig");
const bcrypt = require("bcrypt");

const validatePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const loginUser = async (credential, password) => {
  try {
    const data = await knex("users")
      .select("id", "username", "email", "hashed_password")
      .where("username", credential)
      .orWhere("email", credential)
      .first();
    const { hashedPassword, ...user } = data;

    if (
      user &&
      hashedPassword &&
      (await validatePassword(password, hashedPassword))
    ) {
      return user;
    }
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

const createUser = async (user) => {
  try {
    const [createdUser] = await knex("users")
      .insert(user)
      .returning(["id", "username", "email"]);
    return createdUser;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

const getSession = async (userId) => {
  try {
    const user = await knex("users")
      .select("id", "username", "email")
      .where("id", userId)
      .first();
    return user;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

const getAllUsers = async () => {
  try {
    const users = await knex("users").select("*");
    return users;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

const getPublicUser = async (userId) => {
  try {
    const data = await knex("users").select("*").where("id", userId).first();
    const { hashedPassword, isEmailPublic, email, id, ...user } = data;
    if (!isEmailPublic) {
      return { isEmailPublic, ...user };
    }
    return { isEmailPublic, email, ...user };
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

const getSessionUser = async (userId) => {
  try {
    const data = await knex("users").select("*").where("id", userId).first();
    const { hashedPassword, ...user } = data;
    return user;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

const getSingleUserByUsername = async (username) => {
  try {
    const data = await knex("users")
      .select("*")
      .where("username", username)
      .first();
    const { hashedPassword, ...user } = data;
    return user;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

const getUserFavorites = async (userId) => {
  try {
    const favorites = await knex("listings")
      .join("users_favorites", "listings.id", "=", "users_favorites.listing_id")
      .where("users_favorites.user_id", userId)
      .select("listings.*");
    return favorites;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

const getUserTeams = async (userId) => {
  try {
    const teams = await knex("users_teams")
      .join("teams", "users_teams.team_id", "=", "teams.id")
      .where("users_teams.user_id", userId)
      .select("teams.*", "status");
    return teams;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

const getUserTeammates = async (userId) => {
  try {
    const teammates = await knex("users_teams")
      .join("users", "users_teams.user_id", "users.id")
      .join("teams", "users_teams.team_id", "teams.id")
      .whereIn(
        "team_id",
        knex("users_teams")
          .select("team_id")
          .where("user_id", userId)
          .whereNot("status", "invited")
          .whereNot("status", "requested")
      )
      .select("users.*")
      .whereNot("users.id", userId)
      .whereNot("status", "invited")
      .whereNot("status", "requested")
      .distinct();

    return teammates;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

const getRecommendedTeams = async (userId) => {
  try {
    // Retrieve the list of teams that the user is currently a member of
    const userTeams = (
      await knex("users_teams")
        .where("user_id", userId)
        .join("teams", "users_teams.team_id", "=", "teams.id")
        .select("teams.id")
    ).map((team) => team.id);

    // Retrieve the list of teams that those remaining users are members of
    const recommendedTeams = await knex("users_teams")
      .join("teams", "users_teams.team_id", "=", "teams.id")
      .select("teams.id", "teams.name", "teams.job_field", "teams.description")
      .whereIn(
        // includes teams that are asssociated with all of user's teammates
        "user_id",
        knex("users_teams") // list of userIds that matches the following criteria ------------------------------}
          .join("users", "users_teams.user_id", "=", "users.id") //                                              }
          .select("users.id") //                                                                                 }
          .whereIn("team_id", userTeams) // only include userIds which are associated with the user's teams      }
      ) // ------------------------------------------------------------------------------------------------------}
      .whereNotIn("team_id", userTeams) // but excludes teams the user is already in
      .distinct();

    // Retrieve the list of teams that have the same job field as the current user
    //Below needs to be done a different way, let user select a job field on account creation or profile settings?

    // const userJobField = userTeams[0]?.job_field;
    // if (userJobField) {
    //   const jobFieldTeams = await knex("teams")
    //     .where("job_field", userJobField)
    //     .andWhereNot(
    //       "id",
    //       userTeams.map((team) => team.id)
    //     )
    //     .select("id", "name", "job_field", "description");

    //   recommendedTeams.push(...jobFieldTeams);
    // }
    // console.log(recommendedTeams, recommendedTeams.length);

    return recommendedTeams;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

const deleteUser = async (userId) => {
  try {
    const [deletedUser] = await knex("users")
      .where("id", userId)
      .del()
      .returning("*");
    return deletedUser;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

const updateUser = async (userId, updates) => {
  try {
    const [updatedUser] = await knex("users")
      .where("id", userId)
      .update(updates)
      .returning("*");
    return updatedUser;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

const getIdByUsername = async (username) => {
  try {
    const [user] = await knex("users").select("id").where("username", username);
    return user.id;
  } catch (error) {
    throw new Error("Database Error: " + error.message);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getPublicUser,
  getSessionUser,
  getUserFavorites,
  getUserTeams,
  getUserTeammates,
  deleteUser,
  updateUser,
  loginUser,
  getSingleUserByUsername,
  getSession,
  getIdByUsername,
  getRecommendedTeams,
};
