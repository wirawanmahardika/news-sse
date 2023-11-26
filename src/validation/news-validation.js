import Joi from "joi";

export const addNewNewsSchema = Joi.object({
  contents: Joi.array()
    .items(
      Joi.object({
        title: Joi.string().max(200).min(1).required(),
        id_news: Joi.number().required(),
        sub_title: Joi.string().max(200).min(1).required(),
        content: Joi.string().max(65500).required(),
        image: Joi.binary(),
      })
    )
    .required(),
  subJudul: Joi.string().max(200).min(1).required,
}).required();
