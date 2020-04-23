import React from "react";
import { withRouter } from "react-router-dom";

class ScrollToTopOnMount extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return null;
  }
}

export const ScrollToTop = withRouter(ScrollToTopOnMount);

// The API key is restricted through HTTP referer rules.
export const GOOGLE_API_KEY = "AIzaSyB9hwI7b4677POloj5DpmDXaliqU5Dp8sA";

export const geocodeByLatlng = latlng => {
  const geocoder = new window.google.maps.Geocoder();
  return new Promise(resolve => {
    geocoder.geocode({ location: latlng }, (results, status) => {
      resolve(results);
    });
  });
};

export function getAddressComponent(
  addressComponents,
  component,
  isShort = false
) {
  const filtered = addressComponents
    .filter(c => c.types.find(t => t === component))
    .map(c => (isShort ? c.short_name : c.long_name));
  return filtered.length ? filtered[0] : "";
}

export const icons = {
  default: "/assets/marker_red.png",
  highlighted: "/assets/marker_green.png",
  currentLocation: "/assets/current_location.png",
};

export const markerIcon = url => ({
  url,
  scaledSize: { height: 35, width: 21 },
});

export const dotIcon = {
  url: icons.currentLocation,
  scaledSize: new window.google.maps.Size(25, 25),
};

export const isStoreType = types => {
  const invalidTypes = ["political", "locality"];
  return types && !types.filter(type => invalidTypes.indexOf(type) >= 0).length;
};

export function isFunction(functionToCheck) {
  return (
    functionToCheck && {}.toString.call(functionToCheck) === "[object Function]"
  );
}

export function getFirstComma(address) {
  const split = address ? address.split(", ") : [];
  return split.length ? split[0] : address;
}

export const isSameLocation = (a, b) => {
  return a && b && a.lat === b.lat && a.lng === b.lng;
};

export function isMobile() {
  return (
    typeof window.orientation !== "undefined" ||
    navigator.userAgent.indexOf("IEMobile") !== -1
  );
}

export function clusterCalculator(stores) {
  const shortMessage = `${stores.length} Stores`;
  const longMessage = `${stores.length} Store are around here`;
  return {
    text: shortMessage,
    title: longMessage,
    index: 1,
  };
}
export function titleCase(str) {
  let splitStr = str.split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
}

export function spacesAfterCommas(str) {
  return str.replace(/, /g, ",").replace(/,/g, ", ");
}

export function isPwa() {
  const iosPwa = window.navigator && window.navigator.standalone;
  const androidPwa = window.matchMedia("(display-mode: standalone)").matches;
  return iosPwa || androidPwa;
}

export const shareApiIsAvailable = () => {
  return navigator && navigator.share;
};
