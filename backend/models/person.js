const mongoose = require("mongoose")

const url = process.env.MONGODB_URI

mongoose.set("strictQuery", false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: [true, "Person name is required"]
    },
    number: {
        type: String,
        minLength: 8,
        require: [true, "Person phone number is required"],
        validate: {
            validator: function (v) {
                console.log(v)
                return /^\d{2,3}-\d{6,}$/.test(v)
            },
            message: props => `${props.value} is not a valid phone number.`
        }
    },
})

personSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Person", personSchema)