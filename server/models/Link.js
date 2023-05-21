const knex = require("../dbConfig");

const addLinks = async (links) => {
  try {
    const createdLinks = await knex("experiences_links")
      .insert(links)
      .returning("*");
    return createdLinks;
  } catch (error) {
    throw new Error("Database Error:" + error.message);
  }
};

const deleteLink = async (linkId) => {
  try {
    const [deletedLink] = await knex("experiences_links")
      .where("id", linkId)
      .del()
      .returning("id");
    return deletedLink;
  } catch (error) {
    throw new Error("Database Error:" + error.message);
  }
};

module.exports = {
  addLinks,
  deleteLink,
};
// "Database Error:insert into \"experiences_questions\"
//  (\"0\", \"1\", \"10\", \"11\", \"12\", \"13\", \"14\", \"15\", \"16\", \"17\",
//  \"18\", \"19\", \"2\", \"20\", \"21\", \"22\", \"23\", \"24\", \"25\", \"26\",
//  \"27\", \"28\", \"29\", \"3\", \"30\", \"31\", \"32\", \"4\", \"5\", \"6\"
//  , \"7\", \"8\", \"9\", \"experience_id\") values ($1, $2, $3, $4, $5, $6, $7,
//    $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23,
//     $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34) returning *
//     - column \"0\" of relation \"experiences_questions\" does not exist"
