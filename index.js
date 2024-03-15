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
        fileBook = ``,
    } = data;

    const book = {
        id,
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName,
        fileBook,
    };

    return book;
};

books.push(
    Book({ title: `Гарри Поттер`, description: `Итория про Поттера`, fileBook: `name.pdf` })
);
books.push(Book({ title: `Леди и бродяга`, description: `Итория про Леди и бродяга` }));

const app = express();
app.use(express.json()).listen(process.env.PORT);

app.use(`/`, routeIndex).use(`/api/books`, routeBooks).use(`/api/user`, routeUser);

exports.Book = Book;
exports.books = books;
