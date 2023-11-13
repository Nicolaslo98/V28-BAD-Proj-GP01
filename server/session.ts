import expressSession from "express-session";

export let sessionMiddleware = expressSession({
  secret: "How are you?",
  resave: true,
  saveUninitialized: true,
});

declare module "express-session" {
  interface SessionData {
    room?: { room_name: number; roomId: number };
    game?: { game_Id: number };
    grant?: { response?: { access_token?: string } };
  }
}