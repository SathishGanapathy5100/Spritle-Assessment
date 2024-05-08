import { Component } from "react";
import Cookies from "js-cookie";
import { Rating, Typography } from "@mui/material";

import "./index.css";

class AddProduct extends Component {
  state = {
    brand: "",
    title: "",
    price: "",
    imageUrl: "",
    rating: "",
  };

  updateBrand = (event) => {
    this.setState((prevState) => ({ brand: event.target.value }));
  };

  updatePrice = (event) => {
    this.setState((prevState) => ({ price: event.target.value }));
  };

  updateTitle = (event) => {
    this.setState((prevState) => ({ title: event.target.value }));
  };

  updateImageUrl = (event) => {
    this.setState((prevState) => ({ imageUrl: event.target.value }));
  };

  renderBrand = () => {
    const { brand } = this.state;
    return (
      <div className="renderDetails">
        <label htmlFor="brand">Brand</label>
        <input
          id="brand"
          type="text"
          value={brand}
          onChange={this.updateBrand}
        />
      </div>
    );
  };

  renderTitle = () => {
    const { title } = this.state;
    return (
      <div className="renderDetails">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          value={title}
          id="title"
          onChange={this.updateTitle}
        />
      </div>
    );
  };

  renderPrice = () => {
    const { price } = this.state;
    return (
      <div className="renderDetails">
        <label htmlFor="price">Price</label>
        <input
          type="text"
          value={price}
          id="price"
          onChange={this.updatePrice}
        />
      </div>
    );
  };

  renderImageUrl = () => {
    const { imageUrl } = this.state;
    return (
      <div className="renderDetails">
        <label htmlFor="imageurl">Image URL</label>
        <input
          type="url"
          className="input"
          id="imageurl"
          value={imageUrl}
          onChange={this.updateImageUrl}
        />
      </div>
    );
  };

  renderRating = () => {
    const { rating } = this.state;
    return (
      <div className="renderDetails">
        <Typography>Rating </Typography>
        <Rating name="rate" value={rating} onChange={this.updateRating} />
      </div>
    );
  };

  updateRating = (event) => {
    this.setState((prevState) => ({ rating: event.target.value }));
  };

  updateProductDetails = async (event) => {
    event.preventDefault();
    const jwtToken = Cookies.get("jwt_token");
    const { brand, title, price, imageUrl, rating } = this.state;
    const productDetails = { brand, title, price, imageUrl, rating };
    const url = "https://apis.ccbp.in/products";
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(productDetails),
    };
  };

  render() {
    return (
      <form onSubmit={this.updateProductDetails} className="add-product">
        <div>{this.renderBrand()}</div>
        <div>{this.renderTitle()}</div>
        <div>{this.renderPrice()}</div>
        <div>{this.renderImageUrl()}</div>
        <div>{this.renderRating()}</div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    );
  }
}

export default AddProduct;
