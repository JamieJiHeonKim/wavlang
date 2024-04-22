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
    const [customAmount, setCustomAmount] = useState(100);
    const [billingDetails, setBillingDetails] = useState({
        name: '',
        email: '',
        address: {
            line1: '',
            city: '',
            state: '',
            postal_code: ''
        }
    });

    const handleCustomAmountChange = (e) => {
        const value = e.target.value;
        const intValue = Math.floor(parseFloat(value) * 100); // Convert dollars to cents
        if (!isNaN(intValue) && intValue >= 100) {
            setCustomAmount(intValue);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const amount = customAmount;

        if (name.includes('.')) {
            const parts = name.split('.');
            const [key, subkey] = parts;
    
            setBillingDetails((prevDetails) => ({
                ...prevDetails,
                [key]: { ...prevDetails[key], [subkey]: value }
            }));
        } else {
            setBillingDetails((prevDetails) => ({
                ...prevDetails,
                [name]: value
            }));
        }
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
            if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
                // Show a success message to your customer
                console.log('Payment succeeded!');
                // Here you might want to navigate the user to a success page or update the UI state
            }
        }
    };

    const isPayAsYouGo = (planName) => {
        if (planName === 'Pay As You Go') {
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
                    <a>Recurrence: <p>{planDetails?.recurrence}</p></a>
                    <a>Minimum charged accepted is <p>$1.00</p></a> 
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
                    <div className="input-container">
                        <span className='dollar-sign'>$</span>
                        <input
                            className='dollar-input'
                            type="number"
                            id="customAmount"
                            placeholder="Custom Amount (min $1.00)"
                            aria-label="Custome Amount"
                            value={(customAmount / 100).toFixed(2)}
                            min="1.00"
                            step="0.50"
                            onChange={handleCustomAmountChange}
                            required
                        />
                    </div>
                    <CardElement options={CARD_OPTIONS} />
                    <button type="submit" disabled={!stripe || !clientSecret} className="payment-button">
                        Pay ${customAmount / 100}
                    </button>
                </form>
                </div>
            </div>
        </section>
    )
};

export default Payment;
