import React from "react";
import { Link } from "react-router-dom";
import Map from "./Map";

function ResultBlock({ name, location, commodity, timestamp, update }) {
  return (
    <div className="my-4">
      <h3>{name}</h3>
      <h4>{location}</h4>
      <div>
        <span>{commodity}</span> <strong>{timestamp}</strong>
      </div>
      <div>
        <span>
          <Link to="/submit">{update}</Link>
        </span>
      </div>
    </div>
  );
}

const SEARCH_RESULTS = [
  {
    name: "Safeway",
    location: "Commercial-Broadway",
    commodity: "5 rolls",
    timestamp: "4 hours ago",
    update: "Share your experience"
  },
  {
    name: "No Frills",
    location: "Pine and 4th",
    commodity: "10 rolls",
    timestamp: "2 hours ago",
    update: "Share your experience"
  }
];

function Homepage() {
  return (
    <div>
      <Map width={"100%"} height={300} />

      {SEARCH_RESULTS.map(result => {
        return <ResultBlock {...result} key={result.name} />;
      })}
    </div>
  );
}

export default Homepage;