import Main from './views/Main';
import LogIn from './views/LogIn';
import { Route, Routes } from 'react-router-dom';
import CreateAccount from './views/CreateAccount';

function App() {
  return (
    <>
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/" element={<LogIn />} />
        <Route path="/create-account" element={<CreateAccount />} />
      </Routes>
    </>
  );
}

export default App;
