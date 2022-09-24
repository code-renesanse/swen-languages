import { getDomFromReference } from 'swen-dom';
import { errorLog } from 'swen-logger';
import { API } from 'swen-types';
import { getTranslation } from './getters';
import { Translator } from './translator';

/**
 * This method is called when clicking on an language button and will load JSON data with new translations
 * It will also update all page components to the new language
 * @param {Sketchfab API object} api - JSON object holding all application data
 * @param {String} lang - the lang that the app will switch to
 */
export const setLang = async (api: API, lang: string): Promise<string> => {
  api.TRANSLATOR = await Translator(api, lang);

  if (api.TRANSLATOR === null || api.TRANSLATOR === undefined) {
    errorLog(`${lang} is not a valid language`);
    return '';
  }

  const apiUpdate = api.COMPONENTS[0].api;
  if (apiUpdate === null) {
    console.error('API not loaded');
    return '';
  }

  document.title = getTranslation(api, 'title');

  const rtsBtn = getDomFromReference('rts-btn');
  rtsBtn.textContent = getTranslation(api, 'rts-btn');

  api.COMPONENTS.forEach(cmp => {
    cmp.updateLang(api);
  });

  return lang;
};
