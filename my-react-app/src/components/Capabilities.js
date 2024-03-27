import React, { useEffect } from 'react';
import '../styles/Capabilities.css';
import ContactSection from './ContactSection';
import software from '../images/software-dev.png'
import projectM from '../images/project-management.jpg'
import hero from '../images/hero-image.jpg'
import heroHex from '../images/hero-hex.jpg'
import code from '../images/services-code.jpg'
import { useLocation } from 'react-router-dom'

function Capabilities() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;

    if (hash) 
    {
      const id = hash.slice(1);
      const element = document.getElementById(id);

      if (element) 
      {
        const scrollOptions = 
        {
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        };
  
        const scrollDistance = element.getBoundingClientRect().top - 100;
        const startTime = performance.now();
        const duration = 500; 

        function scrollStep(timestamp) 
        {
          const elapsed = timestamp - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeInOutProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
          window.scrollTo(0, window.scrollY + scrollDistance * easeInOutProgress);

          if (elapsed < duration) 
          {
            requestAnimationFrame(scrollStep);
          }
        }
  
        requestAnimationFrame(scrollStep);
      }
    }
  }, [location.hash]);

  useEffect(() => {
    const handleIntersection = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting)
        {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    };

    const observerLeft = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    });
  
    const elementsLeft = document.querySelectorAll('.fade-in-left');
    elementsLeft.forEach(element => {
        observerLeft.observe(element);
    });
  }, []);

  return (
    <div className="capability-container">
      <div className="hero-image" style={{ backgroundImage: `url(${heroHex})` }}>
        <div className='container'>
          <div className="hero-section">
            <h1 className='hero-title'>Services</h1>
          </div> 
        </div>
      </div>
        <div className='container'>
          <div className="row col-lg-8 col-12 mx-auto fade-in-left sub-heading">
            <h5 className='sub-heading-text'><i>Our four key services we provide - Nulla efficitur risus id purus vehicula, sed ultricies elit tristique. Vestibulum hendrerit, tortor eu consectetur feugiat.</i></h5>
          </div>
          <div className="row category-row-left" id="erp-selection">
              <div className="col-lg-7 col-12 category-text fade-in-left order-lg-1 order-2">
                  <h2 className="title">ERP Selection and Advisory</h2>
                  <p>ERP streamlines business processes to provide a significant competitive advantage. These solutions offer proven, best-practice processes for business functions, including business planning, product development, sales, manufacturing, logistics, finance, and human resources. Properly implemented, ERP delivers optimal efficiency and productivity, while reducing information management system costs.</p>
                  <p>We provide industry expertise and in-depth ERP vendor knowledge to effectively guide you through an ERP system selection — with the view to maximize your return on investment by focusing on the challenges that are most relevant to your business.</p>
              </div>
              <div className="col-lg-5 col-12 fade-in-left order-lg-2 order-1">
                  <img src={projectM} alt="ERP Selection Image" className="category-image"/>
              </div>
          </div>
          <div className="row category-row-right" id="program-management">
              <div className="col-lg-5 col-12 fade-in-left order-1">
                  <img src={software} alt="Program Management Image" className="category-image"/>
              </div>
              <div className="col-lg-7 col-12 category-text fade-in-left order-2">
                  <h2 className="title">Business Transformation and Program Management</h2>
                  <p>As a project or program manager, we assist clients integrate strategy, process, technology, and information to increase effectiveness, reduce costs and improve profit and shareholder value.</p>
                  <p>We provide a range of consulting, coaching, training, and professional staffing services in Project and Program Management.  These practical training and consulting solutions are tailored to your unique business needs and work environments.</p>
              </div>
          </div>
          <div className="row category-row-left"  id="data-analytics">
              <div className="col-lg-6 col-12 category-text fade-in-left order-lg-1 order-2">
                  <h2 className="title">Data and Analytics</h2>
                  <p>Our data and analytics consulting service integrates data from different data sets into a single repository for further data analysis in visualization tools such as Tableau and Power BI.  We work with clients to design and implement a three tier data infrastructure that includes:</p>
                  <ul>
                    <li>ETL (Extract, Transform, Load) to extract and ingest raw source data.</li>
                    <li>Database staging area that applies business rules and initial optimizations.</li>
                    <li>Integration database to optimize data storage through consolidating data de-duplication.</li>
                    <li>Analytics database or tabular cube to support complex analytics.</li>
                    <li>Data visualization and reporting.</li>
                  </ul>
              </div>
              <div className="col-lg-6 col-12 fade-in-left order-lg-2 order-1">
                  <img src={hero} alt="Data Analytics Image" className="category-image"/>
              </div>
          </div>
          <div className="row category-row-right order-1" id="software-development">
              <div className="col-lg-5 col-12 fade-in-left">
                  <img src={code} alt="Software Development Image" className="category-image"/>
              </div>
              <div className="col-lg-7 col-12 category-text fade-in-left order-2">
                  <h2 className="title">Software Development</h2>
                  <p>Reinvent your business by enabling technologies and applications to drive new, differentiating solutions to market, which can drive business growth and provide business process efficiency.</p>
                  <p>Our software developers build modern, relevant and scalable business applications that support business growth and innovation.  We offer a flexible resourcing model that provides resources with the necessary leading-edge technical skills to support your application development needs.</p>
              </div>
          </div>
      </div>
      <ContactSection />
  </div>
  );
}

export default Capabilities;
