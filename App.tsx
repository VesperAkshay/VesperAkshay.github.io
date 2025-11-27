import React, { useState } from 'react';
import { CursorProvider } from './context/CursorContext';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import Hero from './components/Hero';
import InitializationSequence from './components/InitializationSequence';

import Stack from './components/Stack';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <CursorProvider>
      <div className="bg-slate-900 min-h-screen text-slate-50 cursor-none selection:bg-rose-500 selection:text-white relative">
        {showIntro && <InitializationSequence onComplete={() => setShowIntro(false)} />}
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
