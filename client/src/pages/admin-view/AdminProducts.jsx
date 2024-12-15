import React, { Fragment, useEffect, useState } from 'react';
import noImage from "../../assets/noImage.jpg";
import { useDispatch, useSelector } from 'react-redux';
import { addNewProduct, addProductImage, deleteProduct, fetchProduct, updateProduct } from '../../store/admin/product-slice';
import { Toast } from '../../components/ui';
import { Link } from 'react-router-dom';

const initialState = {
  title: "",
  category: "",
  description: "",
  price: "",
  salePrice: "",
  totalStock: "",
  image: "" || null
};

function AdminProducts() {

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showImg, setShowImg] = useState(null);
  const [formData, setFormData] = useState(initialState);
  const [selectImgUrl, setSelectImgUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const { productList, isLoading: productLoading } = useSelector((state) => state.adminProduct);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Add Product Modal
  const addModalHandler = () => {
    setAddModalOpen(!addModalOpen);
  };
  

  // Edit Product Modal
  const editModalHandler = (product) => {
    setFormData({ ...product });
    setEditModalOpen(!editModalOpen);
  };

  // Delete Product Modal
  const deleteModalHandler = (id) => {
    setSelectedProductId(id);
    setDeleteModalOpen(!deleteModalOpen);
  };

  // View Image in input box
  const viewImg = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setShowImg(URL.createObjectURL(file));
      setFormData({ ...formData, image: file });
    }
  };

  // Onchange handler
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  // Add Product Function
  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append("image", formData.image);
      const response = await dispatch(addProductImage(data)).unwrap();
      const imageUrl = response?.result?.secure_url;
      setSelectImgUrl(imageUrl);
      if (imageUrl) {
        const newProduct = await dispatch(addNewProduct({ ...formData, image: imageUrl })).unwrap();
        if (newProduct?.success) {
          Toast({ type: "success", message: "Product Added successfully" });
          setFormData(initialState);
          setShowImg(null);
          setAddModalOpen(false);
        } else {
          Toast({ type: "warn", message: "add failed" });
        }
      }
    } catch (error) {
      Toast({ type: "error", message: "An error occurred during submission." });
    } finally {
      setLoading(false);
      await dispatch(fetchProduct()).unwrap();
    }
  };

  // Edit Product Function
  const editProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await dispatch(updateProduct({id:formData._id, formData} )).unwrap();
      if (response?.success) {
        Toast({ type: "success", message: "Product updated successfully"});
        setFormData(initialState);
        setEditModalOpen(false);
      } else {
        Toast({ type: "warn", message: "Update failed." });
      }
    } catch (error) {
      Toast({ type: "error", message: "An error occurred during updating." });
    } finally {
      setLoading(false);
      await dispatch(fetchProduct()).unwrap();
    }
  };

  // Fetch All Product
  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch, user?.id]);

  // Delete Product Function
  const removeProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!selectedProductId) {
      console.error("No product selected for deletion!");
      return;
    }
    try {
      const response = await dispatch(deleteProduct(selectedProductId)).unwrap();
      Toast({ type: "success", message: response?.payload?.message });
      setSelectedProductId(null);
      setDeleteModalOpen(false);
    } catch (error) {
      Toast({ type: "error", message: "An error occurred during deleting." });
    } finally {
      await dispatch(fetchProduct()).unwrap();
      setLoading(false);
    }
  };


  return (
    <Fragment>
      {/* Add Product Modal here */}
      <div className="bg-gray-50 flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
        <button type="button" onClick={addModalHandler} className="mx-auto flex items-center justify-center text-black bg-orange-400 focus:ring-4 focus:ring-orange-200 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none">Add product</button>
      </div>

      {/* All Product in Table form here */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-300">
            <tr>
              <th scope="col" className="px-4 py-4 text-center">Product</th>
              <th scope="col" className="px-4 py-4 text-center">title</th>
              <th scope="col" className="px-4 py-3 text-center">Category</th>
              <th scope="col" className="px-4 py-3 text-center">Description</th>
              <th scope="col" className="px-4 py-3 text-center">Price</th>
              <th scope="col" className="px-4 py-3 text-center">Sale Price</th>
              <th scope="col" className="px-4 py-3 text-center">Total Stock</th>
              <th scope="col" className="px-10 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {productLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <tr key={index} className="animate-pulse odd:bg-white even:bg-gray-100 border-b">
                  <td className="px-4 py-3">
                    <div className="w-10 h-8 bg-gray-300 rounded"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="w-36 h-4 bg-gray-300 rounded"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="w-20 h-4 bg-gray-300 rounded"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="w-48 h-4 bg-gray-300 rounded"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="w-16 h-4 bg-gray-300 rounded"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="w-16 h-4 bg-gray-300 rounded"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="w-10 h-4 bg-gray-300 rounded"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gray-300 rounded"></div>
                      <div className="w-6 h-6 bg-gray-300 rounded"></div>
                      <div className="w-6 h-6 bg-gray-300 rounded"></div>
                    </div>
                  </td>
                </tr>))
            ) : (
              productList.map((product) => (<tr key={product.id} className="odd:bg-white even:bg-gray-100 border-b">
                <td scope="row" className="px-4 py-3 text-center font-medium text-gray-900 whitespace-nowrap">
                  <div className="flex items-center mr-3">
                    <img src={product.image || noImage} alt={product.title} className="h-8 w-auto" />
                  </div>
                </td>
                <td scope="row" className="px-4 py-3 text-center font-medium max-w-24 truncate text-gray-900 whitespace-nowrap">{product.title}</td>
                <td className="px-1 py-3 text-center"><span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">{product.category}</span></td>
                <td className="px-4 py-3 text-center max-w-[12rem] truncate">{product.description}</td>
                <td className="px-4 py-3 text-center">₹{product.price}</td>
                <td className="px-4 py-3 text-center">₹{product.salePrice}</td>
                <td className="px-4 py-3 text-center">{product.totalStock}</td>
                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                  <div className="flex items-center space-x-1">
                    <button type="button" className="py-1 px-1 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-orange-400 hover:bg-orange-500 focus:z-10 focus:ring-4 focus:ring-orange-200" onClick={() => editModalHandler(product)}>
                      <lord-icon src='https://cdn.lordicon.com/exymduqj.json' trigger="hover" stroke="regular" colors="primary:#000000,secondary:#00000"></lord-icon>
                    </button>
                    <Link type="button" to={`/product-view/${product._id}`} className="py-1 px-1 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-200">
                      <lord-icon src='https://cdn.lordicon.com/dicvhxpz.json' trigger="hover" stroke="regular" colors="primary:#000000,secondary:#00000"></lord-icon>
                    </Link>
                    <button type="button" className="flex items-center hover:text-white border border-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-1 py-1 text-center" onClick={() => deleteModalHandler(product.id)}>
                      <lord-icon src='https://cdn.lordicon.com/hwjcdycb.json' trigger="hover" stroke="regular" colors="primary:#000000,secondary:#000000"></lord-icon>
                    </button>
                  </div>
                </td>
              </tr>)))}
          </tbody>
        </table>
      </div>

      {/* Add Product Modal here */}
      {addModalOpen && (<div tabIndex={-1} className="overflow-y-auto fixed top-0 right-0 bg-opacity-60 bg-black left-0 z-50 w-full md:inset-0 h-full">
        <div className="relative p-4 w-full mx-auto max-w-3xl h-full md:h-auto">
          <div className="relative p-4 bg-gray-100 border border-gray-400 rounded-lg shadow sm:p-5">
            <div className="flex justify-between items-center rounded-t border-b sm:mb-5">
              <h3 className="text-lg font-semibold text-gray-900">Add Product</h3>
              <button type="button" className="text-gray-400 bg-transparent hover:bg-orange-400 hover:text-black rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" onClick={addModalHandler}>
                <lord-icon src='https://cdn.lordicon.com/rypcsrlk.json' trigger="hover" stroke="regular" colors="primary:#000000,secondary:#00000"></lord-icon>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form onSubmit={addProduct}>
              <div>
                <div className="grid gap-2 my-4 sm:grid-cols-3">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Product Name</label>
                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" name="title" value={formData.title} onChange={changeHandler} placeholder="Type product name" required />
                  </div>
                  <div>
                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                    <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" name="category" value={formData.category} onChange={changeHandler} required>
                      <option defaultValue="None">Select category</option>
                      <option value="Skin Care">Skin Care</option>
                      <option value="Makeup">Makeup</option>
                      <option value="Hair Care">Hair Care</option>
                      <option value="Body Care">Body Care</option>
                      <option value="Fragrance">Fragrance</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">Price</label>
                    <input type="number" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" name="price" value={formData.price} onChange={changeHandler} placeholder="₹3999" required />
                  </div>
                  <div>
                    <label htmlFor="salePrice" className="block mb-2 text-sm font-medium text-gray-900">Sale Price</label>
                    <input type="number" id="salePrice" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" name="salePrice" value={formData.salePrice} onChange={changeHandler} placeholder="₹2999" required />
                  </div>
                  <div>
                    <label htmlFor="totalStock" className="block mb-2 text-sm font-medium text-gray-900">Total Stock</label>
                    <input type="number" id="totalStock" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" name="totalStock" value={formData.totalStock} onChange={changeHandler} placeholder="10" required />
                  </div>
                </div>
                <div className="sm:col-span-2 "><label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                  <textarea id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" name="description" value={formData.description} onChange={changeHandler} placeholder="Write product description here" required />
                </div>
              </div>
              <div className="my-4">
                <span className="block mb-2 text-sm font-medium text-gray-900">Product Images</span>
                <div className="flex justify-center items-center w-full">
                  <label htmlFor="image" className="flex flex-col justify-center items-center w-full h-44 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer">
                    {showImg ? (<img src={showImg} className='w-full h-full object-contain' />) : ("Click to upload or drag & drop")}
                  </label>
                  <input type="file" className="hidden" name="image" onChange={viewImg} id="image" />
                </div>
              </div>
              <div className="items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded-lg" disabled={loading}>
                  {loading ? <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg> :
                    "Add Product"}</button>
                <button data-modal-toggle="createProductModal" type="button" className="w-full justify-center sm:w-auto text-gray-500 inline-flex items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10" onClick={addModalHandler}>
                  <svg className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Discard
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>)}

      {/* Edit Product Modal here */}
      {editModalOpen && (<div tabIndex={-1} className="overflow-y-auto fixed top-0 right-0 bg-opacity-60 bg-black left-0 z-50 w-full md:inset-0 h-full">
        <div className="relative p-4 w-full mx-auto max-w-3xl h-full md:h-auto">
          <div className="relative p-4 bg-gray-100 border border-gray-400 rounded-lg shadow sm:p-5">
            <div className="flex justify-between items-center rounded-t border-b sm:mb-5">
              <h3 className="text-lg font-semibold text-gray-900">Edit Product</h3>
              <button type="button" className="text-gray-400 bg-transparent hover:bg-orange-400 hover:text-black rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" onClick={editModalHandler}>
                <lord-icon src='https://cdn.lordicon.com/rypcsrlk.json' trigger="hover" stroke="regular" colors="primary:#000000,secondary:#00000"></lord-icon>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form onSubmit={editProduct}>
              <div>
                <div className="grid gap-2 my-4 sm:grid-cols-3">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Product Name</label>
                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" name="title" value={formData.title} onChange={changeHandler} placeholder="Type product name" required />
                  </div>
                  <div>
                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                    <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" name="category" value={formData.category} onChange={changeHandler} required>
                      <option defaultValue="None">Select category</option>
                      <option value="Skin Care">Skin Care</option>
                      <option value="Makeup">Makeup</option>
                      <option value="Hair Care">Hair Care</option>
                      <option value="Body Care">Body Care</option>
                      <option value="Fragrance">Fragrance</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">Price</label>
                    <input type="number" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" name="price" value={formData.price} onChange={changeHandler} placeholder="₹3999" required />
                  </div>
                  <div>
                    <label htmlFor="salePrice" className="block mb-2 text-sm font-medium text-gray-900">Sale Price</label>
                    <input type="number" id="salePrice" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" name="salePrice" value={formData.salePrice} onChange={changeHandler} placeholder="₹2999" required />
                  </div>
                  <div>
                    <label htmlFor="totalStock" className="block mb-2 text-sm font-medium text-gray-900">Total Stock</label>
                    <input type="number" id="totalStock" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" name="totalStock" value={formData.totalStock} onChange={changeHandler} placeholder="10" required />
                  </div>
                </div>
                <div className="sm:col-span-2 "><label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                  <textarea id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" name="description" value={formData.description} onChange={changeHandler} placeholder="Write product description here" required />
                </div>
              </div>
              <div className="my-4">
                <span className="block mb-2 text-sm font-medium text-gray-900">Product Images</span>
                <div className="flex justify-center items-center w-full">
                  <label htmlFor="image" className="flex flex-col justify-center items-center w-full h-44 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer">
                  {showImg ? (<img src={showImg} className='w-full h-full object-contain' />) : (<img src={formData.image} className='w-full h-full object-contain'/>)}
                  </label>
                  <input type="file" className="hidden" name="image" onChange={viewImg} id="image" />
                </div>
              </div>
              <div className="items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded-lg" disabled={loading}> {loading ? <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg> : "Update Product"}</button>
                <button data-modal-toggle="createProductModal" type="button" className="w-full justify-center sm:w-auto text-gray-500 inline-flex items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10" onClick={editModalHandler}>
                  <svg className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Discard
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>)}

      {/* Delete Product Modal here */}
      {deleteModalOpen && (<div tabIndex={-1} className="overflow-y-auto flex items-center fixed top-0 right-0 left-0 bg-opacity-60 bg-black z-50 w-full md:inset-0 h-full">
        <div className="relative p-4 w-full mx-auto max-w-md h-full md:h-auto">
          <div className="relative p-4 text-center bg-white rounded-lg shadow sm:p-5">
            <button type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="deleteModal" onClick={deleteModalHandler}>
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              <span className="sr-only">Close modal</span>
            </button>
            <svg className="text-gray-400 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
            <p className="mb-4 text-gray-500">Are you sure you want to delete this item?</p>
            <div className="flex justify-center items-center space-x-4">
              <button data-modal-toggle="deleteModal" type="button" className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10" onClick={deleteModalHandler}>No, cancel</button>
              <button type="submit" className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300" onClick={removeProduct}>Yes, I'm sure</button>
            </div>
          </div>
        </div>
      </div>)}

    </Fragment>
  );
};

export default AdminProducts;;