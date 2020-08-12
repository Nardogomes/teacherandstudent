const { age, date } = require('../../lib/utils')

module.exports = {
    index(req,res) {
        return res.render("teachers/index")
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

        let { avatar_url, name, birth, sexo, disciplinas } = req.body

        return
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
