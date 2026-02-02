import { useNavigate } from "react-router-dom";

const StripeSuccessPage = () => {
  const navigate = useNavigate();

  const btnNavigate = () => {
    navigate("/order-confirmation");
  };

  return (
    <div className="flex  flex-col justify-center items-center w-full my-20">
      <h1 className="text-md text-center font-bold">
        You have successfully purchased the item!!!
      </h1>
      <span className="py-4">
        Kindly view orders in our order confirmation page using the link below
      </span>
      <button
        onClick={() => btnNavigate()}
        className="border-green-600 text-white bg-green-600 p-2 cursor-pointer rounded-md"
      >
        Order confirmation
      </button>
    </div>
  );
};

export default StripeSuccessPage;
