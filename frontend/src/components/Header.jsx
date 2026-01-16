import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
    const { data, isLoading, error } = useGetTopProductsQuery();

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <h1>ERROR</h1>;
    }

    return (
        <>
            <div className="flex flex-col lg:flex-row justify-between gap-6 p-4 lg:p-8">
                {/* Featured Products Grid - Desktop Only */}
                <div className="hidden xl:block lg:hidden w-full lg:w-1/4">
                    <div className="sticky top-24">
                        <h3 className="text-white font-bold text-lg mb-4">Featured Products</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {data.slice(0, 4).map((product) => (
                                <div key={product._id}>
                                    <SmallProduct product={product} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Carousel - Full Width on Mobile/Tablet */}
                <div className="w-full lg:w-3/4">
                    <ProductCarousel />
                </div>
            </div>
        </>
    );
};

export default Header;
