import React, { Component } from "react";
import axios from "axios";

export default class PortfolioDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
        portfolioItem: ''
    }
  }

  componentWillMount() {
    this.getPortfiolioItem();
  }

  getPortfiolioItem() {
    axios
      .get(
        `https://patrickdevincentis.devcamp.space/portfolio/portfolio_items/${
          this.props.match.params.slug
        }`,
        { withCredentials: true }
      )
      .then(response => {
        this.setState({
            portfolioItem: response.data.portfolio_item,

        })
      })
      .catch(error => {
        console.log("this is the error from the get portfolio item", error);
      });
  }

  render() {
      const {
          banner_image_url,
          category,
          description,
          logo_url,
          name,
          thumb_image_url,
          url
      } = this.state.portfolioItem

      const bannerStyles = {
          backgroundImage: "url(" + banner_image_url +  ")",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
      }

      const LogoStyles = {
          width: '200px'
      }
    return (
      <div className = 'portfolio-detail-wrapper'>
        <div className = 'banner' style = {bannerStyles}>
            <img src = {logo_url} style = {LogoStyles}/>
        </div>

        <div className = 'portfolio-detail-description-wrapper'>
            <div className = 'description'>
                {description}
            </div>
            <div className = 'bottom-content-wrapper'>
                <a className = 'site-link' target = '_blank'  href ={url}>
                    Visit {name}
                </a>
            </div>
        </div>
      </div>
    );
  }
}
