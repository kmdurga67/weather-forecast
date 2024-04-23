// import React, { Component } from "react";
// import "./Leftpanel.css";
// import { Divider, Paper } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import Showlist from "./Showlist";

// class Leftpanel extends Component {
//     constructor(props){
//         super(props);
//         console.log(this, props);
//         this.state = {
//             city:''
//         };
//         // this.props.location = this.state.city;
//     }
//     state ={}
//   render() {
//     return (
//       <Paper variant="outlined" sx={{ width: "25%" }}>
//         <input placeholder="Type city name" className="search" type="text"  value={this.state.city}
//           onChange={event => this.props.setLocation({city:event.target.value})} />
//         <AddIcon sx={{ width: "15%", height: "40px",cursor:'pointer' }} onClick={this.props.searchLocation}/>
//         <Divider variant="middle" style={{ backgroundColor: 'black', marginTop:'15px' }} />
//         {this.props.data ? <Showlist data={this.props.data} /> : null}
//       </Paper>
//     );
//   }
// }

// export default Leftpanel;
