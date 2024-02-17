import './App.scss';
import Home from './pages/About';
import {Routes, Route} from 'react-router-dom';
import About from './pages/Home';
import Services from './pages/Services';
import BlogsPage from './pages/BlogsPage';
import SingleBlog from './pages/SingleBlog/SingleBlog';
import Contactus from './pages/Contact/Contactus';
import Transcribe from './pages/Transcribe/TranscribeMainPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/transcribe" element={<Transcribe />} />
      <Route path="/features" element={<BlogsPage />} />
      <Route path="/pricing" element={<Services />} />
      <Route path="/about" element={<About />} />
      <Route path="contact" element={<Contactus />} />
      <Route path="/login" element={<Contactus />} />
    </Routes>
  );
}

export default App;
