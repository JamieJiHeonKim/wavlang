import { React , useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import './Payment.scss';

const CARD_OPTIONS = {
    iconStyle: 'solid',
    style: {
        base: {
            iconColor: '#c4f0ff',
            color: '#000',
            fontWeight: 500,
            fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
            fontSize: '16px',
            fontSmoothing: 'antialiased',
            ':-webkit-autofill': { color: '#fce883' },
            '::placeholder': { color: '#87bbfd' },
        },
        invalid: {
            iconColor: '#ffc7ee',
            color: '#ffc7ee',
        },
    },
};

const Payment = ({ clientSecret, planDetails }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [billingDetails, setBillingDetails] = useState({
        name: '',
        email: '',
        address: {
            line1: '',
            city: '',
            state: '',
            postal_code: ''
        },
        phone: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBillingDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js has not yet loaded, or there's an issue with your Stripe elements
            console.error('Stripe.js has not loaded yet!');
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: billingDetails,
        });

        if (error) {
            console.error('[error]', error);
            return;
        }

        console.log('[PaymentMethod]', paymentMethod);

        // After creating the payment method, you can confirm the paymentIntent
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethod.id,
        });

        if (result.error) {
            // Show error to your customer (e.g., payment details could not be verified)
            console.error('[payment error]', result.error.message);
        } else {
            // The payment has been processed!
            if (result.paymentIntent.status === 'succeeded') {
                // Show a success message to your customer
                console.log('Payment succeeded!');
                // Here you might want to navigate the user to a success page or update the UI state
            }
        }
    };

    const isPayAsYouGo = (planName) => {
        if (planName == 'Pay As You Go') {
            return true;
        } else {
            return false;
        }
    }

    return (
        <section className='payment-section'>
            <div className='modal-body'>
                {/* Plan details section */}
                <div className='plan-details'>
                    {
                        isPayAsYouGo(planDetails?.name) ? (
                            <>
                                <h2>{planDetails?.name}</h2>
                                <p>Cost: $0.10/min of the audio file</p>
                                <a>Minimum charged accepted is <p>$0.50</p></a> 
                            </>
                            ) : (
                            <>
                                <h2>{planDetails?.name}</h2>
                                <p>Cost: ${planDetails?.price.toFixed(2)}</p>
                            </>
                            )                            
                    }
                    
                    <ul>
                        {planDetails?.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                        ))}
                    </ul>
                    <p>Recurrence: {planDetails?.recurrence}</p>
                </div>

                {/* Divider */}
                <div className="divider"></div>

                {/* Payment form section */}
                <div className='payment-details'>
                <h2>Make Payment</h2>
                <p style={{ paddingBottom: '10px' }}>Complete the payment and you are set!</p>
                <form onSubmit={handleSubmit} className="payment-form">
                    <input type="text" name="name" placeholder="Name" required onChange={handleInputChange} />
                    <input type="email" name="email" placeholder="Email" required onChange={handleInputChange} />
                    <input type="text" name="address.line1" placeholder="Address" required onChange={handleInputChange} />
                    <input type="text" name="address.city" placeholder="City" required onChange={handleInputChange} />
                    <input type="text" name="address.state" placeholder="State" required onChange={handleInputChange} />
                    <input type="text" name="address.postal_code" placeholder="Postal Code" required onChange={handleInputChange} />
                    <input type="tel" name="phone" placeholder="Phone" required onChange={handleInputChange} />
                    <CardElement options={CARD_OPTIONS} />
                    <button type="submit" disabled={!stripe || !clientSecret} className="payment-button">
                    Pay
                    </button>
                </form>
                </div>
            </div>
        </section>
    )
};

export default Payment;
