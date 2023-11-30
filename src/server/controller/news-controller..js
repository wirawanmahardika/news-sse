import dayjs from "dayjs";
import { prisma } from "../../application/database.js";
import {
  addNewCategoryNewsSchema,
  addNewNewsSchema,
} from "../validation/news-validation.js";
import validation from "../validation/validate.js";

const getAllNewsCategory = async (req, res, next) => {
  try {
    const news = await prisma.category_news.findMany();
    res.json({
      message: "Berhasil mengambil semua category berita",
      data: news,
    });
  } catch (error) {
    next(error);
  }
};

const addCategoryNews = async (req, res, next) => {
  try {
    const reqBody = validation(addNewCategoryNewsSchema, {
      category: req.body.category,
      img: req.file.buffer,
    });
    reqBody.created_at = dayjs();
    const result = await prisma.category_news.create({
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
    console.log(req.body);
    console.log(req.file);
    req.body.img = req.file.buffer;
    const reqBody = validation(addNewNewsSchema, req.body);

    const result = await prisma.news.create({
      data: {
        img: reqBody.image,
        title: reqBody.title,
        created_at: dayjs(),
        category_news: {
          connect: {
            id_category_news: reqBody.id_category_news,
          },
        },
        content: {
          createMany: {
            data: reqBody.contents,
          },
        },
      },
    });

    res.status(201).json({
      message: "Berhasil menambah berita " + result.title,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  addCategoryNews,
  addNewNews,
  getAllNewsCategory,
};
