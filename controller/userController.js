
const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//register User
const registerUser = async (req, res)=>{

  try {
    const { username, password, role = 'STUDENT', email } = req.body; // Default role to 'STUDENT'
    
    // Check if email or username already exists
    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const existingUsername = await User.findOne({
      where: { username },
    });

    if (existingUsername) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create(
      {
        username,
        password: hashedPassword,
        role,
        email,
      },
      {
        returning: ['id', 'username', 'role', 'email', 'createdAt'], // Return only necessary fields
      }
    );

    res.status(201).json(user);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
//login User
const loginUser = async (req, res)=>{
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }


    const token = jwt.sign({ id: user.id, role: user.role }, 'your_secret_key', {
      expiresIn: '24hr',
    });


    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
//getProfile User
const getProfile = async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from the route parameter
    console.log('Requested user ID:', id); // Debugging log

    // Fetch the user by ID
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }, // Exclude password for security
    });

    // If user is not found, return 404
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//getProfile User

  const showUsers = async (req, res) => {
    try {
      // Fetch all users, excluding the password field
      const users = await User.findAll({
        attributes: { exclude: ['password'] }, // Prevent exposing passwords
        order: [['createdAt', 'DESC']], // Sort by latest created users first
      });
  
      // Check if users exist
      if (!users || users.length === 0) {
        return res.status(404).json({ message: 'No users found' });
      }
  
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal server error' });
    }

}
 
const dashboard = (req, res) => {
  try {
    const { role } = req.user; // Get the user's role from the token (set by authMiddleware)

    // Serve different dashboards based on the user's role
    if (role === 'ADMIN') {
      return res.status(200).json({
        message: 'Welcome to the Admin Dashboard',
        role,
        // You can add more data specific to the Admin dashboard here
      });
    }

    if (role === 'TEACHER') {
      return res.status(200).json({
        message: 'Welcome to the Teacher Dashboard',
        role,
        // You can add more data specific to the Teacher dashboard here
      });
    }

    if (role === 'STUDENT') {
      return res.status(200).json({
        message: 'Welcome to the Student Dashboard',
        role,
        // You can add more data specific to the Student dashboard here
      });
    }

    // If no role matches (in case of an unexpected value)
    return res.status(403).json({ error: 'Access denied. Invalid role.' });

  } catch (error) {
    console.error('Error accessing dashboard:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {registerUser, loginUser, getProfile, showUsers, dashboard};