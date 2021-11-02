const path = require("path")
const ejs = require("ejs");
const fs = require("fs")

const compile = (templateName, data) => {
    const templatePosition = `../templates/${templateName}`;
    const templatePath = path.resolve(__dirname, templatePosition)
    
    return new Promise((resolve, reject) => {
        ejs.renderFile(templatePath, {data}, {}, (err, result) => {
            if(err) {
                console.log(err);
                reject(err)
                return 
            }
            resolve(result);
        })
    })
}

const writeToFile = (path, content) => {
    return fs.promises.writeFile(path, content)
}

const createdirSync = (dirname) => {
    if (fs.existsSync(dirname)) {
        return true
    } else {
        // 不存在,判断父亲文件夹是否存在？
        if (createdirSync(path.dirname(dirname))) {
            // 存在父亲文件，就直接新建该文件
            fs.mkdirSync(dirname)
            return true
        }
    }
}

module.exports = {
    compile,
    writeToFile,
    createdirSync
}