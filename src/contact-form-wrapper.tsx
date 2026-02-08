import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { ContactForm } from './contact-form';

const ContactFormWithRecaptcha = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  return <ContactForm executeRecaptcha={executeRecaptcha} />;
};

export const ContactFormWrapper = () => {
  const recaptchaKey = import.meta.env.VITE_RECAP_KEY;
  const hasValidKey = recaptchaKey && recaptchaKey !== 'your_recaptcha_site_key';

  if (hasValidKey) {
    return (
      <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey}>
        <ContactFormWithRecaptcha />
      </GoogleReCaptchaProvider>
    );
  }

  return <ContactForm />;
};
