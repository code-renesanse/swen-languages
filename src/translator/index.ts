import { developmentLog, errorLog } from "swen-logger";
import { API, Language, Translation } from "swen-types";

export let loadNewTransllationFiles = async (api: API) => {
    if (!api.languages) api.languages = {};

    if(!process.env.LANG_PATH) { 
        errorLog('No valid LANG_PATH env variable');
        return;
    }
    let path = process.env.LANG_PATH;
    let allFiles = require.context(path, true, /\.json/);
    await allFiles.keys().forEach(async (file: string)=> {
        import(`../../../app/assets/lang/${file.split('/')[1]}`).then(data => {
            developmentLog(`Loaded '${file}' translation file`);
            api.languages[data['lang']] = data; 
        });
    });
};

export let Translator = (api: API, lang: string): Translation => {
    developmentLog(`Translator set to '${lang}' language`);
    document.getElementsByTagName('html')[0].lang = lang;
    
    return api.languages[lang];
};