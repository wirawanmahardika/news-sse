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
      contents: news.content,
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
    });
  } catch (error) {
    next(error);
  }
};

const addCategoryNews = async (req, res, next) => {
  try {
    res.render("add-category-news");
  } catch (error) {
    next(error);
  }
};

export default {
  readNews,
  addNews,
  addCategoryNews,
};
