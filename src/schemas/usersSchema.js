import joi from "joi";

const newUser = joi.object({
  nome: joi.string().required(),
  email: joi.string().email().required(),
  senha: joi.string().required(),
});

const user = joi.object({
  email: joi.string().email().required(),
  senha: joi.string().required(),
});

export function validateNewUser(req, res, next) {
  const validation = newUser.validate(req.body);
  if (validation.error) return res.status(400).send(validation.error.message);
  next();
}

export function validateUser(req, res, next) {
  const validation = user.validate(req.body);
  if (validation.error) return res.status(400).send(validation.error.message);
  next();
}