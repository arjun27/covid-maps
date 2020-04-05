import React, { useRef } from "react";
import { GoogleMap, withGoogleMap, Marker, Circle } from "react-google-maps";
import { GOOGLE_API_KEY, icons, makeIcon, isSameLocation } from "../../utils";

const URL = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${GOOGLE_API_KEY}`;

const defaultMapOptions = {
  fullscreenControl: false,
  mapTypeControl: false,
  streetViewControl: false,
  // `greedy` will disable the two-finger
  // drag behavior on mobile.
  gestureHandling: "greedy"
};

const defaultIcon = makeIcon(icons.default);
const highlightedIcon = makeIcon(icons.highlighted);
const defaultCenter = { lat: 49.281376, lng: -123.111382 };

function MyGoogleMap(props) {
  const refMap = useRef(null);

  const handleMarkerClicked = location => {
    const latLng = { lat: location.latLng.lat(), lng: location.latLng.lng() };
    props.onMarkerSelected && props.onMarkerSelected(latLng);
  };

  const centerProps = props.centerPosition
    ? { center: props.centerPosition }
    : props.currentLocation
    ? { center: props.currentLocation }
    : { center: defaultCenter };
  const getMarkerIcon = location => {
    const isSelected =
      props.selectedLocation &&
      isSameLocation(props.selectedLocation, location);
    return isSelected ? highlightedIcon : defaultIcon;
  };
  const markers = props.locations || [];

  if (props.panToLocation) {
    refMap.current && refMap.current.panTo(props.panToLocation);
  }

  return (
    <GoogleMap
      ref={refMap}
      defaultZoom={13}
      defaultOptions={defaultMapOptions}
      defaultCenter={{ lat: 54, lng: 25 }}
      {...centerProps}
    >
      {markers.map(location => (
        <Marker
          position={location}
          onClick={handleMarkerClicked}
          icon={getMarkerIcon(location)}
        />
      ))}

      <Circle
        center={props.currentLocation}
        radius={70}
        options={{
          strokeColor: "#2688ff",
          strokeOpacity: 0.2,
          strokeWeight: 1,
          fillColor: "#2688ff",
          fillOpacity: 0.4
        }}
      />
    </GoogleMap>
  );
}

const MyMap = withGoogleMap(MyGoogleMap);

class Map extends React.Component {
  render() {
    return (
      <MyMap
        locations={this.props.locations}
        onMarkerSelected={this.props.onMarkerSelected}
        selectedLocation={this.props.selectedLocation}
        panToLocation={this.props.panToLocation}
        centerPosition={this.props.centerPosition}
        currentLocation={this.props.currentLocation}
        googleMapURL={URL}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={this.props.style} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}

export default Map;
