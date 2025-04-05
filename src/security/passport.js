import { Strategy } from "passport-local";
import { prisma } from "../app/database.js";

export function initializePassport(passport) {
  passport.use(
    new Strategy(async (username, password, done) => {
      const user = await prisma.user.findUnique({ where: { username } });

      if (!user) return done("username tidak terdaftar", false);
      if (password !== user.password) return done("password salah", false);

      delete user.password;
      done(null, user);
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id_user);
  });

  passport.deserializeUser(async (req, id_user, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id_user },
      });

      if (!user) {
        req.session.destroy();
        done("Terjadi kesalahan pada sesi login, mohon login kembali", false);
        return;
      }

      delete user.password;
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  });
}
