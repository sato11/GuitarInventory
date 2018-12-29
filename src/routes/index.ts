import * as express from "express";
import * as api from "./api";

export const register = (app: express.Application) => {
  const oidc = app.locals.oidc;

  app.get("/", (req: any, res) => {
    const user = req.userContext ? req.userContext.userInfo : null;
    res.render("index", { isAuthenticated: req.isAuthenticated(), user });
  });

  app.get("/login", oidc.ensureAuthenticated(), (req: any, res) => {
    res.redirect("/guitars");
  });

  app.get("/logout", (req: any, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/guitars", oidc.ensureAuthenticated(), (req: any, res) => {
    const user = req.userContext ? req.userContext.userInfo : null;
    res.render("guitars", { isAuthenticated: req.isAuthenticated(), user });
  });

  api.register(app);
};
