import { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router";

// Selectors
import { getProducts, getProductsLoading } from "../../store/selectors";

// Actions
import * as actions from "../../store/actions/action";

// Styles
import "./Products.scss";
import { auth } from "../../services/firebase";

const Product = ({ id, title, price, inStock }) => {
  const history = useHistory();

  // States
  const [quantity, setQuantity] = useState(1);

  // Functions
  const decQuantity = useCallback(() => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }, [quantity]);

  const goToProduct = useCallback(() => {
    history.push(`/product?quantity=${quantity}&productId=${id}`);
  }, [history, id, quantity]);

  return (
    <div className="card col-4">
      <div className="card-body">
        <p className="h3 card-title">{title}</p>
        <p className="card-text">Product description</p>
        <div className="h5 card-price">
          <div>Price: ${price}</div>
          <div>In Stock: {inStock}</div>
        </div>
        <div className="buttons">
          <div className="quantity-btns">
            <button className="quantity-btn" onClick={decQuantity}>
              <i className="fas fa-minus" />
            </button>
            <div>{quantity}</div>
            <button className="quantity-btn" onClick={() => setQuantity(quantity + 1)}>
              <i className="fas fa-plus" />
            </button>
          </div>
          <button
            onClick={goToProduct}
            type="button"
            className="btn btn-primary"
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}

const Products = () => {
  const dispatch = useDispatch();

  // Selectors
  const products = useSelector(getProducts);
  const productsLoading = useSelector(getProductsLoading);

  // Effects
  useEffect(() => {
    dispatch(actions.getProducts());
  }, [dispatch]);

  if (!auth.currentUser) {
    return <Redirect to="/" />
  }

  return (
    <div className="container products">
      <h1>Products</h1>
      <div className="cards">
        {productsLoading && (
          <div className="spinner-border products-spinner" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        {!productsLoading && products.map(product => (
          <Product
            key={product.id}
            id={product.id}
            title={product.name}
            price={product.price}
            inStock={product.in_stock}
            onClick={() => dispatch(actions.buyProduct())}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
