import jwt from 'jsonwebtoken'

export const checkRole = (roles) => {
    return (req, res, next) => {
        if (req.method === "OPTIONS") {
            next()
        }

        const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
        if(!token){
            return res.json({
                message: 'No access. Authorized first!',
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userRoles = decoded.roles
        let hasRole = false
        req.userRoles.forEach(role => {
            if (roles.includes(role)) {
                hasRole = true
            }
        });
        if (!hasRole) {
            return res.json({
                message: 'You don\'t have access -role-',
            })
        }
        next()
    }
}
