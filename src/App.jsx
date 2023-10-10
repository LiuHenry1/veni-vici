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
    "name",
    "life_span",
    "temperament"
  ]

  const [currentDog, setDog] = useState(null);

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
    console.log(data);
    
    // Extract the attributes we want and return a dog object with those 
    // properties
    const extractAttributes = ({breeds: [info], url}) => {
      const dog = {};
      ATTRIBUTES.map(attribute => {
        if (typeof info[attribute] == "object") {
          dog[attribute] = info[attribute]["imperial"];
        } else {
          dog[attribute] = info[attribute];
        }
      });
      dog["url"] = url;
      console.log(dog);
      return dog;
    }

    const newDog = extractAttributes(data);
    setDog(newDog);
  }


  return (
    // Starter template
    <>
    <h1>Dog Overdose</h1>
    <h4>Discover dogs of every kind!</h4>
    {currentDog ? <DisplayCard dog={currentDog} /> : <div></div>}
    <button onClick={callAPI}>Discover!</button>
    </>
  )
}

export default App
