import { prisma } from "../../application/database.js";
import { addNewNewsSchema } from "../../validation/news-validation.js";
import validation from "../../validation/validate.js";

const addCategoryNews = async (req, res, next) => {
  try {
    const reqBody = validate();
    reqBody.created_at = dayjs();
    const result = await prisma.news.create({
      data: reqBody,
    });

    res.status(201).json({
      message: "Berhasil membuat category " + result.category,
    });
  } catch (error) {
    next(error);
  }
};

const addNewNews = async (req, res, next) => {
  try {
    const reqBody = validation(addNewNewsSchema, req.body);
    const result = await prisma.content.createMany({
      data: reqBody.contents,
    });

    res.status(201).json({
      message: "Berhasil menambah category news " + result.category,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  addCategoryNews,
  addNewNews,
};
