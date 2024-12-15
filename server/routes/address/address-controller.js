import Address from "../../models/Address.js";

// add address
const addAddress = async (req, res) => {
    try {
        const { userId, name, address, landmark, city, state, pincode, phone, label = 'Home', isDefault = false } = req.body;

        if (!userId || !name || !address || !landmark || !city || !state || !pincode || !phone) {
            return res.status(400).json({ success: false, error: 'Invalid Data Provided!' });
        }

        const newAddress = new Address({ userId, name, address, landmark, city, state, pincode, phone, label, isDefault });
        await newAddress.save();
        res.status(200).json({ success: true, data: newAddress });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};


// update address
const updateAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params;
        const formData = req.body;

        if (!userId || !addressId) {
            return res.status(400).json({ success: false, error: 'User and Address ID is required' });
        }
        const address = await Address.findOneAndUpdate({ _id: addressId, userId:userId }, formData, { new: true });
        if (!address) {
            return res.status(404).json({ success: false, error: 'Address not found' });
        }
        res.status(200).json({ success: true, message:"Address updated", data: address });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

// fetch address
const fetchAddress = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ success: false, error: 'User ID is required' });
        }

        const addressList = await Address.find({ userId });

        if (addressList.length === 0) {
            return res.status(404).json({ success: false, error: 'No addresses found for this user' });
        }

        res.status(200).json({ success: true, data: addressList });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};


// remove address
const removeAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params;
        
        if (!userId || !addressId) {
            return res.status(400).json({ success: false, message: 'User ID and Address ID are required.', });
        }
        const deletedAddress = await Address.findOneAndDelete({ _id: addressId, userId });
        
        if (!deletedAddress) {
            return res.status(404).json({ success: false, message: 'Address not found or does not belong to the user.', });
        }
        return res.status(200).json({ success: true, message: 'Address removed successfully.', data: deletedAddress, });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error.', error: error.message, });
    }
};



export { addAddress, updateAddress, fetchAddress, removeAddress };