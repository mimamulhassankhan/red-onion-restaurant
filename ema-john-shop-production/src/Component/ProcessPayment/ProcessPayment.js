import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import PaymentCard from './PaymentCard';

const stripePromise = loadStripe('pk_test_51HadI3J6JIJmmHgl61TslmWB2Tq2VILwkCObBIaO3Y4mvIHWkDa4SvBSEgn9K3FbZsQfms1U89VHmJsnYKvcfQyF00UkikFDVR');

const ProcessPayment = ({handlePayment}) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentCard handlePayment={handlePayment} />
    </Elements>
  );
};

export default ProcessPayment;