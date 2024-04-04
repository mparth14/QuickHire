import Wishlist from "../models/wishlist.model.js";
import Service from "../models/services.model.js";

// Function to get service details
async function getServiceDetails(email) {
  const wishlistObj = await Wishlist.find({ email: email });
  if (!wishlistObj) {
    return [];
  }
  const serviceIDs = wishlistObj[0].wishlist;
  console.log(serviceIDs);
  // Fetch service details for each service ID
  const serviceDetails = await Service.find({
    _id: { $in: serviceIDs },
  });

  return serviceDetails;
}

// Controller function to get user wishlist and service details
export async function getUserWishlistWithServiceDetails(req, res) {
  try {
    const { email } = req.query;
    console.log(email);

    // Get service details
    const serviceDetails = await getServiceDetails(email);

    if (serviceDetails.error) {
      return res.status(404).json({ message: serviceDetails.error });
    }

    return res.status(200).json(serviceDetails);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function addToWishlist(req, res) {
  const { email, id } = req.body; // Assuming the request body contains email and id
  try {
    const wishlistObj = await Wishlist.findOne({ email });
    // console.log(wishlistObj);

    if (!wishlistObj) {
      // If wishlist doesn't exist for the user, create a new one
      const newWishlist = new Wishlist({
        email,
        wishlist: [id],
      });
      await newWishlist.save();
    } else {
      // If wishlist already exists, push the new service ID
      wishlistObj.wishlist.push(id);
      await wishlistObj.save();
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to add to wishlist" });
  }
}

export async function removeFromWishlist(req, res) {
  const { email, id } = req.body; // Assuming the request body contains email and id
  try {
    const wishlistObj = await Wishlist.findOne({ email });
    // console.log(wishlistObj);

    if (!wishlistObj) {
      return res.status(404).json({ error: "Wishlist not found" });
    }

    // Remove the ID from the wishlist array
    const indexToRemove = wishlistObj.wishlist.indexOf(id);
    if (indexToRemove === -1) {
      return res
        .status(404)
        .json({ error: "Service ID not found in wishlist" });
    }
    wishlistObj.wishlist.splice(indexToRemove, 1);

    await wishlistObj.save();

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to remove from wishlist" });
  }
}
