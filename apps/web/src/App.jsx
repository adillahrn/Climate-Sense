import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LocationProvider } from './context/LocationContext';
import TopNavigationBar from './components/TopNavigationBar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';

const App = () => {
  return (
    <BrowserRouter>
      <LocationProvider>
        <div className="bg-[#FAF8F0] text-brand-forestDark antialiased selection:bg-brand-lime selection:text-brand-deepGreen">
          <TopNavigationBar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/explore" element={<ExplorePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </LocationProvider>
    </BrowserRouter>
  );
};

export default App;
