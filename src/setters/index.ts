import { errorLog } from "swen-logger";
import { API } from "swen-types";
import { getTranslation } from "../getters";
import { Translator } from "../translator";

/**
 * This method is called when clicking on an language button and will load JSON data with new translations
 * It will also update all page components to the new language
 * @param {Sketchfab API object} api - JSON object holding all application data
 * @param {String} lang - the lang that the app will switch to
 */
 export let setLang = async(api: API, lang: string) => {
    // if(!validateAPI(api)) return;

    api.TRANSLATOR = await Translator(api, lang);

    if (!api.TRANSLATOR) {
        errorLog(`${lang} is not a valid language`);
        return;
    }

    let apiUpdate = api.COMPONENTS[0] ? api.COMPONENTS[0].api : null;
    if (!apiUpdate) {
        console.error('API not loaded');
        return;
    }
    
    document.title = getTranslation(api, 'title');
    // TODO: create a function for this setting of the translation of rts btn
    let rtsBtn = document.querySelector('#rts-btn'); 
    rtsBtn ? rtsBtn.textContent = getTranslation(api, 'rts-btn') : '';

    api.COMPONENTS.forEach(cmp => {
        cmp.updateLang(api);
    });
};