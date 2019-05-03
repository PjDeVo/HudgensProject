import React, { Component } from "react";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import BlogFeaturedImage from "../Blog/blog-featured-image";
import BlogForm from "../Blog/blog-form";

export default class BlogDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentId: this.props.match.params.slug,
      blogItem: {},
      editMode: false
    };
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleFeaturedImageDelete = this.handleFeaturedImageDelete.bind(this);
    this.handleUpdateFormSubmission = this.handleUpdateFormSubmission.bind(
      this
    );
  }

  handleUpdateFormSubmission(blog) {
    this.setState({
      blogItem: blog,
      editMode: false
    });
  }

  handleFeaturedImageDelete() {
    this.setState({
      blogItem: {
        featured_image_url: ""
      }
    });
  }

  handleEditClick() {
    if (this.props.loggedInStatus === "LOGGED_IN") {
      this.setState({
        editMode: true
      });
    }
  }

  getBlogItem() {
    axios
      .get(
        `https://patrickdevincentis.devcamp.space/portfolio/portfolio_blogs/${
          this.state.currentId
        }`
      )
      .then(response => {
        this.setState({
          currentId: this.props.match.params.slug,
          blogItem: response.data.portfolio_blog,
          editMode: false
        });
      })
      .catch(error => {
        console.log("here is the error for getBlogItem", error);
      });
  }

  componentDidMount() {
    this.getBlogItem();
  }

  render() {
    const {
      title,
      content,
      featured_image_url,
      blog_status
    } = this.state.blogItem;

    const contentManager = () => {
      if (this.state.editMode) {
        return (
          <BlogForm
            editMode={this.state.editMode}
            blogToEdit={this.state.blogItem}
            handleFeaturedImageDelete={this.handleFeaturedImageDelete}
            handleUpdateFormSubmission={this.handleUpdateFormSubmission}
          />
        );
      } else {
        return (
          <div className="content-container">
            <h1 onClick={this.handleEditClick}> {title}</h1>

            <BlogFeaturedImage img={featured_image_url} />

            <div className="content"> {ReactHtmlParser(content)} </div>
          </div>
        );
      }
    };

    return <div className="blog-container"> {contentManager()} </div>;
  }
}
