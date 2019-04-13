import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Blog extends Component {
  constructor() {
    super();

    this.state = {
      blogItems: []
    };

    this.getBlogItems = this.getBlogItems.bind(this);
  }

  getBlogItems() {
    axios.get(
      "https://patrickdevincentis.devcamp.space/portfolio/portfolio_blogs",
      { withCredentials: true }
    ).then( response => {
        this.setState( {
            blogItems: response.data.portfolio_blogs
        })
    }).catch(error => {
        console.log('here is the error for the getBlogItems function', error);
    })
  }

  componentDidMount() {
      this.getBlogItems();
  }
  render() {
    return (
      <div>
        <h2>Blog </h2>

        <div>
          <Link to="/about-me"> Read More About Patrick</Link>
        </div>
      </div>
    );
  }
}

export default Blog;
