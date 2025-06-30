import React from 'react'
import Login from './pages/auth/Login'
import { Route, Routes } from 'react-router-dom'
import DashBoard from './pages/adminpanel/DashBoard'
import UserDashboard from './pages/userpanel/UserDashboard'
import Form from './pages/adminpanel/Form'
import EmpDataTable from './pages/adminpanel/EmpDataTable'
import { ToastContainer } from 'react-toastify'
import Chat from './pages/adminpanel/Chat'
import Tasks from './pages/adminpanel/Tasks'

const App = () => {
  return (
    <>
      <section className='h-screen w-full bg-gray-200 md:p-3 lg:p-3'>

        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/DashBoard' element={<DashBoard />} />
          <Route path='/UserDashboard' element={<UserDashboard />} />
          <Route path='/Form' element={<Form />} />
          <Route path='/EmpDataTable' element={<EmpDataTable />} />
          <Route path='/Chat' element={<Chat />} />
          <Route path='/Tasks' element={<Tasks />} />
        </Routes>

        {/* ------- T O A S T I F Y ------- */}

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          pauseOnFocusLoss
          theme="light"
        />

      </section>
    </>
  )
}

export default App
