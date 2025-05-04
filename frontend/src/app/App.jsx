import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../features/Authentication/Login/ui/Login.jsx';
import SignUp from '../features/Authentication/SignUp/ui/SignUp.jsx';
import NotFound from '../features/NotFound/NotFound.jsx'
import Chat from '../features/Chat/ui/Chat.jsx';
import PrivateRoute from './PrivateRoute/PrivateRoute.jsx';
import { Provider, ErrorBoundary } from '@rollbar/react'; 


const rollbarConfig = {
  accessToken: '85898ef5461f47ed8d33160bd76f9c51',
  environment: 'testenv',
};

const App = () => {
  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="" element={<PrivateRoute>  <Chat />  </PrivateRoute>}/>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
