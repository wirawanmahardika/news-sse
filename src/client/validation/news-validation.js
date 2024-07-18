import Joi from "joi"

const searchNews = Joi.string().required()
const readNews = Joi.number().required()

export default { searchNews, readNews }