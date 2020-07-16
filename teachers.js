const fs = require('fs')

//Create
exports.post = function(req, res) {
    
    const keys = Object.keys(req.body)

    for(key of keys) {
        if(req.body[key] == "")
            return res.send("Por favor preencha os campos.")
    }

    fs.writeFile("data.json", JSON.stringify(req.body), function(err) {
        if(err) return res.send("Erre na escrita do arquivo.")

        return res.redirect("/teachers")
    })
}