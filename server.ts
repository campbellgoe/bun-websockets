const BASE_PATH = "./public";
Bun.serve({
  port: 3001,
  async fetch(req) {

    const url = new URL(req.url);
    const filePath = BASE_PATH + url.pathname;
    if (filePath.endsWith("/") || filePath.endsWith("/index.html"))
       return new Response(Bun.file(BASE_PATH+"/index.html"));
    const file = Bun.file(filePath);
    if(file){
    return new Response(file);
    }
    return new Response("Nothing here")
  },
  error() {
    return new Response(null, { status: 404 });
  },
});
console.log("Listening on http://localhost:3001")