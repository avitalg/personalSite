import { ContactForm } from './contact-form';

export const ContactFormWrapper = () => {
  const recaptchaKey =
    typeof import.meta !== 'undefined' && import.meta.env
      ? import.meta.env.VITE_RECAP_KEY
      : undefined;
  const hasValidKey = recaptchaKey && recaptchaKey !== 'your_recaptcha_site_key';

  return <ContactForm recaptchaKey={hasValidKey ? recaptchaKey : undefined} />;
};
