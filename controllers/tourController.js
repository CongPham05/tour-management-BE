import Tour from '../models/Tour.js'


// create new tour 
export const createTour = async (req, res) => {
    const newTour = new Tour(req.body);
    try {
        const savedTour = await newTour.save()
        res.status(200).json({
            success: true,
            message: 'Successfully created',
            data: savedTour
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create. Try again',
        })
    }
}

// update tour
export const updateTour = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedTour = await Tour.findByIdAndUpdate(
            { _id: id },
            { $set: req.body },
            { new: true })
        res.status(200).json({
            success: true,
            message: 'Successfully updated',
            data: updatedTour
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to updated',
        })
    }
}

// delete tour
export const deleteTour = async (req, res) => {
    const id = req.params.id;
    try {
        await Tour.findOneAndDelete({ _id: id });
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

// getSingle tour
export const getSingleTour = async (req, res) => {
    const id = req.params.id;
    try {
        const tour = await Tour.findById({ _id: id }).populate('reviews');
        res.status(200).json({
            success: true,
            message: 'Successfully tour',
            data: tour
        })

    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found',
        })
    }
}


// getAll tour
export const getAllTour = async (req, res) => {

    // For pagination
    const page = parseInt(req.query.page);
    console.log(page);


    try {
        const tours = await Tour.find().populate('reviews').skip(page * 8).limit(8);
        res.status(200).json({
            success: true,
            message: 'Successfully',
            count: tours.length,
            data: tours
        })

    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found',
        })
    }
}

// Get tour by search 

export const getTourBySearch = async (req, res) => {


    // here 'i' means case sensitive
    /** RegExp để tạo một regular expression (biểu thức chính quy)
     *  để tìm kiếm một chuỗi (string) trong cơ sở dữ liệu MongoDB.
     * Tham số đầu tiên của RegExp là req.query.city, 
     * đây là một chuỗi được truyền vào từ request của người dùng thông qua query parameter "city".
     *  'i' để chỉ định tìm kiếm chuỗi không phân biệt chữ hoa/chữ thường.
     */
    const city = new RegExp(req.query.city, 'i');
    const distance = parseInt(req.query.distance);
    const maxGroupSize = parseInt(req.query.maxGroupSize);

    try {


        /**gte means greater than equal
         * $gte: maxGroupSize >> filter để tìm kiếm các documents 
         * có trường maxGroupSize lớn hơn hoặc bằng với giá trị của biến 
         */
        const tours = await Tour.find({
            city, distance: { $gte: distance },
            maxGroupSize: { $gte: maxGroupSize }
        }).populate('reviews');

        res.status(200).json({
            success: true,
            message: 'Successfully',
            data: tours
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found',
        })
    }
}

// Get featured tour 
export const getFeaturedTour = async (req, res) => {

    try {
        const tours = await Tour.find({ featured: true }).populate('reviews').limit(8);
        res.status(200).json({
            success: true,
            message: 'Successfully',
            data: tours
        })

    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found',
        })
    }
}

// Get tour count
export const getTourCount = async (req, res) => {

    try {
        const tourCount = await Tour.estimatedDocumentCount();
        res.status(200).json({
            success: true,
            message: 'Successfully',
            data: tourCount
        })

    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found',
        })
    }
}
