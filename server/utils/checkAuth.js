import jwt from 'jsonwebtoken'

export const checkAuth = (req, res, next) => {
    if (req.method === "OPTIONS"){
        next()
    }

    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.userId = decoded.id

            next()
        } catch (error) {
            return res.status(401).json({
                message: 'No access (no token)',
            })
        }
    } else {
        return res.json({
            message: 'No access (checkAuth error)',
        })
    }
}
