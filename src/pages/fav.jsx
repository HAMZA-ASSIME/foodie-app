import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromWishlist } from "../store/wishlistSlice";
import "../style/fav.css";

import { removePlatFromWishlist } from "../store/wishlistPlatsSlice";
import NavHero from "../components/header-menu";


export default function Fav() {
  const wishlist = useSelector((state) => state.wishlist.restaurants);
  const wishlistPlats = useSelector((state) => state.wishlistPlats?.plats || []);

  const dispatch = useDispatch();

  return (
    <>
      <NavHero />    
      <div className="container mt-4">
        <h1>Liste Favories Du Restaurants</h1>
        <div className="row">
          {wishlist.length === 0 ? (
            <p>Pas encore de restaurants favoris</p>
          ) : (
            wishlist.map((r) => (
              <div className="col-md-4 mb-3" key={r.id}>
                <div className="card">
                  <i
                    className="bi bi-x-circle-fill remove-icon"
                    style={{ cursor: "pointer", fontSize: "20px", margin: "10px", color: "red" }}
                    onClick={() => dispatch(removeFromWishlist(r.id))}
                  ></i>
                  <img src={r.image} alt={r.restaurantName} className="card-imgs" />
                  <div className="card-body">
                    <h5>{r.restaurantName}</h5>
                    <p>{r.address}</p>
                    <Link to={`/restaurant/${r.restaurantID}`} className="btn btn-primary voir-btn">
                      Voir détails
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <h1 className="mt-5">Liste Favoris des Plats</h1>
      <div className="row">
        {wishlistPlats.length === 0 ? (
          <p>Pas encore de plats favoris</p>
        ) : (
          wishlistPlats.map((p) => (
            <div className="col-md-3 mb-3" key={p.id}>
              <div className="card">
                <i
                  className="bi bi-x-circle-fill remove-icon"
                  style={{
                    cursor: "pointer",
                    fontSize: "20px",
                    margin: "10px",
                    color: "red",
                  }}
                  onClick={() => dispatch(removePlatFromWishlist(p.id))}
                ></i>
                <img src={p.imageUrl} alt={p.itemName} className="card-imgs" />
                <div className="card-body">
                  <h5>{p.itemName}</h5>
                  <p>Prix : {p.itemPrice} MAD</p>
                    <Link to={`/restaurant/${p.restaurantID}`} className="btn btn-primary voir-btn">
                      Voir détails
                    </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      </div>
    </>
  );
}
