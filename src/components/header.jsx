import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, addToCart, clearCart } from "../store/cartSlice";
import '../style/header.css'
import { Link } from "react-router-dom";

export default function NavHero({ searchTerm, setSearchTerm }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  // Calcul du total et nombre total d'articles
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.itemPrice * item.quantity,
    0
  );
  const totalItems = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  return (
    <>
      <nav className="navbar py-3">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#">FoodApp</a>

          {/* --- Barre de recherche --- */}
          <form className="d-flex mx-auto my-2 w-50">
            <input
              className="form-control search-input"
              type="search"
              placeholder="Rechercher un plat ou un restaurant..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </form>

          {/* --- Icône panier avec badge --- */}
          <div className="position-relative">
            <i className="bi bi-cart-fill icon-btn" data-bs-toggle="offcanvas" data-bs-target="#sidePanel"></i>
            {totalItems > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {totalItems}
              </span>
            )}
          </div>
        </div>
      </nav>

      <div className="offcanvas offcanvas-end" tabIndex="-1" id="sidePanel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Mon Panier</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>

        <div className="offcanvas-body">
          {/* --- Liste des produits --- */}
          {cartItems.length === 0 ? (
            <p>Votre panier est vide.</p>
          ) : (
            cartItems.map(item => (
              <div key={item.itemID} className="d-flex align-items-center mb-3 border-bottom pb-2">
                <img 
                  src={item.imageUrl || "/media/imgs/foods/default.jpg"} 
                  alt={item.itemName} 
                  style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px", marginRight: "10px" }}
                />

                <div className="flex-grow-1">
                  <h6 className="mb-1">{item.itemName}</h6>
                  <p className="mb-0 text-muted">Quantité: {item.quantity}</p>
                </div>

                <div className="d-flex align-items-center">
                  <button 
                    className="btn btn-sm btn-outline-secondary me-1"
                    onClick={() => dispatch(addToCart({ ...item, quantity: -1 }))}
                  >-</button>
                  <button 
                    className="btn btn-sm btn-outline-secondary me-1"
                    onClick={() => dispatch(addToCart({ ...item, quantity: 1 }))}
                  >+</button>
                  <button 
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => dispatch(removeFromCart(item.itemID))}
                  >🗑</button>
                </div>
              </div>
            ))
          )}

          {/* --- Total et bouton vider le panier --- */}
          {cartItems.length > 0 && (
            <>
              <div className="mb-3">
                <h6>Total: {totalPrice} MAD</h6>
              </div>
              <button 
                className="btn btn-danger w-100"
                onClick={() => dispatch(clearCart())}
              >
                Vider le panier
              </button>
              <Link to="/liste-favories" className="btn favorie-btn w-100 mt-2">
                    Voir mes favoris
                </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
