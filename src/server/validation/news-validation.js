import Joi from "joi";

const addNewNews = Joi.object({
  title: Joi.string().max(200).min(1).required(),
  img: Joi.binary().required(),
  id_category_news: Joi.number().required(),
  content: Joi.string()
}).required();

const deleteNews = Joi.number().required()

const updateNews = Joi.object({
  id_news: Joi.number().min(0).required(),
  id_category_news: Joi.number(),
  title: Joi.string(),
  img: Joi.binary(),
  content: Joi.string()
}).required();


const addCategoryNews = Joi.object({
  category: Joi.string().max(100).min(1).required(),
  img: Joi.binary().required(),
}).required();

const deleteCategoryNews = Joi.number().required()

const updateCategoryNews = Joi.object({
  id_category_news: Joi.number().min(0).required(),
  category: Joi.string().max(100).min(0),
  img: Joi.binary(),
}).required();

const checkIdNewsOrCategory = Joi.number().required()

export default {
  addCategoryNews, deleteCategoryNews,
  updateCategoryNews,
  addNewNews,
  deleteNews,
  updateNews, checkIdNewsOrCategory
}