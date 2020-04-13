const bcrypt = require('bcrypt');
const modelUser = require('../models/users');
const methodAuth = require('../methods/auth');
const SALT_ROUNDS = 10;

exports.register = async (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        return res.status(205).send("Tên đăng nhập hoặc mật khẩu không được trống.");
    }
    const username = (req.body.username).toLowerCase();
    const user = await modelUser.get(username);
    if (user)
        res.status(205).send("Tên đăng nhập đã tồn tại. Vui lòng nhập lại.");
    else {
        const hashPassword = bcrypt.hashSync(req.body.password, SALT_ROUNDS);
        const newUser = {
            username: username,
            password: hashPassword
        }
        await modelUser.add(newUser);
        return res.status(201).send("Tạo tài khoản thành công.");
    }
};

//username, password
exports.login = async (req, res) => {
    let username = req.body.username || 'test';
    const password = req.body.password || '12345';
    username = username.toLowerCase();
    const user = await modelUser.get(username);
    if (!user) {
        return res.status(401).send("Tên đăng nhập không tồn tại.");
    }
    const isPasswordValid = await modelUser.validPassword(username, password);
    if (!isPasswordValid) {
        return res.status(401).send("Tên đăng nhập hoặc mật khẩu không chính xác.");
    }

    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-example";

    const dataForAccessToken = {
        _id: user._id
    };
    await methodAuth.generateToken(dataForAccessToken, accessTokenSecret, accessTokenLife, async (accessToken) => {
        if (accessToken === false) {
            return res.status(401).send("Đăng nhập sai. Vui lòng thử lại.");
        }
        return res.status(200).json({
            mesage: "Đăng nhập thành công",
            token: accessToken
        });
    });
}