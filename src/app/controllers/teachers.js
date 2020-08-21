const Teacher = require('../models/teacher')

module.exports = {
    index(req,res) {
        Teacher.all(function(teachers) {
            return res.render("teachers/index", { teachers })
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

        Teacher.create(req.body, function(teacher) {
            return res.redirect(`/teachers/${teacher.id}`)
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
