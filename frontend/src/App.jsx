import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/authorization/login.jsx';
import SignUp from './Pages/authorization/signUp.jsx';
import NotFound from './Pages/other/notFound.jsx';
import MainPage from './Pages/mainPage/mainPage.jsx';
import PrivateRoute from './Functions/PrivateRoute.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="" element={<PrivateRoute>  <MainPage />  </PrivateRoute>}/>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
