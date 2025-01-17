
import { useMutation } from '@apollo/client';
import { CREATE_CHECKOUT_SESSION } from '../../utils/mutations';
import AuthService from '../../utils/auth';

const MakePurchaseButton = ({ productId }) => {
  const [createCheckoutSession, { data, loading, error }] = useMutation(CREATE_CHECKOUT_SESSION, {
    context: {
      headers: {
        authorization: `Bearer ${AuthService.getToken()}`,
      },
    },
    onCompleted: (data) => {
      if (data.createCheckoutSession) {
        window.location.href = `https://checkout.stripe.com/pay/${data.createCheckoutSession.id}`;
      }
    },
  });

  const handlePurchase = () => {
    createCheckoutSession({ variables: { productID } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {AuthService.loggedIn() ? (
        <button onClick={handlePurchase}>Make Purchase</button>
      ) : (
        <p>Please log in to make a purchase.</p>
      )}
    </div>
  );
};

export default MakePurchaseButton;
