import React, { useEffect, useState } from "react";
import "./App.css";

const App: React.FC = () => {
  const [peopleName, setPeopleName] = useState<string>("");

  useEffect(() => {
    const getStarWarPeople = async () => {
      const starWarsAPI = await fetch("https://swapi.dev/api/people");
      const response = await starWarsAPI.json();
      setPeopleName(response.results[0].name);
    };
    getStarWarPeople();
  }, []);

  return (
    <div className="App">
      <header className="App-header">{peopleName}</header>
    </div>
  );
};

export default App;
