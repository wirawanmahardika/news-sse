import { prisma } from "../../app/database.js";
import dotenv from 'dotenv'

dotenv.config()

const homeView = async (req, res, next) => {
  try {
    const categoryNews = await prisma.category_news.findMany({
      take: 4,
      orderBy: {
        created_at: "desc",
      },
    });
    const recentNews = await prisma.news.findMany({
      take: 4,
      orderBy: {
        created_at: "desc",
      },
    });


    res.render("index", {
      recentNews: recentNews.map((cn) => {
        cn.img = process.env.URL + "/api/v1/news/" + cn.id_news
        return cn;
      }),
      categoryNews: categoryNews.map((cn) => {
        cn.img = process.env.URL + "/api/v1/category-news/" + cn.id_category_news
        return cn;
      }),
    });
  } catch (error) {
    next(error);
  }
};

const errorView = (req, res) => {
  console.log(req.query.message)
  res.render("error", {
    // error: req.query.message || "Terjadi kesalahan",
    error: "Terjadi kesalahan",
  });
};

export default {
  homeView,
  errorView,
};
