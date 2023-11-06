import expressSession from "express-session";

export let sessionMiddleware = expressSession({
  secret: "How are you?",
  resave: true,
  saveUninitialized: true,
});
