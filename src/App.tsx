import Main from './ui/views/Main';
import LogIn from './ui/views/LogIn';
import { Route, Routes } from 'react-router-dom';
import CreateAccount from './ui/views/CreateAccount';

function App() {
  return (
    <Routes>
      <Route path="/main" element={<Main />} />
      <Route path="/" element={<LogIn />} />
      <Route path="/create-account" element={<CreateAccount />} />
    </Routes>
  );
}

export default App;
