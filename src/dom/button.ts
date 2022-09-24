import { addClass, createElement, getDomFromReference } from 'swen-dom';
import { errorLog } from 'swen-logger';
import { API } from 'swen-types';
import { setLang } from '../setters';

/**
 * Creates an HTML button and appends it to the lang-btn-holder div element
 * Button has an image that is pulled from alfastreet page :O
 * @param {Sketchfab API object} api - JSON object holding all application data
 * @param {String} lang - language abbreviation
 */
// TODO: change the image picture loading so that it is not pulled from alfastreet !!
export const createLanguageButton = (api: API, lang: string): void => {
  // if(!validateAPI(api)) return;

  const parent = getDomFromReference('lang-btn-holder');

  if (parent === null) {
    errorLog('lang-btn-holder does not exist!');
    return;
  }

  // TODO: fix this so that it does not access alafstreet CDN
  const imagePrefix = 'https://alfastreet-marine.com/wp-content/plugins/sitepress-multilingual-cms/res/flags';

  const titleMap: { [key: string]: string } = {
    en: 'English',
    de: 'German',
    fr: 'French',
    nl: 'Dutch',
    es: 'Spanish'
  };

  const className = 'lang-btn';
  const id = `lang-${lang}`;

  const title = titleMap[lang];

  const btn = createElement('button', id) as HTMLButtonElement;
  addClass(btn, [
    className,
    'bg-transparent',
    'border-none',
    'button-hover'
  ]);

  btn.title = title;

  const bImg = createElement('img', `${id}-img`) as HTMLImageElement;
  bImg.alt = title;
  bImg.src = `${imagePrefix}/${lang}.png`;
  addClass(bImg, 'wpml-ls-flag');

  const elan = id.split('-')[1];
  btn.addEventListener('click', () => {
    (async () => {
      await setLang(api, elan);
    })().catch(err => {
      errorLog(err);
    });
  });

  btn.appendChild(bImg);
  parent.appendChild(btn);
};
