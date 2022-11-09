const db = require('../../configs/db.config');


const newVideo = (uid) => {
    // insert uid into videos table and return the uid
    return db.query("INSERT INTO videos (uid) VALUES ($1) RETURNING uid;", [uid]).then(data => {
        return data.rows[0];
    }
    )

}

const updateTitle = (uid, title) => {
    return db.query("UPDATE videos SET title = $1 WHERE uid = $2 RETURNING uid;", [title, uid]).then(data => {
        return data.rows[0];
    }
    )
}

const getAllUids = () => {
    return db.query("SELECT uid FROM videos;").then(data => {
        return data.rows;
    })
}




module.exports = { newVideo, updateTitle, getAllUids }