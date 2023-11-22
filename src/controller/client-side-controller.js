const homeView = async(req,res,next) => {
    try {
        res.render('index')
    } catch (error) {}
}

const readNews = async (req, res, next) => {
  res.render("read-news", {});
};


export default {
    homeView,
    readNews
}