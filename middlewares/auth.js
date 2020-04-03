const jwt = require("jsonwebtoken");

module.exports = {
    isLogin: async (req, res, next) => {

        if (!req.headers.authorization) {
            res.json({
                status: "failure",
                msg: "There is no token."
            })
        }
        const authorizationToken = req.headers.authorization.split(" ");
        if (authorizationToken[0] !== 'Bearer') {

            res.json({
                status: "failure",
                msg: "Token is not complete",
            })
        }


        jwt.verify(authorizationToken[1], process.env.JWT_KEY, async (err) => {
            if (err) {
                res.json({
                    status: "failure",
                    msg: "Token is invalid",
                });
            }else{
                console.log("its alive");
                next();
            }
        });
        
    }
}