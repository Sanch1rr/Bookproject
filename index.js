const express = require("express");
const app = express();
const fs = require("fs");
const port = 3000;
const router = express.Router();
app.use("/", router);

router.get("/", function (req, res) {
  fs.readFile("./data/book.json", (error, data) => {
    if (error) {
      throw error;
    } else {
      const booksarr = JSON.parse(data);
      const titles = booksarr.books.map((e) => {
        return e.title;
      });
      let randombooks = [];
      for (i = 0; i < 1000; i++) {
        if (randombooks.length < 3) {
          let random = titles[Math.floor(Math.random() * titles.length)];
          if (!randombooks.includes(random)) {
            randombooks.push(random);
          }
          //   randombooks += `<li>${random}</li>`;
        }
      }

      res.render("index.ejs", { randombooks: randombooks });
    }
  });
});
app.listen(port);
