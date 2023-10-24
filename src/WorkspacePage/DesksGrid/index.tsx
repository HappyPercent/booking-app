import {
  Button,
  Divider,
  List,
  ListItem,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import {IDesk, IService} from "../../core/constants/types";
import {useMemo, useState} from "react";
import {NewDeskDialog} from "./NewDeskDialog";
import {useGetServices} from "../../core/hooks/useGetServices";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {linkProposalToDesk} from "../../core/requests/linkProposalToDesk";

export const DesksGrid = ({
  data = [],
}: {
  data: {[key in IDesk["id"]]: {desk: IDesk; proposals: IService[]}};
}) => {
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
            <Typography variant="h6">{item.desk.name}</Typography>
            {!!item.proposals?.length && (
              <List>
                {item.proposals?.map((proposal) => (
                  <ListItem>{proposal?.name || ""}</ListItem>
                ))}
              </List>
            )}
            <LinkProposalButton
              deskId={item.desk.id}
              services={item.proposals}
            />
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

const LinkProposalButton = ({
  deskId,
  services,
}: {
  deskId: number;
  services: IService[];
}) => {
  const queryClient = useQueryClient();
  const [isLinking, setIsLinking] = useState(false);
  const {data} = useGetServices();
  const avaliableServices = useMemo(
    () =>
      data?.content.filter(
        ({id}) => !services.find((service) => service?.id === id)
      ),
    [data?.content, services]
  );
  const {mutate} = useMutation(
    (proposalId: number) => linkProposalToDesk(proposalId, deskId),
    {
      onSuccess: () => {
        setIsLinking(false);
        queryClient.invalidateQueries(["desks"]);
      },
    }
  );

  const handleClick = (serviceId: number | undefined) => {
    if (serviceId) {
      mutate(serviceId);
    }
  };

  if (isLinking) {
    return (
      <Select>
        {avaliableServices?.map((service) => (
          <MenuItem onClick={() => handleClick(service.id)}>
            {service.name}
          </MenuItem>
        ))}
      </Select>
    );
  }

  return (
    <Button
      onClick={() => setIsLinking(true)}
      variant="outlined"
      size="small"
      disabled={!avaliableServices?.length}
    >
      Link proposal
    </Button>
  );
};
