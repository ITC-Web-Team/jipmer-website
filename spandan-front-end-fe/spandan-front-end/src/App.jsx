import Navbar from "./components/Navbar"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Events from "./pages/Events"
import Home from "./pages/Home"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AdminLogin from './admin/AdminLogin'
import AdminDashboard from './admin/AdminDashboard'
import DelegateCardTable from './admin/DelegateCardTable'
import EventRegistrationTable from './admin/EventRegistrationTable'
import PassTable from './admin/PassTable'
import ProtectedRoute from './utils/ProtectedRoute'
import ErrorBoundary from './backend-components/ErrorBoundary.jsx'
import DelegateCardForm from './backend-components/DelegateCardForm.jsx'
import EventRegistrationForm from './backend-components/EventRegistrationForm.jsx'
import PassPurchaseForm from './backend-components/PassPurchaseForm.jsx'
import HomePage from './backend-components/HomePage.jsx'
import NotFound from './backend-components/NotFound.jsx'
import ScrollToTopButton from "./components/ScrollToTop.jsx"

function App() {

  return (
    <>
    <BrowserRouter><Navbar />

    <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Routes>
        <Route path = '/' element = {<Home />} />
        <Route path = '/events' element = {<Events />} />
        <Route path = '/about' element = {<About />} />
        <Route path = '/contact' element = {<Contact />} />


        <Route path="/login" element={<AdminLogin />} />
        <Route path="/" element={<HomePage />} />
        
        <Route path="/register" element={
          <ErrorBoundary>
            <HomePage />
          </ErrorBoundary>
        } />

        <Route path="/delegate-card" element={
          <ErrorBoundary>
            <DelegateCardForm />
          </ErrorBoundary>
        } />
        <Route path="/event-register" element={
          <ErrorBoundary>
            <EventRegistrationForm />
          </ErrorBoundary>
        } />
        <Route path="/pass-purchase" element={
          <ErrorBoundary>
            <PassPurchaseForm />
          </ErrorBoundary>
        } />

        <Route path="/admin" element={
          <ProtectedRoute>
            <ErrorBoundary>
              <AdminDashboard />
            </ErrorBoundary>
          </ProtectedRoute>
        }>
          <Route path="delegate-cards" element={<DelegateCardTable />} />
          <Route path="event-registrations" element={<EventRegistrationTable />} />
          <Route path="passes" element={<PassTable />} />
          <Route index element={<Navigate to="delegate-cards" replace />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <ScrollToTopButton />
    </BrowserRouter>
    </>
  )
}

export default App
