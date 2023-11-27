import { prisma } from "../../application/database.js";

const homeView = async (req, res, next) => {
  try {
    res.render("index");
  } catch (error) {}
};

const readNews = async (req, res, next) => {
  try {
    const content = await prisma.content.findMany();
    res.render("read-news", {
      contents: content.map((c) => {
        c.content = c.content.split("$S");
        return c;
      }),
    });
  } catch (error) {
    next(error);
  }
};

const addNews = async (req, res, next) => {
  const news = await prisma.news.findMany({
    select: {
      category: true,
      id_news: true,
    },
  });
  res.render("add-news", {
    newsCategories: news,
  });
};

const addCategoryNews = async (req, res, next) => {
  res.render("add-category-news", {});
};

export default {
  homeView,
  readNews,
  addNews,
  addCategoryNews,
};
