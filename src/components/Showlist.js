import React, { Component } from "react";
import { Divider } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import CloseIcon from "@mui/icons-material/Close";

class Showlist extends Component {
  constructor(props) {
    super(props);
  }

  self = this;

  delete = (e) => {
    e.currentTarget.closest("div").style.display = "none";
  };

  render() {
    return this.props.data.length > 0 ? (
      this.props.data.map((city) => {
        return (
             <div
              style={{
                fontSize: "20px",
                marginLeft: "20px"
              }}  
              key={city.id}
            >
          { city.name? <Divider
                variant="middle"
                sx={{ backgroundColor: "black", marginTop: "15px" }}
              /> :""}
              {city.name ? city.name +" - ":""} {city.temp ? city.temp+"℃" :""} {city.weather}
              {city.name?<CloseIcon
                sx={{ cursor: "pointer", float: "right",fontSize:'30px' }}
                onClick={this.self.delete}
              /> : ""}
             {city.name ? <CachedIcon sx={{ cursor: "pointer", float: "right",fontSize:'30px' }} onClick={() => this.props.onRefresh(city.id)}/> : ""}
            </div>
        );
      })
    ) : (
      <>
        <Divider
          variant="middle"
          sx={{ backgroundColor: "black", marginTop: "15px",border:'2px solid black' }}
        />
        <h5 style={{ fontSize: "20px", marginLeft: "20px" }}>No data found</h5>
      </>
    );
  }
}

export default Showlist;
