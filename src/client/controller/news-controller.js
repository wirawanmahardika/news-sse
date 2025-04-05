import { prisma } from "../../app/database.js";
import newsValidation from "../validation/news-validation.js";
import validation from "../validation/validate.js";
import dotenv from "dotenv"
import dayjs from "dayjs"

dotenv.config()

const searchNews = async (req, res, next) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const judul = validation(newsValidation.searchNews, req.query.judul)

  const news = await prisma.news.findMany({
    take: page * 12,
    skip: (page - 1) * 12,
    where: { title: { contains: judul } },
  })
  const totalNews = await prisma.news.count({ where: { title: { contains: judul } } })
  const maxPage = Math.ceil(totalNews / 12)
  const preparedNews = news.map(n => {
    n.ilustrate = process.env.URL + "/api/v1/news/" + n.id_news
    n.created_at = dayjs(n.created_at).format("dddd, D-M-YYYY")
    return n
  })

  res.render("search-news", {
    searchText: judul,
    news: preparedNews,
    maxPage: maxPage,
    page: page,
    prev: page > 1 ? page - 1 : page,
    next: page >= maxPage ? page : page + 1,
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
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const idCategory = validation(newsValidation.categoryNews, req.params.id_category)

    const category = await prisma.category_news.findUnique({
      where: { id_category_news: idCategory },
      select: { category: true }
    })
    const totalNews = await prisma.news.count({ where: { id_category_news: idCategory } })
    const newsCategories = await prisma.news.findMany({
      take: page * 12,
      skip: (page - 1) * 12,
      where: { id_category_news: idCategory },
      select: { id_news: true, title: true, created_at: true }
    });



    const news = newsCategories.map(d => {
      d.ilustrate = process.env.URL + "/api/v1/news/" + d.id_news
      d.created_at = dayjs(d.created_at).format("dddd, D-M-YYYY")
      return d
    })


    const maxPage = Math.ceil(totalNews / 12)
    res.render("kategori-news", {
      news: news,
      category: category.category,
      page: page,
      maxPage: maxPage,
      idCategory: idCategory,
      prev: page > 1 ? page - 1 : page,
      next: page >= maxPage ? page : page + 1,
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
