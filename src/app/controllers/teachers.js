const { age, date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    index(req,res) {

        db.query(`SELECT * FROM teachers`, function(err, results) {
            if(err) return res.send('Erro no banco de dados!')

            return res.render("teachers/index", {teachers: results.rows})
        })

    },
    create(req, res) {
        return res.render("teachers/create")
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for(key of keys) {
            if(req.body[key] == "")
                return res.send("Por favor preencha os campos.")
        }

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
            req.body.name,
            req.body.avatar_url,
            req.body.sexo,
            req.body.disciplinas,
            date(req.body.birth).iso,
            date(Date.now()).iso
        ]

        db.query(query, values, function(err, results) {
            if(err) return res.send('Erro no banco de dados!')
            
            return res.redirect(`/teachers/${results.rows[0].id}`)
        })

    },
    show(req, res) {
        return
    },
    edit(req, res) {
        return
    },
    put(req, res) {
        const keys = Object.keys(req.body)

        for(key of keys) {
            if(req.body[key] == "")
                return res.send("Por favor preencha os campos.")
        }

        return
    },
    delete(req, res) {
        return
    }
}
