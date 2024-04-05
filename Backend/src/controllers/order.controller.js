/**
 * @author Yashkumar Khorja
 * Orders controller
 */

import orders from "../models/order.model.js";
import services from "../models/services.model.js";
import users from "../models/user.model.js";

/**
 * Create a new service order.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
export const createServiceOrder = async (req, res) => {
  try {
    const { buyerId } = req.body;
    const user = await users.findById(buyerId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const serviceOrders = await orders.create(req.body);
    await serviceOrders.save();
    res.status(201).json(serviceOrders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Get all orders received to the current user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
export const getAllOrdersForCurrentUser = async (req, res) => {
  try {
    const serviceOrders = await orders.find().lean();
    const ownOrder = [];
    for (const order of serviceOrders) {
      const orderServices = [];
      for (const serviceId of order.services) {
        const service = await services.findById(serviceId).lean();
        if (service.sellerId.toString() == req.user._id.toString()) {
          orderServices.push(service);
        }
      }
      if (orderServices.length !== 0) {
        const user = await users.findById(order.buyerId).lean();
        order.user = user;
        order.service = [...orderServices];
        ownOrder.push(order);
      }
    }
    res.status(200).json(ownOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get all service orders placed by a logged in user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
export const getServiceOrderByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const serviceOrders = await orders.find({ buyerId: userId }).lean();
    const newOrder = [];
    for (const order of serviceOrders) {
      const orderServices = [];
      for (const serviceId of order.services) {
        const service = await services.findById(serviceId).lean();
        const seller = await users.findById(service.sellerId);
        service.seller = seller;
        orderServices.push(service);
      }

      order.service = [...orderServices];
      newOrder.push(order);
    }
    res.status(200).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
