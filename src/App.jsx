import { useState } from 'react'
import './App.css'
import axios from 'axios';

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {


  return (
    // Starter template
    <>
    <h1>Dog Overdose</h1>
    <h4>Discover dogs of every kind!</h4>
    <button onClick={handleClick}>Discover!</button>
    </>
  )
}

export default App
