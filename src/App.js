import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AccordionDemo } from './components/According';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import New from './pages/Dashboard/CreateRecipe/New';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Main from './pages/Dashboard/Main';
import ViewRecipe from './pages/ViewRecipe';

function App() {
  return (
    <div className=" bg-white dark:bg-gray-800 dark:text-white min-h-screen">
      
      <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            className='z-[9999999]'
          />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/write/new" element={<New />} />
        <Route path="/dashboard" element={<Main />} />
        <Route path="/recipe/:id" element={<ViewRecipe />} />

        <Route path='*' element={<NotFound />} />

      </Routes>
    </div>
  );
}

export default App;
