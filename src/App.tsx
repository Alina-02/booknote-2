import './App.css';
import Main from './views/Main';
import LogIn from './views/LogIn';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/" element={<LogIn />} />
      </Routes>
    </>
  );
}

export default App;
