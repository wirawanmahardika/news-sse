import { prisma } from "../../application/database.js";

const getAllNewsCategory = async (req, res, next) => {
  try {
    const news = await prisma.news.findMany();
    res.json({
      message: "Berhasil mengambil semua category berita",
      data: news,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getAllNewsCategory,
};
