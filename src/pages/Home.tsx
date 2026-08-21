import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';

import Programs from '../components/Programs';
import Partners from '../components/Partners';
import Team from '../components/Team';
import GetInvolved from '../components/GetInvolved';
import FAQ from '../components/FAQ';
import { Helmet } from 'react-helmet-async';



export default function Home() {
  return (
    <>
      <Hero />
      <div className="flex flex-col">
        <About />
      
      <Programs />
      <Team />
      <Partners />
      <GetInvolved />
      <FAQ />
      </div>
    </>
  );
}
