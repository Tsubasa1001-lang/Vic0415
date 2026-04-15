import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import YearPage from './pages/YearPage';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="year/:yearId" element={<YearPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

