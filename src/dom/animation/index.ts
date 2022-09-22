
/**
 * Creates the loading ... animation
 * @param {Sketchfab API object} api - JSON object holding all application data 
 */

 import { addClass } from "swen-dom";
 import { API } from "swen-types";
 import { getLangFromURL, getTranslation } from "../../getters";
 import { Translator } from "../../translator";
 
 // TODO: translator validation
 export let wordsSpin = async (api: API) => {
     if(!api.TRANSLATOR) {
         let lang = getLangFromURL();
         api.TRANSLATOR = await Translator(api, lang);
     }
 
     let i = 1;
     let words = getTranslation(api, 'loadingtext');
     let loadingSpan = document.querySelector('#loading-span') as HTMLSpanElement;
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
         loadingSpan.offsetHeight;
         // TODO: check if this works
         loadingSpan.style.animation = '';
     });
 };