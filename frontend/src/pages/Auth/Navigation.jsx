import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/auth/authSlice";
import {
    AiOutlineHome,
    AiOutlineShoppingCart,
    AiOutlineShopping,
    AiOutlineMenu,
    AiOutlineClose,
    AiOutlineSearch
} from "react-icons/ai";
import { FaHeart, FaUser, FaShoppingBag } from "react-icons/fa";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";

const Navigation = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const { userInfo } = useSelector((state) => state.auth);
    const { cartItems = [] } = useSelector((state) => state.cart);
    const favoriteItems = useSelector((state) => state.favorites) || [];

    const [logoutApiCall] = useLogoutMutation();

    const handleLogout = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate("/login");
            setShowDropdown(false);
            setShowMobileMenu(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/shop?search=${searchQuery}`);
            setSearchQuery("");
            setShowMobileMenu(false);
        }
    };

    const navigateTo = (path) => {
        navigate(path);
        setShowMobileMenu(false);
    };

    return (
        <>
            {/* Top Navigation Bar */}
            <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-gray-900 via-gray-800 to-black shadow-lg z-[9999] border-b border-pink-500/20">
                <div className="flex items-center justify-between px-4 md:px-8 py-3">

                    {/* Logo Section */}
                    <div
                        onClick={() => navigateTo("/")}
                        className="flex items-center gap-2 cursor-pointer group"
                    >
                        <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-2 rounded-lg group-hover:shadow-lg group-hover:shadow-pink-500/50 transition-all">
                            <FaShoppingBag size={24} className="text-white" />
                        </div>
                        <span className="hidden sm:block text-white font-bold text-lg md:text-xl group-hover:text-pink-400 transition-all">
                            ShopHub
                        </span>
                    </div>

                    {/* Desktop Search Bar */}
                    <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-lg mx-6">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-2.5 bg-gray-700 text-white text-sm rounded-l-lg focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-gray-400 transition-all border-0"
                        />
                        <button
                            type="submit"
                            className="bg-gray-700 hover:bg-gray-600 px-5 py-2.5 rounded-r-lg text-gray-300 hover:text-white transition-all flex items-center justify-center border-0"
                        >
                            <AiOutlineSearch size={20} />
                        </button>
                    </form>

                    {/* Desktop Navigation Links */}
                    <div className="hidden lg:flex items-center gap-8">
                        <button
                            onClick={() => navigateTo("/")}
                            className="flex items-center gap-1 text-white hover:text-pink-400 transition-all font-medium"
                        >
                            <AiOutlineHome size={20} />
                            <span>Home</span>
                        </button>
                        <button
                            onClick={() => navigateTo("/shop")}
                            className="flex items-center gap-1 text-white hover:text-pink-400 transition-all font-medium"
                        >
                            <AiOutlineShopping size={20} />
                            <span>Shop</span>
                        </button>
                    </div>

                    {/* Right Side Icons */}
                    <div className="flex items-center gap-4 md:gap-6">

                        {/* Favorites */}
                        <div className="relative group">
                            <button
                                onClick={() => navigateTo("/favorite")}
                                className="relative text-white hover:text-pink-400 transition-all"
                            >
                                <FaHeart size={20} />
                                {favoriteItems.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                        {favoriteItems.length}
                                    </span>
                                )}
                            </button>
                            <span className="hidden group-hover:block absolute -bottom-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                Favorites
                            </span>
                        </div>

                        {/* Cart */}
                        <div className="relative group">
                            <button
                                onClick={() => navigateTo("/cart")}
                                className="relative text-white hover:text-pink-400 transition-all"
                            >
                                <AiOutlineShoppingCart size={24} />
                                {cartItems.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                        {cartItems.reduce((a, c) => a + c.qty, 0)}
                                    </span>
                                )}
                            </button>
                            <span className="hidden group-hover:block absolute -bottom-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                Cart
                            </span>
                        </div>

                        {/* User Menu */}
                        {userInfo ? (
                            <div className="relative">
                                <button
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all border border-gray-700 hover:border-pink-500"
                                >
                                    <FaUser size={16} />
                                    <span className="hidden sm:block text-sm font-medium truncate max-w-[100px]">
                                        {userInfo.username}
                                    </span>
                                </button>

                                {/* User Dropdown Menu */}
                                {showDropdown && (
                                    <div className="absolute right-0 mt-2 bg-gray-800 rounded-lg shadow-xl border border-gray-700 py-2 z-50 min-w-max">
                                        <button
                                            onClick={() => {
                                                navigateTo("/profile");
                                                setShowDropdown(false);
                                            }}
                                            className="block w-full text-left px-4 py-2 text-white text-sm hover:bg-pink-500 hover:text-white transition-all"
                                        >
                                            👤 Profile
                                        </button>
                                        <button
                                            onClick={() => {
                                                navigateTo("/user-orders");
                                                setShowDropdown(false);
                                            }}
                                            className="block w-full text-left px-4 py-2 text-white text-sm hover:bg-pink-500 hover:text-white transition-all"
                                        >
                                            📦 Orders
                                        </button>

                                        {userInfo.isAdmin && (
                                            <>
                                                <hr className="my-2 border-gray-600" />
                                                <button
                                                    onClick={() => {
                                                        navigateTo("/admin/dashboard");
                                                        setShowDropdown(false);
                                                    }}
                                                    className="block w-full text-left px-4 py-2 text-white text-sm hover:bg-pink-500 hover:text-white transition-all"
                                                >
                                                    ⚙️ Admin Dashboard
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        navigateTo("/admin/productlist");
                                                        setShowDropdown(false);
                                                    }}
                                                    className="block w-full text-left px-4 py-2 text-white text-sm hover:bg-pink-500 hover:text-white transition-all"
                                                >
                                                    📦 Products
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        navigateTo("/admin/categorylist");
                                                        setShowDropdown(false);
                                                    }}
                                                    className="block w-full text-left px-4 py-2 text-white text-sm hover:bg-pink-500 hover:text-white transition-all"
                                                >
                                                    🏷️ Categories
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        navigateTo("/admin/orderlist");
                                                        setShowDropdown(false);
                                                    }}
                                                    className="block w-full text-left px-4 py-2 text-white text-sm hover:bg-pink-500 hover:text-white transition-all"
                                                >
                                                    📋 Orders
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        navigateTo("/admin/userlist");
                                                        setShowDropdown(false);
                                                    }}
                                                    className="block w-full text-left px-4 py-2 text-white text-sm hover:bg-pink-500 hover:text-white transition-all"
                                                >
                                                    👥 Users
                                                </button>
                                            </>
                                        )}

                                        <hr className="my-2 border-gray-600" />
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-white text-sm hover:bg-pink-500 hover:text-white transition-all"
                                        >
                                            🚪 Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={() => navigateTo("/login")}
                                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-all font-medium"
                            >
                                <FaUser size={16} />
                                <span>Login</span>
                            </button>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                            className="lg:hidden text-white hover:text-pink-400 transition-all"
                        >
                            {showMobileMenu ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {showMobileMenu && (
                    <div className="lg:hidden bg-gray-800 border-t border-pink-500/20 px-4 py-4 space-y-3">

                        {/* Mobile Search */}
                        <form onSubmit={handleSearch} className="flex gap-2 mb-4">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 px-3 py-2 bg-gray-700 text-white rounded text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                            />
                            <button
                                type="submit"
                                className="bg-pink-500 hover:bg-pink-600 px-3 py-2 rounded text-white transition-all"
                            >
                                <AiOutlineSearch size={16} />
                            </button>
                        </form>

                        {/* Mobile Navigation Links */}
                        <button
                            onClick={() => navigateTo("/")}
                            className="flex items-center gap-2 w-full px-4 py-2 text-white hover:bg-gray-700 rounded transition-all"
                        >
                            <AiOutlineHome size={20} />
                            <span>Home</span>
                        </button>
                        <button
                            onClick={() => navigateTo("/shop")}
                            className="flex items-center gap-2 w-full px-4 py-2 text-white hover:bg-gray-700 rounded transition-all"
                        >
                            <AiOutlineShopping size={20} />
                            <span>Shop</span>
                        </button>

                        {/* Mobile User Menu */}
                        {!userInfo && (
                            <button
                                onClick={() => navigateTo("/login")}
                                className="flex items-center gap-2 w-full px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded transition-all font-medium"
                            >
                                <FaUser size={16} />
                                <span>Login</span>
                            </button>
                        )}
                    </div>
                )}
            </nav>

            {/* Spacer to account for fixed navbar */}
            <div className="h-[64px] md:h-[72px]"></div>
        </>
    );
};

export default Navigation;
