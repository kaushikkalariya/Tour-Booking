/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alerts';


const stripe = Stripe('pk_test_51I5vuQCnoMv3rCsnPtpJnWprgTPRt7B9q5EBxba4k0LVUCWvXYA4nP8VZfl1yoX3aYkfhrOR276l4wD1pwMNgbYl005pt5uQ6x');

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
