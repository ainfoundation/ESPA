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
      <Helmet>
        <title>ESPA Foundation | From Exclusion to Education</title>
        <meta name="description" content="ESPA Foundation works to bridge the gap in education by providing digital resources and empowering rural communities." />
        <meta property="og:title" content="ESPA Foundation | From Exclusion to Education" />
        <meta property="og:description" content="ESPA Foundation works to bridge the gap in education by providing digital resources and empowering rural communities." />
      </Helmet>
      <Hero />
      <div className="flex flex-col">
        <About />
      
      <Programs />
      <Team />
      {/* Hidden for now: <Partners /> */}
      <GetInvolved />
      <FAQ />
      </div>
    </>
  );
}
