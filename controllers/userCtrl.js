import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/userModel.js';

const userCtrl = {
  registerUser: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (user) return res.status(400).json({ msg: 'The email already exists' });

      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new User({
        username: username,
        email: email,
        password: passwordHash
      });
      await newUser.save();

      // if register success create token
      const payload = { id: newUser._id, name: newUser.username };
      const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '7d' });

      res.json({ token });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) return res.status(400).json({ msg: 'Invalid Email or password' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: 'Invalid Email or password' });

      // if login success create token
      const payload = { id: user._id, name: user.username };
      const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '7d' });

      res.json({ token });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  verifiedToken: (req, res) => {
    try {
      const token = req.header('Authorization');
      if (!token) return res.send(false);

      jwt.verify(token, process.env.TOKEN_SECRET, async (err, verified) => {
        console.log(token);
        console.log(err);
        if (err) return res.send(false);

        const user = await User.findById(verified.id);
        if (!user) return res.send(false);

        return res.send(true);
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
};

export default userCtrl;
