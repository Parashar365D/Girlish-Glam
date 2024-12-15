import React, { Fragment, useEffect, useState } from 'react';
import accountImg from "../../assets/accountImg.png";
import { Link } from 'react-router-dom';
import { State, City } from "country-state-city";
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from '../../components/ui';
import { addAddress, fetchAddress, removeAddress, updateAddress } from '../../store/address-slice';
import { getAllOrders, getOrderDetails } from '../../store/order-slice';

const initialState = {
  name: "",
  address: "",
  landmark: "",
  phone: "",
  state: "",
  city: "",
  pincode: "",
  label: "Home",
  isDefault: false,
};

function Account() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [formData, setFormData] = useState(initialState);
  const [editInfo, setEditInfo] = useState(false);
  const [openModal, setOpenModal] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.address);
  const { orderList, orderDetails } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  // Handle tab switching
  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    if (tab === "address") {
      setFormData(initialState);
      setEditInfo(false);
    }
  };

  // Onchange value
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate Information
  const validateAddress = () => {
    const { name, address, landmark, phone, state, city, pincode } = formData;
    if (!name || !address || !landmark || !phone || !state || !city || !pincode) {
      Toast({ type: "warn", message: "All fields are required!" });
      return false;
    }
    if (!/^\d{6}$/.test(pincode)) {
      Toast({ type: "warn", message: "Invalid Pincode!" });
      return false;
    }
    if (!/^\d{10}$/.test(phone)) {
      Toast({ type: "warn", message: "Invalid Phone Number!" });
      return false;
    }
    return true;
  };

  // Adding Address
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!validateAddress()) return;
    try {
      const response = await dispatch(addAddress({ userId: user?.id, ...formData })).unwrap();
      if (response?.success) {
        Toast({ type: "success", message: "Address added successfully." });
        setFormData(initialState);
        handleTabSwitch("dashboard");
      } else {
        Toast({ type: "warn", message: "Failed to add address." });
      }
    } catch (error) {
      Toast({ type: "error", message: "An error occurred while adding the address." });
    } finally {
      if (user?.id) {
        await dispatch(fetchAddress(user.id)).unwrap();
      }
    }
  };

  // Update Address
  const handleEdit = async (e) => {
    e.preventDefault();
    if (!validateAddress()) return;
    const updatedData = { formData, addressId: formData._id, userId: formData.userId, };
    try {
      const response = await dispatch(updateAddress(updatedData)).unwrap();
      if (response.success) {
        Toast({ type: "success", message: "Address updated successfully." });
        setFormData(initialState);
        setEditInfo(false);
        handleTabSwitch("dashboard");
      } else {
        Toast({ type: "warn", message: "Failed to update address." });
      }
    } catch (error) {
      Toast({ type: "error", message: "An error occurred while updating the address." });
    } finally {
      if (user?.id) {
        await dispatch(fetchAddress(user.id)).unwrap();
      }
    }
  };

  // Delete Address
  const handleDelete = async (addressInfo) => {
    try {
      const response = await dispatch(removeAddress({ userId: addressInfo.userId, addressId: addressInfo._id })).unwrap();
      if (response?.success) {
        Toast({ type: "success", message: "Address remove successfully." });
      } else {
        Toast({ type: "warn", message: "Failed to remove address." });
      }
    } catch (error) {
      Toast({ type: "error", message: "An error occurred while removing the address." });
    } finally {
      if (user?.id) {
        await dispatch(fetchAddress(user.id)).unwrap();
      }
    }
  };


  useEffect(() => {
    if (user?.id) {
      dispatch(fetchAddress(user.id));
      dispatch(getAllOrders(user.id));
    }
  }, [dispatch, user?.id]);

  const toggleModal = async (orderId) => {
    setOpenModal((prev) => (prev === orderId ? null : orderId));
    await dispatch(getOrderDetails(orderId)).unwrap();
  };

  return (
    <Fragment>
      <section className='bg-gray-100 min-h-screen'>
        <div className='w-full md:h-60 h-24'>
          <img className='md:h-80 h-36 w-full' src={accountImg} alt="Account" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 w-fit md:gap-14 gap-2 mx-auto pb-10">
          <div className={`bg-white flex flex-col items-center justify-center md:w-52 w-40 md:h-32 h-28 rounded-xl hover:cursor-pointer ${activeTab === "dashboard" ? "border-2 border-black" : ""}`} onClick={() => handleTabSwitch("dashboard")}>
            <svg className="w-10 h-10 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 15v5m-3 0h6M4 11h16M5 15h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1Z" />
            </svg>
            <span className="font-medium text-base text-black">Dashboard</span>
          </div>

          <div className={`bg-white flex flex-col items-center justify-center md:w-52 w-40 md:h-32 h-28 rounded-xl hover:cursor-pointer ${activeTab === "address" ? "border-2 border-black" : ""}`} onClick={() => handleTabSwitch("address")}>
            <svg className="w-10 h-10 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M7 6H5m2 3H5m2 3H5m2 3H5m2 3H5m11-1a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2M7 3h11a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm8 7a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
            </svg>
            <span className="font-medium text-base text-black">Address</span>
          </div>

          <div className={`bg-white flex flex-col items-center justify-center md:w-52 w-40 md:h-32 h-28 rounded-xl hover:cursor-pointer ${activeTab === "order" ? "border-2 border-black" : ""}`} onClick={() => handleTabSwitch("order")}>
            <svg className="w-10 h-10 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 .917 11.923A1 1 0 0 1 17.92 21H6.08a1 1 0 0 1-.997-1.077L6 8h12Z" />
            </svg>
            <span className="font-medium text-base text-black">Orders</span>
          </div>

          <Link to="/cart">
            <div className="bg-white flex flex-col items-center justify-center md:w-52 w-40 md:h-32 h-28 rounded-xl hover:cursor-pointer">
              <svg className="w-10 h-10 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312" />
              </svg>
              <span className="font-medium text-base text-black">Cart</span>
            </div>
          </Link>
        </div>


        <div className='w-full flex items-center justify-center mx-auto pb-10'>
          <div className="md:w-3/4 w-11/12 h-full rounded-lg border border-gray-200 bg-gray-50 p-4 md:p-8">

            {/* Dashboard */}
            {activeTab === "dashboard" && <div>
              <h3 className="my-4 text-2xl font-semibold text-gray-900 text-center pb-5">Account Information</h3>
              <div className="mb-6 mx-auto grid gap-8 grid-cols-1 sm:grid-cols-3 items-center">

                <div>
                  <h2 className="text-xl font-semibold text-gray-800">User Name</h2>
                  {user ? (<div className='inline-flex items-center gap-2 md:gap-4'>
                    <span className="text-lg  text-black sm:text-2xl">{user?.name}</span>
                    <div className="inline-flex items-center gap-1 bg-blue-500  px-3 py-0.5 rounded-2xl">
                      <svg className="w-5 h-5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z" />
                      </svg>
                      <p className="text-sm font-medium text-white">Verified</p>
                    </div>
                  </div>) : (<span className="text-gray-600 text-lg">Null</span>)}
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Email Address</h2>
                  {user ? (<span className="text-gray-600 text-lg">{user?.email}</span>)
                    : (<span className="text-gray-600 text-lg">Null</span>)}
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-800">Phone Number <span className="font-light text-base text-gray-500">(Primary)</span></h2>
                  {addressList.length > 0 ? ( addressList.map((addressInfo, index) => { const shouldDisplay = addressInfo.isDefault || index === 0 && !addressList.some((addr) => addr.isDefault);
                      return shouldDisplay ? (<span key={addressInfo._id} className="text-lg text-gray-600 font-medium">+91 {addressInfo?.phone}</span>) : null;
                    })) : (<span className="text-lg text-gray-500 font-base">Add Your Number</span>)}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800">Delivery Address</h2>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-4 my-2">
                  {addressList.length > 0 ?
                    (addressList.map((addressInfo) => (<div key={addressInfo._id} className="border h-32 w-full lg:w-fit rounded-lg p-3 flex items-center justify-between md:gap-4 gap-0">
                      <div>
                        <p className="text-gray-800">Name - {addressInfo.name}</p>
                        <p className="text-gray-800">Phone - {addressInfo.phone}</p>
                        <p className="text-gray-800 font-medium">{addressInfo.address}, {addressInfo.landmark}, {addressInfo.city}, {addressInfo.state}, {addressInfo.pincode}</p>
                        {addressInfo.isDefault && (<span className="text-sm text-green-500 font-medium">(Default)</span>)}
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="text-gray-500 hover:underline" onClick={() => { handleTabSwitch("address"); setEditInfo(true); setFormData(addressInfo); }}>
                          <svg className="w-8 h-8" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                          </svg>
                        </button>
                        {!addressInfo.isDefault && (<button className="text-red-500 hover:underline" onClick={() => handleDelete(addressInfo)}>
                          <svg className="w-8 h-8" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                          </svg>
                        </button>)}
                      </div>
                    </div>)))
                    : (<div className="flex flex-col items-center justify-center my-4">
                      <p className="text-gray-500">No addresses found. Please add an address.</p>
                      <button className="mt-4 px-4 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500" onClick={() => handleTabSwitch("address")}>Add Address</button>
                    </div>)}
                </div>
              </div>
            </div>}

            {/* Address */}
            {activeTab === "address" && <div>
              <form className="p-0 md:p-5" key={editInfo ? formData._id : null} onSubmit={editInfo ? handleEdit : handleAdd}>
                <div className="mb-5 grid grid-cols-1 items-center justify-center gap-4 sm:grid-cols-3">

                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="address" className="mb-2 block text-sm font-medium text-gray-900">Name<span className="text-red-600 text-xl font-bold">*</span></label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={changeHandler} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" placeholder="Enter your address here" required />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="address" className="mb-2 block text-sm font-medium text-gray-900">Address Line<span className="text-red-600 text-xl font-bold">*</span></label>
                    <input type="text" id="address" name="address" value={formData.address} onChange={changeHandler} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" placeholder="Enter your address here" required />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="landmark" className="mb-2 block text-sm font-medium text-gray-900">Landmark<span className="text-red-600 text-xl font-bold">*</span></label>
                    <input type="text" id="landmark" name="landmark" value={formData.landmark} onChange={changeHandler} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" placeholder="Enter landmark here" required />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-900">Phone<span className="text-red-600 text-xl font-bold">*</span></label>
                    <div className="flex items-center">
                      <span className="z-10 inline-flex shrink-0 items-center rounded-s-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100" type="button">+91</span>
                      <div className="relative w-full">
                        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={changeHandler} className="z-20 block w-full rounded-e-lg border border-s-0 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" pattern="[0-9]{10}" placeholder="123-456-7890" required />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="state" className="mb-2 block text-sm font-medium text-gray-900">State<span className="text-red-600 text-xl font-bold">*</span></label>
                    <select id="state" name="state" value={formData.state} onChange={changeHandler} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" required>
                      <option defaultValue="">Select State</option>
                      {State.getStatesOfCountry("IN").map((state) => (<option key={state.isoCode} value={state.isoCode}>{state.name}</option>))}
                    </select>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="city" className="mb-2 block text-sm font-medium text-gray-900">City<span className="text-red-600 text-xl font-bold">*</span></label>
                    <select id="city" name="city" value={formData.city} onChange={changeHandler} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" required>
                      <option defaultValue="">Select City</option>
                      {formData.state && City.getCitiesOfState("IN", formData.state).map((city) => (<option key={city.name} value={city.isoCode}>{city.name}</option>))}
                    </select>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="pincode" className="mb-2 block text-sm font-medium text-gray-900">PinCode<span className="text-red-600 text-xl font-bold">*</span></label>
                    <input type="tel" id="pincode" name="pincode" value={formData.pincode} onChange={changeHandler} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" placeholder="Enter your area pincode here" pattern="[0-9]{6}" required />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="label" className="mb-2 block text-sm font-medium text-gray-900">Label <span className="text-gray-500 text-base font-light">(optional)</span></label>
                    <select id="label" name="label" value={formData.label} onChange={changeHandler} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" required>
                      <option defaultValue="">Select Label</option>
                      <option value="Home">Home</option>
                      <option value="Work">Work</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <input id="isDefault" type="checkbox" checked={formData.isDefault} onChange={(e) => setFormData((prev) => ({ ...prev, isDefault: e.target.checked, }))} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                  <label htmlFor="isDefault" className="ms-2 text-sm font-medium text-black">Set as Default Address</label>
                </div>

                <div className="border-t border-gray-200 pt-4 md:pt-5 flex gap-4">
                  <button type="submit" className="inline-flex items-center rounded-lg bg-orange-400 px-3 md:px-5 py-2.5 text-sm font-medium text-white hover:bg-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-300">{editInfo ? "Update Address" : "Add Address"}</button>
                </div>
              </form>

            </div>}

            {/* Orders */}
            {activeTab === "order" && <div className={`${orderList.length > 0 ? "h-72 overflow-auto" : "h-full"}`}>
              <h3 className={`${orderList.length > 0 ? "block" : "hidden"} mb-4 text-xl font-semibold text-gray-900`}>Latest orders</h3>
              {orderList.length > 0 ? (orderList.map((orders) => (<div key={orders._id} className="flex flex-wrap border-b items-center gap-y-4 overflow-x-hidden py-6">
                <dl className="w-full sm:w-1/4 lg:w-auto text-center md:text-start lg:flex-1">
                  <dt className="text-sm md:text-base font-medium text-gray-500">Order ID:</dt>
                  <dd className="mt-1.5 text-sm md:text-base font-semibold text-gray-900">{orders._id}</dd>
                </dl>

                <dl className="w-1/3 sm:w-1/4 lg:w-auto text-center lg:flex-1">
                  <dt className="text-sm md:text-base font-medium text-gray-500">Date:</dt>
                  <dd className="mt-1.5 text-sm md:text-base font-semibold text-gray-900">{new Date(orders.orderDate).toLocaleDateString()}</dd>
                </dl>

                <dl className="w-1/3 sm:w-1/4 lg:w-auto text-center lg:flex-1">
                  <dt className="text-sm md:text-base font-medium text-gray-500">Price:</dt>
                  <dd className="mt-1.5 text-sm md:text-base font-semibold text-gray-900">₹{(orders.totalAmount).toLocaleString()}</dd>
                </dl>

                <dl className="w-1/3 sm:w-1/4 lg:w-auto text-center lg:flex-1">
                  <dt className="text-sm md:text-base font-medium text-gray-500">Status:</dt>
                  <dd className={`me-2 mt-1.5 inline-flex items-center rounded ${ orders.orderStatus === "Confirmed" || orders.orderStatus === "Delivered" ? "bg-green-100 text-green-800" : orderDetails?.orderStatus === "Cancelled" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800" } px-2.5 py-0.5 text-xs font-medium`}>
                    {orders.orderStatus === "Confirmed" || orders.orderStatus === "Delivered" ? (<svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5" />
                    </svg>)
                      : orders.orderStatus === "Cancelled" ? (<svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                      </svg>) : (<svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z" />
                      </svg>)}
                    {orders.orderStatus}
                  </dd>
                </dl>

                <button onClick={() => toggleModal(orders._id)} type="button" className="w-full inline-flex justify-center rounded-lg  border bg-orange-400 px-3 py-2 text-sm font-medium text-white hover:bg-orange-500 focus:z-10 focus:outline-none focus:ring-4 focus:ring-orange-100 lg:w-auto">View details</button>
              </div>)))
                : (<div className="p-5 font-inter flex items-center justify-center">
                  <div className="text-center space-y-4 mt-4">
                    <div className="font-medium text-lg md:text-2xl">Your Order page is empty</div>
                    <p className="text-sm md:text-base text-gray-400 px-4 md:px-0">Looks like you have not purchase anything. Go ahead and explore our top products.</p>
                    <div className="text-center mt-4">
                      <Link to="/shop" type="button" className="text-sm md:text-base rounded-lg text-white font-light px-2 py-3 md:px-5 md:py-3 bg-orange-400 hover:bg-orange-500">Continue Shopping</Link>
                    </div>
                  </div>
                </div>)}
            </div>}

          </div>
        </div>
      </section>

      {/* Modal For View */}
      {openModal && (<div className="bg-black bg-opacity-40 size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none">
        <div className="duration-500 opacity-100 mt-7 ease-out transition-all sm:max-w-lg sm:w-full m-3 h-[calc(100%-3.5rem)] sm:mx-auto">
          <div className="max-h-full overflow-hidden flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto">
            <div className="flex justify-between items-center py-3 px-4 border-b">
              <h3 id="hs-scroll-inside-body-modal-label" className="font-bold text-gray-800">Order Details</h3>
              <button type="button" onClick={() => setOpenModal(null)} className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200">
                <span className="sr-only">Close</span>
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-y-auto overflow-x-hidden">
              <div className="space-y-4 sm:space-y-2 rounded-lg border border-gray-100 bg-white p-6 mb-6 md:mb-8">
                <dl className="flex justify-between items-center">
                  <dt className="font-normal text-black">OrderId:</dt>
                  <dd className="font-medium text-xs md:text-base text-gray-900">#{orderDetails?._id}</dd>
                </dl>
                <dl className="flex justify-between items-center">
                  <dt className="font-normal text-black">Total Amount:</dt>
                  <dd className="font-medium text-gray-900">₹{orderDetails?.totalAmount.toLocaleString()}</dd>
                </dl>
                <dl className="flex justify-between items-center">
                  <dt className="font-normal text-black">Status:</dt>
                  <dd className={`font-medium px-1 py-0.5 rounded ${orderDetails?.orderStatus === "Confirmed" || orderDetails?.orderStatus === "Delivered" ? "bg-green-100 text-green-800" : orderDetails?.orderStatus === "Cancelled" ? "bg-red-100 text-red-800" : 'bg-yellow-100 text-yellow-800'}`}>{orderDetails?.orderStatus}</dd>
                </dl>
                <dl className="flex justify-between items-center">
                  <dt className="font-normal text-black">Payment Method:</dt>
                  <dd className="font-medium text-gray-900">{orderDetails?.paymentMethod}</dd>
                </dl>
              </div>

              <div className="rounded-lg border border-gray-100 text-start test-base bg-white p-6 mb-6 md:mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Address</h3>
                <p className="text-gray-900">{orderDetails?.addressInfo?.name}</p>
                <p className="text-black">{orderDetails?.addressInfo?.address}, {orderDetails?.addressInfo?.landmark}</p>
                <p className="text-black">{orderDetails?.addressInfo?.city}, {orderDetails?.addressInfo?.state}</p>
                <p className="text-black">Pincode - {orderDetails?.addressInfo?.pincode}</p>
                <p className="text-black">Phone: {orderDetails?.addressInfo?.phone}</p>
              </div>


              {orderDetails?.cartItems?.map((item) => (<div key={item.productId} className="space-y-4 border m-1 p-2">
                <div className="flex items-center gap-6">
                  <Link to={`/product-view/${item.productId}`} className="h-14 w-14 shrink-0"><img className="h-full w-full" src={item.image} alt={item.title} /></Link>
                  <Link to={`/product-view/${item.productId}`} className="min-w-0 flex-1 font-medium text-gray-900 hover:underline">{item.title}</Link>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs font-normal text-gray-500"><span className="font-medium text-xs text-gray-900">Product ID: </span>{item.productId}</p>
                  <div className="flex items-center justify-end gap-4">
                    <p className="text-base font-normal text-gray-900">x{item.quantity}</p>
                    <p className="text-lg font-semibold leading-tight text-gray-900">${item.salePrice}</p>
                  </div>
                </div>
              </div>))}
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
              <button type="button" onClick={() => setOpenModal(null)} className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-orange-400 text-white hover:bg-orange-500 focus:outline-none">Close</button>
            </div>
          </div>
        </div>
      </div>)}

    </Fragment>
  );
}

export default Account;
