import React from 'react';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import Navbar from '../../components/Navbar/Navbar';
import './Contactus.scss';
import ContactForm from '../../components/ContactForm/ContactForm';
import Footer from '../../sections/Footer/Footer';

const Contactus = () => {
    return (
        <>
            <section className='section-bg section-common contact-section'>
                <Navbar />
                <SectionTitle 
                    title="Contact Us"
                    description="Please write a feedback or any questions related to our transcription service. Your message will be sent to the admin email."
                />
            </section>
            <section className='contact-form-area' data-aos="fade-up" data-aos-duration="2000">
                <ContactForm />
            </section>
            <Footer />
        </>
    );
};

export default Contactus;