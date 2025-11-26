import React from 'react';
import { CursorProvider } from './context/CursorContext';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import Hero from './components/Hero';

import Stack from './components/Stack';
import Gallery from './components/Gallery';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <CursorProvider>
      <div className="bg-slate-900 min-h-screen text-slate-50 cursor-none selection:bg-rose-500 selection:text-white relative">
        <Header />
        <main>
          <Hero />
          <Gallery />
          <Stack />
          <Contact />
        </main>
        <Footer />
        <CustomCursor />
      </div>
    </CursorProvider>
  );
};

export default App;
