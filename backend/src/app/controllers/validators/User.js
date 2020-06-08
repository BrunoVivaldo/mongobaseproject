const { Segments, Joi, celebrate } = require('celebrate');

const indexValidator = celebrate({
  [Segments.HEADERS]: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(),
});

const showValidator = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required().min(23),
  }),
  [Segments.HEADERS]: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(),
});

const storeValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const updateValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().optional(),
  }),
  [Segments.HEADERS]: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(),
});

const destroyValidator = celebrate({
  [Segments.HEADERS]: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(),
});

module.exports = {
  indexValidator,
  showValidator,
  storeValidator,
  updateValidator,
  destroyValidator,
};
