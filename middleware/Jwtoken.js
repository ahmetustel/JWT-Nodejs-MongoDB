/* API’ye yapılacak taleplerde tokenın üretilip üretilmediğini kontrol edeceğimiz middleware.*/

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // token'a requestden 3 farklı yolla erişebilmekteyiz
    const token = req.headers["x-access-token"] || req.body.token || req.query.token;
    if (!token)
        res.send("Token bulunmamaktadır.");
    else {
        jwt.verify(token, process.env.api_secret_key, (error, decoded) => {
            if (error)
                res.send("Beklenmeyen bir hatayla karşılaşıldı.");
            else {
                req.decode = decoded;
                console.log(req.decode);
                console.log("Token var!");
                next();
            }
        });
    }
};