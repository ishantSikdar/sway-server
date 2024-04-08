const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET;

const userAuthMiddleware = async (req, res, next) => {
    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).json({
            message: "Authorization token missing",
        })
    }

    try {
        const [, jwtToken] = token.split(" ");
        const decodedValue = jwt.verify(jwtToken, JWT_SECRET);

        if (decodedValue.username) {
            req.username = decodedValue.username;
        } else {
            return res.status(403).json({
                message: "Invalid Token, No Username",
            })
        }

    } catch (error) {
        return res.status(403).json({
            message: "Invalid Authorization Token",
        })
    }

} 