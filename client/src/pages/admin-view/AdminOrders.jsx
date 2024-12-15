import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAllOrderDetails, getUserAllOrders, updateUserOrderStatus } from '../../store/admin/order-slice';
import { Link } from 'react-router-dom';
import { Toast } from '../../components/ui';

const initialState = { orderStatus: '' };

function AdminOrders() {

  const dropdownRef = useRef(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [openModal, setOpenModal] = useState(null);
  const [formData, setFormData] = useState(initialState);
  const [isEdit, setIsEdit] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAllOrders());
  }, [dispatch]);

  const toggleDropdown = (orderId) => {
    setActiveDropdown((prev) => (prev === orderId ? null : orderId));
  };

  const toggleModal = async (orderId) => {
    setOpenModal((prev) => (prev === orderId ? null : orderId));
    await dispatch(getUserAllOrderDetails(orderId)).unwrap();
  };
  
  const handleUpdate = async (orderId) => {
    try {
      if (!orderId) {
        Toast({ type: "error", message: "Invalid order ID." });
        return;
      }
      const response = await dispatch(updateUserOrderStatus({ id: orderId, orderStatus: formData.orderStatus })).unwrap();
      if (response?.success) {
        Toast({ type: "success", message: response?.message });
        setIsEdit(false);
        setOpenModal(null);
      }
    } catch (error) {
      const errorMessage = error || "An error occurred during submission.";
      Toast({ type: "error", message: errorMessage });
    } finally {
      setIsEdit(false);
      setOpenModal(null);
      try {
        await dispatch(getUserAllOrders()).unwrap();
      } catch (fetchError) {
        Toast({ type: "error", message: "Failed to refresh order list." });
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Fragment>
      <div className='flex flex-col items-center gap-5'>
        <div className="w-full shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-300">
              <tr>
                <th scope="col" className="px-6 py-3">Order Id</th>
                <th scope="col" className="px-6 py-3">Date</th>
                <th scope="col" className="px-6 py-3">Order Status</th>
                <th scope="col" className="px-6 py-3">TotalAmount</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {orderList.length > 0 ? (orderList.map((order) => (<tr key={order._id} className="odd:bg-white even:bg-gray-100 border-b">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">#{order._id}</th>
                <td className="px-6 py-4">{new Date(order.orderDate).toLocaleDateString()}</td>
                <td className={`px-6 py-4 ${ order?.orderStatus === "Confirmed" || order?.orderStatus === "Delivered" ? "bg-green-100 text-green-800" : order?.orderStatus === "Cancelled" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800" }`}>{order.orderStatus}</td>
                <td className="px-6 py-4">₹{order.totalAmount}</td>
                <td className="px-4 py-3">
                  <button onClick={() => toggleDropdown(order._id)} className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none" type="button">
                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                  </button>
                  {activeDropdown === order._id && (<div ref={dropdownRef} className="z-10 w-40 bg-white absolute right-0 border rounded divide-y divide-gray-100 shadow">
                    <ul className="py-1 text-sm text-gray-700">
                      <li><button onClick={() => toggleModal(order._id)} className="w-full py-2 px-4 hover:bg-gray-100">Show</button></li>
                      <li><button onClick={() => { toggleModal(order._id); setIsEdit(!isEdit); }} className="w-full py-2 px-4 hover:bg-gray-100">Edit</button></li>
                    </ul>
                  </div>)}
                </td>
              </tr>))) : (<tr>
                <td colSpan="5" className="px-6 py-4 text-center">No orders found.</td>
              </tr>)}
            </tbody>
          </table>
        </div>
      </div>

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
                  <dd className={`font-medium px-1 py-0.5 rounded ${ orderDetails?.orderStatus === "Confirmed" || orderDetails?.orderStatus === "Delivered" ? "bg-green-100 text-green-800" : orderDetails?.orderStatus === "Cancelled" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800" }`}>{orderDetails?.orderStatus}</dd>
                </dl>
                <dl className="flex justify-between items-center">
                  <dt className="font-normal text-black">Payment Method:</dt>
                  <dd className="font-medium text-gray-900">{orderDetails?.paymentMethod}</dd>
                </dl>
                <dl className="flex justify-between items-center">
                  <dt className="font-normal text-black">Payment Id:</dt>
                  <dd className="font-medium text-xs md:text-base text-gray-900">{orderDetails?.paymentId}</dd>
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
              <select className={`${isEdit ? 'block' : 'hidden'} bg-gray-100 w-full px-3 py-3 border`} name="orderStatus" id="orderStatus" value={formData.orderStatus} onChange={(e) => setFormData({ ...formData, orderStatus: e.target.value })}>
                <option value="" disabled>Select Status</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Pending">Pending</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Delivered">Delivered</option>
                <option value="Shipped">Shipped</option>
              </select>
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
              <button type="button" onClick={() => { isEdit ? handleUpdate(orderDetails?._id) : setOpenModal(null); }} className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-orange-400 text-white hover:bg-orange-500 focus:outline-none">{isEdit ? "Save changes" : "Close"}</button>
            </div>
          </div>
        </div>
      </div>)}

    </Fragment>
  );
}

export default AdminOrders;
