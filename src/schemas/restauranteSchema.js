import Joi from "joi";

export const restauranteSchema = Joi.object({
  nome: Joi.string().required().messages({
    "string.base": `"nome" deve ser uma string`,
    "string.empty": `"nome" não pode ser vazio`,
    "any.required": `"nome" é um campo obrigatório`,
  }),
  email: Joi.string().email().optional().messages({
    "string.base": `"email" deve ser uma string`,
    "string.email": `"email" deve ser um endereço de email válido`,
  }),
  telefone: Joi.string().optional().messages({
    "string.base": `"telefone" deve ser uma string`,
  }),
  endereco: Joi.string().optional().messages({
    "string.base": `"endereco" deve ser uma string`,
  }),
  horario_funcionamento: Joi.string().optional().messages({
    "string.base": `"horario_funcionamento" deve ser uma string`,
  }),
  avatar: Joi.string().uri().optional().messages({
    "string.base": `"avatar" deve ser uma string`,
    "string.uri": `"avatar" deve ser uma URL válida`,
  }),
  capa: Joi.string().uri().optional().messages({
    "string.base": `"capa" deve ser uma string`,
    "string.uri": `"capa" deve ser uma URL válida`,
  }),
  slug: Joi.string()
    .pattern(/^[A-Za-z0-9_.-]+$/) // Expressão regular para validar o slug
    .required()
    .messages({
      "string.base": `"slug" deve ser uma string`,
      "string.empty": `"slug" não pode ser vazio`,
      "any.required": `"slug" é um campo obrigatório`,
      "string.pattern.base": `"slug" deve conter apenas letras, números, "_", "-" e "."`,
    }),
});
