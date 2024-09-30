import Joi from "joi";

export const itemCardapioSchema = Joi.object({
  nome: Joi.string().min(3).max(100).required().messages({
    "string.base": "O nome deve ser um texto",
    "string.empty": "O nome é obrigatório",
    "string.min": "O nome deve ter pelo menos 3 caracteres",
    "string.max": "O nome deve ter no máximo 100 caracteres",
  }),

  descricao: Joi.string().max(500).optional().messages({
    "string.base": "A descrição deve ser um texto",
    "string.max": "A descrição deve ter no máximo 500 caracteres",
  }),

  preco: Joi.number().positive().precision(2).required().messages({
    "number.base": "O preço deve ser um número",
    "number.positive": "O preço deve ser maior que zero",
    "number.empty": "O preço é obrigatório",
    "number.precision": "O preço deve ter no máximo 2 casas decimais",
  }),

  imagem: Joi.string().uri().optional().messages({
    "string.base": "A imagem deve ser uma URL válida",
    "string.uri": "A imagem deve ser uma URL válida",
  }),

  categoria_id: Joi.number().integer().required().messages({
    "number.base": "O ID da categoria deve ser um número",
    "number.empty": "O ID da categoria é obrigatório",
    "number.integer": "O ID da categoria deve ser um número inteiro",
  }),
});
