#### Задание 2

В файле **README.md** написать следующие запросы для **MongoDB**:

-   запрос(ы) для _вставки_ данных минимум о двух книгах в коллекцию **books**,
-   запрос для _поиска_ полей документов коллекции **books** по полю _title_,
-   запрос для _редактирования_ полей: _description_ и _authors_ коллекции **books** по _\_id_ записи.

\*Каждый документ коллекции **books** должен содержать следующую структуру данных:

```javascript
{
  title: "string",
  description: "string",
  authors: "string"
}
```

```javascript
db.getSiblingDB("test").books.insertMany([
    { title: "Book 1", description: "Description 1", authors: "Author 1" },
    { title: "Book 2", description: "Description 2", authors: "Author 2" },
]);
```

```javascript
const query = { title: "заголовок" };
const cursor = db.books.find(query);
while (cursor.hasNext()) {
    const document = cursor.next();
}
```

```javascript
const filter = { _id: id };
const update = { $set: { description: "новое_описание", authors: "новые_авторы" } };
const result = db.books.updateOne(filter, update);
```
