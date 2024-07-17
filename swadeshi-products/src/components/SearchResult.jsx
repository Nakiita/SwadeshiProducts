import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { searchApi, createCartApi } from "../apis/Api"; // Adjust the import path as needed
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
    const [results, setResults] = useState([]);
    const query = useQuery().get("query");
    const navigate = useNavigate();

    const handleCart = (productId, navigateAfter = false) => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user._id) {
            toast.error("Please log in to add items to the cart.");
            return;
        }
        const data = {
            userId: user._id,
            productId: productId,
            quantity: 1,
            status: "pending",
        };
        createCartApi(data)
            .then((res) => {
                if (!res.data.success) {
                    toast.error(res.data.message);
                } else {
                    toast.success("Product added to cart");
                    if (navigateAfter) {
                        navigate("/cart");
                    }
                }
            })
            .catch((err) => {
                toast.error("Server Error");
                console.error("Error adding to cart:", err);
            });
    };

    useEffect(() => {
        const fetchResults = async () => {
            if (query) {
                try {
                    const response = await searchApi(query);
                    if (response.data.success) {
                        setResults(response.data.data);
                    } else {
                        console.error("Error fetching search results:", response.data.message);
                    }
                } catch (error) {
                    console.error("Error fetching search results:", error);
                }
            }
        };

        fetchResults();
    }, [query]);

    const shortenProductName = (name) => {
        const maxLength = 25;
        return name.length > maxLength ? `${name.substring(0, maxLength)}...` : name;
    };

    return (
        <div className="container mt-24 ml-14">
            <div className="flex flex-col ml-12">
                <h3 className="text-2xl font-semibold mb-4">Search Results for "{query}"</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
                    {results.length > 0 ? (
                        results.map((product) => (
                            <div
                                className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden"
                                key={product._id}
                                onClick={() => navigate(`/product-description/${product._id}`)}
                            >
                                <img
                                    src={product.productImageUrls[0] || product.productImageUrls}
                                    alt={product.productName}
                                    className="h-72 object-cover w-full"
                                />
                                <div className="p-4">
                                    <h5 className="text-xl font-semibold mb-2 truncate">
                                        {shortenProductName(product.productName)}
                                    </h5>
                                    <div className="flex justify-between items-center">
                                        <p className="text-lg font-medium">
                                            Rs. {product.productPrice}
                                        </p>
                                        <div className="flex space-x-4">
                                            <FontAwesomeIcon
                                                icon={faShoppingCart}
                                                className="text-gray-600 cursor-pointer"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleCart(product._id);
                                                }}
                                            />
                                            <FontAwesomeIcon
                                                icon={faShoppingBag}
                                                className="text-gray-600 cursor-pointer"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleCart(product._id, true);
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">No results found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchResults;
