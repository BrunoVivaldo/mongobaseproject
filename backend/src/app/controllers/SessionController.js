const User = require('../models/User');
const sendMail = require('../../helpers/mailer');


class SessionController {
  async store(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) { return res.status(404).json({ message: 'User Not Found' }); }

      if (await user.validatePassword(password)) { return res.json({ user: user.sendToken() }); }
      return res.status(404).json({ message: 'Incorret Password' });
    } catch (error) {
      return res.status(403).json({ message: 'Error on Login, try again' });
    }
  }

  async forgotPassword(req, res) {
    try {
      const { email } = req.body;

      const user = await User.findOne({ email });
      if (!user) { return res.status(404).json({ message: 'User Not Found' }); }
      user.createRecoveryPassword();
      await user.save();

      const { token } = user.recovery;

      const msg = {
        to: email,
        from: 'brunolumeca@live.com',
        subject: 'Recuperação De Senha Majestade Store',
        html: `<strong>Acede esse token para recuperação de sua senha ${token}</strong>`,
      };

      sendMail.send(msg).then(() => {
        console.log('Message sent');
      }).catch((error) => {
        console.log(error.response.body);
        console.log(error.response.body.errors[0].message);
      });
      return res.send();
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: 'Error on forgot password, try again' });
    }
  }

  async resetPassword(req, res) {
    try {
      const { email, token, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User Not Found' });
      }

      if (token !== user.recovery.token) {
        return res.status(404).json({ error: 'Token Invalid' });
      }

      const now = new Date();

      if (now > user.recovery.date) {
        return res.status(404).json({ error: 'Token Expired, generate a new one' });
      }

      user.setPassword(password);
      user.finalizecreateRecoveryPassword();
      await user.save();
      return res.send();
    } catch (error) {
      return res.status(403).json({ error: 'Error on Reset password, Try Again' });
    }
  }
}


module.exports = SessionController;
