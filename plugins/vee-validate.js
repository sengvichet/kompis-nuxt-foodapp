import VeeValidate from 'vee-validate';
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import no_validationMessages from 'vee-validate/dist/locale/nb_NO';
import en_validationMessages from 'vee-validate/dist/locale/en';

Vue.use(VueI18n);

const i18n = new VueI18n();

i18n.locale = "en";

Vue.use(VeeValidate, {
  i18nRootKey: 'validations',
  i18n,
  dictionary: {
    nb_NO: no_validationMessages,
    en: en_validationMessages,
  }
});