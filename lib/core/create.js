const program = require("commander")

const { createProjectAction,
        addComponentAction,
        addPageAndRouteAction,
        addStoreAction } = require("./actions.js")
 
const createCommands = () => {
    program
        .command("create <project> [oters...]")
        .description("clone a repositbry into a folder")  // 描述
        .action(createProjectAction)

    program
        .command("addcpn <name>")
        .description("add vue component, 例如: phy addcpn helloWorld -d src/components")
        .action((name) => {
            addComponentAction(name, program.dest || "src/components")
        })

    program
        .command("addpage <page>")
        .description("add vue page and router config, 例如: phy addpage Home [-d src/pages]")
        .action((page) => {
            addPageAndRouteAction(page, program.dest || "src/pages")
        })

    program
        .command("addstore <store>")
        .description("add store, 例如: phy addstore Home [-d src/pages]")
        .action((store) => {
            addStoreAction(store, program.dest || "src/store/modules")
        })
}

module.exports = createCommands