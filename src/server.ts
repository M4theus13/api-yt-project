import express, { request, response }  from "express";

const app = express()

app.use(express.json())

app.get('/', (request, response) => {
    const {name, email, password } = request.body
})

app.listen(4000)