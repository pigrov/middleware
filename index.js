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
    Book({
        title: `Гарри Поттер`,
        authors: `Про Джоан Роулинг`,
        description: `Итория про Поттера`,
        fileBook: `name.pdf`,
    })
);
books.push(
    Book({
        title: `Леди и бродяга`,
        authors: `Уорд Грин, Эрдман Пеннер, Дон Дагради`,
        description: `Итория про Леди и бродяга`,
    })
);

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json()).listen(process.env.PORT);
app.set(`view engine`, `ejs`);

app.use(`/`, routeIndex).use(`/books`, routeBooks).use(`/user`, routeUser);

exports.Book = Book;
exports.books = books;
