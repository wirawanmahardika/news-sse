import { prisma } from "../../app/database.js";
import newsValidation from "../validation/news-validation.js";
import validation from "../validation/validate.js";
import dotenv from "dotenv"
import dayjs from "dayjs"

dotenv.config()

const searchNews = async (req, res, next) => {
  const judul = validation(newsValidation.searchNews, req.query.judul)

  const news = await prisma.news.findMany({ where: { title: { contains: judul } } })
  res.render("search-news", {
    searchText: judul,
    news: news.map(n => {
      n.ilustrate = process.env.URL + "/api/v1/news/" + n.id_news
      n.created_at = dayjs(n.created_at).format("dddd, D-M-YYYY")
      return n
    })
  })
}

const readNews = async (req, res, next) => {
  try {
    const id_news = validation(newsValidation.readNews, req.query.news)
    const news = await prisma.news.findUnique({ where: { id_news } });

    res.render("read-news", {
      title: news.title,
      img: process.env.URL + "/api/v1/news/" + news.id_news,
      content: news.content,
      authenticated: req.isAuthenticated(),
    });
  } catch (error) {
    next(error);
  }
};

const categoryNews = async (req, res, next) => {
  try {
    const idCategory = validation(newsValidation.categoryNews, req.params.id_category)

    const category = await prisma.category_news.findUnique({
      where: { id_category_news: idCategory },
      select: { category: true }
    })
    const newsCategories = await prisma.news.findMany({
      where: { id_category_news: idCategory },
      select: { id_news: true, title: true, created_at: true }
    });



    const news = newsCategories.map(d => {
      d.ilustrate = process.env.URL + "/api/v1/news/" + d.id_news
      d.created_at = dayjs(d.created_at).format("dddd, D-M-YYYY")
      return d
    })

    res.render("kategori-news", {
      news,
      category: category.category,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  searchNews,
  readNews,
  categoryNews,
};
