import { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Craft from './pages/Craft';
import Profile from './pages/Profile';
import { lazy, Suspense } from 'react';

// Hidden image review page: dev-only, not linked anywhere. Lazy-loaded so it
// (and the images it globs) are excluded from production builds.
const Review = import.meta.env.DEV ? lazy(() => import('./pages/Review')) : null;
import { MixedBoxProvider } from './context/MixedBoxContext';
import MixedBoxDrawer from './components/MixedBoxDrawer';

// Helper component that automatically resets window scroll position on route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <MixedBoxProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/craft" element={<Craft />} />
            <Route path="/profile/:flavor" element={<Profile />} />
            {Review && (
              <Route path="/review" element={<Suspense fallback={null}><Review /></Suspense>} />
            )}
          </Routes>
        </Layout>
        <MixedBoxDrawer />
      </Router>
    </MixedBoxProvider>
  );
}

export default App;
