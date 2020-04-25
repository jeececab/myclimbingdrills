const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  try {
    let token;
    if (req.header('Authorization')) {
      token = req.header('Authorization').replace('Bearer ', '');
    } else {
      token = req.headers.cookie.split('auth_token=')[1].split(';')[0];
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!user) throw new Error();

    // Purges expired tokens
    const expiredTokens = user.tokens.filter(el => {
      const decoded = jwt.decode(el.token);
      const isExpired = decoded.exp < new Date().getTime() / 1000;
      if (isExpired) {
        return el;
      }
    });

    if (expiredTokens.length > 0) {
      user.tokens = user.tokens.filter(token => !expiredTokens.find(el => el.token === token.token));
      await user.save();
    }
    // -------------

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
    res.status(401).send({ message: 'Please authenticate.' });
  }
};

module.exports = auth;
