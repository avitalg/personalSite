declare module 'react-google-recaptcha' {
  import { Component } from 'react';

  export interface ReCAPTCHAProps {
    sitekey: string;
    onChange?: (token: string | null) => void;
    onExpired?: () => void;
    onError?: () => void;
    size?: 'normal' | 'compact' | 'invisible';
    theme?: 'light' | 'dark';
    type?: 'image' | 'audio';
    tabindex?: number;
    hl?: string;
    badge?: 'bottomright' | 'bottomleft' | 'inline';
    stoken?: string;
    isolated?: boolean;
  }

  export default class ReCAPTCHA extends Component<ReCAPTCHAProps> {
    getValue(): string | null;
    reset(): void;
    execute(): void;
    executeAsync(): Promise<string>;
  }
}
