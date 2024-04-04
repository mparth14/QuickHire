import orders from "../models/order.model.js";
import services from "../models/services.model.js";
import users from "../models/user.model.js";

const createServiceOrder = async (req, res) => {
  try {
    const serviceOrders = await orders.create(req.body);
    await serviceOrders.save();
    res.status(201).json(serviceOrders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const allOrders = await orders.find();
    res.status(200).json(allOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getServiceOrderByBuyerId = async (req, res) => {
  const { userId } = req.params;
  try {
    const serviceOrders = await orders.find({ buyer_id: userId }).lean();
    for (const order of serviceOrders) {
      const service = await services.findById(order.service_id).lean();
      const buyer = await users.findById(order.buyer_id).lean();
      const seller = await users.findById(service.seller_Id).lean();

      order.service = service;
      order.buyer = buyer;
      order.seller = seller;
    }
    res.status(200).json(serviceOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getServiceOrderBySellerId = async (req, res) => {
  const { userId } = req.params;
  try {
    const serviceOrders = await orders.find({ seller_id: userId }).lean();
    for (const order of serviceOrders) {
      const service = await services.findById(order.service_id).lean();
      const buyer = await users.findById(order.buyer_id).lean();
      const seller = await users.findById(service.seller_Id).lean();

      order.service = service;
      order.buyer = buyer;
      order.seller = seller;
    }
    res.status(200).json(serviceOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllOrders,
  getServiceOrderByBuyerId,
  getServiceOrderBySellerId,
  createServiceOrder,
};
