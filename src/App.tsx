import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import React from 'react';
import { PageContainer } from './components/layout/PageContainer';

const HomePage = React.lazy(() => import('./pages/HomePage'));
const DetailPage = React.lazy(() => import('./pages/DetailPage'));
const NowPlayingPage = React.lazy(() => import('./pages/NowPlayingPage'));
const PopularPage = React.lazy(() => import('./pages/PopularPage'));
const TopRatedPage = React.lazy(() => import('./pages/TopRatedPage'));

function App() {
  return (
    <PageContainer>
      <Router>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" Component={HomePage} />
            <Route path="/movie/:id" Component={DetailPage} />
            <Route path="/movies/now-playing" Component={NowPlayingPage} />
            <Route path="/movies/popular" Component={PopularPage} />
            <Route path="/movies/top-rated" Component={TopRatedPage} />
          </Routes>
        </React.Suspense>
      </Router>
    </PageContainer>
  );
}

export default App;
