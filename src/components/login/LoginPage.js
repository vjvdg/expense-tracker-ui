import React, { useState } from "react";
import { Box, Button, ButtonBase, Typography } from "@mui/material";
import { LockOpen } from "@mui/icons-material";
import BasePage from "../base/BasePage";
import Hello from "../../assets/hello.gif";
import DemoExpense from "../demo/DemoExpense";
import { PlayArrow } from "@mui/icons-material";

function LoginPage() {

  const [reveal, setReveal] = useState(false);
  const [demo, setDemo] = useState(false);

  return (
    <div>
      {!reveal && !demo && 
        <div>
          <div style={{
            position: 'fixed',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -40%)',
            width: '90%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          >
            {/* <img src={Hello} height={280} width={320} /> */}
            <Typography padding={2} variant="h4" align="center">
              Expense Tracker Application
            </Typography>
            <Button variant="contained" size="large" disableElevation startIcon={<PlayArrow />} onClick={() => setDemo(true)}>
              Demo Application
            </Button>
          </div>
          <Box 
            sx={{
              width: '10%',
              position: 'fixed',
              top: '1%',
              left: '50%',
              transform: 'translate(-50%, -1%)',
              opacity: '1%',
              textAlign: 'center'
            }}
          >
            <ButtonBase onClick={() => setReveal(true)}>
              <LockOpen color="primary" fontSize="small"/>
            </ButtonBase>
          </Box>
        </div>
      }
      {reveal && <BasePage />}
      {demo && <DemoExpense />}
    </div>
  );
}

export default LoginPage;