import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router";
import queryString from "query-string";

// Selectors
import { getProducts } from "../../store/selectors";

// Actions
import { buyProduct } from "../../store/actions/action";

// Styles
import "./Product.scss";

const Product = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  // Selectors
  const products = useSelector(getProducts);

  // Variables
  const search = useMemo(() => {
    return queryString.parse(history.location?.search);
  }, [history]);
  const activeProduct = useMemo(() => {
    return products.find(product => product.id === search.productId);
  }, [products, search]);

  // Functions
  const purchase = useCallback(() => {
    dispatch(buyProduct(
      activeProduct.id,
      activeProduct.price,
      search.quantity,
    ));
  }, [activeProduct, search]);

  if (!activeProduct) {
    return <Redirect to="/products" />
  }
  return (
    <div className="container product">
      <h1>Product</h1>
      <p className="h2">
        {activeProduct.name}:
      </p>
      <p className="h4 m-2">
        ${activeProduct.price} x {search.quantity}
      </p>
      <p className="h4">Total: ${activeProduct.price * search.quantity}</p>
      <button className="btn btn-primary" onClick={purchase}>
        Purchase
      </button>
    </div>
  );
};

export default Product;
