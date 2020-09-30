const { age, date } = require('../../lib/utils')
const Student = require('../models/student')

module.exports = {
    index(req,res) {
        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 2
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(students) {
                
                const pagination = {
                    total: Math.ceil(students[0].total / limit),
                    page
                }

                return res.render("students/index", { students, pagination, filter })
            }
        }

        Student.paginate(params)

    },
    create(req, res) {
        Student.teachersSelectOptions(function(options) {
            return res.render("students/create", {teachersOption: options})
        })
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for(key of keys) {
            if(req.body[key] == "")
                return res.send("Por favor preencha os campos.")
        }

        Student.create(req.body, function(student) {
            return res.redirect(`/students/${student.id}`)
        })
    },
    show(req, res) {
        Student.find(req.params.id, function(student) {
            if(!student) return res.send("Estudante não encontrado.")

            student.age = age(student.birth)

            return res.render("students/show", { student })
        })
    },
    edit(req, res) {
        Student.find(req.params.id, function(student) {
            if(!student) return res.send("Estudante não encontrado.")

            student.birth = date(student.birth).iso

            Student.teachersSelectOptions(function(options) {
                return res.render("students/edit", {student, teachersOption: options})
            })
        })
    },
    put(req, res) {
        const keys = Object.keys(req.body)

        for(key of keys) {
            if(req.body[key] == "") {
                return res.send("Por favor preencha os campos.")
            }
        }

        Student.update(req.body, function() {
            return res.redirect(`/students/${req.body.id}`)
        })
    },
    delete(req, res) {
        Student.delete(req.body.id, function() {
            return res.redirect("/students")
        })
    }
}
