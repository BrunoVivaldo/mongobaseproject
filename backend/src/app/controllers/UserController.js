const User = require('../models/User');

class UserController {
  async index(req, res) {
    try {
      const user = await User.findById(req.payload.id);
      if (!user) {
        return res.status('401').json({ user: 'User Not Found' });
      }
      return res.json({ user: user.sendToken() });
    } catch (error) {
      return res.status('404').json(error);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        return res.status('404').json({ user: 'User Not Found' });
      }
      return res.json({
        name: user.name,
        email: user.email,
        permition: user.permition,
      });
    } catch (error) {
      return res.status('404').json(error);
    }
  }

  async store(req, res) {
    try {
      const { name, email, password } = req.body;
      let user = await User.findOne({ email });

      if (!user) {
        user = await User.create({ name, email });
        user.setPassword(password);
        await user.save();
        return await res.json({ user: user.sendToken() });
      }
      return res.json(user);
    } catch (error) {
      return res.status(404).json(error);
    }
  }

  async update(req, res) {
    try {
      const { name, email, password } = req.body;
      const user = await User.findById(req.payload.id);
      if (!user) {
        return res.status('404').json({ user: 'User Not Found' });
      }
      if (typeof name !== 'undefined') { user.name = name; }
      if (typeof email !== 'undefined') { user.email = email; }
      if (typeof password !== 'undefined') { user.setPassword(password); }
      await user.save();
      return await res.json({ user: user.sendToken() });
    } catch (error) {
      return res.status(404).json(error);
    }
  }

  async destroy(req, res) {
    try {
      const user = await User.findById(req.payload.id);
      if (!user) {
        return res.status('404').json({ user: 'User Not Found' });
      }
      await user.remove();
      return res.json({
        message: 'User was deleted',
      });
    } catch (error) {
      console.log(error);
      return res.status(404).json(error);
    }
  }
}


module.exports = UserController;
