import { SECRET } from "../config/env.js";


export const authenticate = (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Barer", "");
        const decoded = jwt.verify(token, SECRET);
        console.log('decoded', decoded)
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Please Authenticate' });
    }
}