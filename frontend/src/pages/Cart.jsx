import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const addToCartHandler = (product, qty) => {
        dispatch(addToCart({ ...product, qty }));
    };

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        navigate("/login?redirect=/shipping");
    };

    const totalPrice = cartItems
        .reduce((acc, item) => acc + item.qty * item.price, 0)
        .toFixed(2);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-12">
                    Shopping Cart
                </h1>

                {cartItems.length === 0 ? (
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-12 text-center">
                        <p className="text-gray-400 text-xl mb-6">Your cart is empty</p>
                        <Link
                            to="/shop"
                            className="inline-block bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2">
                            <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
                                {cartItems.map((item, index) => (
                                    <div
                                        key={item._id}
                                        className={`flex gap-6 p-6 ${
                                            index !== cartItems.length - 1
                                                ? "border-b border-gray-700"
                                                : ""
                                        }`}
                                    >
                                        {/* Product Image */}
                                        <div className="w-24 h-24 flex-shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex-1">
                                            <Link
                                                to={`/product/${item._id}`}
                                                className="text-pink-500 hover:text-pink-400 font-semibold text-lg transition-colors"
                                            >
                                                {item.name}
                                            </Link>
                                            <p className="text-gray-400 mt-1">{item.brand}</p>
                                            <p className="text-white font-bold text-lg mt-2">
                                                ${item.price}
                                            </p>
                                        </div>

                                        {/* Quantity Selector */}
                                        <div className="flex flex-col items-center gap-3">
                                            <select
                                                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-pink-500 transition-colors"
                                                value={item.qty}
                                                onChange={(e) =>
                                                    addToCartHandler(item, Number(e.target.value))
                                                }
                                            >
                                                {[...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </select>

                                            {/* Remove Button */}
                                            <button
                                                className="text-red-500 hover:text-red-400 transition-colors"
                                                onClick={() => removeFromCartHandler(item._id)}
                                                title="Remove from cart"
                                            >
                                                <FaTrash size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Checkout Summary */}
                        <div className="h-fit">
                            <div className="bg-gradient-to-br from-pink-500/10 to-pink-600/10 border border-pink-500/30 rounded-lg p-8">
                                <h2 className="text-2xl font-bold text-white mb-6">
                                    Order Summary
                                </h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-400">
                                        <span>Items</span>
                                        <span>({cartItems.reduce((acc, item) => acc + item.qty, 0)})</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400">
                                        <span>Subtotal</span>
                                        <span>${totalPrice}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400 border-b border-gray-700 pb-4">
                                        <span>Shipping</span>
                                        <span>TBD</span>
                                    </div>
                                </div>

                                <div className="flex justify-between text-white text-lg font-bold mb-8">
                                    <span>Total</span>
                                    <span>${totalPrice}</span>
                                </div>

                                <button
                                    className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold py-3 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                    disabled={cartItems.length === 0}
                                    onClick={checkoutHandler}
                                >
                                    Proceed to Checkout
                                </button>

                                <Link
                                    to="/shop"
                                    className="block text-center mt-4 text-pink-500 hover:text-pink-400 transition-colors"
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
