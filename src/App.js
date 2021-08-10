import GoogleMapReact from 'google-map-react';
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      breweries: [],
    }
  }

  componentDidMount() {
    const url = 'https://api.openbrewerydb.org/breweries';

    fetch(url)
    .then(res => res.json())
    .then((data) => {
      this.setState({ breweries: data })
    })
  }

  render (){
    const {breweries} = this.state;

    const defaultProps = {
      center: {
        lat: 0,
        lng: 0,
      },
      zoom: 11
    };

    return (
      <div className="wrapper">
        <h1>CHECK OUT THESE LOCAL BREWERIES </h1>
          
          <div className="brew-container">
            {breweries.map((brewery) => ( 

            <div className="brewery">
              <div className="brew-info">
                <h3>{brewery.name}</h3>
                <p>Brewery Type: {brewery.brewery_type}</p>
                <p>Address: </p>
                  <ul>
                    <li>Street: {brewery.street}</li>
                    <li>City: {brewery.city}</li>
                    <li>State: {brewery.state}</li>
                    <li>Zip: {brewery.postal_code}</li>
                  </ul>

                  {brewery.website_url != null 
                    ? <a href={brewery.website_url}>Visit the Brewery's Website!</a>
                    : <p>No Website Provided</p>}
              </div>
              
              {brewery.latitude != null 
                ? <div style={{ height: '50vh', width: '50%' }} className="map">
                    <GoogleMapReact
                      
                      // defaultCenter={[defaultProps.center.lat = brewery.latitude, defaultProps.center.lng = brewery.longitude]}
                      //I am not sure why this does not render the map.
                      //It is getting the Lat and Lng from the api, but for some reason I am unable to get it to render properly
                      //I will be using hardcoded values in the meantime

                      defaultCenter={[defaultProps.center.lat = 50, defaultProps.center.lng = 50]}
                      defaultZoom={defaultProps.zoom}>
                    </GoogleMapReact>
                  </div>
                : <div style={{ height: '50vh', width: '50%' }} className="map">
                    <p>No Location Provided</p>
                  </div>     
              }
            </div> ))
            }
          </div>
      </div>
    )
  }  
}

export default App;
