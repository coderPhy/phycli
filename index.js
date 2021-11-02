#!/usr/bin/env node
/**
 * #!  shebang
 * #!/usr/bin/env node
 * 在当前的电脑环境找node的可执行文件 用node帮我执行index.js文件
 */
/**
 * npm link
 * 将package.json中的bin和环境变量链接
 */

const program = require("commander")
const helpOptions = require("./lib/core/help.js")
const createCommands = require("./lib/core/create.js")

// 查看版本号
program.version(require("./package.json").version)
// program.version(require("./package.json").version, "-v, --version")

// 帮助和可选信息
helpOptions()

// 创建其他的指令
createCommands()

program.parse(process.argv)
