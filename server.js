const http = require("http");
const { person } = require("./data");
const requestListener = (request, response) => {
    const { url, method } = request;
    console.log(url, method);

    // response.setHeader("Content-Type", "text/html");
    response.setHeader("Content-Type", "application/json"); //udh ga bentuk HTML lagi format response nya tapi bentuk json
    response.setHeader("X-Powered-By", "NodeJS");
    response.statusCode = 200;
    let body = [];
    request.on("data", (chunk) => {
        body.push(chunk);
    });

    if (method === "POST") {
        switch (url) {
            case "/":
                request.on("end", () => {
                    data = Buffer.concat(body).toString();
                    const { name } = JSON.parse(data);
                    // response.end(`<h1>Hai, ${name}!</h1>`);
                    body.length = 0;
                    response.end(
                        JSON.stringify({
                            message: `Hai, ${name}!`,
                        })
                    );
                });
                break;
            case "/test":
                request.on("end", () => {
                    data = Buffer.concat(body).toString();
                    console.log(data);
                    const { name } = JSON.parse(data);
                    body.length = 0;
                    person.name = name;
                    console.log(person);
                    response.end(JSON.stringify(`Selamat datang, ${name}!`));
                });
                break;
            default:
                response.end(
                    JSON.stringify({
                        message: "Halaman tidak ditemukan!",
                    })
                );
                break;
        }
    }
};
const app = http.createServer(requestListener);
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server running at port ${PORT}..`);
});
