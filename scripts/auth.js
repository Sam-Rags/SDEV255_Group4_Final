const jwt = require("jsonwebtoken")

// Main authentication middleware
module.exports = function (req, res, next) {
    const authHeader = req.header("Authorization")

    if (!authHeader) {
        return res.status(401).json({ message: "Access denied" })
    }

    try {
        const token = authHeader.replace("Bearer ", "")
        const verified = jwt.verify(token, process.env.JWT_SECRET)

        // verified now contains: { userId, role, iat, exp }
        req.user = verified

        next()
    } catch (err) {
        res.status(400).json({ message: "Invalid token" })
    }
}

// Extra middleware for role-based authorization
module.exports.requireRole = function (role) {
    return function (req, res, next) {
        if (!req.user || req.user.role !== role) {
            return res.status(403).json({ message: "Forbidden: insufficient permissions" })
        }
        next()
    }
}
