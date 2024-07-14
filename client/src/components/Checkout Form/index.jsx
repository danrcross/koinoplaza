// src/components/CheckoutForm.jsx
import { useLazyQuery } from '@apollo/client';
import { CREATE_CHECKOUT_SESSION } from '../graphql/mutations';
import { useAuth } from '../context/AuthContext';

const CheckoutForm = ({ product }) => {
  const { isAuthenticated } = useAuth();
  const [createCheckoutSession, { data, loading, error }] = useLazyQuery(CREATE_CHECKOUT_SESSION, {
    onCompleted: (data) => {
      if (data.createCheckoutSession) {
        window.location.href = `https://checkout.stripe.com/pay/${data.createCheckoutSession.id}`;
      }
    },
  });

  const handleCheckout = () => {
    createCheckoutSession({ variables: { productId: product._id } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {isAuthenticated ? (  // ensure the user is logged in to make a purchase
        <button onClick={handleCheckout}>Checkout</button>
      ) : (
        <p>Please log in to proceed with the purchase.</p>
      )}
    </div>
  );
};

export default CheckoutForm;
