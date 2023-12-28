import passport from "passport";

const login = passport.authenticate("local", {
  successRedirect: "/admin",
  failureRedirect: "/login",
  failureFlash: true,
});

const logout = (req,res,next) => {
  req.logout(err => {
    if(err)  return res.status(500).send("Something went wrong")

    req.session.destroy(err => {
      if(err) return res.status(500).send("Something went wrong")
      
      return res.redirect('/')
    })
  })
}

export default {
  login,
  logout
};
