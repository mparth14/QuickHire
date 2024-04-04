/**
 * @Author Tijilkumar Parmar
 * Wishlist Page for the user's bookmarked services to visit later
 */
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./wishlist.css";
import SubPagination from "../SubPagination/SubPagination";
import SubServiceCard from "../SubServiceCard/SubServiceCard";
import { CONFIG } from "../../config";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  link: {
    display: "flex",
    textDecoration: "none",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const WishlistComponent = ({ user, onload }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [services, setServices] = useState(1);
  const [itemsPerPage] = useState(8);
  console.log(user);

  useEffect(() => {
    // We required the user to be logged in to use thgis feature hence enforcing the login
    if (!user && onload) {
      history.push("/login");
    } else {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `${CONFIG.BASE_PATH}wishlist?email=${user.email}`
          );
          const data = await response.json();
          // Profile images logic is static for  now
          const profileImages = [
            "https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png",
            "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-with-beard-vector-ilustration-png-image_6110777.png",
            "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
            "https://static.vecteezy.com/system/resources/previews/024/183/502/non_2x/male-avatar-portrait-of-a-young-man-with-a-beard-illustration-of-male-character-in-modern-color-style-vector.jpg",
            "https://www.creativefabrica.com/wp-content/uploads/2023/01/30/Bearded-Man-Avatar-Icon-Graphics-59392089-1.jpg",
            "https://png.pngtree.com/png-vector/20230903/ourmid/pngtree-man-avatar-isolated-png-image_9935818.png",
            "https://png.pngtree.com/png-clipart/20230930/original/pngtree-man-avatar-isolated-png-image_13022161.png",
            "https://png.pngtree.com/png-clipart/20230930/original/pngtree-man-avatar-isolated-png-image_13022170.png",
          ];
          // Trim the data for a better visibility on this screen as the user can always click on it to explore
          const newData = data.map((service, index) => {
            let trimmedDescription = service.description
              .split(" ")
              .slice(0, 21)
              .join(" ");
            if (service.description.split(" ").length > 21)
              trimmedDescription += "...";
            return {
              id: service._id,
              image: service.imgUrl,
              name: service.sellerName,
              jobTitle: service.jobTitle,
              description: trimmedDescription,
              rating: service.currentRating,
              rate: service.price,
              numberOfRatings: service.numberOfRatings,
              profile: profileImages[index % profileImages.length],
            };
          });
          // Update the array we are using to populate this screen
          setServices(newData);
          console.log(newData);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      // Get the data to display from the API
      fetchData();
    }
  }, [onload, user, history]);

  if (!user || loading) {
    return null;
  }
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{ marginLeft: "5%", marginRight: "5%" }}>
      <div className="breadcrumbs-css" style={{ marginLeft: "8px" }}></div>
      <div>
        <h2
          style={{
            marginLeft: "8px",
            marginTop: "20px",
            marginBottom: "20px",
            color: "#3f51b5",
          }}
        >
          Wishlist
        </h2>

        <br />
        <h3 style={{ marginLeft: "8px", color: "#3f51b5" }}>
          {services.length} Services available
        </h3>
      </div>
      <div>
        <div
          className="sub-cat"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div
            className="subservice-card"
            style={{ marginBottom: services.length === 0 ? "20px" : "0" }}
          >
            {loading ? (
              <p>Loading...</p>
            ) : services.length > 0 ? (
              // We will pass the object array here and the SubServiceWill iterate through all of them
              <SubServiceCard user={user} cardData={services} />
            ) : (
              <div style={{ textAlign: "center" }}>
                <img
                  src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127823.jpg?t=st=1711127194~exp=1711130794~hmac=1229dd34750bfe08aa5b1ead640f1dfb81bd096024f35b53f4e97025df00c596&w=1380"
                  alt="No data found"
                  style={{ maxWidth: "100%", height: "auto", width: "500px" }}
                />
                <h2>Sorry, no services found</h2>
              </div>
            )}
          </div>
        </div>
        {services.length > 0 && (
          <SubPagination
            itemsPerPage={itemsPerPage}
            totalItems={services.length}
            paginate={paginate}
          />
        )}
      </div>
    </div>
  );
};

export default WishlistComponent;
