import dayjs from "dayjs";
import { prisma } from "../../app/database.js";
import newsValidation from "../validation/news-validation.js";
import validation from "../validation/validate.js";
import dotenv from "dotenv"

dotenv.config()

const getAllNewsCategory = async (req, res, next) => {
  try {
    const categories = await prisma.category_news.findMany({
      select: {
        category: true, id_category_news: true, created_at: true,
      }
    });

    res.json(categories.map(c => {
      c.created_at = dayjs(c.created_at).format("DD/MM/YYYY")
      c.ilustrate = process.env.URL + '/api/v1/category-news/' + c.id_category_news
      c.url = process.env.URL + "/category-news#" + c.category
      return c
    }))
  } catch (error) {
    next(error);
  }
};

const addCategoryNews = async (req, res, next) => {
  try {
    const reqBody = validation(newsValidation.addCategoryNews, {
      category: req.body.category,
      img: req.file.buffer,
    });

    reqBody.created_at = dayjs();
    const result = await prisma.category_news.create({
      data: reqBody,
    });

    res.status(201).send("Berhasil membuat category " + result.category)
  } catch (error) {
    next(error);
  }
};

const deleteCategoryNews = async (req, res, next) => {
  try {
    const idCategory = validation(newsValidation.deleteCategoryNews, req.params.id_category_news)
    await prisma.$transaction([
      prisma.news.deleteMany({ where: { id_category_news: idCategory } }),
      prisma.category_news.delete({ where: { id_category_news: idCategory } })
    ])

    return res.send("Berhasil menghapus category news")
  } catch (error) {
    next(error);
  }
};

const updateCategoryNews = async (req, res, next) => {
  try {
    const result = validation(newsValidation.updateCategoryNews, {
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

    return res.send("Berhasil mengubah category news")
  } catch (error) {
    next(error);
  }
};

const countCategoriesNews = async (req, res, next) => {
  try {
    const countResult = await prisma.category_news.count()
    return res.json({ count: Math.ceil(countResult / 5) })
  } catch (error) {
    next(error)
  }
}

const getNews = async (req, res, next) => {
  try {
    const data = await prisma.news.findMany({
      select: {
        id_news: true,
        title: true,
        created_at: true,
        content: true,
        category_news: {
          select: {
            category: true, id_category_news: true
          }
        }
      }
    })

    const result = data.map(d => {
      d.category = d.category_news.category
      d.created_at = dayjs(d.created_at).format("DD/MM/YYYY")
      d.ilustrate = process.env.URL + "/api/v1/news/" + d.id_news
      d.id_category = d.category_news.id_category_news
      d.url = process.env.URL + "/read-news?news=" + d.id_news
      delete d.category_news
      return d
    })
    return res.json(result)
  } catch (error) {
    next(error)
  }
}

const addNewNews = async (req, res, next) => {
  try {
    const dataFromClient = {
      title: req.body.judul,
      id_category_news: req.body.category,
      img: req.file.buffer,
      content: req.body.content,
    };

    const reqBody = validation(newsValidation.addNewNews, dataFromClient);

    const result = await prisma.news.create({
      data: {
        img: reqBody.img,
        title: reqBody.title,
        created_at: dayjs(),
        content: reqBody.content,
        category_news: {
          connect: {
            id_category_news: reqBody.id_category_news,
          },
        },
      },
    });

    res.status(201).send("Berhasil menambah berita " + result.title)
  } catch (error) {
    next(error);
  }
};

const deleteNews = async (req, res, next) => {
  try {
    const id_news = validation(newsValidation.deleteNews, req.params.id_news)
    await prisma.news.delete({ where: { id_news } })
    res.send("Berhasil menghapus berita")
  } catch (error) {
    next(error);
  }
};

const updateNews = async (req, res, next) => {
  try {
    const result = validation(newsValidation.updateNews, {
      id_news: req.body.id_news,
      id_category_news: req.body.id_category_news,
      title: req.body.title,
      img: req.file?.buffer,
      content: req.body.content
    });

    await prisma.news.update({
      where: {
        id_news: result.id_news,
      },
      data: {
        id_category_news: result.id_category_news,
        img: result.img,
        title: result.title,
        content: result.content
      },
    });

    return res.send("Berhasil update news");
  } catch (error) {
    next(error);
  }
};

const getImageCategoryNewsByID = async (req, res, next) => {
  try {
    const id_category_news = validation(newsValidation.checkIdNewsOrCategory, req.params["id_category_news"])
    const news = await prisma.category_news.findUnique({
      where: { id_category_news: id_category_news },
      select: { img: true },
    });

    res.set("Content-Type", "image/jpeg")
    return res.send(news.img)
  } catch (error) {
    next(error);
  }
};

const getImageNewsById = async (req, res, next) => {
  try {
    const id_news = validation(newsValidation.checkIdNewsOrCategory, parseInt(req.params.id_news))
    const news = await prisma.news.findUnique({
      where: { id_news },
      select: { img: true },
    });

    res.set("Content-Type", "jpeg")
    return res.send(news.img);
  } catch (error) {
    next(error);
  }
};

export default {
  addCategoryNews,
  updateCategoryNews,
  deleteCategoryNews,
  countCategoriesNews,
  getNews,
  addNewNews,
  deleteNews,
  updateNews,
  getAllNewsCategory,
  getImageCategoryNewsByID,
  getImageNewsById,
};
