import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";

const Home = () => {
    const { keyword } = useParams();
    const { data, isLoading, isError } = useGetProductsQuery({ keyword });

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
            {!keyword ? <Header /> : null}

            {isLoading ? (
                <div className="flex items-center justify-center min-h-screen">
                    <Loader />
                </div>
            ) : isError ? (
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <Message variant="danger">
                        {isError?.data?.message || isError.error}
                    </Message>
                </div>
            ) : (
                <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
                    {/* Hero Section */}
                    <div className="mb-16">
                        <div className="relative bg-gradient-to-r from-pink-600 to-pink-500 rounded-2xl overflow-hidden p-8 md:p-12 text-white">
                            <div className="relative z-10">
                                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                                    Welcome to Our Store
                                </h2>
                                <p className="text-lg md:text-xl text-pink-100 mb-6 max-w-2xl">
                                    Discover our exclusive collection of premium products handpicked for you
                                </p>
                                <Link
                                    to="/shop"
                                    className="inline-block bg-white text-pink-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
                                >
                                    Explore All Products
                                </Link>
                            </div>
                            {/* Decorative Element */}
                            <div className="absolute top-0 right-0 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-0 animate-pulse"></div>
                        </div>
                    </div>

                    {/* Featured Section */}
                    {data?.products && data.products.length > 0 && (
                        <>
                            {/* Section Header */}
                            <div className="mb-12">
                                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                                    <div>
                                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                                            Featured Products
                                        </h1>
                                        <div className="h-1 w-20 bg-gradient-to-r from-pink-500 to-pink-600 rounded"></div>
                                        <p className="text-gray-400 mt-3 text-lg">
                                            Carefully curated items just for you
                                        </p>
                                    </div>
                                    <Link
                                        to="/shop"
                                        className="group inline-flex items-center gap-2 text-pink-500 hover:text-pink-400 font-semibold transition-colors"
                                    >
                                        View All
                                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                                    </Link>
                                </div>
                            </div>

                            {/* Products Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
                                {data.products.slice(0, 12).map((product) => (
                                    <div
                                        key={product._id}
                                        className="group transform transition-all duration-300 hover:scale-105 hover:-translate-y-2"
                                    >
                                        <div className="relative bg-gray-800 rounded-xl overflow-hidden border border-gray-700 group-hover:border-pink-500 transition-all duration-300 h-full flex flex-col">
                                            {/* Image Container */}
                                            <div className="relative overflow-hidden bg-gray-900 aspect-square">
                                                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                                                <Product product={product} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Section */}
                            <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 border border-gray-700 rounded-2xl p-8 md:p-12 text-center mb-8">
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                    Didn't find what you're looking for?
                                </h3>
                                <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                                    Browse our complete catalog with filters and sorting options to find the perfect product
                                </p>
                                <Link
                                    to="/shop"
                                    className="inline-block bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
                                >
                                    Shop Now
                                </Link>
                            </div>
                        </>
                    )}

                    {/* No Products State */}
                    {!data?.products || data.products.length === 0 ? (
                        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-12 text-center">
                            <p className="text-gray-400 text-xl mb-6">No products available at the moment</p>
                            <Link
                                to="/shop"
                                className="inline-block bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
                            >
                                View Shop
                            </Link>
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
};

export default Home;
