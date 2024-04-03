import services from "../models/services.model.js";
import users from "../models/user.model.js";

export const createService = async (req, res) => {
  try {
    const service = await services.create(req.body);
    res.status(201).json({ success: true, data: service });
  } catch (error) {
    let errorMessage = error.message;
    if (error.name === "ValidationError") {
      errorMessage = Object.values(error.errors)
        .map((err) => err.message)
        .join(", ");
    }
    res.status(400).json({ success: false, error: errorMessage });
  }
};

export const getAllServices = async (req, res) => {
  try {
    const allServices = await services.find({ isActive: true });
    res.status(200).json({ success: true, data: allServices });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const service = await services.findById({
      _id: req.params.id,
      isActive: true,
    });
    if (!service) {
      return res
        .status(404)
        .json({ success: false, error: "Service not found" });
    }
    const seller = await users.findById(service.sellerId, "-password");
    const serviceWithSeller = {
      ...service.toJSON(),
      seller: seller,
    };

    res.status(200).json({ success: true, data: serviceWithSeller });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const service = await services.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!service) {
      return res
        .status(404)
        .json({ success: false, error: "Service not found" });
    }
    res.status(200).json({ success: true, data: service });
  } catch (error) {
    let errorMessage = error.message;
    if (error.name === "ValidationError") {
      errorMessage = Object.values(error.errors)
        .map((err) => err.message)
        .join(", ");
    }
    res.status(400).json({ success: false, error: errorMessage });
  }
};

export const deleteService = async (req, res) => {
  try {
    const service = await services.findByIdAndDelete(req.params.id);
    if (!service) {
      return res
        .status(404)
        .json({ success: false, error: "Service not found" });
    }
    res.status(204).json({ success: true, data: null });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getServicesByPartialHint = async (req, res) => {
  try {
    const { value } = req.query;
    const regex = new RegExp(value, "i");
    const service = await services.find({
      isActive: true,
      $or: [
        { title: regex },
        { category: regex },
        { subCategory: regex },
        { description: regex },
      ],
    });
    res.status(200).json(service);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
