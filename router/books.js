const { Router } = require(`express`);
const router = Router();
const inx = require(`../index`);
const path = require(`path`);
const fileMulter = require(`../middleware/file`);

router
    .get(`/`, (req, res) => {
        //res.json(inx.books);
        res.render(`books/index`, {
            title: `Скачать книги`,
            books: inx.books,
        });
    })
    .get(`/create`, (req, res) => {
        res.render(`books/create`, {
            title: `Загрузить книгу`,
        });
    })
    .get(`/update/:id`, (req, res) => {
        const { id } = req.params;
        const book = inx.books.filter((x) => x.id == id)[0];

        !book && res.status(404);
        res.render(`books/update`, {
            title: `Редактировать книгу`,
            book,
        });
    })
    .get(`/:id`, (req, res) => {
        const { id } = req.params;
        const book = inx.books.filter((x) => x.id == id)[0];

        !book && res.status(404);
        res.render(`books/view`, {
            title: `Просмотр книги`,
            book,
        });
    })
    .get(`/:id/download`, (req, res) => {
        const { id } = req.params;
        const book = inx.books.filter((x) => x.id == id)[0];

        book
            ? book.fileBook
                ? res.download(path.join(__dirname, `..`, `upload-folder`, book.fileBook))
                : res.json({ result: `error`, message: `file not found` })
            : res.json({ result: `error`, message: `book not found` });
    })

    .post(`/`, (req, res) => {
        console.log(`body`, req);
        const book = inx.Book(req.body);
        inx.books.push(book);

        res.json(book);
    })
    .post(`/create`, (req, res) => {
        console.log(`req`, req);
        const book = inx.Book(req.body);
        inx.books.push(book);

        res.redirect(`/books`);
    })
    .post(`/upload`, fileMulter.single(`book`), (req, res) => {
        if (req.file) {
            const { path } = req.file;
            inx.books.push(inx.Book({ fileBook: path }));
            res.json({ result: `success`, message: `uploaded`, path });
        }
    })
    .post(`/update/:id`, (req, res) => {
        const { id } = req.params;
        const book = inx.books.filter((x) => x.id == id)[0];

        book &&
            inx.books
                .filter((x) => x.id == id)
                .map((o) => {
                    Object.keys(req.body).map((p) => {
                        o[p] = req.body[p];
                    });
                });

        !book && res.status(404);

        res.redirect(`/books`);
    })
    .post(`/delete/:id`, (req, res) => {
        const { id } = req.params;
        const book = inx.books.filter((x) => x.id == id)[0];
        book && (inx.books = inx.books.filter((x) => x.id != id));

        !book && res.status(404);
        res.redirect(`/books`);
    })

    .put(`/`, (req, res) => {
        res.json({ result: `error`, message: `id must set` });
    })
    .put(`/:id`, (req, res) => {
        const { id } = req.params;
        const book = inx.books.filter((x) => x.id == id)[0];

        book &&
            inx.books
                .filter((x) => x.id == id)
                .map((o) => {
                    Object.keys(req.body).map((p) => {
                        o[p] = req.body[p];
                    });
                });

        !book && res.status(404);
        res.json({ result: book ? `updated` : `book not found` });
    })

    .delete(`/`, (req, res) => {
        res.json({ result: `error`, message: `id must set` });
    })
    .delete(`/:id`, (req, res) => {
        const { id } = req.params;
        const book = inx.books.filter((x) => x.id == id)[0];
        book && (inx.books = inx.books.filter((x) => x.id != id));

        !book && res.status(404);
        res.json({ result: book ? `success` : `book not found` });
    });

module.exports = router;
