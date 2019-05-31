const connection = require('./sql_connection');

module.exports = {
  moveLeftPhotos: function moveLeftPhotos(user_id) {
    return new Promise(resolve => {
      let res_filtered = [];
      let sql = "SELECT pic1 from photos " +
        `WHERE user_id = ?;`;
      connection.query(sql, [user_id],(err, pic1) => {
        if (err) throw err;
        sql = "SELECT pic2 from photos " +
          `WHERE user_id = ?;`;
        connection.query(sql, [user_id],(err, pic2) => {
          sql ="SELECT pic3 from photos " +
            `WHERE user_id = ?;`;
          connection.query(sql, [user_id], (err, pic3) => {
            sql = "SELECT pic4 from photos " +
              `WHERE user_id = ?;`;
            connection.query(sql, [user_id],(err, pic4) => {
              sql = "SELECT pic5 from photos " +
                `WHERE user_id = ?;`;
              connection.query(sql, [user_id], (err, pic5) => {
                const tab = [pic1[0].pic1, pic2[0].pic2, pic3[0].pic3, pic4[0].pic4, pic5[0].pic5];
                res_filtered = tab.filter(pic => {
                  return pic;});
                sql = "UPDATE photos SET ";
                sql += res_filtered[0] ? `pic1 = "${res_filtered[0]}", `: "pic1 = NULL, ";
                sql += res_filtered[1] ? `pic2 = "${res_filtered[1]}", `: "pic2 = NULL, ";
                sql += res_filtered[2] ? `pic3 = "${res_filtered[2]}", `: "pic3 = NULL, ";
                sql += res_filtered[3] ? `pic4 = "${res_filtered[3]}", `: "pic4 = NULL, ";
                sql += res_filtered[4] ? `pic5 = "${res_filtered[4]}" `: "pic5 = NULL ";
                sql += `WHERE user_id = ${user_id};`;
                connection.query(sql, (err) => {
                  if (err) throw err;
                  resolve(res_filtered.length);
                });
              });
            })
          })
        })
      });
    })
  }
};
