const fs = require ("fs");
const path = require ("path");

const recursiveReadDir = (dir) => {
    if (!dir) return

    return new Promise(resolve => {
        const localFileNames = [];
        fs.readdir(dir, async (error, tmpFilesNames) => {
            for (const name of tmpFilesNames) {
                const location = path.join(dir, name);
                const stats = await fs.statSync(location);

                if (stats.isDirectory()) {
                    const tmpSubFilesNames = await recursiveReadDir(location);
                    tmpSubFilesNames.forEach((tmpSubFileName) => {localFileNames.push(tmpSubFileName)})
                }
                else
                    localFileNames.push(location);
            }

            resolve(localFileNames);
        })
    })
}

module.exports = {
    recursiveReadDir
}