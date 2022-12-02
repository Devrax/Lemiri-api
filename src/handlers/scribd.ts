import { RouterContext } from "@oak/mod.ts";

export async function getScribdDocs(ctx: RouterContext<"/doc", Record<string | number, string | undefined>, Record<string, unknown>>, url: string) {
    const doc = await fetch(url, {
        method: 'GET'
    })

    const documents = [];
    const scribdJsonps = (await doc.text()).match(/https:\/\/html\.scribdassets\.com\/([0-9A-Za-z]+\/)?pages\/([0-9A-Za-z -]+).jsonp/g) || [];

    for(const jsonp of scribdJsonps) {
        const doc = await fetch(jsonp),
        docContent = (await doc.text()).replace(/window\.page([0-9])_callback\(\[(.+)?\]\)\;/g, '$2');
        documents.push(docContent);
    }
    
    ctx.response.body = JSON.stringify(documents, null, 4);
}
