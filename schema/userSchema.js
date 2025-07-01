import Joi from 'joi';

export const registerSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});
