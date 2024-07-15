const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const exhbs = require('express-handlebars');
const dbo = require('./db')
const ObjectId = dbo.ObjectId;


app.engine('hbs', exhbs.engine({ layoutsDir: 'views/', defaultLayout: "main", extname: "hbs" }))
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(bodyparser.urlencoded({ extended: true }))


app.get('/', async (req, res) => {
    let database = await dbo.getdatabase();
    const collection = database.collection('books');
    const cursor = collection.find({});
    let employees = await cursor.toArray();
    let message = "";
    let book_id, edit_book, delete_id
    // console.log(req.query.book_id)
    if (req.query.book_id) {
        book_id = req.query.book_id;
        edit_book = await collection.findOne({ _id: new ObjectId(book_id) })

    }
    if (req.query.delete_id) {

        delete_id = req.query.delete_id;
        try {
            await collection.deleteOne({ "_id": new ObjectId(delete_id) });
            return res.redirect('/?status=3')
        } catch (err) {
            console.log(err)
        }
    }
    switch (req.query.status) {
        case "1":
            message = "inserted sucessfully"
            break;
        case "0":
            message = "Somerthing Went Wrong !!"
            break;
        case "2":
            message = "Updated sucessfully"
            break;
        case "3":
            message = "deleted sucessfully"
            break;
        case " 4":
            message = "the delete is incomplete "
            break;
        default:
            break;

    }
    res.render('main', { message, employees, edit_book, book_id })

})
app.post('/store_book', async (req, res) => {
    let database = await dbo.getdatabase();
    const collection = database.collection('books');
    let book = {
        title: req.body.title,
        author: req.body.author
    }
    await collection.insertOne(book);
    return res.redirect('/?status=1')


})
app.post('/update_book/:book_id', async (req, res) => {
    let database = await dbo.getdatabase();
    const collection = database.collection('books');
    let book = {
        title: req.body.title,
        author: req.body.author
    }
    let book_id = req.params.book_id;
    console.log(book_id, 'hfdghtdfsxtyestd')
    await collection.updateOne({ _id: new ObjectId(book_id) }, { $set: book });
    return res.redirect('/?status=2')


})

app.listen(7000, () => {
    console.log("Server  Running At 7000")
})