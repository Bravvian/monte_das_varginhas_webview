import { useTranslation } from 'react-i18next';

export default function useLanguage() {
  const { t, i18n } = useTranslation();
  return { lang: i18n.language.slice(0, 2), setLang: (lng) => i18n.changeLanguage(lng), t };
}
