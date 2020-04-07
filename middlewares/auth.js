const jwt = require("jsonwebtoken");

module.exports = {
    isLogin: async (req, res, next) => {
        if (!req.cookies.token) {
            return res.json({
                status: "failure",
                msg: "There is no token."
            })
        }

        jwt.verify(req.cookies.token, process.env.JWT_KEY, async (err, decoded) => {
            if (err) {
                return res.json({
                    status: "failure",
                    msg: "Token is invalid",
                });
            }
            req.user = decoded;
                next();
            
        });
        
    }
}