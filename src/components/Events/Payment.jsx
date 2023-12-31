import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { stripePublic_Key } from "../../appwrite/appWriteConfig";
import { toast } from "react-toastify";
import "../../sass/Explore.scss";
import Loader from "../../Loader/Loader";
const Payment = () => {
  const [paymentMessage, setPaymentMessage] = useState("");
  const [stripeError, setStripeError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const location = useLocation();
  const eventDetails = location?.state?.eventDetails || {};
  const { id } = location?.state || {};
  console.log("current Id", id);
  const navigate = useNavigate();
  const {
    eventName,
    eventCategory,
    eventDate,
    eventImage,
    eventLocation,
    price,
    priceId,
  } = eventDetails;

  if (!eventDetails || !id) {
    // Handle the case when location.state is undefined
    return <div>Loading...</div>;
  }
  console.log("eventDetails:", eventDetails);
  console.log("id:", id);
  console.log("location.state in EventDetails:", location.state);

  let stripePromise;
  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(stripePublic_Key);
    }

    return stripePromise;
  };

  useEffect(() => {
    if (paymentMessage) {
      toast(paymentMessage);
    }
  }, [paymentMessage]);

  useEffect(() => {
    if (stripeError) {
      toast.error(stripeError);
    }
  }, [stripeError]);

  const item = {
    price: priceId, // Replace with your valid Stripe Price ID
    quantity: 1,
  };
  console.log(priceId);

  const checkoutOptions = {
    lineItems: [item],
    mode: "payment",
    successUrl: `${window.location.origin}/rsvp`,
    cancelUrl: `${window.location.origin}/cancel`,
  };

  const redirectToCheckOut = async () => {
    setLoading(true);

    try {
      const stripe = await getStripe();
      const { error } = await stripe.redirectToCheckout(checkoutOptions);

      if (error) {
        console.error("Stripe checkout error:", error);
        setStripeError("Stripe checkout error");
        setLoading(false);
      } else {
        // Display toast on successful payment
        toast.success("Payment successful!");
        setLoading(false); // Reset loading state on success

        // Navigate to the rsvp component with event details
        navigate(`/rsvp/${id}`);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      setStripeError("Error during checkout");
      setLoading(false);
    }
  };
  // if (stripeError) alert(stripeError);

  return (
    <div className="checkout">
      <div className="checkout_card">
        <h2>Payment Details</h2>
        <img src={eventImage} alt="" className="event_img" />
        <p>Event Name: {eventName}</p>
        <p>Event Category: {eventCategory}</p>
        <p>Event Location: {eventLocation}</p>
        <p>Event Date: {eventDate}</p>
        <p>Price: {`NGN ${price}`}</p>
        <button
          onClick={redirectToCheckOut}
          disabled={isLoading}
          className="btn"
        >
          <p className="text">{isLoading ? "Loading... " : "Pay Now"}</p>
        </button>
      </div>
    </div>
  );
};

export default Payment;
