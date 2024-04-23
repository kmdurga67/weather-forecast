import React, { useEffect, useState } from "react";
import axios from "axios";
import { Paper } from "@mui/material";
import { ReactComponent as Rain } from "../static/rainy-6.svg";
import { ReactComponent as Clear } from "../static/day.svg";
import { ReactComponent as Clouds } from "../static/cloudy.svg";
import { ReactComponent as Haze } from "../static/cloudy-day-2.svg";
import CachedIcon from "@mui/icons-material/Cached";
import Loader from './Loader';
// import '../index.css';

export const Rightpanel = (props) => {
  const [forecastData, setForecastData] = useState([]);
  const [refresh, setRefresh] = useState([]);

  const forecastUrl = props.data.name
    ? `https://api.openweathermap.org/data/2.5/forecast?q=${props.data.name}&units=metric&appid=e7a6fc3e6e7dec9c3c235f4b659d3542`
    : "";

  useEffect(() => {
    const forecastLocation = () => {
      axios.get(forecastUrl).then((response) => {
        setForecastData(response.data);
      });
    };

    forecastLocation();
  }, [forecastUrl]);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  //to fetch five days weather forecast
  const forecast =
    forecastData?.list?.length > 0
      ? forecastData?.list
          ?.filter((item, index) => index % 8 === 0)
          .slice(0, 6)
          .map((item) => {
            const date = new Date(item.dt * 1000);
            const day = days[date.getDay()];
            const temperature = item.main.temp;
            const description = item.weather[0].description;
            const icons = item.weather[0].icon
              ? `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
              : null;
            return { date, day, temperature, description, icons };
          })
      : [];
  return (
    <Paper elevation={0} sx={{ width: "75%" }}>
      {Object.keys(props.data).length > 0 ? (
        <>
          <CachedIcon
            sx={{
              float: "right",
              cursor: "pointer",
              width: "80px",
              height: "80px",
            }}
            // className={refresh ? 'blink' : ''}
            onClick={handleRefresh}
          />
          <h1 className="display-2" style={{ marginLeft: "20px", fontWeight:400 }}>
            {props.data.name}
          </h1>
          <div className="container">
            <div className="row">
              <div className="col-5">
                {props.data.weather[0].main === "Clouds" ? (
                  <Clouds />
                ) : props.data.weather[0].main === "Haze" ? (
                  <Haze />
                ) : props.data.weather[0].main === "Clear" ? (
                  <Clear />
                ) : (
                  <Rain />
                )}
              </div>
              <div className="col-6" style={{ marginTop: "80px" }}>
                <h4>{props.data.main.temp}℃</h4>
                <h4>{props.data.weather[0].description} </h4>
                <h5>
                  <strong>Wind:</strong> {props.data.wind.speed}ms{" "}
                  {props.data.wind.deg}degree{" "}
                </h5>
                <h5>
                  <strong>Pressure</strong> {props.data.main.pressure}
                </h5>
              </div>
            </div>
            <div className="row">
              {forecastData === null ? (
                <p>No data available</p>
              ) : forecastData ? (
                forecastData.cod === "200" ? (
                  <>
                    {/* {
                      <p className="display-6">
                        Here is the next five days weather details of:{" "}
                        <b className="display-6">{forecastData.city.name}</b>
                      </p>
                    } */}
                    {forecast.map((item) => (
                      <div
                        className="col-2"
                        key={item.date}
                        style={{ textAlign: "center" }}
                      >
                        {/* style={{textAlign:"center", border: "6px solid gray", display:'inline-block'}} */}
                        <h3>{item.date.getDate()}</h3>
                        <p>{item.day}</p>
                        <img
                          style={{ height: "100px", width: "90px" }}
                          src={item.icons}
                          alt="weather"
                        />
                        <p>{item.temperature}°C</p>
                      </div>
                    ))}
                  </>
                ) : (
                  <p className="display-4">No data available</p>
                )
              ) : (
                <p className="display-4">Loading...</p>
              )}
            </div>
          </div>
        </>
      ) : (
        <h1 className={refresh ? "blink" : ""}><Loader/>Loading...</h1>
      )}
    </Paper>
  );
};
