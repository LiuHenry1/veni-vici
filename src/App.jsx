import { useState } from 'react'
import './App.css'
import axios from 'axios';
import DisplayCard from './components/DisplayCard';

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  // list of desired attributes to obtain from API
  const ATTRIBUTES = [
    "breed_group",
    "weight",
    "height",
    "life_span",
    "origin"
  ]

  const [currentDog, setDog] = useState(null);
  const [bannedAttributes, setBan] = useState({
    breed_group: [],
    weight: [],
    height: [],
    life_span: [],
    origin: []
  });

  const callAPI = async() => {
    // Fetch only data that has breed data attached
    const base_url = "https://api.thedogapi.com/v1/images/search?has_breeds=1"

    // Fetch data 
    const response = await axios.get(base_url, {
      headers: {
        "x-api-key": API_KEY,
        "content-type": "application/json"
      }
    }).catch(error => {
      alert(error.response.status);
    })

    // Get necessary data
    const data = response.data[0];
    
    // Extract the attributes we want and return a dog object with those 
    // properties
    const extractAttributes = ({breeds: [{name, temperament, ...info}], url}) => {
      const dog = {
        name: name,
        url: url,
        temperament: temperament,
        attributes: {},
      }

      ATTRIBUTES.map(attribute => {
        if (typeof info[attribute] == "object") {
          if (attribute === "weight") {
            dog["attributes"][attribute] = info[attribute]["imperial"] + "lbs"
          } else {
            dog["attributes"][attribute] = info[attribute]["imperial"] + "in"
          }
          
        } else {
          dog["attributes"][attribute] = info[attribute];
        }
      });
      return dog;

    }

    const newDog = extractAttributes(data);
    return newDog;
  }

  const addToBan = (e) => {
    const attribute = e.target.getAttribute("data-attribute");
    const value = e.target.getAttribute("data-value");
    const newBannedAttributes = {
      ...bannedAttributes,
      [attribute]: [...bannedAttributes[attribute], value]
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
  }

  const getDog = async() =>  {
    let dog;
    do {
      dog = await callAPI();
    } while (!validDog(dog))

    setDog(dog);
  }


  return (
    // Starter template
    <>
    <h1>Dog Overdose</h1>
    <h4>Discover dogs of every kind!</h4>
    {currentDog ? <DisplayCard dog={currentDog} handleClick={addToBan}/> : <div></div>}
    <button id="next-button" onClick={getDog}>Discover!</button>
    </>
  )
}

export default App
