import Joi from "joi";

export const addNewNewsSchema = Joi.object({
  title: Joi.string().max(200).min(1).required(),
  img: Joi.binary().required(),
  id_category_news: Joi.number().required(),
  content: Joi.string()
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

export const updateNewsContentSchema = Joi.object({
  id_content: Joi.number().min(0).required(),
  sub_title: Joi.string().max(100).min(0),
  content: Joi.string(),
}).required();

