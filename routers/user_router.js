const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/user');
const auth = require('../middleware/auth');
//const { sendWelcomeEmail, sendCancelEmail } = require('../emails/account');
const router = new express.Router();

// CREATE
router.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    //sendWelcomeEmail(user.email, user.name);
    const token = await user.generateAuthToken();
    res.cookie('auth_token', token, { httpOnly: true }).send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

// Auth
router.get('/users/token', async (req, res) => {
  try {
    res.status(200).send();
  } catch (e) {
    res.status(400).send();
  }
});

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.cookie('auth_token', token, { httpOnly: true }).send({ user, token });
  } catch (e) {
    res.status(400).send({ message: 'Wrong email or password' });
  }
});

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post('/users/logout_all', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

// READ
router.get('/users/me', auth, async (req, res) => {
  res.send(req.user);
});

// UPDATE
router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body);

  if (req.body.oldPassword) {
    const oldPasswordIndex = updates.findIndex(el => el === 'oldPassword');
    updates.splice(oldPasswordIndex, 1);
    const isMatch = await User.confirmPassword(req.user, req.body.oldPassword);
    if (!isMatch) return res.status(400).send({ error: 'Wrong current password' });
  }

  const allowedUpdates = ['name', 'email', 'password', 'age', 'bio'];
  const isValid = updates.every(update => allowedUpdates.includes(update));

  if (!isValid) return res.status(400).send({ error: 'Invalid updates' });

  try {
    updates.forEach(update => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

// DELETE
router.delete('/users/me', auth, async (req, res) => {
  try {
    await req.user.remove();
    //sendCancelEmail(req.user.email, req.user.name);
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

// AVATAR
const upload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    const isValid = !file.originalname.match(/\.(jpg|jpeg|png)$/);
    if (isValid) return cb(new Error('Please upload a jpg, jpeg or png'));
    cb(undefined, true);
  }
});

router.post(
  '/users/me/avatar',
  auth,
  upload.single('upload'),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer).png().resize({ width: 250, height: 250 }).toBuffer();

    req.user.avatar = buffer;
    await req.user.save();
    res.send(req.user);
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.delete('/users/me/avatar', auth, async (req, res) => {
  try {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
