import { SECRET } from "../config/env.js";
import { User} from "../models/user-model.js";
import bcrypt from 'bcrypt'
import { registerSchema } from "../schema/userSchema.js";
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        // validate the user along joi
        const { error,value } = registerSchema.validate(req.body);

        if(error){
            return res.status(400).json({ message: error.details[0].message })
        }

        const{ username, password}= value;

        // find if a similar username exist, if not create
        const findUser = await User.findOne({ username: req.body.username })

        if (findUser) {
            return res.status(409).json({ message: `Choose different name` });
        } else {
            // hash the password
            const hashPassowrd = await bcrypt.hash(password, 12);
            console.log('hashPassword', hashPassowrd)

            // create user
            const Register = await User.create({
                username,
                password: hashPassowrd
            })
            console.log("RegisterData", Register)
            return res.status(201).json({ message: 'Successful registration' })
        }

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


export const login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) {
            return res.status(401).json({ message: 'Invalid Credentials' })
        }
        const findpassword = await bcrypt.compare(req.body.password, user.password)
        if (!findpassword) {
            return res.status(401).json({ message: 'Invalid Credentials' })
        }

        const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1d' })
        return res.status(200).json({message:"Token",token, user})

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}