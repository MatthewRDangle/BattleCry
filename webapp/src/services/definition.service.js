const { api } = window;


export const definitionService = {
    getFileContent: async (path) => {
        return await api.handle("/system/getFileContent", path)
    },
    importScript: async (pathToScripts) => {
        return new Promise(resolve => {
            resolve(pathToScripts.map(async pathToScript => {
                const script = await import(pathToScript)
                return script.default;
            }));
        })
    }
}