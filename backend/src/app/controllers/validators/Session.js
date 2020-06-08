const { Segments, Joi, celebrate } = require('celebrate');


const storeValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});


const forgotPasswordValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
});


const resetPasswordValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    token: Joi.string().token().required(),
    password: Joi.string().required(),
  }),
});


module.exports = {
  storeValidator,
  resetPasswordValidator,
  forgotPasswordValidator,

};
