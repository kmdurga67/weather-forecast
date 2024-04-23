import "./App.css";
import React, { useEffect, useState } from "react";
import { Divider, Paper, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Showlist from "./components/Showlist";
import { Rightpanel } from "./components/Rightpanel";
import { Box } from "@mui/material";
import axios from "axios";
import "./components/Leftpanel.css";

function App() {
  const [location, setLocation] = useState("");
  let [city, setCityList] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const key = "e7a6fc3e6e7dec9c3c235f4b659d3542";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${key}`;

  //to fetch data from openweather api
  const searchLocation = () => {
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        window.alert(`No data found at this location: ${location}`);
      });
    setLocation("");
  };

  //to clear the list of data showed from the list
  const clearWeatherList = () => {
    let newProductList = [...city.splice(0, [])];
    newProductList = [];
    setCityList(newProductList);
  };

  //to add data in the list
  const addCity = async () => {
    if (location.trim() === "") {
      window.alert("Please enter a valid city name.");
      return;
    }

    await searchLocation();
  };

  useEffect(() => {
    // Add city to the list once the data state is updated
    if (data.name) {
      const newCity = {
        id: Date.now(), // Assign a unique ID to the city
        name: data?.name,
        temp: data?.main?.temp,
        weather: data?.weather ? data?.weather[0]?.main : null,
      };

      // Check for duplicate location before adding
      const duplicateLocation = city.find((item) => item.name === newCity.name);
      if (duplicateLocation) {
        console.log("Duplicate Location");
        return;
      }

      // Add the new city to the list
      const newCityList = [newCity, ...city];

      // Keep only the first 8 elements in the list
      setCityList(newCityList.slice(0, 8));
    }
  }, [data, city]);

  //to refresh specific row
  const handleRefresh = (cityId) => {
    setLoading(true); // Set loading to true when refresh starts

    const cityToRefresh = city.find((city) => city.id === cityId);

    if (cityToRefresh) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityToRefresh.name}&units=metric&appid=${key}`;

      axios
        .get(url)
        .then((response) => {
          const updatedCityData = {
            id: cityToRefresh.id,
            name: response.data.name,
            temp: response.data.main.temp,
            weather: response.data.weather[0].main,
          };

          const updatedCityList = city.map((cityItem) =>
            cityItem.id === cityToRefresh.id ? updatedCityData : cityItem
          );

          setCityList(updatedCityList);
          setLoading(false); // Set loading to false after refresh is completed
        })
        .catch((error) => {
          setLoading(false); // Set loading to false if refresh encounters an error
          window.alert(`Failed to refresh weather data for ${cityToRefresh.name}`);
        });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        "& > :not(style)": {
          m: 1,
          height: 830,
        },
      }}
    >
      <Paper variant="outlined" sx={{ width: "25%" }}>
        <input
          placeholder="Type city name"
          className="search"
          type="text"
          value={location}
          onChange={(event) => setLocation(event.currentTarget.value)}
        />
        <AddIcon
          sx={{ width: "15%", height: "40px", cursor: "pointer" }}
          onClick={addCity}
        />
        <br></br>
        <Divider
          variant="fullWidth"
          style={{
            backgroundColor: "#000000",
            marginTop: "15px",
            border: "2px solid black",
          }}
        />
        <h5 style={{ fontSize: "25px", marginLeft: "20px" }}>
          Recent Locations
        </h5>
        <Showlist data={city} onRefresh={handleRefresh} />
        <Button
          variant="contained"
          color="secondary"
          sx={{ marginTop: "100px", float: "right" }}
          onClick={clearWeatherList}
        >
          CLEAR
        </Button>
      </Paper>
      <Rightpanel data={data} />
    </Box>
  );
}

export default App;
