import {
  Button,
  IconButton,
  List,
  ListItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import InfoIcon from "@mui/icons-material/Info";
import {NewServiceDialog} from "./NewServiceDialog";
import {useState} from "react";
import {IService} from "../../core/constants/types";

export const ServicesList = ({data = []}: {data: IService[] | undefined}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <NewServiceDialog open={open} onClose={() => setOpen(false)} />
      <List subheader={<Typography variant="h6">Services</Typography>}>
        {data.map((service) => (
          <ServiceListItem data={service} />
        ))}
        <Button
          sx={{
            marginTop: 1,
          }}
          color="primary"
          variant="contained"
          onClick={() => setOpen(true)}
          endIcon={<AddIcon />}
        >
          Add service
        </Button>
      </List>
    </>
  );
};

const ServiceListItem = ({data}: {data: IService}) => {
  return (
    <ListItem
      secondaryAction={
        <Tooltip
          title={
            <Stack direction="column" spacing={0}>
              <Stack direction={"row"} spacing={1}>
                <Typography variant={"body2"}>Description:</Typography>
                <Typography variant={"body2"}>{data.shortDescr}</Typography>
              </Stack>
              <Stack direction={"row"} spacing={1}>
                <Typography variant={"body2"}>Duration:</Typography>
                <Typography variant={"body2"}>{data.duration}</Typography>
              </Stack>
              <Stack direction={"row"} spacing={1}>
                <Typography variant={"body2"}>Price:</Typography>
                <Typography variant={"body2"}>{data.price}</Typography>
              </Stack>
              <Stack direction={"row"} spacing={1}>
                <Typography variant={"body2"}>Category:</Typography>
                <Typography variant={"body2"}>{data.category}</Typography>
              </Stack>
            </Stack>
          }
          placement="right"
        >
          <IconButton>
            <InfoIcon />
          </IconButton>
        </Tooltip>
      }
    >
      <Typography variant="body1">{data.name}</Typography>
    </ListItem>
  );
};
