const path = require("path");
const { unlink } = require("fs");
module.exports = validator => {
    return async (req, res, next) => {
        const { errors } = await validator(req.body);
        if (errors) {
            //remove uploaded files
            if (req.files && req.files.length > 0) {
                const { filename } = req.files[0];
                unlink(
                    path.join(
                        __dirname,
                        `/../../public/uploads/bookImage/${filename}`
                    ),
                    err => {
                        if (err) next(err);
                    }
                );
            }
            return res.status(400).json({ message: errors[0] });
        }
        next();
    };
};
