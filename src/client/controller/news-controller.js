import { prisma } from "../../app/database.js";
import newsValidation from "../validation/news-validation.js";
import validation from "../validation/validate.js";

const searchNews = async (req, res, next) => {
  const judul = validation(newsValidation.searchNews, req.query.judul)

  const news = await prisma.news.findMany({ where: { title: { contains: judul } } })
  res.render("search-news", {
    authenticated: req.isAuthenticated(),
    news: news.map(n => {
      n.img = "/api/v1/news/" + n.id_news
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
      img: "/api/v1/news/" + news.id_news,
      content: news.content,
      authenticated: req.isAuthenticated(),
    });
  } catch (error) {
    next(error);
  }
};

const categoryNews = async (req, res, next) => {
  try {
    const newsCategories = await prisma.category_news.findMany({
      include: {
        news: true,
      },
    });

    res.render("kategori-news", {
      newsCategories,
      authenticated: req.isAuthenticated(),
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
