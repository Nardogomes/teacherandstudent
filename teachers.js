const fs = require('fs')
const data = require('./data.json')
const { age } = require('./utils')

//Show
exports.show = function(req, res) {
    const { id } = req.params

    const foundTeachers = data.teachers.find(function(teacher) {
        return teacher.id == id
    })

    if(!foundTeachers) res.send("Teacher not found.")

    const teacher = {
        ...foundTeachers,
        age: age(foundTeachers.birth),
        disciplinas: foundTeachers.disciplinas.split(","),
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundTeachers.created_at)
    }

    return res.render("teachers/show", { teacher })
}

//Create
exports.post = function(req, res) {
    
    const keys = Object.keys(req.body)

    for(key of keys) {
        if(req.body[key] == "")
            return res.send("Por favor preencha os campos.")
    }

    let { avatar_url, name, birth, sexo, disciplinas } = req.body

    birth = Date.parse(req.body.birth)
    const created_at = Date.now()
    const id = data.teachers.length + 1


    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        sexo,
        disciplinas,
        created_at
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Erre na escrita do arquivo.")

        return res.redirect("/teachers")
    })
}

//Edit
exports.edit = function(req, res) {
    const { id } = req.params

    const foundTeachers = data.teachers.find(function(teacher) {
        return teacher.id == id
    })

    if(!foundTeachers) res.send("Teacher not found.")
    console.log(foundTeachers)
    return res.render("teachers/edit", { teacher: foundTeachers })
}