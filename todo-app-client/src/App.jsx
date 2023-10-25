import { Routes, Route } from 'react-router-dom'

import { HomePage } from './pages/Homepage';
import { LoginPage } from './pages/Loginpage';
import { RegisterPage } from './pages/Registerpage';
import { NotFoundPage} from './pages/Notfoundpage';

function App() {
  return (
    <>

      <Routes>
        <Route path = '/' element = {<HomePage />}/>
        <Route path = '/login' element = {<LoginPage />}/>
        <Route path = '/register' element = {<RegisterPage />}/>
        <Route path = '*' element = {<NotFoundPage />}/>
      </Routes>
    </>
  );
}

export default App;
