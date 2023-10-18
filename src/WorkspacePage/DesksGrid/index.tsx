import {
  Button,
  Divider,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import {IDesk, IService} from "../../core/constants/types";
import {useMemo, useState} from "react";
import {NewDeskDialog} from "./NewDeskDialog";

export const DesksGrid = ({
  data = [],
}: {
  data: {desk: IDesk; proposal: IService}[];
}) => {
  const [open, setOpen] = useState(false);

  const gridData = useMemo(
    () =>
      data.reduce((curr, next) => {
        const {desk, proposal} = next;
        if (curr[desk.id]) {
          curr[desk.id].proposals.push(proposal);
        } else {
          curr[desk.id] = {...desk, proposals: [proposal]};
        }
        return curr;
      }, {} as {[key in IDesk["id"]]: IDesk & {proposals: IService[]}}),
    [data]
  );

  return (
    <>
      <NewDeskDialog open={open} onClose={() => setOpen(false)} />
      <Stack
        direction={"row"}
        spacing={0}
        divider={<Divider orientation="vertical" flexItem />}
      >
        {Object.values(gridData).map((desk) => (
          <Stack spacing={0} divider={<Divider />}>
            <Typography variant="body2">{desk.name}</Typography>
            <List>
              {desk.proposals.map((proposal) => (
                <ListItem>{proposal.name}</ListItem>
              ))}
            </List>
          </Stack>
        ))}

        <Button
          sx={{
            marginLeft: 2,
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
