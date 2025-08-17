import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './component/Layout/Layout'
import Home from './pages/Home/Home'
import Projects from './pages/Projects/Projects'
import Project from './pages/Project/Project'
import Contact from './pages/Contact/Contact'
import Login from './pages/Login/Login'
import Admin from './pages/Admin/Admin'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<Home />} />
          <Route path='projets' element={<Projects />} />
          <Route path='projet/:id' element={<Project />} />
          <Route path='contact' element={<Contact />} />

          <Route path='admin-login' element={<Login />} />
          <Route path='admin-interface' element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
