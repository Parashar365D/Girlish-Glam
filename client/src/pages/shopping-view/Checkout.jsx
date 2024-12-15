import { State, City } from 'country-state-city';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAddress, fetchAddress } from '../../store/address-slice';
import { Toast } from '../../components/ui';
import { fetchCart } from '../../store/cart-slice';
import { capturePayment, createNewOrder } from '../../store/order-slice';
import Logo from '/favicon.png';
import { useNavigate } from 'react-router-dom';

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


function Checkout() {

  const PAYMENT_API = import.meta.env.PAYMENT_API_KEY;
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [selectAddress, setSelectAddress] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.address);
  const { cartItems } = useSelector(state => state.shoppingCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalCartAmount = cartItems?.items?.reduce((sum, item) => sum + (item.salePrice * item.quantity), 100).toLocaleString();

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
      console.log(error);
    } finally {
      if (user?.id) {
        await dispatch(fetchAddress(user.id)).unwrap();
      }
    }
  };

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchAddress(user.id));
      dispatch(fetchCart(user.id));
    }
  }, [dispatch, user?.id]);


  // handle payment
  const handlePayment = async () => {
    if (!selectAddress) {
      return Toast({ type: "warn", message: "Select an address for checkout." });
    }
    setLoading(true);
    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((item) => ({
        productId: item.productId,
        title: item.title,
        image: item.image,
        salePrice: item.salePrice,
        quantity: item.quantity,
      })),
      addressInfo: {
        addressId: selectAddress?._id,
        name: selectAddress?.name,
        address: selectAddress?.address,
        landmark: selectAddress?.landmark,
        state: selectAddress?.state,
        city: selectAddress?.city,
        pincode: selectAddress?.pincode,
        label: selectAddress?.label,
        phone: selectAddress?.phone,
      },
      paymentMethod: "RazorPay",
      paymentStatus: "Unpaid",
      totalAmount: totalCartAmount,
      paymentId: "",
      orderStatus: "Pending",
    };

    try {
      const response = await dispatch(createNewOrder(orderData)).unwrap();
      if (response.success) {
        const { paymentId, finalAmount } = response;
        const options = { key: PAYMENT_API, amount: finalAmount * 100, currency: "INR", order_id: paymentId, name: "Girlish Glam", description: "Payment for your order", image: Logo, callback_url : navigate(`/success/${user?.id}`),
          handler: async (paymentResponse) => {
            const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = paymentResponse;
            try {
              const result = await dispatch(capturePayment({ paymentId: razorpay_payment_id, orderId: razorpay_order_id, paymentSignature: razorpay_signature, })).unwrap();
              if (result.success) {
                Toast({ type: "success", message: "Payment successful!" });
              } else {
                Toast({ type: "error", message: "Payment verification failed!" });
              }
            } catch (err) {
              Toast({ type: "error", message: "Payment failed. Try again!" });
            } finally {
              setLoading(false);
            }
          },
          prefill: { name: selectAddress?.name, email: user?.email, contact: selectAddress?.phone, },
          theme: { color: "#fb923c" },
        };
        const rzp = new Razorpay(options);

        rzp.on("payment.failed", (response) => {
          if (!response.razorpay_payment_id) {
            Toast({ type: "error", message: "Payment failed. Please try again." });
            setLoading(false);
          }
        });

        rzp.open();
      }
    } catch (error) {
      Toast({ type: "error", message: "Failed to create order. Try again!" });
      setLoading(false);
    }
  };


  return (
    <Fragment>
      <section className="bg-white py-4 antialiased">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
            <div className="min-w-0 flex-1 space-y-8">
              <form onSubmit={handleAdd} className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Delivery Details</h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900">Your name</label>
                    <input type="text" id="name" name='name' value={formData.name} onChange={changeHandler} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" placeholder="Enter your name here" />
                  </div>

                  <div>
                    <label htmlFor="address" className="mb-2 block text-sm font-medium text-gray-900">Address*</label>
                    <input type="text" id="address" name='address' value={formData.address} onChange={changeHandler} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" placeholder="Enter your address here" required />
                  </div>
                  <div>
                    <label htmlFor="landmark" className="mb-2 block text-sm font-medium text-gray-900">Landmark*</label>
                    <input type="text" id="landmark" name='landmark' value={formData.landmark} onChange={changeHandler} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" placeholder="Enter your landmark here" required />
                  </div>

                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <label htmlFor="state" className="block text-sm font-medium text-gray-900">State*</label>
                    </div>
                    <select id="state" name='state' value={formData.state} onChange={changeHandler} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500">
                      <option defaultValue="">Select State</option>
                      {State.getStatesOfCountry("IN").map((state) => (<option key={state.isoCode} value={state.isoCode}>{state.name}</option>))}
                    </select>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <label htmlFor="city" className="block text-sm font-medium text-gray-900">City*</label>
                    </div>
                    <select id="city" name='city' value={formData.city} onChange={changeHandler} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" disabled={!formData.state}>
                      <option defaultValue="">Select City</option>
                      {formData.state && City.getCitiesOfState("IN", formData.state).map((city) => (<option key={city.isoCode} value={city.name}>{city.name}</option>))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-900"> Phone Number* </label>
                    <div className="flex items-center">
                      <span className="z-10 inline-flex shrink-0 items-center rounded-s-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100" type="button">+91</span>
                      <div className="relative w-full">
                        <input type="tel" id="phone" name='phone' value={formData.phone} onChange={changeHandler} className="z-20 block w-full rounded-e-lg border border-s-0 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" pattern="[0-9]{10}" placeholder="123-456-7890" required />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="pincode" className="mb-2 block text-sm font-medium text-gray-900"> Pincode* </label>
                    <input type="tel" id="pincode" name='pincode' value={formData.pincode} onChange={changeHandler} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" pattern="[0-9]{6}" placeholder="282001" required />
                  </div>

                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <label htmlFor="label" className="block text-sm font-medium text-gray-900">Label</label>
                    </div>
                    <select id="label" name='label' value={formData.label} onChange={changeHandler} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500">
                      <option defaultValue="">Select State</option>
                      <option value="Home">Home</option>
                      <option value="Work">Work</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-orange-400 px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-orange-500 focus:z-10 focus:outline-none focus:ring-4 focus:ring-orange-100">
                      <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                      </svg>
                      Add new address
                    </button>
                  </div>
                </div>
              </form>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Delivery Address</h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {addressList.length > 0 ? (addressList.map((addressInfo) => (<label id='isDefault' key={addressInfo._id} className={`${selectAddress?._id === addressInfo._id ? 'border-blue-700' : 'border-gray-200'} rounded-lg border bg-gray-50 p-4 ps-4`}>
                    <div className="flex items-start gap-2">
                      <div className="flex h-5 items-center">
                        <input id="isDefault" type="checkbox" checked={selectAddress?._id === addressInfo._id} onChange={() => setSelectAddress(addressInfo)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" required />
                      </div>
                      <div>
                        <p className="text-gray-800">Name - {addressInfo.name}</p>
                        <p className="text-gray-800">Phone - {addressInfo.phone}</p>
                        <p className="text-gray-800 font-medium">{addressInfo.address}, {addressInfo.landmark}, {addressInfo.city}, {addressInfo.state}, {addressInfo.pincode}</p>
                      </div>
                    </div>
                  </label>))) : (<div className="text-gray-500 text-sm border rounded-md p-3 font-medium">No saved addresses. Please add a new address to proceed.</div>)}
                </div>
              </div>
            </div>

            <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
              <div className="flow-root">
                <div className="-my-3 divide-y divide-gray-200">
                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500">Subtotal</dt>
                    <dd className="text-base font-medium text-gray-900">₹{cartItems?.items?.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString()}</dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500">Savings</dt>
                    <dd className="text-base font-medium text-green-500">{cartItems?.items?.reduce((acc, item) => acc + (item.price - item.salePrice) * item.quantity, 0).toLocaleString()}</dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500">Shipping Price</dt>
                    <dd className="text-base font-medium text-gray-900">₹100</dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-bold text-gray-900">Total</dt>
                    <dd className="text-base font-bold text-gray-900">₹{totalCartAmount}</dd>
                  </dl>
                </div>
              </div>

              <div className="space-y-3">
                <button type="button" onClick={handlePayment} className={`flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300 ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800"}`} disabled={loading}>{loading ? "Processing..." : "Proceed to Payment"}</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default Checkout;
