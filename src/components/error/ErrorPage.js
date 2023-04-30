import React from "react";
import NotFound from '../../assets/404.svg'
import { Typography } from "@mui/material";

function ErrorPage() {
  return (
    <div style={{
      position: 'fixed',
      top: '40%',
      left: '50%',
      transform: 'translate(-50%, -40%)'
    }}>
      <img src={NotFound} height={390} width={520} />
      <Typography variant="h6" align="center" width='100%'>
        Oops. You're not supposed
        <br/>
        to be here.
      </Typography>
    </div>
  );
}

export default ErrorPage;