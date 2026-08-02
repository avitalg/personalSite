import { useEffect, useState, type ReactNode } from 'react';

type ClientOnlyProps = {
  children: ReactNode;
  fallback: ReactNode;
};

/** Renders fallback in SSR/prerender HTML; hydrates to children in the browser. */
export function ClientOnly({ children, fallback }: ClientOnlyProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? children : fallback;
}
