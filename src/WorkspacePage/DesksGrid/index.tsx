import {
  Button,
  Divider,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import {IDesk, IService} from "../../core/constants/types";
import {useState} from "react";
import {NewDeskDialog} from "./NewDeskDialog";

export const DesksGrid = ({
  data = [],
}: {
  data: {[key in IDesk["id"]]: {desk: IDesk; proposals: IService[]}};
}) => {
  console.log("data: ", data);
  const [open, setOpen] = useState(false);

  return (
    <>
      <NewDeskDialog open={open} onClose={() => setOpen(false)} />
      <Stack
        direction={"row"}
        spacing={1}
        divider={<Divider orientation="vertical" flexItem />}
      >
        {Object.values(data).map((item) => (
          <Stack spacing={1} divider={<Divider />}>
            <Typography variant="body1">{item.desk.name}</Typography>
            {!!item.proposals?.length && (
              <List>
                {item.proposals?.map((proposal) => (
                  <ListItem>{proposal?.name || ""}</ListItem>
                ))}
              </List>
            )}
            <Button variant="outlined" size="small">
              Link proposal
            </Button>
          </Stack>
        ))}

        <Button
          sx={{
            marginLeft: 2,
            alignSelf: "baseline",
          }}
          variant="contained"
          onClick={() => setOpen(true)}
        >
          New desk
        </Button>
      </Stack>
    </>
  );
};
