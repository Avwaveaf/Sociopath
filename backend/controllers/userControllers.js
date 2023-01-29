const expressAsyncHandler = require('express-async-handler');
const User = require('../models/usersModel');

//registering new user
const registerUser = expressAsyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error('Please fill all the required fields');
  }

  //checking password length
  if (password.length < 6) {
    res.status(400);
    throw new Error('Password must up to 6 characters');
  }

  //validate if the user already exist
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error('Your email already registered, please Login instead..');
  }

  // create a new user on the database
  const user = await User.create({
    username,
    email,
    password,
  });
  if (user) {
    const { _id, username, email, bio, imageUrl } = user;
    res.status(201).json({
      success: true,
      message: 'Your account successfully created!',
      data: { _id, username, email, bio, imageUrl },
    });
  } else {
    res.status(400);
    throw new Error('Your input are invalid');
  }
});

module.exports = {
  registerUser,
};
