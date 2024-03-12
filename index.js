const express = require(`express`);

const routeIndex = require(`./router/index`);
const routeBooks = require(`./router/books`);
const routeUser = require(`./router/user`);

const { v4: uuid } = require(`uuid`);

let books = [];

const Book = (data) => {
    console.log(data);
    let {
        id = uuid(),
        title = ``,
        description = ``,
        authors = ``,
        favorite = false,
        fileCover = ``,
        fileName = ``,
    } = data;

    const book = {
        id,
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName,
    };

    return book;
};

books.push(Book({ title: `Гарри Поттер`, description: `Итория про Поттера` }));
books.push(Book({ title: `Леди и бродяга`, description: `Итория про Леди и бродяга` }));

const app = express();

app.use(`/`, routeIndex);
app.use(`/api/books`, routeBooks);
app.use(`/api/user`, routeUser);

app.use(express.json());
app.listen(process.env.PORT);

module.exports = Book;
