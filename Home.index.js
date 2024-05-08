import { Component } from "react";
import { ThreeDots } from "react-loader-spinner";

import { Redirect } from "react-router-dom";

import Cookies from "js-cookie";

import Popup from "reactjs-popup";

import Table from "../Table/index";

import AddProduct from "../AddProduct/index";

import "./index.css";

const ReactPopUp = () => (
  <div className="popup-containor">
    <Popup
      modal
      trigger={
        <button type="button" className="trigger-button">
          Add Product
        </button>
      }
    >
      {(close) => (
        <div className="popup">
          <div>
            <AddProduct />
          </div>
          <button
            type="button"
            className="trigger-button"
            onClick={() => close()}
          >
            Close
          </button>
        </div>
      )}
    </Popup>
  </div>
);

class Home extends Component {
  state = {
    productsList: [],
    isLoading: true,
    value: 21,
  };

  componentDidMount = async () => {
    const { value } = this.state;
    const jwtToken = Cookies.get("jwt_token");
    const url = "https://apis.ccbp.in/products";
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };
    const response = await fetch(url, options);
    if (response.ok) {
      const fetchedData = await response.json();
      const updatedData = fetchedData.products.map((product) => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }));
      const filteredData = updatedData.filter((each) => each.id < value);
      this.setState({
        productsList: filteredData,
        isLoading: false,
      });
    }
  };

  onClickLogout = () => {
    Cookies.remove("jwt_token");
    const { history } = this.props;
    history.replace("/login");
  };

  renderLoader = () => (
    <div className="products-loader-container">
      <ThreeDots type="ThreeDots" color="black" height="50" width="50" />
    </div>
  );

  renderProductsList = () => {
    const { productsList } = this.state;
    return (
      <div className="table-containor">
        <Table data={productsList} />
        <div className="logout-containor">
          <ReactPopUp />
          <div className="button">
            <button
              type="button"
              className="logout-btn"
              onClick={this.onClickLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { productsList, isLoading } = this.state;
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken === undefined) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="home-containor">
        <h1 className="heading">Product Details</h1>
        {isLoading ? this.renderLoader() : this.renderProductsList()}
      </div>
    );
  }
}

export default Home;
