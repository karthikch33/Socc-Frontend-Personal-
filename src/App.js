import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Layout from './components/Layout';
import Sessions from './components/pages/Sessions';
import SessionRegistraion from './components/pages/SessionRegistraion';
import PageNotFound from './components/pages/PageNotFound';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import CodingChannels from './components/pages/CodingChannels';
import AdminSessionAddition from './components/pages/adminSessionAddition';
import Home from './components/pages/Home';
import Team from './components/pages/Team';
import { Helmet } from 'react-helmet-async';

import Announcements from './components/pages/Announcements';
import FeedBack from './components/pages/FeedBack';
function App() {
  return (

    <>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout/>}>
                <Route path='/sessions' element={<Sessions/>}/>
                <Route path='/about' element={<About/>}/>
                <Route index element={<Home/>}/>
                <Route path='/codingchannels' element={<CodingChannels/>}/>
                <Route path='/contact' element={<Contact/>}/>
                <Route path='/team' element={<Team/>}/>
                <Route path='/announcements' element={<Announcements/>}/>
                <Route path='/adminsessionaddition' element={<AdminSessionAddition/>}/>
                <Route path='/registrations/:id' element={<SessionRegistraion/>}/>
                <Route path='/feedback/:id' element={<FeedBack/>}/>
                <Route path='/:unwanted' element={<PageNotFound/>}/>
                <Route path='/sessions/:unwanted' element={<PageNotFound/>}/>
                <Route path='/contact/:unwanted' element={<PageNotFound/>}/>
                <Route path='/about/:unwanted' element={<PageNotFound/>}/>
                <Route path='/registrations/:id/:unwanted' element={<PageNotFound/>}/>
            </Route>
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
