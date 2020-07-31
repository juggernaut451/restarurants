module.exports = {
    isValidUser: function (req, res, next) {
        if (req.param.id) {
            return next();
        } else {
            res.status(403).send("user Id is missing !!");
        }
    },
};
