import Service from '../models/services.model.js';

export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find({});
    res.status(200).json(services);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } 
};

export const getServicesByPartialTitle = async (req, res) => {
  try {
    const { title } = req.query;
    const regex = new RegExp(title, 'i'); // 'i' for case-insensitive search
    const services = await Service.find({ title: regex });
    res.status(200).json(services);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};
