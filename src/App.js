import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
 import AboutPage from './pages/AboutPage';
 import HomePage from './pages/HomePage';
 import ScrollToTop from './components/ScrollToTop';

 function App() {
     return <Router>
         <ScrollToTop/>
         <Routes>
             <Route path="/" element={<HomePage />} />
             <Route path="/About" element={<AboutPage />} />
             <Route path='/pard-website' element={<HomePage />} />
         </Routes>
     </Router>;
};

export default App;
