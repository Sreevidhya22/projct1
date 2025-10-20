import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Homepage'
import Loginpage from './components/Loginpage'
import Registrationpage from './components/Registrationpage'
import Adoptionpage from './components/Adoptionpage'
import Healthcare from './components/Healthcare'
import Community from './components/Community'
import LostFound from './components/LostFound'
import Mainhomepage from './components/Mainhomepage'
import AdoptionForm from './components/Adoptionform'
import Vetconsult from './components/Vetconsult'
import VaccinationPage from './components/VaccinationPage'
import VaccBooking from './components/VaccBooking'
import PetDonation from './components/PetDonation'
import VetConsultation from './components/VetConsulation'
import VeterianHomePage from './components/VeterianHomePage'
import VetAppointment from './components/VetAppointment'
import AdminDashboard from './components/AdminDashboard'
import VetProfile from './components/VetProfile'
import VaccinationPP from './components/Vaccinationpp'
import PaymentPortal from './components/Paymentportal'


function App() {

  return (
    <>
      <div>
        <Routes>
          <Route path='/' element={<Mainhomepage/>}/>
          <Route path='/Home' element={<Home/>}/>
          <Route path='/VeterianHomePage' element={<VeterianHomePage/>}/>
          <Route path='/Login' element={<Loginpage/>}/>
          <Route path='/Register' element={<Registrationpage/>}/>
          <Route path='/Adoption' element={<Adoptionpage/>}/>
          <Route path='/Healthcare' element={<Healthcare/>}/>
          <Route path='/Community' element={<Community/>}/>
          <Route path='/LostFound' element={<LostFound/>}/>
          <Route path='Adoptform' element={<AdoptionForm/>}/>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path='/Vet' element={<Vetconsult/>}/>
          <Route path='/vaccination' element={<VaccinationPage/>}/>
          <Route path='/Vaccbooking' element={<VaccBooking/>}/>
          <Route path='/donation' element={<PetDonation/>}/>
          <Route path='/Vetconsult' element={<VetConsultation/>}/>
          <Route path='/VetProfile' element={<VetProfile/>}/>
          <Route path='/Appoint' element={<VetAppointment/>}/>
          <Route path = 'Vaccinationpp' element={<VaccinationPP/>}/>
         <Route path="/payment" element={<PaymentPortal />} />
         </Routes>
      </div>
    </>
  )
}

export default App