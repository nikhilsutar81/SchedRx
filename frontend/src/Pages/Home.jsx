import React from 'react';
import Header from '../Components/Header';
import SpecialityMenu from '../Components/SpecialityMenu';
import TopDoctors from '../Components/TopDoctors';
import Banner from '../Components/Banner';
import Users from '../Components/Users';

const Home = () => {
  return (
    <div>
     <Header/>
     <SpecialityMenu/>
     <TopDoctors/>
    <Banner/>
    <Users/>
    </div>
  );
}

export default Home;