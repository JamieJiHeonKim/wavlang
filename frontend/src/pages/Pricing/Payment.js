import { React, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import './Payment.scss';
import axios from 'axios';
import { useSelector } from 'react-redux';
// import { url } from '../../slices/api';

const Payment = () => {    
    // Task 2: Buttons on Pricing page should direct the user to Login page.
    // If already logged in, take the user to the payment page.
    // Restrict users from sharing accounts, as this could financially hurt me

    const handleCheckout = () => {
        console.log("check out button clicked!");
    }

    return (
        <section className='pricing-section'>
            <div className='pricing-title'>
                <div className="container">
                    <h2>Make Payment</h2>
                    <p>Complete the payment and you are set!</p>
                </div>
                <br />
                <br />
                <div className="pricingtable-row" data-aos="fade-up" data-aos-duration="1500">
                    <button type="submit" className="btn appointment-btn" onClick={() => handleCheckout()}>
                        Check Out
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Payment;