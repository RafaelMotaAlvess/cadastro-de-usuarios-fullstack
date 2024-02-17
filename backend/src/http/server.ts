import { env, app } from "../config";

app
  .listen({
    host: "0.0.0.0",
    port: env.PORT,
  })
  .then(() => {
    console.log(`HTTP Server Running ✨ localhost:${env.PORT}`);
  });