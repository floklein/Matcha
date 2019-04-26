let jwt = require('jsonwebtoken');
let secret = 'Mortparequipe';

module.exports = {
  getUsersInfos: function (authorization) {
    let data = {
      id: -1,
      email: -1,
      username: -1,
      iat: -1,
      exp: -1,
    };
    jwt.verify(authorization, secret, (err, decoded) => {
      if (err) return -1;
      else {
        data = {
          id: decoded.id,
          email: decoded.email,
          username: decoded.username,
          iat: decoded.iat,
          exp: decoded.exp
        }
      }
      if (data.id === -1 || typeof data === "undefined")
        return -1;
      else
        return data;
      });
    return data;
    }
};