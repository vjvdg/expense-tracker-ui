import React, { useMemo, useState } from "react";
import Expense from "../expense/Expense";
import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Paid, History, Analytics } from "@mui/icons-material";

function BasePage() {

  const [index, setIndex] = useState(0);

  return (
    <div>
      {index === 0 && <Expense />}
      <Box sx={{ position: 'fixed', width: '100%', bottom: 0 }}>
        <BottomNavigation
          sx={{ backgroundColor: '#212121', height: 75 }}
          showLabels
          value={index}
          onChange={(event, newValue) => {
            setIndex(newValue);
          }}
        >
          <BottomNavigationAction sx={{ color: '#fff', paddingBottom: '15px' }} label="Expenses" icon={<Paid />} />
          <BottomNavigationAction sx={{ color: '#fff', paddingBottom: '15px' }} label="History" icon={<History />} />
          <BottomNavigationAction sx={{ color: '#fff', paddingBottom: '15px' }} label="Insights" icon={<Analytics />} />
        </BottomNavigation>
      </Box>
    </div>
  );
}

export default BasePage;