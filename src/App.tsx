import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CartDrawer from './components/cart/CartDrawer';
import Bee from './components/ui/BeeIcon';

const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const ProductDetail = lazy(() => import('./pages/Product'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Contact = lazy(() => import('./pages/Contact'));

function PageLoader() {
  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center bg-neutral-950 text-white font-sans">
      <div className="relative flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500" />
        <Bee className="text-amber-500 h-5 w-5 absolute animate-pulse" />
      </div>
      <span className="mt-4 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
        Loading honey jars...
      </span>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col bg-neutral-950 text-white select-none selection:bg-amber-500 selection:text-neutral-950">
        
        <Header />
        
        <main className="flex-grow">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/contact" element={<Contact />} />
              
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </main>
        
        <CartDrawer />
        
        <Footer />
        
      </div>
    </Router>
  );
}
