import { Application } from "@oak/mod.ts";
import { routerDocs } from "./routers/index.ts";

const app = new Application();

app.use(routerDocs.routes());

await app.listen({ port: 8000 });
