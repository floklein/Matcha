const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const mysql = require('mysql');

// CONNECT TO DATABASE
let connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'matcha'
});

connection.connect(function (err) {
    if (err) throw err
});

const opts = {};
opts.jwtFromRequest =  ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "Mortparequipe";

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        const sql = "SELECT id, username, email from users " +
            `WHERE id = ${jwt_payload.id}`;
        connection.query(sql, (err, result) => {
            if (result) {
                let user = {};
                user.id = result[0].id;
                user.email = result[0].email;
                user.username = result[0].username;
                done(null, user);
            }
            else {
                done(null, false);
            }
        });
    }))
};