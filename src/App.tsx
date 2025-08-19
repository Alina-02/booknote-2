import Main from './ui/views/Main';
import LogIn from './ui/views/LogIn';
import { Navigate, Route, Routes } from 'react-router-dom';
import CreateAccount from './ui/views/CreateAccount';
import { AuthContext } from './context/authContext';
import { useContext } from 'react';
import ForgotPassword from './ui/views/ForgotPassword';

interface PrivateRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  isAuthenticated,
}) => {
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  const { status } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/main"
        element={
          <PrivateRoute isAuthenticated={status === 'authenticated'}>
            <Main />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
