import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../features/Authentication/Login/ui/Login.jsx';
import SignUp from '../features/Authentication/SignUp/ui/SignUp.jsx';
import NotFound from '../features/NotFound/NotFound.jsx';
import Chat from '../features/Chat/ui/Chat.jsx';
import PrivateRoute from './PrivateRoute/PrivateRoute.jsx';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<PrivateRoute><Chat /></PrivateRoute>} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
    </Routes>
  </BrowserRouter>
);

export default App;
