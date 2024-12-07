import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
        try {
            const {token} = req.headers
            if (!token) {
                return res.status(401).json({ success: false, message: 'Token is not provided' });
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASS)  {
                return res.status(403).json({ success: false, message: 'Token is not valid' });
            }
            next();
        } catch (error) {
            console.log(error);
        }
}

export default adminAuth;