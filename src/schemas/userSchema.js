import Joi from "joi";

const userSchema = Joi.object({
  nome: Joi.string().min(3).required(), // Nome deve ter no mínimo 3 caracteres
  email: Joi.string().email().required(), // Email deve ser um email válido
  senha: Joi.string().min(6).required(), // Senha deve ter no mínimo 6 caracteres
  telefone: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required(), // Telefone deve ter entre 10 e 15 dígitos
});

const userUpdateSchema = Joi.object({
  nome: Joi.string().required(),
  email: Joi.string().email().required(),
  telefone: Joi.string().optional(),
});

export { userSchema, userUpdateSchema };
