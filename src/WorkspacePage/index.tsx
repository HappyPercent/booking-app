import {Box, Grid} from "@mui/material";
import {ServicesList} from "./ServicesList";
import {DesksGrid} from "./DesksGrid";
import {useMemo, useState} from "react";
import {IDesk, IService} from "../core/constants/types";
import {useGetServices} from "../core/hooks/useGetServices";
import {useGetDesks} from "../core/hooks/useGetDesks";
import {CurrentSchedule} from "./CurrentSchedule";
import {useTranslation} from "react-i18next";

export const WorkspacePage = () => {
  const {t} = useTranslation();
  const [selectedDesk, setSelectedDesk] = useState<number | null>(null); // [1
  const {data: services, isLoading: isServicesLoading} = useGetServices();
  const {data: desks, isLoading: isDesksLoading} = useGetDesks();
  const deskGridData = useMemo(() => {
    const output: {[key in IDesk["id"]]: {desk: IDesk; proposals: IService[]}} =
      {};
    desks?.content.forEach((item: {desk: IDesk; proposal: IService}) => {
      if (output[item.desk.id]) {
        output[item.desk.id].proposals.push(item.proposal);
      } else {
        output[item.desk.id] = {
          desk: {...item.desk},
          proposals: [item.proposal],
        };
      }
    });
    return output;
  }, [desks?.content]);

  if (isDesksLoading || isServicesLoading) {
    return <div>{t("Loading")}...</div>;
  }

  return (
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
          <ServicesList data={services?.content} />
        </Grid>
        <Grid
          sx={{
            paddingBottom: 2,
            overflow: "auto",
          }}
          item
          xs={6}
          lg={10}
        >
          <DesksGrid
            data={deskGridData}
            onDeskClick={setSelectedDesk}
            selectedDesk={selectedDesk}
          />
        </Grid>
        {!!selectedDesk && (
          <Grid item xs={12}>
            <CurrentSchedule deskId={selectedDesk} />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
