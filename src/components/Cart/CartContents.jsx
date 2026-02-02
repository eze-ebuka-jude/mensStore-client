import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  removeItemFromCart,
  updateCartItemQuantity,
} from "../../redux/slices/cartSlice";

const CartContents = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          size,
          color,
        })
      );
    }
  };

  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(removeItemFromCart({ productId, guestId, userId, size, color }));
  };

  return (
    <>
      {cart.products.map((prod, index) => (
        <div
          key={index}
          className="flex items-start justify-between py-4 border-b"
        >
          <div className="flex items-start">
            <img
              src={prod.image}
              alt={prod.name}
              className="w-20 h-24 object-over mr-4 rounded"
            />

            <div>
              <h3>{prod.name}</h3>
              <p className="text-sm text-gray-500">
                size: {prod.size} | color: {prod.color}
              </p>

              <div className="flex items-center mt-2">
                <button
                  onClick={() =>
                    handleAddToCart(
                      prod.productId,
                      -1,
                      prod.quantity,
                      prod.size,
                      prod.color
                    )
                  }
                  className="border rounded px-2 py-1 text-xl font-medium cursor-pointer"
                >
                  -
                </button>
                <span className="mx-4">{prod.quantity}</span>
                <button
                  onClick={() =>
                    handleAddToCart(
                      prod.productId,
                      1,
                      prod.quantity,
                      prod.size,
                      prod.color
                    )
                  }
                  className="border rounded px-2 py-1 text-xl font-medium cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div>
            <p>$ {prod.price.toLocaleString()}</p>
            <button
              onClick={() =>
                handleRemoveFromCart(prod.productId, prod.size, prod.color)
              }
              className="cursor-pointer"
            >
              <RiDeleteBin3Line className="h-6 w-6 mt-2 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default CartContents;
