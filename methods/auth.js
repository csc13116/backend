const jwt = require('jsonwebtoken');

exports.generateToken = async (user, secretSignature, tokenLife, accessToken) => {
    delete user.address;
    // Thực hiện ký và tạo token
    jwt.sign({
            user
        },
        secretSignature, {
            algorithm: "HS256",
            expiresIn: tokenLife,
        },
        (error, token) => {
            if (error) {
                console.log(`Lỗi tạo token: ${error}`);
                return accessToken(false);
            }
            return accessToken(token);
        });
}

exports.verifyToken = async (token, secretKey, fn) => {
    jwt.verify(token, secretKey, (error, decoded) => {
        if (error) {
            console.log("Sai token" + error);
            return fn(false);
        }
        fn(decoded);
    });
}

exports.decodeToken = async (token) => {
    if (!token) {
        return null;
    }
    // const decoded = jwt.decode(token);
    // return decoded.user;
    const secretKey = process.env.ACCESS_TOKEN_SECRET || 'access-token-secret-example';
    return jwt.verify(token, secretKey, (error, decoded) => {
        if (error) {
            console.log("Sai token" + error);
            return null;
        }
        return decoded.user;
    });
}