import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - name
 *          - username
 *          - password
 *        properties:
 *          name:
 *            type: string
 *          username:
 *            type: string
 *            description: username for the user, needs to be unique.
 *          password:
 *            type: string
 *          
 *        example:
 *           name: Alexander
 *           username: alex
 *           password: 123456
 */

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    createAt: {
        date: {
            type: Date,
            default: Date.now
        }
    }
})

UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    next()
})

const User = mongoose.model('users', UserSchema)

export default User


