const passport = require('passport');

//! Cách dùng passportJS
exports.isAuth = async (req, res, next) => {
    passport.authenticate('jwt', {
        session: false
    }, (err, user, info) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Đã xảy ra lỗi, vui lòng thử lại.');
        }
        if (info !== undefined) {
            console.log(info.message);
            return res.status(401).send('Thông tin đăng nhập không chính xác.');
        } else {
            //Lưu thông tin user vào req.user
            req.user = user;

            //Qua controller tiếp theo
            return next();
        }
    })(req, res, next);
}