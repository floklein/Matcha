const mysql = require('mysql');
const geolib = require('geolib');

//Connect to db
let connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'root',
  database: 'matcha'
});

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = {
  getRelevanceScore: function getRelevanceScore(id, infos, tag_res, pos_res) {
  return new Promise(resolve => {
    let matchingScore = 0;

    let sql = "SELECT tag from interests " +
      `WHERE user_id = ?`;
    connection.query(sql, [infos.id],(err, res) => {
      if (err) throw err;

      //Filter one array of tags with the other one to get nb of common tags
      const filtered_array = tag_res.filter((tag) => {
        for (let j = 0; j < res.length; j++) {
          if (tag.tag === res[j].tag)
            return true;
        }
        return false;
      });
      matchingScore += 50 * filtered_array.length;

      //Add 0.1 matchingScore per Pop point
      matchingScore += infos.popularity;

      if (infos.latitude && infos.longitude && pos_res[0].latitude && pos_res[0].longitude) {
        const dist = geolib.getDistance(
          {latitude: infos.latitude, longitude: infos.longitude},
          {latitude: pos_res[0].latitude, longitude: pos_res[0].longitude}
        );
        matchingScore -= dist / 10000;
      }

      //Check if other user already liked me and give many extra points
      sql = "Select id from likes " +
        `WHERE liker_id = ? and liked_id = ?`;
      connection.query(sql, [
        infos.id,
        id
      ],(err, res) => {
        const dist = geolib.getDistance(
          {latitude: infos.latitude, longitude: infos.longitude},
          {latitude: pos_res[0].latitude, longitude: pos_res[0].longitude}
        );
        if (err) throw err;
        matchingScore += 200 * res.length;
        resolve({
          score: matchingScore,
          dist
        });
      })
    })
  });
},

  getAgeScore: function getAgeScore(id, infos, tag_res, pos_res) {
  return new Promise(resolve => {
    const dist = geolib.getDistance(
      {latitude: infos.latitude, longitude: infos.longitude},
      {latitude: pos_res[0].latitude, longitude: pos_res[0].longitude}
    );

    const sql = "Select age from infos " +
      `WHERE user_id = ?;`;
    connection.query(sql, [infos.id],(err, res) => {
      if (err) throw err;
      resolve({
        score: res[0].age,
        dist
      });
    })
  });
},

  getDistanceScore: function getDistanceScore(id, infos, tag_res, pos_res) {
  return new Promise(resolve => {

    if (infos.latitude && infos.longitude && pos_res[0].latitude && pos_res[0].longitude) {
      const dist = geolib.getDistance(
        {latitude: infos.latitude, longitude: infos.longitude},
        {latitude: pos_res[0].latitude, longitude: pos_res[0].longitude}
      );
      resolve({
        score: dist,
        dist
      });
    }
  })
},
  syncDistanceScore: function syncDistanceScore(id, infos, tag_res, pos_res) {
  if (infos.latitude && infos.longitude && pos_res[0].latitude && pos_res[0].longitude) {
    return (geolib.getDistance(
      {latitude: infos.latitude, longitude: infos.longitude},
      {latitude: pos_res[0].latitude, longitude: pos_res[0].longitude}
    ));
  }
},

  getPopularityScore: function getPopularityScore(id, infos, tag_res, pos_res) {
  return new Promise(resolve => {
    resolve({
      score: infos.popularity,
      dist: geolib.getDistance(
        {latitude: infos.latitude, longitude: infos.longitude},
        {latitude: pos_res[0].latitude, longitude: pos_res[0].longitude}
      )
    });
  })
},
  getInterestsScore: function getInterestsScore(id, infos, tag_res, pos_res) {
  return new Promise(resolve => {

    const sql = "SELECT tag from interests " +
      `WHERE user_id = ?`;
    connection.query(sql, [infos.id],(err, res) => {
      if (err) throw err;

      //Filter one array of tags with the other one to get nb of common tags
      const filtered_array = tag_res.filter((tag) => {
        for (let j = 0; j < res.length; j++) {
          if (tag.tag === res[j].tag)
            return true;
        }
        return false;
      });
      resolve({
        score: filtered_array.length,
        dist: geolib.getDistance(
          {latitude: infos.latitude, longitude: infos.longitude},
          {latitude: pos_res[0].latitude, longitude: pos_res[0].longitude}
        )
      });
    })
  });
},

  isBlocked_liked_or_disliked: function isBlocked_liked_or_disliked(id, user, i) { //need to add dislike
  return new Promise(resolve => {
    let sql = "SELECT id from blocks " +
      `WHERE (blocker_id = ? AND blocked_id = ?) OR (blocked_id = ? AND blocker_id = ?);`;
    connection.query(sql, [
      id,
      user.id,
      id,
      user.id
    ],(err, res) => {
      if (err) throw err;
      if (res.length)
        resolve(i);
      sql = "SELECT id from likes " +
        `WHERE (liker_id = ? AND liked_id = ?);`;
      connection.query(sql, [
        id,
        user.id
      ],(err, res) => {
        if (err) throw err;
        if (res.length)
          resolve(i);
        sql = "Select id from dislikes " +
          `WHERE (disliker_id = ? AND disliked_id = ?);`;
        connection.query(sql, [
          id,
          user.id
        ],(err, res) => {
          if (err) throw err;
          resolve(res.length ? i : -1);
        })
      })
    })
  })
},

  filters_past: async function filters_past(id, result) {
  return new Promise(resolve => {
    let promises = [];
    if (result.length == 0)
      resolve(result);
    for (let i = 0; i < result.length; i++) {
      promises.push(this.isBlocked_liked_or_disliked(id, result[i], i));
    }
    Promise.all(promises)
      .then((values) => {
        values = values.sort((a, b) => {return (b - a);}).filter((val) => {return (val !== -1);});
        for (let j = 0; j < values.length; j++) {
          result.splice(values[j], 1);
        }
        resolve(result);
      })
  })
},

  isBlocked: function isBlocked(id, user, i) {
    return new Promise(resolve => {
      let sql = "SELECT id from blocks " +
        `WHERE (blocker_id = ? AND blocked_id = ?) OR (blocked_id = ? AND blocker_id = ?);`;
      connection.query(sql, [
        id,
        user.id,
        id,
        user.id
      ],(err, res) => {
        if (err) throw err;
        resolve(res.length ? i : -1);
      })
    })
  },

  blocks_past: async function blocks_past(id, result) {
    return new Promise(resolve => {
      let promises = [];
      if (result.length == 0)
        resolve(result);
      for (let i = 0; i < result.length; i++) {
        promises.push(this.isBlocked(id, result[i], i))}
      Promise.all(promises)
        .then((values) => {
          values = values.sort((a, b) => {return (b - a);}).filter((val) => {return (val !== -1);});
          for (let j = 0; j < values.length; j++) {
            result.splice(values[j], 1);
          }
          resolve(result);
        })
      })
  },

get_and_filter_dist: async function get_and_filter_dist(infos, resI, i) {
  return new Promise(resolve => {
    let sql = "SELECT latitude, longitude FROM infos " +
      `WHERE user_id = ?;`;
    connection.query(sql, [resI.id],(err, res) => {
      if (err) throw err;
      let dist = this.syncDistanceScore(0, infos, 0, res);
      resolve(dist > 50000 ? i : -1);
    })
  });
},

filters_pos: async function filter_pos(latitude, longitude, result) {
  return new Promise((resolve) => {
    let promises = [];
    if (!latitude || ! longitude || !result.length)
      resolve(result);
    const infos = {
      latitude,
      longitude
    };
    for (let i = 0; i < result.length; i++) {
      promises.push(this.get_and_filter_dist(infos, result[i], i));}
    Promise.all(promises)
      .then((values) => {
        values = values.sort((a, b) => {return (b - a);}).filter((val) => {return (val !== -1);});
        for (let j = 0; j < values.length; j++) {
          result.splice(values[j], 1);
        }
        resolve(result);
      })
    })
},

get_rid_interests: async function get_rid_interests(resI, tags_array, i) {
  return new Promise (resolve => {
      let tags_array_filtered = [];
      const sql = "select tag from interests " +
        `Where user_id = ?`;
      connection.query(sql, [resI.id],(err, res) => {
        if (err) throw err;
        tags_array_filtered = tags_array.filter((tag) => {
          for (let j = 0; j < res.length; j++) {
            if (tag.name === res[j].tag)
              return true;
          }
          return false;
        });
        resolve(tags_array_filtered.length < tags_array.length ? i : -1);
    })
  })
},


filters_interests: async function filters_interests(tags_array, result) {
  return new Promise((resolve => {
    promises = [];
    if (result.length == 0 || !tags_array || tags_array.length == 0)
      resolve(result);
    for (let i = 0; i < result.length; i++) {
      promises.push(this.get_rid_interests(result[i], tags_array, i));}
    Promise.all(promises)
      .then((values) => {
        values = values.sort((a, b) => {return (b - a);}).filter((val) => {return (val !== -1);});
        for (let j = 0; j < values.length; j++) {
          result.splice(values[j], 1);
        }
        resolve(result);
      })
  }))
}
};