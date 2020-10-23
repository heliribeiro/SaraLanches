import mongoose from 'mongoose'

const FoodSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        unique:true
    },
    link_picture: {
        type: String,
        required:true
    },
    price:{
        type: Number,
        required:true
    },
    description: {
        type: String,
        required: true
    }
})

const Food = mongoose.model('foods',FoodSchema)

export default Food