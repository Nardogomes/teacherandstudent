const { date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    all(callback) {
        db.query(`SELECT * FROM teachers ORDER BY name ASC`, function(err, results) {
            if(err) throw `Database error! ${err}`

            callback(results.rows)
        })
    },
    create(data, callback) {
        const query = `
            INSERT INTO teachers (
                name,
                avatar_url,
                sexo,
                disciplinas,
                birth,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `

        const values = [
            data.name,
            data.avatar_url,
            data.sexo,
            data.disciplinas,
            date(data.birth).iso,
            date(Date.now()).iso
        ]

        db.query(query, values, function(err, results) {
            if(err) throw `Database error! ${err}`
            
            callback(results.rows[0])
        })
    },
    find(id, callback) {
        db.query(`SELECT * FROM teachers WHERE id = $1`, [id], function(err, results) {
            if(err) throw `Database error! ${err}`

            callback(results.rows[0])
        })
    },
    update(data, callback) {
        const query = `
            UPDATE teachers SET
                avatar_url=($1),
                name=($2),
                birth=($3),
                sexo=($4),
                disciplinas=($5)
            WHERE id = $6
        `

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.sexo,
            data.disciplinas,
            data.id
        ]

        db.query(query, values, function(err, results) {
            if(err) throw `Erro no banco de dados ${err}`

            callback()
        })
    },
    delete(id, callback) {
        db.query(`DELETE FROM teachers WHERE id = $1`, [id], function(err, results) {
            if(err) throw `Database erro! ${err}`

            callback()
        })
    }
}