import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Skeleton from './components/ui/Skeleton.jsx';

// Home ships in the main bundle; the rest load on demand.
const MysteryBoxPage = lazy(() => import('./pages/MysteryBoxPage.jsx'));
const HowItWorksPage = lazy(() => import('./pages/HowItWorksPage.jsx'));
const RewardsPage = lazy(() => import('./pages/RewardsPage.jsx'));
const AboutPage = lazy(() => import('./pages/AboutPage.jsx'));
const FAQPage = lazy(() => import('./pages/FAQPage.jsx'));
const OrderPage = lazy(() => import('./pages/OrderPage.jsx'));
const PartnerPage = lazy(() => import('./pages/PartnerPage.jsx'));
const FeedbackPage = lazy(() => import('./pages/FeedbackPage.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

function RouteLoading() {
  return (
    <div className="wrap band" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading page…</span>
      <Skeleton height={44} width="45%" />
      <div style={{ height: 18 }} />
      <Skeleton height={16} width="70%" />
      <div style={{ height: 32 }} />
      <Skeleton height={260} radius="var(--r-lg)" />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="mystery-box"
          element={
            <Suspense fallback={<RouteLoading />}>
              <MysteryBoxPage />
            </Suspense>
          }
        />
        <Route
          path="how-it-works"
          element={
            <Suspense fallback={<RouteLoading />}>
              <HowItWorksPage />
            </Suspense>
          }
        />
        <Route
          path="rewards"
          element={
            <Suspense fallback={<RouteLoading />}>
              <RewardsPage />
            </Suspense>
          }
        />
        <Route
          path="about"
          element={
            <Suspense fallback={<RouteLoading />}>
              <AboutPage />
            </Suspense>
          }
        />
        <Route
          path="faq"
          element={
            <Suspense fallback={<RouteLoading />}>
              <FAQPage />
            </Suspense>
          }
        />
        <Route
          path="order"
          element={
            <Suspense fallback={<RouteLoading />}>
              <OrderPage />
            </Suspense>
          }
        />
        <Route
          path="partner"
          element={
            <Suspense fallback={<RouteLoading />}>
              <PartnerPage />
            </Suspense>
          }
        />
        <Route
          path="feedback"
          element={
            <Suspense fallback={<RouteLoading />}>
              <FeedbackPage />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<RouteLoading />}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
