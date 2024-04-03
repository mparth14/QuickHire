// Author: Parth Modi

import Cart from '../models/cart.model.js';
import Service from '../models/services.model.js';

/**
 * Adds a service to the user's cart.
 *
 * @param {object} req - The request object containing userId and serviceId.
 * @param {object} res - The response object.
 */
export const addToCart = async (req, res) => {
  try {
    const { userId, serviceId } = req.body;
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, services: [] });
    }
    cart.services.push(serviceId);
    cart.totalPrice += service.price;
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Retrieves the user's cart.
 *
 * @param {object} req - The request object containing userId.
 * @param {object} res - The response object.
 */
export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate('services');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Removes a service from the user's cart.
 *
 * @param {object} req - The request object containing userId and serviceId.
 * @param {object} res - The response object.
 */
export const removeFromCart = async (req, res) => {
  try {
    const { userId, serviceId } = req.body;
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    const index = cart.services.indexOf(serviceId);
    if (index > -1) {
      cart.services.splice(index, 1);
      const service = await Service.findById(serviceId);
      if (service) {
        cart.totalPrice -= service.price;
      }
      await cart.save();
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
