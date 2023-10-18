import {Box, Chip, Grid, Typography} from "@mui/material";
import {WEEKDAYS} from "../constants";
import {TimePicker} from "@mui/x-date-pickers/TimePicker";

export const WorkTimePicker = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography variant="h5">Working days</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h5">Working time</Typography>
      </Grid>
      <Grid item container xs={6}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          {WEEKDAYS.map((day) => (
            <Chip
              key={day}
              label={day}
              variant="filled"
              clickable
              color="primary"
            />
          ))}
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h6">From</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6">To</Typography>
          </Grid>
          <Grid item xs={6}>
            <TimePicker />
          </Grid>
          <Grid item xs={6}>
            <TimePicker />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
