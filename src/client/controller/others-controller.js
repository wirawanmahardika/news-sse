import dayjs from "dayjs";
import { prisma } from "../../application/database.js";

const homeView = async (req, res, next) => {
  try {
    const categoryNews = await prisma.category_news.findMany({
      take: 5,
      orderBy: {
        created_at: "desc",
      },
    });
    const recentNews = await prisma.news.findMany({
      take: 5,
      orderBy: {
        created_at: "desc",
      },
    });

    res.render("index", {
      recentNews: recentNews.map((cn) => {
        cn.img =
          "data:image/jpeg;base64, " + Buffer.from(cn.img).toString("base64");
        return cn;
      }),
      categoryNews: categoryNews.map((cn) => {
        cn.img =
          "data:image/jpeg;base64, " + Buffer.from(cn.img).toString("base64");
        return cn;
      }),
      authenticated: req.isAuthenticated(),
    });
  } catch (error) {
    next(error);
  }
};

const errorView = (req, res, next) => {
  res.render("error", {
    error: req.query.message || "Terjadi kesalahan",
  });
};

export default {
  homeView,
  errorView,
};
