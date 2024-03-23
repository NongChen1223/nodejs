import i18next from 'i18next';
import en from  './en.js';
import zh from  './zh.js';

function initI18n() {
    console.log('初始化i18next',i18next)
    i18next.init({
        fallbackLng:'en',
        debug: true,
        resources: {
            en: {
                translation: en
            },
            zh: {
                translation: zh
            }
        }
    });
}
function chageLang(lang) {
    i18next.changeLanguage(lang)
}
export {
    initI18n,
    chageLang
}