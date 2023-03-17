import React, { useEffect, useState } from "react";
import "./App.css";

const App: React.FC = () => {
  const [peopleName, setPeopleName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const getStarWarPeople = async () => {
      const starWarsAPI = await fetch("https://swapi.dev/api/people");
      const statusCode = starWarsAPI.status;
      if (statusCode === 200) {
        const response = await starWarsAPI.json();
        setPeopleName(response.results[0].name);
      } else {
        const errorMessage =
          statusCode === 418
            ? "I'm a tea pot 🫖, silly"
            : "Oops... something went wrong, try again 🤕";
        setErrorMessage(errorMessage);
      }
    };
    getStarWarPeople();
  }, []);

  return (
    <div className="App">
      {errorMessage && <div>{errorMessage}</div>}
      <header className="App-header">{peopleName}</header>
    </div>
  );
};

export default App;
