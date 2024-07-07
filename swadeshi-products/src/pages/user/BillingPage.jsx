import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import getUser from '../../utils/getUser';
import { updateUserApi } from '../../apis/Api';


const BillingPage = () => {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('Nepal');
    const [selectedState, setSelectedState] = useState('Kathmandu');
    const [states, setStates] = useState(['Kathmandu', 'Pokhara', 'Chitwan']);
    const {subtotal} = useParams();
    const fetchedUser = getUser();

    const [user, setUser] = useState({
        address: fetchedUser.address,
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleStateChange = (event) => {
        setSelectedState(event.target.value);
    };

    const handleCountryChange = (event) => {
        const country = event.target.value;
        setSelectedCountry(country);
        setStates(countryStates[country]);
        setSelectedState(countryStates[country][0]); // Reset state when country changes
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("address", user.address);

        try {
            const res = await updateUserApi(user.id, formData);
            if (res.data.success) {
                toast.success("Address updated successfully!");
                navigate("/billing-page");
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to update profile. Internal Server Error!");
        }
    };

    // Dictionary of states by country
    const countryStates = {
        Nepal: ['Kathmandu', 'Pokhara', 'Chitwan'],
        India: ['Mumbai', 'Delhi', 'Bangalore'],
        USA: ['California', 'Texas', 'New York'],
        China: ['Beijing', 'Shanghai', 'Chengdu'],
        UnitedKingdom: ['England', 'Scotland', 'Wales']
    };

    return (
        <div className="flex justify-center items-center p-10 bg-gray-100 mt-14">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
                <h1 className="text-xl font-bold mb-8">Billing Page</h1>
                <div className="grid grid-cols-2 gap-10">
                    <div>
                        <div className="mb-6">
                            <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900">Choose Country</label>
                            <select id="country" value={selectedCountry} onChange={handleCountryChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                <option value="Nepal">Nepal</option>
                                <option value="India">India</option>
                                <option value="USA">USA</option>
                                <option value="China">China</option>
                                <option value="UnitedKingdom">United Kingdom</option>
                            </select>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900">Choose State or Province</label>
                            <select id="state" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                {states.map((state) => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="address"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Address
                            </label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={user.address}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div className="mb-6">
                            <fieldset>
                                <legend className="text-base font-medium text-gray-900">Payment Method</legend>
                                <div className="mt-4 space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            id="khalti"
                                            name="paymentMethod"
                                            type="radio"
                                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                                            checked={paymentMethod === 'Khalti'}
                                            onChange={() => setPaymentMethod('Khalti')}
                                        />
                                        <label htmlFor="khalti" className="ml-3 block text-sm font-medium text-gray-700">
                                            Khalti
                                        </label>
                                    </div>
                                    {paymentMethod === 'Khalti' && (
                                        <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200 flex flex-col items-center">
                                            <p className="text-sm font-medium text-gray-900 mb-3">
                                                After scanning the QR please verify your details in the next page
                                            </p>
                                            <img src="../assets/images/qr.jpg" alt="Khalti QR Code" className="w-40 h-40 mb-3" />
                                        </div>
                                    )}
                                    <div className="flex items-center">
                                        <input
                                            id="cash"
                                            name="paymentMethod"
                                            type="radio"
                                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                                            checked={paymentMethod === 'Cash on Delivery'}
                                            onChange={() => setPaymentMethod('Cash on Delivery')}
                                        />
                                        <label htmlFor="cash" className="ml-3 block text-sm font-medium text-gray-700">
                                            Cash On Delivery (Extra Rs. 100 will be added)
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                    {/* Order Summary Section */}
                    <div>
                        <h2 className="text-lg font-bold mb-8">ORDER SUMMARY</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-700">Shipping Country</h3>
                                <p className="text-sm text-gray-500">{selectedCountry}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-700">Shipping State or Province</h3>
                                <p className="text-sm text-gray-500">{selectedState}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-700">Delivery Address</h3>
                                <p className="text-sm text-gray-500">{user.address}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-700">Payment Method</h3>
                                <p className="text-sm text-gray-500">{paymentMethod}</p>
                            </div>
                            <div className="pt-4">
                                <h3 className="text-sm font-bold text-gray-900">Total</h3>
                                {/* Assuming total is static for demonstration */}
                                <p className="text-sm text-gray-900">Rs {subtotal}</p>
                            </div>
                            <button className="mt-4 w-full bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-800">
                                Confirm Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BillingPage;