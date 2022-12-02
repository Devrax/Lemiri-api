import { Router } from '@oak/mod.ts';
import { getScribdDocs } from "../handlers/scribd.ts";

const router = new Router();

router.post('/doc', async (ctx) => {
    const { url, site } = await (ctx.request.body({ type: 'json'}).value);
    switch(site) {
        case 'scribd':
            return getScribdDocs(ctx, url);
        default:
            return ctx.response.body = 'No site specified';
    }

});

export { router as routerDocs }
