import { ContactForm } from './contact-form';

export const ContactFormWrapper = () => {
  const recaptchaKey = import.meta.env.VITE_RECAP_KEY;
  const hasValidKey = recaptchaKey && recaptchaKey !== 'your_recaptcha_site_key';

  return <ContactForm recaptchaKey={hasValidKey ? recaptchaKey : undefined} />;
};
