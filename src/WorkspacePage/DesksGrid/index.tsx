import {
  Button,
  Divider,
  IconButton,
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
import api from "../../client/api";
import {useTranslation} from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";

export const DesksGrid = ({
  data = [],
  onDeskClick,
  selectedDesk,
}: {
  data: {[key in IDesk["id"]]: {desk: IDesk; proposals: IService[]}};
  onDeskClick: (deskId: number) => void;
  selectedDesk: number | null;
}) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const {t} = useTranslation();

  const {mutate: deleteServiceLink} = useMutation(
    (data: {proposalId: number; deskId: number}) =>
      api.deleteProposalLink(data.proposalId, data.deskId),
    {onSuccess: () => queryClient.invalidateQueries(["desks"])}
  );

  return (
    <>
      <NewDeskDialog open={open} onClose={() => setOpen(false)} />
      <Stack
        direction={"row"}
        spacing={1}
        divider={<Divider orientation="vertical" flexItem />}
        display={"-webkit-box"}
      >
        {Object.values(data).map((item) => (
          <Stack spacing={1} divider={<Divider />} sx={{minWidth: "123px"}}>
            <Typography
              style={{cursor: "pointer"}}
              color={item.desk.id === selectedDesk ? "primary" : ""}
              variant="h6"
              onClick={() => onDeskClick(item.desk.id)}
            >
              {item.desk.name}
            </Typography>
            {!!item.proposals?.length && (
              <List>
                {item.proposals?.map((proposal) => (
                  <ListItem
                    secondaryAction={
                      <IconButton
                        onClick={() =>
                          deleteServiceLink({
                            proposalId: proposal.id,
                            deskId: item.desk.id,
                          })
                        }
                      >
                        <CloseIcon />
                      </IconButton>
                    }
                  >
                    {proposal?.name || ""}
                  </ListItem>
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
          {t("New desk")}
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
    (proposalId: number) => api.linkProposalToDesk(proposalId, deskId),
    {
      onSuccess: () => {
        setIsLinking(false);
        queryClient.invalidateQueries(["desks"]);
      },
    }
  );
  const {t} = useTranslation();

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
      {t("Link proposal")}
    </Button>
  );
};
