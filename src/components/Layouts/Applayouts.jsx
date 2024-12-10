import React from "react";
import Title from "../Common/title";
import {Grid} from '@mui/material'
const AppLayout = () =>
  (WrappedComponent) => {
    return (props) => {
        return (
      <>
      <Title/>
        <h1>Header</h1>
        <Grid container height={"calc(100vh-4rem)"}>



            <Grid item xs={4} height={"100%"} >1</Grid>
            <Grid item xs={4} height={"100%"} >2</Grid>
            <Grid item xs={4} height={"100%"} >
        <WrappedComponent {...props} />

            </Grid>
    
        </Grid>
      </>)
    };
  };

export default AppLayout;
