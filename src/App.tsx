import React, { useEffect, useState } from "react";
import "./App.css";

const App: React.FC = () => {
  const [peopleName, setPeopleName] = useState<string>("");

  useEffect(() => {
    const getStarWarPeople = async () => {
      const starWarsAPI = await fetch("https://swapi.dev/api/people/1");
      const response = await starWarsAPI.json();
      console.log(
        "🚀 ~ file: App.tsx:11 ~ getStarWarPeople ~ response:",
        response.name
      );
      setPeopleName(response.name);
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
