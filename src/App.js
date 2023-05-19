import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
 import AboutPage from './pages/AboutPage';
 import HomePage from './pages/HomePage';
 import ViewAnswersPage from './pages/ViewAnswersPage';
 import OnBoardingPage from './pages/OnBoardingPage';
import { AddQuestionPage } from './pages/AddQuestionPage';
import AnswerQuestionPage from './pages/AnswerQuestionPage';
import CollectPage from './pages/CollectPage';
import ViewQuestionPage from './pages/ViewQuestionPage';

 function App() {
    return <Router>
         <Routes>
             <Route path="/Home" element={<HomePage />} />
             <Route path="/" element={<OnBoardingPage />} />
             <Route path="/NewQuestion" element={<AddQuestionPage/>} />
             <Route path="/Collection" element={<CollectPage/>} />
             <Route path="/AnswerQuestion/:questionId" element={<AnswerQuestionPage/>} />
             <Route path="/ViewQuestion/:questionId" element={<AnswerQuestionPage/>} />
             <Route path="/ViewQuestion" element={<ViewQuestionPage />} />
             <Route path="/ViewAnswers" element={<ViewAnswersPage />} />
             <Route path="/About" element={<AboutPage />} />
         </Routes>
     </Router>;
};

export default App;
