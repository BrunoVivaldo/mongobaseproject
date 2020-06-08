const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { secret } = require('../../config');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Não pode ficar vazio'],
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, 'Não pode ficar vazio'],
    unique: [true, 'Já existe'],
    match: [/\S+@\S+\.\S+/, 'é invalido'],
    index: true,
  },
  hash: String,
  salt: String,
  recovery: {
    type: {
      token: String,
      date: Date,
    },
    default: {},
  },
}, { timestamps: true });

UserSchema.plugin(uniqueValidator, { message: 'já existe' });

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validatePassword = async function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return hash === this.hash;
};

UserSchema.methods.generateToken = function () {
  const today = new Date();
  const expiration = new Date(today);
  expiration.setDate(today.getDate() + 15);

  return jwt.sign({
    id: this._id,
    email: this.email,
    name: this.name,
    exp: parseFloat(expiration.getTime() / 1000, 10),
  }, secret);
};

UserSchema.methods.sendToken = function () {
  return {

    id: this._id,
    name: this.name,
    email: this.email,
    role: this.permition,
    token: this.generateToken(),
  };
};

UserSchema.methods.createRecoveryPassword = function () {
  this.recovery = {};
  this.recovery.token = crypto.randomBytes(16).toString('hex');
  this.recovery.date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  return this.recovery;
};

UserSchema.methods.finalizecreateRecoveryPassword = function () {
  this.recovery = {
    token: null,
    date: null,
  };
  return this.recovery;
};
module.exports = mongoose.model('User', UserSchema);
