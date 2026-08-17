const user = require('../Models/model');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create and save new user
    const newUser = new User({ username, email, password });
    const savedUser = await newUser.save();

    // FIXED: Ensure status is 201 (Created) and indicates success
    return res.status(201).json({
      success: true,
      message: "User registered successfully!",
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email
      }
    });

  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const login = async (req, res) => {
  console.log("This is req.body",req.body);
  try {
    const { email, password } = req.body;

    // 1. Validate inputs
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    // 2. Find user by email and explicitly include the hidden password field
    const foundUser = await user.findOne({ email }).select('+password');

    // 3. If user doesn't exist, return 401
    if (!foundUser) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // 4. Compare the plain text password with the hashed database password
    const isMatch = await foundUser.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // 5. Success response (Do not return the password hash to the client)
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        id: foundUser._id,
        username: foundUser.username,
        email: foundUser.email
      }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: error.message,
    });
  }
};





module.exports = {
  register,
  login,
};
