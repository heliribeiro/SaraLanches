import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcryptjs'

const router = express.Router()
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * path:
 *  /users/register:
 *    post:
 *      summary: Create a new user
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "200":
 *          description: A user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
router.post('/register',async(req,res)=> {
        const {name,username,password} = req.body
    try {
        if(await User.findOne({username}))
            return res.status(400).json('O usuário ja existe!')

        const user = await User.create({name,username,password})
        user.password = undefined
        res.send(user)
    } catch (error) {
        res.status(400).send({error:'Não foi possível cadastrar o Usuário '+error})
    }
})

/**
 * @swagger
 * path:
 *  /users/authenticate:
 *    post:
 *      summary: Login
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *               type: object
 *               required:
 *                 - username
 *                 - password
 *               properties:
 *                   username:
 *                      type: string
 *                   password:
 *                      type: string
 *      responses:
 *        "200":
 *          description: A user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
router.post('/authenticate',async(req,res)=>{
    const {username,password} = req.body

    try {
        const user = await User.findOne({username}).select('+password')
        if(!user)
            res.status(400).send({error:"O usuário não está cadastrado"})
        
        if(!await bcrypt.compare(password, user.password))
           res.status(400).send({error:"Senha inválida"})
       
        res.send({user})

    } catch (error) {
        res.status(400).send({error:'Não foi possível fazer o login '+error})
    }
})

/**
 * @swagger
 * path:
 *  /users:
 *    get:
 *      summary: Get a list of users
 *      tags: [Users]
 *      responses:
 *        "200":
 *          description: An users array of object
 */
router.get('/', async(req,res)=>{
    try {
        const users = await User.find()
        res.send({users})

    } catch (error) {
        res.status(400).send({error:"Não foi possível buscar os usuários cadastrados"})
    }
})


export default router