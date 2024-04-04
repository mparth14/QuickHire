/**
 * @Author Tijilkumar Parmar
 * Controller for all the interactions regarding the wishlist page.
 */
import Wishlist from "../models/wishlist.model.js";
import Service from "../models/services.model.js";

// Function to get service details
async function getServiceDetails(email) {
  const wishlistObj = await Wishlist.find({ email: email });
  if (wishlistObj.length == 0) {
    return [];
  }
  // Fetch service IDs for all the items wishlisted by the current user

  const serviceIDs = wishlistObj[0].wishlist;
  console.log(serviceIDs);

  // Fetch service details for all the items wishlisted by the current user
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

    // Fetch service details for all the items wishlisted by the current user
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

//Logic to add a service ID to users wishlist document
export async function addToWishlist(req, res) {
  const { email, id } = req.body;
  try {
    const wishlistObj = await Wishlist.findOne({ email });

    if (!wishlistObj) {
      // If wishlist document doesn't exist for the user, create a new one
      const newWishlist = new Wishlist({
        email,
        wishlist: [id],
      });
      await newWishlist.save();
    } else {
      // If wishlist already exists, append the new service ID
      wishlistObj.wishlist.push(id);
      await wishlistObj.save();
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to add to wishlist" });
  }
}

//Logic to remove a service ID from users wishlist document
export async function removeFromWishlist(req, res) {
  const { email, id } = req.body;
  try {
    const wishlistObj = await Wishlist.findOne({ email });

    // If the user document not found, we need not do anything. (Highly unlikely)
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
