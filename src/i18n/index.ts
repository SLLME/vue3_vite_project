import { createI18n } from "vue-i18n"
import ZH from './zh'
import EN from './en'
import { fa, tr } from "element-plus/es/locale"

const messages = {
    zh: { ...ZH },
    en: { ...EN }
}

const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'zh',
    messages
})

export default i18n;