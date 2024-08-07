import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Navigate } from 'react-router-dom';

import './App.css';
import useAuthContext from './hooks/useAuthContext';
import BlogForm from './pages/BlogForm';
import BlogPost from './pages/BlogPost';
import UserProfile from './pages/UserProfile';
import ScrollToTop from './components/scrollToTop';



const App = () => {
  const { user } = useAuthContext();
  return (

    <BrowserRouter>

      <div className='h-full'>
        <Navbar />
        <div className="pages h-screen">
          <ScrollToTop/>
          <Routes>

            <Route
              path="/"
              element={<Home/>}
              // element={user ? <Home /> : <Navigate to="/login" />}
            />

            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />

            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />

            <Route 
              path="/create-blog"
              element={user ? <BlogForm /> : <Navigate to="/login" />}
            />

            <Route
              path="/blog/:id"
              element={<BlogPost/>}
            />

            <Route
              path="/u/:id"
              element={<UserProfile/>}
            />

          </Routes>

        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;