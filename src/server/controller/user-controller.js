import passport from "passport";

const login = async (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) return res.status(401).send(err)
    if (!user) throw new Error("Something went wrong")

    req.logIn(user, (err) => {
      if (err) { return next(err); }
      return res.send("Berhasil login")
    });
  })(req, res, next);
}

const logout = (req, res, next) => {
  req.logout(err => {
    if (err) return res.status(500).send("Something went wrong")

    req.session.destroy(err => {
      if (err) return res.status(500).send("Something went wrong")

      return res.redirect('/')
    })
  })
}

export default {
  login,
  logout
};
