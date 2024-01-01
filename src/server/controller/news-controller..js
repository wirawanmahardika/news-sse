import dayjs from "dayjs";
import { prisma } from "../../application/database.js";
import {
  addNewCategoryNewsSchema,
  addNewNewsSchema,
  updateCategoryNewsSchema,
  updateNewsContentSchema,
  updateNewsSchema,
} from "../validation/news-validation.js";
import validation from "../validation/validate.js";
import { addNewNewsValidation } from "../../utils/validation-manual.js";

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

const deleteCategoryNews = async (req, res, next) => {
  try {
    const idCategory = parseInt(req.params.id_category_news)

    const result = await prisma.$transaction([
      prisma.content.deleteMany({where: {news: {id_category_news: idCategory}}}),
      prisma.news.deleteMany({where: {id_category_news: idCategory}}),
      prisma.category_news.delete({where: {id_category_news: idCategory}})
    ])
    
    console.log(result)

    return res.json({message: "Berhasil menghapus category news"})
  } catch (error) {
    console.log(error)
    next(error);
  }
};

const updateCategoryNews = async (req, res, next) => {
  try {
    const result = validation(updateCategoryNewsSchema, {
      img: req.file?.buffer,
      category: req.body.category,
      id_category_news: req.body.id_category_news,
    });

    await prisma.category_news.update({
      where: {
        id_category_news: result.id_category_news,
      },
      data: {
        category: result.category,
        img: result.img,
      },
    });

    return res.json({
      message: "Berhasil mengubah category news",
    });
  } catch (error) {
    next(error);
  }
};

const addNewNews = async (req, res, next) => {
  try {
    const dataFromClient = {
      title: req.body.judul,
      id_category_news: req.body.category,
      img: req.file.buffer,
      contents: addNewNewsValidation(req.body),
    };

    const reqBody = validation(addNewNewsSchema, dataFromClient);

    const result = await prisma.news.create({
      data: {
        img: reqBody.img,
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

const deleteNews = async (req, res, next) => {
  try {
    const id_news = parseInt(req.params.id_news)

    const result = await prisma.$transaction([
      prisma.content.deleteMany({where: {news: {id_news}}}),
      prisma.news.delete({where: {id_news}})
    ])

    console.log(result)

    res.json({message: "Berhasil menghapus berita dengan id " + id_news})
  } catch (error) {
    next(error);
  }
};

const updateNews = async (req, res, next) => {
  try {
    const result = validation(updateNewsSchema, {
      id_news: req.body.id_news,
      id_category_news: req.body.id_category_news,
      title: req.body.title,
      img: req.file?.buffer,
    });

    await prisma.news.update({
      where: {
        id_news: result.id_news,
      },
      data: {
        id_category_news: result.id_category_news,
        img: result.img,
        title: result.title,
      },
    });

    return res.json({
      message: "Berhasil update news",
    });
  } catch (error) {
    next(error);
  }
};

const updateNewsContent = async (req, res, next) => {
  try {
    const result = validation(updateNewsContentSchema, req.body);
    const updateResult = await prisma.content.update({
      where: {
        id_content: result.id_content,
      },
      data: {
        content: result.content,
        sub_title: result.sub_title,
      },
    });
    res.redirect("/admin/news-content-management/" + updateResult.id_news);
  } catch (error) {
    next(error);
  }
};

const getCategoryNewsByID = async (req, res, next) => {
  try {
    const news = await prisma.category_news.findUnique({
      where: { id_category_news: parseInt(req.params["id_category_news"]) },
      select: { img: true },
    });
    return res.json({
      img:
        "data:image/jpeg;base64, " + Buffer.from(news.img).toString("base64"),
    });
  } catch (error) {
    next(error);
  }
};

const getNewsByID = async (req, res, next) => {
  try {
    const news = await prisma.news.findUnique({
      where: { id_news: parseInt(req.params.id_news) },
      select: { img: true },
    });
    return res.json({
      img:
        "data:image/jpeg;base64, " + Buffer.from(news.img).toString("base64"),
    });
  } catch (error) {
    next(error);
  }
};

export default {
  addCategoryNews,
  updateCategoryNews,
  deleteCategoryNews,
  addNewNews,
  deleteNews,
  updateNews,
  getAllNewsCategory,
  getCategoryNewsByID,
  getNewsByID,
  updateNewsContent,
};
