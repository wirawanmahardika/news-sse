import dayjs from "dayjs";
import { prisma } from "../../application/database.js";

const homeView = async (req, res, next) => {
  try {
    const categoryNews = await prisma.category_news.findMany();
    const recentNews = await prisma.news.findMany({
      take: 5,
      where: {
        created_at: {
          gte: dayjs().subtract(7, "days"),
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    res.render("index", {
      categoryNews,
      recentNews,
    });
  } catch (error) {
    next(error);
  }
};

const readNews = async (req, res, next) => {
  try {
    const news = await prisma.news.findUnique({
      where: {
        id_news: req.query.news ? parseInt(req.query.news) : undefined,
      },
      include: {
        content: true,
      },
    });

    news.content = news.content.map((c) => {
      c.content = c.content.split("$S");
      return c;
    });
    console.log(news.content);
    res.render("read-news", {
      contents: news.content,
    });
  } catch (error) {
    next(error);
  }
};

const addNews = async (req, res, next) => {
  const news = await prisma.category_news.findMany({
    select: {
      category: true,
      id_category_news: true,
    },
  });

  res.render("add-news", {
    newsCategories: news,
  });
};

const addCategoryNews = async (req, res, next) => {
  res.render("add-category-news");
};



export default {
  homeView,
  readNews,
  addNews,
  addCategoryNews,
};
