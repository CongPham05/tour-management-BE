import User from '../models/User.js'


// create new User 
export const createUser = async (req, res) => {
    const newUser = new User(req.body);
    try {
        const savedUser = await newUser.save()
        res.status(200).json({
            success: true,
            message: 'Successfully created',
            data: savedUser
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create. Try again',
        })
    }
}

// update User
export const updateUser = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            { _id: id },
            { $set: req.body },
            { new: true })
        res.status(200).json({
            success: true,
            message: 'Successfully updated',
            data: updatedUser
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to updated',
        })
    }
}

// delete User
export const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        await User.findOneAndDelete({ _id: id });
        res.status(200).json({
            success: true,
            message: 'Successfully deleted',
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete',
        })
    }
}

// getSingle User
export const getSingleUser = async (req, res) => {
    const id = req.params.id;
    try {
        const users = await User.findById({ _id: id })
        res.status(200).json({
            success: true,
            message: 'Successfully User',
            data: users
        })

    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found',
        })
    }
}


// getAll User
export const getAllUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            message: 'Successfully',
            data: users
        })

    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found',
        })
    }
}


