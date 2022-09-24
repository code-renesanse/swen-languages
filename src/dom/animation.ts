import { addClass } from 'swen-dom';
import { API } from 'swen-types';
import { getLangFromURL, getTranslation } from '../getters';
import { Translator } from '../translator';

/**
 * Creates the loading ... animation
 * @param {Sketchfab API object} api - JSON object holding all application data
 */

export const wordsSpin = async (api: API): Promise<void> => {
  if (api.TRANSLATOR === null || api.TRANSLATOR === undefined) {
    const lang = getLangFromURL();
    api.TRANSLATOR = await Translator(api, lang);
  }

  let i = 1;
  const words = getTranslation(api, 'loadingtext');
  const loadingSpan = document.querySelector('#loading-span') as HTMLSpanElement;
  addClass(loadingSpan, 'text-capitalize');
  loadingSpan.textContent = words[0].toLowerCase();
  addClass(loadingSpan, 'popInOutElement');

  loadingSpan.addEventListener('animationend', () => {
    if (i > words.length - 1) {
      i = 0;
    }
    loadingSpan.textContent = words[i].toLowerCase();
    i++;

    loadingSpan.style.animation = 'none';
    // loadingSpan.offsetHeight;
    // TODO: check if this works
    loadingSpan.style.animation = '';
  });
};
