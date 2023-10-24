import {Box, Chip, Grid, Typography} from "@mui/material";
import {WEEKDAYS} from "../constants";
import {TimePicker} from "@mui/x-date-pickers/TimePicker";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import {DatePicker} from "@mui/x-date-pickers";
import {INewDeskFormValues} from "../DesksGrid/NewDeskDialog/types";

export const WorkTimePicker = ({
  value,
  onChange,
}: {
  value: INewDeskFormValues["schedule"];
  onChange: (values: INewDeskFormValues["schedule"]) => void;
}) => {
  const handleChipClick = (day: number) => {
    const newSchedule = {...value};
    if (newSchedule.workingDays.includes(day)) {
      newSchedule.workingDays = newSchedule.workingDays.filter(
        (d) => d !== day
      );
    } else {
      newSchedule.workingDays.push(day);
    }
    onChange(newSchedule);
  };

  const handleTimeChange = (time: Date | null, type: "from" | "to") => {
    onChange({...value, workingHours: {...value.workingHours, [type]: time}});
  };

  const handlePeriodChange = (date: Date | null, type: "from" | "to") => {
    onChange({...value, workingPeriod: {...value.workingPeriod, [type]: date}});
  };

  if (value.detail) {
    return (
      <FullCalendar
        slotDuration={"00:15:00"}
        plugins={[timeGridPlugin]}
        allDaySlot={false}
        dayHeaderFormat={{weekday: "long"}}
        headerToolbar={false}
      />
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Typography variant="h5">Working days</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h5">Working period</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h5">Working time</Typography>
      </Grid>
      <Grid item container xs={4}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          {Object.entries(WEEKDAYS).map(([key, {label}]) => (
            <Chip
              onClick={() => handleChipClick(Number(key))}
              key={key}
              label={label}
              variant={
                value.workingDays.includes(Number(key)) ? "filled" : "outlined"
              }
              clickable
              color="primary"
            />
          ))}
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h6">From</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6">To</Typography>
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              value={value.workingPeriod.from}
              onChange={(value) => handlePeriodChange(value, "from")}
            />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              value={value.workingPeriod.to}
              onChange={(value) => handlePeriodChange(value, "to")}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h6">From</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6">To</Typography>
          </Grid>
          <Grid item xs={6}>
            <TimePicker
              timezone="system"
              value={value.workingHours.from}
              onChange={(value) => handleTimeChange(value, "from")}
            />
          </Grid>
          <Grid item xs={6}>
            <TimePicker
              timezone="system"
              value={value.workingHours.to}
              onChange={(value) => handleTimeChange(value, "to")}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
