import React, { useState, useEffect } from 'react';
import { createProductApi, deleteProductApi, getAllProductsApi } from '../../apis/Api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const AdminDashboard = () => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        getAllProductsApi().then((res) => {
            setProducts(res.data.products);
        });
    }, []);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setProductImage(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('productPrice', productPrice);
        formData.append('productDescription', productDescription);
        formData.append('productCategory', productCategory);
        formData.append('productQuantity', productQuantity);
        formData.append('productImage', productImage);

        createProductApi(formData)
            .then((res) => {
                if (res.data.success === false) {
                    toast.error(res.data.message);
                } else {
                    toast.success(res.data.message);
                    window.location.reload(); // Refresh to show new product
                }
            })
            .catch((err) => {
                toast.error('Internal Server Error!');
            });
    };

    const handleDelete = (id) => {
        const confirm = window.confirm("Are you sure you want to delete this product?");
        if (!confirm) return;

        deleteProductApi(id).then((res) => {
            if (res.data.success === false) {
                toast.error(res.data.message);
            } else {
                toast.success(res.data.message);
                setProducts(products.filter(product => product._id !== id));
            }
        });
    };

    const filteredProducts = products.filter(product =>
        product.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 col-lg-2">
                        <Sidebar />
                    </div>
                    <div className="col-md-9 col-lg-10">
                        <div className="row">
                            <div className="col">
                                <h3 style={{ marginTop: 20 }}>Products</h3>
                                <p>Manage the list of products.</p>

                                <div className="d-flex justify-content-center">
                                    <div className="input-group mb-3 mx-auto" style={{ maxWidth: "700px" }}>
                                        <span className="input-group-text">
                                            <FontAwesomeIcon icon={faSearch} />
                                        </span>
                                        <input
                                            type="text"
                                            placeholder="Search by Name"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="form-control"
                                        />
                                    </div>
                                </div>

                                <button type="button" className="btn btn-danger mb-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Add Product
                                </button>

                                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="exampleModalLabel">Create a new product!</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <label>Product Name</label>
                                                <input onChange={(e) => setProductName(e.target.value)} className='form-control mb-2' type="text" placeholder='Enter product name' />

                                                <label>Product Description</label>
                                                <textarea onChange={(e) => setProductDescription(e.target.value)} className='form-control mb-2' placeholder="Enter description" cols="4" rows="4"></textarea>

                                                <label>Price</label>
                                                <input onChange={(e) => setProductPrice(e.target.value)} type="number" className='form-control mb-2' placeholder='Enter your price' />

                                                <label>Select category</label>
                                                <select onChange={(e) => setProductCategory(e.target.value)} className='form-control mb-2'>
                                                    <option value="Hemp">Hemp Products</option>
                                                    <option value="Singing Bowl">Singing Bowl</option>
                                                    <option value="Pottery">Pottery</option>
                                                    <option value="Bamboo Products">Bamboo Products</option>
                                                    <option value="Pashmina Shawl">Pashmina Shawl</option>
                                                    <option value="Dhaka Products">Dhaka Products</option>
                                                    <option value="Khukuri">Khukuri</option>
                                                    <option value="Thanka Paintings">Thanka Paintings</option>
                                                    <option value="Jwelleries">Jwelleries</option>
                                                </select>

                                                <label>Product Quantity</label>
                                                <input onChange={(e) => setProductQuantity(e.target.value)} type="number" className='form-control mb-2' placeholder='Enter total quantity' />

                                                <label>Product Image</label>
                                                <input onChange={handleImageUpload} type="file" className='form-control' />

                                                {previewImage && <img src={previewImage} className='img-fluid rounded object-cover mt-2' alt="Product Preview" />}
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button onClick={handleSubmit} type="button" className="btn btn-primary">Save changes</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <table className='table mt-2'>
                                <thead className='table-dark'>
                                    <tr>
                                        <th>Product Image</th>
                                        <th>Product Name</th>
                                        <th>Product Price</th>
                                        <th>Product Category</th>
                                        <th>Product Description</th>
                                        <th>Product Quantity</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProducts.map((item) => (
                                        <tr key={item._id}>
                                            <td>
                                                <img src={item.productImageUrl} height={40} width={40} alt="Product" />
                                            </td>
                                            <td>{item.productName}</td>
                                            <td>NPR.{item.productPrice}</td>
                                            <td>{item.productCategory}</td>
                                            <td>{item.productDescription.slice(0, 10)}...</td>
                                            <td>{item.productQuantity}</td>
                                            <td>
                                                <div className="btn-group" role="group" aria-label="Basic example">
                                                    <Link to={`/admin/edit/${item._id}`} type="button" className="btn btn-success">Edit</Link>
                                                    <button onClick={() => handleDelete(item._id)} type="button" className="btn btn-danger">Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminDashboard;
