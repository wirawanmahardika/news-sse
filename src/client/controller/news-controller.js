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
    if (!req.query.news) {
      return res.redirect("/view/home");
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
    console.log(news.content);
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
  homeView,
  readNews,
  addNews,
  addCategoryNews,
};
