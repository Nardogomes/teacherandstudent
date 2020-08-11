const fs = require('fs')
const data = require('../data.json')
const { date } = require('../utils')

exports.index = function(req, res) {
    return res.render("students/index", { students: data.students })
}

//Create
exports.create = function(req, res) {
    return res.render("students/create")
}

//Post
exports.post = function(req, res) {
    
    const keys = Object.keys(req.body)

    for(key of keys) {
        if(req.body[key] == "")
            return res.send("Por favor preencha os campos.")
    }

    birth = Date.parse(req.body.birth)
    
    let id = 1
    const latsStudent = data.students[data.students.length - 1]
    if(latsStudent) {
        id = latsStudent.id + 1
    }

    data.students.push({
        id,
        ...req.body,
        birth
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Erre na escrita do arquivo.")

        return res.redirect(`/students/${id}`)
    })
}

exports.show = function(req, res) {
    const { id } = req.params

    const foundStudents = data.students.find(function(student) {
        return student.id == id
    })

    if(!foundStudents) res.send("student not found.")

    const student = {
        ...foundStudents,
        birth: date(foundStudents.birth).birthDay
    }

    return res.render("students/show", { student })
}

//Edit
exports.edit = function(req, res) {
    const { id } = req.params

    const foundStudents = data.students.find(function(student) {
        return student.id == id
    })

    if(!foundStudents) res.send("student not found.")

    const student = {
        ...foundStudents,
        birth: date(foundStudents.birth).iso
    }
    return res.render("students/edit", { student })
}

//Put
exports.put = function(req, res) {
    const { id } = req.body
    let index = 0

    const foundStudents = data.students.find(function(student, foundIndex) {
        if(id == student.id) {
            index = foundIndex
            return true
        }
    })

    if(!foundStudents) return res.send('student not found!')

    const student = {
        id: Number(req.body.id),
        ...foundStudents,
        ...req.body,
        birth: Date.parse(req.body.birth)
    }

    data.students[index] = student

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write error!")

        return res.redirect(`/students/${id}`)
    })
}

//delete
exports.delete = function(req, res) {
    const { id } = req.body

    const filteredStudents = data.students.filter(function(student) {
        return student.id != id
    })

    data.students = filteredStudents

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write file error!")
        
        return res.redirect('/students')
    })
}