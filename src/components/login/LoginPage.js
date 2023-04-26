import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { LockOpen } from "@mui/icons-material";

function LoginPage() {
  return (
    <div>
      <Box sx={{ width: '100%', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Typography variant="h1" align="center">
              Hello there.
          </Typography>
      </Box>
      <Box sx={{ width: '10%', position: 'fixed', top: '1%', left: '50%', transform: 'translate(-50%, -1%)', opacity: '1%', textAlign: 'center' }}>
        <Link to="/home"><LockOpen color="primary" fontSize="small"/></Link>
      </Box>
    </div>
  );
}

export default LoginPage;