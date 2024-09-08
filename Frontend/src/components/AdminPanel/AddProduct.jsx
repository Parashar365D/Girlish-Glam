import React, { useState } from 'react';
import UploadImg from '../../assets/uploadImg.jpg';

function AddProduct() {
    const [showImg, setShowImg] = useState(null);
    const [productDetail, setProductDetail] = useState({
        title: "",
        category: "",
        description: "",
        oldprice: "",
        newprice: "",
        image: null
    });

    const API = import.meta.env.VITE_URI;

    const viewImg = (e) => {
        const file = e.target.files[0];
        if (file) {
            setShowImg(file);
            setProductDetail({ ...productDetail, image: file });
        }
    };

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setProductDetail({ ...productDetail, [name]: value });
    };

    const addProduct = async (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append('product', productDetail.image);

        try {
            const uploadResponse = await fetch(`${API}/product/upload`, {
                method: 'POST',
                body: formData,
            });

            const uploadResult = await uploadResponse.json();

            if (uploadResult.success) {
                const product = { ...productDetail, image: uploadResult.image_url };

                const productResponse = await fetch(`${API}/product/addproduct`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(product),
                });

                const productResult = await productResponse.json();

                if (productResult.success) {
                    alert('Product added successfully:', productResult);
                    setProductDetail({
                        title: "",
                        category: "",
                        description: "",
                        oldprice: "",
                        newprice: "",
                        image: null
                    });
                    setShowImg(null);
                } else {
                    console.error('Error adding product:', productResult.message);
                }
            } else {
                console.error('Error uploading image:', uploadResult.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-extralight mb-4">Add Product</h2>
            <form onSubmit={addProduct}>
                <div className="flex flex-wrap gap-6">
                    <div className="flex flex-col w-full md:w-1/2 px-3 mb-4">
                        <label className="text-lg font-extralight cursor-pointer text-black mb-1" htmlFor="title">Title</label>
                        <input className="border rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" id="title" name="title" value={productDetail.title} onChange={changeHandler} required />
                    </div>
                    <div className="flex flex-col w-full md:w-1/2 px-3 mb-4">
                        <label className="text-lg font-extralight cursor-pointer text-black mb-1" htmlFor="category">Category</label>
                        <select className="border rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" name="category" value={productDetail.category} onChange={changeHandler} id="category" required>
                            <option value="">Select Category</option>
                            <option value="Skin Care">Skin Care</option>
                            <option value="Makeup">Makeup</option>
                            <option value="Hair Care">Hair Care</option>
                            <option value="Body Care">Body Care</option>
                            <option value="Fragrance">Fragrance</option>
                        </select>
                    </div>
                    <div className="flex flex-col w-full md:w-1/2 px-3 mb-4">
                        <label className="text-lg font-extralight cursor-pointer text-black mb-1" htmlFor="description">Description</label>
                        <textarea className="border rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" name="description" value={productDetail.description} onChange={changeHandler} id="description" required rows="4" />
                    </div>
                    <div className="flex flex-col w-full md:w-1/2 px-3 mb-4">
                        <label className="text-lg font-extralight cursor-pointer text-black mb-1" htmlFor="oldprice">Old Price</label>
                        <input className="border rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" type="number" name="oldprice" value={productDetail.oldprice} onChange={changeHandler} id="oldprice" required />
                    </div>
                    <div className="flex flex-col w-full md:w-1/2 px-3 mb-4">
                        <label className="text-lg font-extralight cursor-pointer text-black mb-1" htmlFor="newprice">New Price</label>
                        <input className="border rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" type="number" name="newprice" value={productDetail.newprice} onChange={changeHandler} id="newprice" required />
                    </div>
                    <div className="flex flex-col w-full md:w-1/2 px-3 mb-4 ">
                        <label className="w-56 text-lg font-extralight cursor-pointer text-black mb-1" htmlFor="image">
                            <img className='w-56 rounded-md' src={showImg ? URL.createObjectURL(showImg) : UploadImg} alt="upload img" />
                        </label>
                        <input className="border rounded-md px-2 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" type="file" name="image" onChange={viewImg} id="image" hidden required />
                    </div>
                </div>
                <button type="submit" className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-500 transition-colors">Add Product</button>
            </form>
        </div>
    );
}

export default AddProduct;
