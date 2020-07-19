const fs = require('fs')
const data = require('./data.json')

//Create
exports.post = function(req, res) {
    
    const keys = Object.keys(req.body)

    for(key of keys) {
        if(req.body[key] == "")
            return res.send("Por favor preencha os campos.")
    }

    let { avatar_url, name, birth, gender, disciplinas } = req.body

    birth = Date.parse(req.body.birth)
    const created_at = Date.now()
    const id = data.instructors.length + 1


    data.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        disciplinas,
        created_at
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Erre na escrita do arquivo.")

        return res.redirect("/teachers")
    })
}