import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import NavHeroMenu from "../components/header-menu.jsx";

import "../style/menu.css";

import { addToCart } from "../store/cartSlice";
import { addPlatToWishlist, removePlatFromWishlist } from "../store/wishlistPlatsSlice";

export default function RestaurantMenu() {
  const { id } = useParams(); // restaurantID
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);

  const dispatch = useDispatch();
//   const wishlist = useSelector((state) => state.wishlist.restaurants);
  const wishlistPlats = useSelector((state) => state.wishlistPlats.plats);

  const cart = useSelector((state) => state.cart.items);

  useEffect(() => {
    // fetch restaurant details
    fetch(
      `https://cors-anywhere.herokuapp.com/https://fakerestaurantapi.runasp.net/api/Restaurant/${id}`,
      {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      }
    )
      .then((res) => res.json())
      .then((data) => setRestaurant(data));

    // fetch restaurant menu
    fetch(
      `https://cors-anywhere.herokuapp.com/https://fakerestaurantapi.runasp.net/api/Restaurant/${id}/Menu`,
      {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      }
    )
      .then((res) => res.json())
      .then((data) => setMenu(data));
  }, [id]);

  if (!restaurant) return <p>Chargement du restaurant...</p>;

  const togglePlatWishlist = (plat) => {
    if (wishlistPlats.some((p) => p.id === plat.itemID)) {
        dispatch(removePlatFromWishlist(plat.itemID));
    } else {
        dispatch(addPlatToWishlist({ ...plat, id: plat.itemID }));
    }
  };

  return (
    <>
      <NavHeroMenu />
      <div className="container mt-4">
        <h1>{restaurant.restaurantName} Menu</h1>
        <p>{restaurant.address}</p>

        <div className="row mt-4">
          {menu.length === 0 ? (
            <p>Aucun plat disponible.</p>
          ) : (
            menu.map((dish) => (
              <div className="col-md-4 mb-3" key={dish.itemID}>
                <div className="card menu-card position-relative">
                  {/* Heart icon for wishlist */}
                  <i
                    className={`bi ${
                        wishlistPlats.some((item) => item.id === dish.itemID)
                        ? "bi-suit-heart-fill favorito"
                        : "bi-suit-heart-fill"
                    }`}
                    style={{ cursor: "pointer", fontSize: "22px", margin: "10px" }}
                    onClick={() => togglePlatWishlist(dish)}
                  ></i>


                  {/* Dish image */}
                  <img
                    src={dish.imageUrl || "/media/imgs/foods/default.jpg"}
                    alt={dish.itemName}
                    className="card-imgs"
                  />

                  <div className="card-body menu-card-body">
                    <h5 className="card-title">{dish.itemName}</h5>
                    <p className="card-text">{dish.itemDescription}</p>
                    <p>
                      <strong>Prix:</strong> {dish.itemPrice} MAD
                    </p>

                    {/* Ajouter au panier */}
                    <div>
                      <button
                        className={`btn px-3 ${
                            cart?.some(item => item.id === dish?.itemID) ? "added" : "voir-btn"
                        }`}
                        style={{ width: "auto" }}
                        onClick={() => {
                            if (dish?.itemID) {
                                dispatch(addToCart({ ...dish, id: dish.itemID }));
                            }
                        }}
                       >
                            {cart?.some(item => item.id === dish?.itemID) ? "Ajouté" : "Ajouter au panier"}
                        </button>

                    </div>
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
