import Joi from "joi";

export const addNewNewsSchema = Joi.object({
  title: Joi.string().max(200).min(1).required(),
  img: Joi.binary().required(),
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

export const updateNewsSchema = Joi.object({
  id_news: Joi.number().min(0).required(),
  id_category_news: Joi.number(),
  title: Joi.string(),
  img: Joi.binary(),
  // id_contents: Joi.array(Joi.number()).required(),
}).required();


export const addNewCategoryNewsSchema = Joi.object({
  category: Joi.string().max(100).min(1).required(),
  img: Joi.binary().required(),
}).required();

export const updateCategoryNewsSchema = Joi.object({
  id_category_news: Joi.number().min(0).required(),
  category: Joi.string().max(100).min(0),
  img: Joi.binary(),
}).required();

