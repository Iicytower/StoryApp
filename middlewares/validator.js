const {validationResult} = require("express-validator");

function validator() {
    return (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({errors: errors.array()});
            }

            next();
        } catch (err) {
            throw err;
        }
    };
}

module.exports = validator;
