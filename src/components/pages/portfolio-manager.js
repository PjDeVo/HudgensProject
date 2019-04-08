import React, { Component } from "react";
import axios from "axios";
import PortfolioSidebarList from "../portfolio/portfolio-sidebar-list";
import PortfolioForm from "../portfolio/portfolio-form";

export default class PortfolioManager extends Component {
  constructor() {
    super();
    this.state = {
      portfolioItems: []
    };
    this.handleSuccessfulFormSubmission = this.handleSuccessfulFormSubmission.bind(this);
    this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);

  }

  handleSuccessfulFormSubmission(portfolioItem) {
      //TODO
      // Update The Portfolio Items State
      //Add the portfolioItem to the List
  }

  handleFormSubmissionError(error) {
      console.log("handleSubmissionError Error", error)
  }

  getPortfolioItems() {
    axios.get(
      "https://patrickdevincentis.devcamp.space/portfolio/portfolio_items",
      { withCredentials: true }
    ).then(response => {
        this.setState({
            portfolioItems: [...response.data.portfolio_items]
        })
        console.log('response from get portfolio items', response)
    }).catch(error => {
        console.log('error is', error)
    })
  }
  componentDidMount() {
      this.getPortfolioItems();
  }
  render() {
    return (
      <div className="portfolio-manager-wrapper">
        <div className="portfolio-left-column">
          <PortfolioForm
            handleSuccessfulFormSubmission={this.handleSuccessfulFormSubmission}
            handleFormSubmissionError = {this.handleFormSubmissionError}

          />
        </div>

        <div className="portfolio-right-column">
          <PortfolioSidebarList data = {this.state.portfolioItems} />
        </div>
      </div>
    );
  }
}