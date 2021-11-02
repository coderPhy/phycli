// promisify: 设置函数的返回值为Promise
const { promisify } = require("util")
const path = require("path")

const download = promisify(require("download-git-repo"))
const open = require("open")

const { vueRepo } = require("../config/repo-config.js")
const { commandSpawn } = require("../utils/terminal.js")
const { compile, writeToFile, createdirSync } = require("../utils/utils")

const createProjectAction = async (project) => {
    console.log("phy help you create your project~");
    // 1. clone项目
    await download(vueRepo, project, { clone: true })
    // 2. 执行npm install
    const command = process.platform === 'win32' ? 'npm.cmd' : "npm"
    // 当前进程在执行当前代码,需要再开启一个进程去执行npm install
    await commandSpawn(command, ["install"], { cwd: `./${project}` })
    // 3. 运行npm run serve
    await commandSpawn(command, ["run", "serve"], { cwd: `./${project}` })
    // 4. 打开浏览器
    open("http://localhost/8080")

    // async函数返回的一定是Promise对象
    // return "hello"
    // return Promise.resolve("hello")
}

const addComponentAction = async (name, dest) => {
    // 1. 有对应的ejs模板
    // 2. 编译ejs模板result
    const result = await compile("vue-component.ejs", { name, lowerName: name.toLowerCase() });
    // 3. 将result写入到.vue文件中
    const targetPath = path.resolve(dest, `${name}.vue`)
    console.log(targetPath);
    writeToFile(targetPath, result)
    // 4. 放到对应的文件夹中
}

const addPageAndRouteAction = async (name, dest) => {
    const data = { name, lowerName: name.toLowerCase() };
    const pageResult = await compile("vue-component.ejs", data);
    const routeResult = await compile("vue-router.js.ejs", data); 

    // 3.写入文件
    const targetDest = path.resolve(dest, name)
    if(createdirSync(targetDest)) {
        const targetPagePath = path.resolve(targetDest, `${name}.vue`);
        const targetRoutePath = path.resolve(targetDest, `router.js`);
        writeToFile(targetPagePath, pageResult)
        writeToFile(targetRoutePath, routeResult)
    }
}

const addStoreAction = async (name, dest) => {
    const storeResult = await compile("vue-store.js.ejs", {});
    const typesResult = await compile("vue-types.ejs", {});

    const targetDest = path.resolve(dest, name)
    if(createdirSync(targetDest)) {
        const targetPagePath = path.resolve(targetDest, `${name}.vue`);
        const targetTypesPath = path.resolve(targetDest, `types.js`);
        writeToFile(targetPagePath, storeResult)
        writeToFile(targetTypesPath, typesResult)
    }
}

module.exports = {
    createProjectAction,
    addComponentAction,
    addPageAndRouteAction,
    addStoreAction
}