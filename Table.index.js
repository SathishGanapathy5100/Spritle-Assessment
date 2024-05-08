import { Component } from "react";
import "./index.css";

class Table extends Component {
  render() {
    const data = this.props.data;
    const rows = data.map((item) => (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.brand}</td>
        <td>{item.title}</td>
        <td>{item.price}</td>
        <td>{item.imageUrl}</td>
        <td>{item.rating}</td>
      </tr>
    ));
    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Brand</th>
            <th>Title</th>
            <th>Price</th>
            <th>Image URL</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

export default Table;
