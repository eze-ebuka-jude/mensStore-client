import { RiDeleteBin3Line } from "react-icons/ri";

const CartContents = () => {
  const cartProducts = [
    {
      productId: 1,
      name: "T-Shirt",
      size: "M",
      color: "Red",
      quantity: 1,
      price: 15,
      image: "https://picsum.photos/200?random=1",
    },
    {
      productId: 2,
      name: "Jeans",
      size: "L",
      color: "Blue",
      quantity: 1,
      price: 15,
      image: "https://picsum.photos/200?random=2",
    },
  ];
  return (
    <>
      {cartProducts.map((prod, index) => (
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
                <button className="border rounded px-2 py-1 text-xl font-medium cursor-pointer">
                  -
                </button>
                <span className="mx-4">{prod.quantity}</span>
                <button className="border rounded px-2 py-1 text-xl font-medium cursor-pointer">
                  +
                </button>
              </div>
            </div>
          </div>

          <div>
            <p>$ {prod.price.toLocaleString()}</p>
            <button className="cursor-pointer">
              <RiDeleteBin3Line className="h-6 w-6 mt-2 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default CartContents;
