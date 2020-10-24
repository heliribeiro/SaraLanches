import mongoose from 'mongoose'

/**
 * @swagger
 *  components:
 *    schemas:
 *      Food:
 *        type: object
 *        required:
 *          - name
 *          - link_picture
 *          - price
 *          - description
 *        properties:
 *          name:
 *            type: string
 *          link_picture:
 *            type: string
 *            
 *          price:
 *            type: number
 *          description:
 *            type: string
 *          
 *        example:
 *           name: Hamburguer de Frango
 *           link_picture: https://i.pinimg.com/236x/72/d5/f1/72d5f1f6200b3ef6afd9b7087c06140b.jpg
 *           price: 10
 *           description: Hamburguer feito na hora com peito de Frango, Salada e requeijão
 */
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