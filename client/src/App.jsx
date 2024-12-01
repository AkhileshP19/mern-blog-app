import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Blogs from "./pages/Blogs"
import Register from "./pages/Register"
import Login from "./pages/Login"
import UserBlogs from "./pages/UserBlogs"
import CreateBlog from "./pages/CreateBlog"
import BlogDetails from "./pages/BlogDetails"
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <>
      <Header/>
      <Toaster />
      <Routes>
        <Route path="/" element={<Blogs />}/>
        <Route path="/blogs" element={<Blogs />}/>
        <Route path="/my-blogs" element={<UserBlogs />}/>
        <Route path="/blog-details/:id" element={<BlogDetails />}/>
        <Route path="/create-blog" element={<CreateBlog />}/>
        <Route path='/register' element={<Register />}/>
        <Route path="/login" element={<Login />}/>
      </Routes>
    </>
  )
}

export default App
