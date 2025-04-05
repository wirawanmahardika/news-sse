import Joi from "joi"

const searchNews = Joi.string().required()
const readNews = Joi.number().required()
const categoryNews = Joi.number().required()

export default { searchNews, readNews, categoryNews }