import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Craft from './pages/Craft';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/craft" element={<Craft />} />
          <Route path="/profile/:flavor" element={<Profile />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
