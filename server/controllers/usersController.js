const getAllUsers = (req, res, next) => {
  try {
    const users = Users.getAllUsers();
    res.status(200).json({ message: "Users fetched successfully.", users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users.", error });
  }
};
