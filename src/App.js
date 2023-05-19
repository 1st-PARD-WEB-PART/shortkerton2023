import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
 import AboutPage from './pages/AboutPage';
 import HomePage from './pages/HomePage';
 import ViewAnswersPage from './pages/ViewAnswersPage';
 import OnBoardingPage from './pages/OnBoardingPage';
import { AddQuestionPage } from './pages/AddQuestionPage';

 function App() {
    return <AddQuestionPage/>
    //  return <Router>
    //      <Routes>
    //          <Route path="/Home" element={<HomePage />} />
    //          <Route path="/" element={<OnBoardingPage />} />
    //          <Route path="/ViewAnswers" element={<ViewAnswersPage />} />
    //          <Route path="/About" element={<AboutPage />} />
    //          <Route path='/pard-website' element={<HomePage />} />
    //      </Routes>
    //  </Router>;
};

export default App;
