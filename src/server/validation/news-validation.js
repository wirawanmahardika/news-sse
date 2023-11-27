import Joi from "joi";

export const addNewNewsSchema = Joi.object({
  title: Joi.string().max(200).min(1).required(),
  image: Joi.binary(),
  id_category_news: Joi.number().required(),
  contents: Joi.array()
    .items(
      Joi.object({
        sub_title: Joi.string().max(200).min(1).required(),
        content: Joi.string().max(65500).required(),
      })
    )
    .required(),
}).required();

export const addNewCategoryNewsSchema = Joi.object({
  category: Joi.string().max(100).min(1).required(),
  image: Joi.binary(),
}).required();
