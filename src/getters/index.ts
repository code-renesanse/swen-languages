import { type } from "os";
import { API } from "swen-types";

/**
 * 
 * @returns string
 */
export let getLangFromURL = () => window.location.href.split('/')[window.location.href.split('/').length - 1] == '' ? 'en' : window.location.href.split('/')[window.location.href.split('/').length - 1];

 /**
  * 
  * @param {Sketchfab API object} api - JSON object holding all application data
  * @param {String} key - key  of the element to be translated
  * @returns the translated lowercase string 
  */
export let getTranslation = (api: API, key: string) => {
    //  if(!validateAPI(api)) return;

     if(!api.TRANSLATOR[key]){
         console.error(`ERROR 404: translation for key: ${key} does not exist`);
         return 'err 404!';
     }
     let out = api.TRANSLATOR[key];
     if (typeof out === 'string') {
         out = out.toLowerCase();
     }
     return out;
 };
 