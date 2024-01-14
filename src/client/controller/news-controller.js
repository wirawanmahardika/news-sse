import dayjs from "dayjs";
import { prisma } from "../../application/database.js";

const searchNews = async (req, res, next) => {
  const judul = req.query.judul
  if (!judul) {
    res.redirect('/')
    return;
  }

  const news = await prisma.news.findMany({ where: { title: { contains: judul } } })
  res.render("search-news", {
    authenticated: req.isAuthenticated(),
    news: news.map(n => {
      n.img = "data:image/jpeg;base64," + Buffer.from(n.img).toString("base64")
      return n
    })
  })
}

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
      title: news.title,
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
  try {
    const news = await prisma.news.findMany();
    const categories = await prisma.category_news.findMany({
      select: {
        category: true,
        id_category_news: true,
      },
    });


    res.render("news-management", {
      categories,
      news: news.map((n) => {
        n.created_at = dayjs(n.created_at).format("HH:mm, DD-MM-YYYY");
        return n;
      }),
      authenticated: req.isAuthenticated(),
    });
  } catch (error) {
    next(error);
  }
};

const categoryNewsManagement = async (req, res, next) => {
  const skip = req.query.skip ? parseInt(req.query.skip) : 1
  const categoryNews = await prisma.category_news.findMany({
    take: 5,
    skip: 5 * (skip - 1)
  });
  const countCategoryNews = await prisma.category_news.count()
  const ceilCount = Math.ceil(countCategoryNews/5)
  

  res.render("category-news-management", {
    currentPage: skip,
    maxPage: ceilCount,
    authenticated: req.isAuthenticated(),
    categoryNews: categoryNews.map((cn) => {
      cn.created_at = dayjs(cn.created_at).format("HH:mm, DD/MM/YYYY");
      return cn;
    }),
  });
};

const newsContentManagement = async (req, res, next) => {
  const news = await prisma.news.findUnique({
    where: {
      id_news: parseInt(req.params.id_news),
    },
    select: {
      title: true,
      img: true,
      content: true,
    },
  });

  res.render("news-content-management", {
    authenticated: req.isAuthenticated(),
    newsTitle: news.title,
    img: "data:image/jpeg;base64, " + Buffer.from(news.img).toString("base64"),
    contents: news.content.map((c) => {
      c.content = c.content.split("$S");
      return c;
    }),
  });
};

export default {
  searchNews,
  readNews,
  addNews,
  addCategoryNews,
  categoryNews,
  newsManagement,
  categoryNewsManagement,
  newsContentManagement,
};
