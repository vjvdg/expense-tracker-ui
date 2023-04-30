import React, { useState } from "react";
import { Box, ButtonBase, Typography } from "@mui/material";
import { LockOpen } from "@mui/icons-material";
import BasePage from "../base/BasePage";
import Hello from "../../assets/hello.gif";

function LoginPage() {

  const [reveal, setReveal] = useState(false);

  return (
    <div>
      {!reveal && 
        <div>
          <div style={{
            position: 'fixed',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -40%)'
          }}
          >
            <img src={Hello} height={280} width={320} />
            <Typography variant="h6" align="center">
              Hello there.
            </Typography>
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
    </div>
  );
}

export default LoginPage;