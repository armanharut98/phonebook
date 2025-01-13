require("dotenv").config()
const express = require("express")
const app = express()

const morgan = require("morgan")
const cors = require("cors")

const Person = require("./models/person")

morgan.token("body", function (req) {
    return JSON.stringify(req.body)
})

app.use(cors())
app.use(express.static("dist"))
app.use(express.json())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))

app.get("/info", (request, response) => {
    Person.countDocuments()
        .then(count => {
            response.send(`<p>Phonebook has info for ${count} people</p><p>${new Date(Date.now())}</p>`).end()
        })
})

app.get("/api/persons", (request, response) => {
    Person.find({}).then(persons => response.json(persons))
})

app.get("/api/persons/:id", (request, response, next) => {
    const id = request.params.id

    Person.findById(id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.post("/api/persons", (request, response, next) => {
    const { name, number } = request.body

    const person = new Person({
        name, number
    })
    person.save()
        .then(savedPerson => {
            response.status(201).json(savedPerson)
        })
        .catch(error => next(error))
})

app.put("/api/persons/:id", (request, response, next) => {
    const id = request.params.id

    Person.findByIdAndUpdate(id, request.body, { new: true, runValidators: true })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

app.delete("/api/persons/:id", (request, response, next) => {
    const id = request.params.id
    Person.findByIdAndDelete(id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.log(error)

    if (error.name === "CastError") {
        response.status(400).end()
    } else if (error.name === "ValidationError") {
        response.status(400).json({ message: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
