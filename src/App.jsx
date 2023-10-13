import { useState } from "react";
import "./App.css";
import axios from "axios";
import DisplayCard from "./components/DisplayCard";
import BannedList from "./components/BannedList";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  // list of desired attributes to obtain from API
  const ATTRIBUTES = ["breed_group", "weight", "height", "life_span", "origin"];

  const [currentDog, setDog] = useState(null);
  const [bannedAttributes, setBan] = useState({
    breed_group: [],
    weight: [],
    height: [],
    life_span: [],
    origin: [],
  });

  const callAPI = async () => {
    // Fetch only data that has breed data attached
    const base_url = "https://api.thedogapi.com/v1/images/search?has_breeds=1";

    // Fetch data
    const response = await axios
      .get(base_url, {
        headers: {
          "x-api-key": API_KEY,
          "content-type": "application/json",
        },
      })
      .catch((error) => {
        alert(error.response.status);
      });

    // Get necessary data
    const data = response.data[0];

    // Extract the attributes we want and return a dog object with those
    // properties
    const extractAttributes = ({
      breeds: [{ name, temperament, ...attributes }],
      url,
    }) => {
      const dog = {
        name: name,
        url: url,
        temperament: temperament,
        attributes: {},
      };

      ATTRIBUTES.map((attribute) => {
        if (typeof attributes[attribute] == "object") {
          if (attribute === "weight") {
            dog["attributes"][attribute] = attributes[attribute]["imperial"] + "lbs";
          } else {
            dog["attributes"][attribute] = attributes[attribute]["imperial"] + "in";
          }
        } else {
          dog["attributes"][attribute] = attributes[attribute];
        }
      });
      return dog;
    };

    const newDog = extractAttributes(data);
    return newDog;
  };

  const addToBan = (e) => {
    const attribute = e.target.getAttribute("data-attribute");
    const value = e.target.getAttribute("data-value");

    if (bannedAttributes[attribute].includes(value)) {
      return;
    }

    const newBannedAttributes = {
      ...bannedAttributes,
      [attribute]: [...bannedAttributes[attribute], value],
    };
    setBan(newBannedAttributes);
  };

  const removeFromBanned = (e) => {
    const attribute = e.target.getAttribute("data-attribute");
    const value = e.target.getAttribute("data-value");

    const newBannedAttributes = {
      ...bannedAttributes,
      [attribute]: bannedAttributes[attribute].filter(curVal => curVal != value)
    };
    setBan(newBannedAttributes);
  }

  const validDog = (dog) => {
    for (const attribute in dog.attributes) {
      if (bannedAttributes[attribute].includes(dog.attributes[attribute])) {
        return false;
      }
    }
    return true;
  };

  const getDog = async () => {
    let dog;
    do {
      dog = await callAPI();
    } while (!validDog(dog));

    setDog(dog);
  };

  return (
    <div className="container">
      <div className="main">
        <h1>Dog Overdose</h1>
        <h4>Discover dogs of every kind!</h4>
        {currentDog ? (
          <DisplayCard dog={currentDog} handleClick={addToBan} />
        ) : (
          <div></div>
        )}
        <button id="next-button" onClick={getDog}>
          Discover!
        </button>
      </div>
      <BannedList bannedAttributes={bannedAttributes} handleClick={removeFromBanned}/>
    </div>
  );
}

export default App;
