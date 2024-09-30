import Joi from "joi";

export const cardapioSchema = Joi.object({
  descricao: Joi.string().required(),
});
