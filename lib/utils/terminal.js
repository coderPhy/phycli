/**
 * 该文件执行时会开启一个子进程
 * 执行终端命令相关的代码
 */
// spawn是对exec的封装
const { exec, spawn } = require("child_process")

const commandSpawn = (...args) => {
    /**
     * spawn三个参数
     * command 命令(npm)
     * args 指令 (["install"])
     * options 选项
     */
    // spawn(command, args, options); 返回进程childProcess
    return new Promise((resolve, reject) => {
        const childProcess = spawn(...args)
        childProcess.stdout.pipe(process.stdout);
        childProcess.stderr.pipe(process.stderr);
        childProcess.on("close",() => {
            console.log("close");
            resolve()
        })
    })
}



module.exports = {
    commandSpawn
}