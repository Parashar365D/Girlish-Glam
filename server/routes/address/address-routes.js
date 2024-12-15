import express from 'express';
import { addAddress, updateAddress, fetchAddress, removeAddress } from "./address-controller.js";

const router = express.Router();

// Route to add address using API endpoint: http://localhost:5000/address/add-address
router.post('/add-address', addAddress);

// Route to update address using API endpoint: http://localhost:5000/address/update-address/:userId/:addressId
router.put('/update-address/:userId/:addressId', updateAddress);

// Route to fetch all address using API endpoint: http://localhost:5000/address/fetch-address/:userId
router.get('/fetch-address/:userId', fetchAddress);

// Route to delete address using API endpoint: http://localhost:5000/address/remove-address/:userId/:addressId
router.delete('/remove-address/:userId/:addressId', removeAddress);

export default router;