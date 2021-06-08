const express = require('express');
const helper = require('./helper');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const app = express();
const port = 3000;

const MAX_COMIC_RANGE = 2473;

let comicsViewed = [];

app.set("view engine", "pug");
app.use(express.static('public'));

app.listen(port, () => {
    console.log("Server listening at http://localhost:3000");
});

app.get("/", (req, res) => {
    res.redirect("/comic/" + helper.random(0, MAX_COMIC_RANGE));
});

app.get("/comic", (req, res) => {
    if (req.query.hasOwnProperty("comicCount") && req.query.comicCount === "true") {
        res.status(200).send(MAX_COMIC_RANGE.toString());
    }
});

app.get("/comic/*", (req, res) => {
    let url = decodeURIComponent(req.url).split("/");

    // check to make sure that route is valid to an existent comic
    if (url.length === 3 && helper.isNumeric(url[2]) && parseInt(url[2]) >= 1 && parseInt(url[2]) <= MAX_COMIC_RANGE) {
        renderComic(parseInt(url[2]), req, res);
    } else {
        res.status(404).send("Comic not found.");
    }
});

function renderComic(index, req, res) {
    let xHttp = new XMLHttpRequest();

    xHttp.onreadystatechange = () => {
        if (xHttp.readyState === 4 && xHttp.status === 200) {

            let found = false;
            let viewed = 0;

            // get views for comic
            comicsViewed = comicsViewed.map(function(item) {
                if (item.id === index) {
                    found = true;
                    viewed = item.viewedCount + 1;
                    return {id: item.id, viewedCount: viewed};
                } else {
                    return item;
                }
            });

            if (!found) {
                comicsViewed.push({id: index, viewedCount: 1});
                viewed = 1;
            }

            res.render("comic", {data: JSON.parse(xHttp.responseText), views: viewed});
        }
    }

    xHttp.onerror = () => {
        res.status(408).send("Comic request failed.");
    };

    xHttp.open("GET", "https://xkcd.com/" + index.toString() + "/info.0.json");
    xHttp.send();
}
