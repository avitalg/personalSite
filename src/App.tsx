import { SeoHead } from './components/SeoHead';
import { SiteApp } from './SiteApp';
import { useRoute } from './hooks/useRoute';
import './App.css';

function App() {
  const { route, navigate, goHomeSection } = useRoute();

  return (
    <>
      <SeoHead page={route.page} slug={route.slug} />
      <SiteApp
        page={route.page}
        slug={route.slug}
        onNavigate={navigate}
        onGoHomeSection={goHomeSection}
      />
    </>
  );
}

export { App };
