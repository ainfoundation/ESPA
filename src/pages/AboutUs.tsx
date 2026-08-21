import React from 'react';
import { Helmet } from 'react-helmet-async';
import AboutPageContent from '../components/AboutPageContent';

export default function AboutUs() {
  return (
    <div className="bg-white min-h-[50vh]">
      <Helmet>
        <title>About Us | ESPA Foundation</title>
        <meta name="description" content="Learn more about the ESPA Foundation's mission and initiatives." />
        <meta property="og:title" content="About Us | ESPA Foundation" />
      </Helmet>
      
      <AboutPageContent />
    </div>
  );
}
