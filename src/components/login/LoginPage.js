import React, { useState } from "react";
import { Box, ButtonBase, Typography } from "@mui/material";
import { LockOpen } from "@mui/icons-material";
import BasePage from "../base/BasePage";

function LoginPage() {

  const [reveal, setReveal] = useState(false);

  return (
    <div>
      {!reveal && 
        <div>
          <Box 
            sx={{ 
              width: '100%',
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <Typography variant="h1" align="center">
                Hello there.
            </Typography>
          </Box>
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