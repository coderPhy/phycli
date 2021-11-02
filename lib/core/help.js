const program = require("commander")

const helpOptions = () => {
    // 增加自己的options
    program.option("-p --phy", "a phy cli")
    program.option("-d --dest <dest>", "a destination folder, 例如: -d /src/components")
    program.option("-f --framework <framework>", "your frameword")

    // 监听--help指令
    program.on("--help", function() {
        console.log("");
        console.log("Other:");
        console.log("outer options~");
    })
}

module.exports = helpOptions