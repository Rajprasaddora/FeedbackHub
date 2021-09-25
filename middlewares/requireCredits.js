module.exports = (req, res, next) => {
    // console.log("req is ", req);

    if (req.user.credits < 1) {
        return res
            .status(403)
            .send({ error: "You don't have enough credits!" });
    }

    next();
};
