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
      <div className="brew-container">
        {breweries.map((brewery) => ( 

          // defaultProps.center.lat = brewery.[latitude];
          // defaultProps.center.lng = brewery.longitude;
            

        <div className="brewery">
          <h3>{brewery.name}</h3>
          <p>Brewery Type: {brewery.brewery_type}</p>
          <p>Address: </p>
            <ul>
              <li>Street: {brewery.street}</li>
              <li>City: {brewery.city}</li>
              <li>State: {brewery.state}</li>
              <li>Zip: {brewery.postal_code}</li>
            </ul>
          <a href={brewery.website_url}>website</a>

          
{brewery.latitude != null &&
            <div style={{ height: '100vh', width: '100%' }}>
              <GoogleMapReact
                defaultCenter={[defaultProps.center.lat = brewery.latitude, defaultProps.center.lng = brewery.longitude]}
                defaultZoom={defaultProps.zoom}>
              </GoogleMapReact>
            </div>     }
        </div> ))}
      </div>
    )
  }  
}

// class SimpleMap extends Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       data: this.props.value
//   }
//   }
  
  
// static defaultProps = {
//   center: {
//     lat: this.state.latitude,
//     lng: this.state.data,
//   },
//   zoom: 11
// };




//   render() {

//     return (
//       <div style={{ height: '100vh', width: '100%' }}>
//         <GoogleMapReact
//           // bootstrapURLKeys={{ key: /* YOUR KEY HERE */ }}
//           defaultCenter={this.props.center}
//           defaultZoom={this.props.zoom}
//         >
//           {/* <AnyReactComponent
//             lat={59.955413}
//             lng={30.337844}
//             text="My Marker"
//           /> */}
//         </GoogleMapReact>
//       </div>
//     );
//   }
// }

export default App;
