import {AppBar, Box, Button, Container, Grid, Toolbar} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {LOCAL_STORAGE_USER_CREDENTIALS_LABEL} from "../core/constants/localStorage";
import {ServicesList} from "./ServicesList";
import {DesksGrid} from "./DesksGrid";
import {useQuery} from "@tanstack/react-query";
import {getUserDesks} from "../core/requests/getUserDesks";
import {getUserServices} from "../core/requests/getUserServices";
import {getUserDesksWithProposals} from "../core/requests/getUserDesksWithProposals";
import {useMemo} from "react";
import {IDesk, IService} from "../core/constants/types";

export const WorkspacePage = () => {
  const navigate = useNavigate();
  const {data: services, isLoading: isServicesLoading} = useQuery({
    queryKey: ["services"],
    queryFn: getUserServices,
  });
  const {data: desks, isLoading: isDesksLoading} = useQuery({
    queryKey: ["desks"],
    queryFn: getUserDesks,
  });
  const {data: deskWithServices, isLoading: isDesksWithServicesLoading} =
    useQuery({
      queryKey: ["desksWithServices"],
      queryFn: getUserDesksWithProposals,
    });
  const deskGridData = useMemo(() => {
    const output: {[key in IDesk["id"]]: {desk: IDesk; proposals: IService[]}} =
      {};
    deskWithServices.content.forEach(
      (item: {desk: IDesk; proposal: IService}) => {
        if (output[item.desk.id]) {
          output[item.desk.id].proposals.push(item.proposal);
        } else {
          output[item.desk.id] = {
            desk: {...item.desk},
            proposals: [item.proposal],
          };
        }
      }
    );
    desks.content.forEach((item: {desk: IDesk}) => {
      if (!output[item.desk.id]) {
        output[item.desk.id] = {
          desk: {...item.desk},
          proposals: [],
        };
      }
    });
    return output;
  }, [deskWithServices.content, desks.content]);

  const handleLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE_USER_CREDENTIALS_LABEL);
    navigate("/");
  };

  if (isDesksLoading || isServicesLoading || isDesksWithServicesLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{
        paddingTop: 8,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <AppBar position="fixed" color="transparent" sx={{boxShadow: "none"}}>
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
          }}
        >
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          flexGrow: 1,
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            border: 1,
          }}
        >
          <Grid
            item
            xs={6}
            lg={2}
            sx={{
              borderRight: 1,
            }}
          >
            <ServicesList data={services.content} />
          </Grid>
          <Grid item xs={6} lg={8}>
            <DesksGrid data={deskGridData} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
