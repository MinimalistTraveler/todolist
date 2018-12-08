import restify from "restify";
import mainRouter from "./routes/routes";
import corsMiddleware from "restify-cors-middleware";
const PORT = process.env.PORT || 5000;

const server = restify.createServer({
  name: "Todolist App"
});
// CORS
const cors = corsMiddleware({
  preflightMaxAge: 5,
  origins: ["http://localhost:5000/", "http://localhost:3000"],
  allowHeaders: ["API-Token", "Authorization"],
  exposeHeaders: ["API-Token-Expiry"]
});

server.pre(cors.preflight);
server.use(cors.actual);
// API ROUTER
mainRouter.applyRoutes(server, "/api");

// Plugins

server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());
// Listening
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
