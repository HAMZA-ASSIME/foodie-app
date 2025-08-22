import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../style/home-page.css'

import NavHero from "../components/header.jsx";

import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../store/wishlistSlice";


function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.restaurants);


  useEffect(() => {
    fetch("https://cors-anywhere.herokuapp.com/https://fakerestaurantapi.runasp.net/api/Restaurant", {
        headers: { "X-Requested-With": "XMLHttpRequest" }
    })
    .then(res => res.json())
    .then(data => {
        const withImages = data.slice(0,15).map((r, i) => ({
        ...r,
        id: r.restaurantID || i + 1,
        image: `/media/imgs/restaurants/restau-${i+1}.jpg`
    }));
    setRestaurants(withImages);
  });

  }, []);

 //  search filter   
  const filtered = restaurants.filter(r =>
    r.restaurantName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleWishlist = (restaurant) => {
  if (wishlist.some(r => r.id === restaurant.id)) {
    dispatch(removeFromWishlist(restaurant.id));
  } else {
    dispatch(addToWishlist(restaurant));
  }
};


  return (
    <>        
        <NavHero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />    
        <div className="container mt-4">
            <h1>Restaurants</h1>
            <div className="row">
                {filtered.map((r,i) => (
                    <div className="col-md-4 mb-3" key={i+1}>
                        <div className="card">
                            <i
                                className={`bi ${wishlist.some(item => item.id === r.id) ? "bi bi-suit-heart-fill favorito" : "bi bi-suit-heart-fill"}`}
                                style={{ cursor: "pointer", fontSize: "24px", margin: "10px" }}
                                onClick={() => toggleWishlist(r)}
                            ></i>

                            <img src={r.image} alt={r.restaurantName} className="card-imgs" />
                            <div className="card-body">
                                <h5>{r.restaurantName}</h5>
                                <p>{r.address}</p>
                                <Link to={`/restaurant/${r.id}`} className="btn btn-primary voir-btn">
                                  Voir menu
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
  );
}

export default Home;
