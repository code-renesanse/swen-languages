import { developmentLog, errorLog } from 'swen-logger';
import { API, Translation } from 'swen-types';

export const loadNewTransllationFiles = async (api: API): Promise<boolean> => {
  if (api.languages === null || api.languages === undefined) {
    api.languages = {};
  }

  if (process.env.LANG_PATH === null || process.env.LANG_PATH === undefined || process.env.LANG_PATH === '') {
    errorLog('No valid LANG_PATH env variable');
    return false;
  }

  const path: string = process.env.LANG_PATH;
  const allFiles: __WebpackModuleApi.RequireContext = require.context(path, true, /\.json/);

  await allFiles.keys().forEach((file: string) => {
    (async () => {
      const data = await import(`${path}/${file.split('/')[1]}`);
      developmentLog(`Loaded '${file}' translation file`);
      api.languages[data.lang] = data;
    })().catch(err => {
      errorLog(err);
    });
  });

  return true;
};

export const Translator = (api: API, lang: string): Translation => {
  developmentLog(`Translator set to '${lang}' language`);
  document.getElementsByTagName('html')[0].lang = lang;

  return api.languages[lang];
};
