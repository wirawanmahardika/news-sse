import dayjs from "dayjs";
import { prisma } from "../../application/database.js";

const readNews = async (req, res, next) => {
  try {
    if (!req.query.news) {
      return res.redirect("/");
    }

    const news = await prisma.news.findUnique({
      where: {
        id_news: parseInt(req.query.news),
      },
      include: {
        content: true,
      },
    });

    news.content = news.content.map((c) => {
      c.content = c.content.split("$S");
      return c;
    });
    res.render("read-news", {
      img:
        "data:image/jpeg;base64, " + Buffer.from(news.img).toString("base64"),
      contents: news.content,
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

    console.log(newsCategories);
    res.render("kategori-news", {
      newsCategories,
      authenticated: req.isAuthenticated(),
    });
  } catch (error) {
    next(error);
  }
};

const addNews = async (req, res, next) => {
  try {
    const news = await prisma.category_news.findMany({
      select: {
        category: true,
        id_category_news: true,
      },
    });

    res.render("add-news", {
      newsCategories: news,
      authenticated: req.isAuthenticated(),
    });
  } catch (error) {
    next(error);
  }
};

const addCategoryNews = async (req, res, next) => {
  try {
    res.render("add-category-news", { authenticated: req.isAuthenticated() });
  } catch (error) {
    next(error);
  }
};

const newsManagement = async (req, res, next) => {
  res.render("news-management", {
    authenticated: req.isAuthenticated(),
  });
};

const categoryNewsManagement = async (req, res, next) => {
  const categoryNews = await prisma.category_news.findMany({});
  res.render("category-news-management", {
    authenticated: req.isAuthenticated(),
    categoryNews: categoryNews.map((cn) => {
      cn.created_at = dayjs(cn.created_at).format("HH:mm, DD/MM/YYYY");
      return cn;
    }),
  });
};

export default {
  readNews,
  addNews,
  addCategoryNews,
  categoryNews,
  newsManagement,
  categoryNewsManagement,
};
