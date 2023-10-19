import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {Formik} from "formik";
import * as Yup from "yup";
import {getAllCountries} from "../../core/requests/getAllCountries";
import {useMemo} from "react";
import {getCityByCountry} from "../../core/requests/getCityByCountry";
import {ICity, ICountry} from "../../core/constants/types";
import {createDesk} from "../../core/requests/createDesk";

const schema = Yup.object().shape({
  name: Yup.string().required("Required"),
  country: Yup.object().required("Required"),
  city: Yup.object().required("Required"),
});

const initialValues = {
  name: "",
  country: null,
  city: null,
} as {
  name: string;
  country: (ICountry & {label: string}) | null;
  city: (ICity & {label: string}) | null;
};

export const NewDeskDialog = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const queryClient = useQueryClient();
  const {mutate} = useMutation(
    (values: {countryId: number; cityId: number; name: string}) =>
      createDesk(values),
    {
      onSuccess: () => {
        onClose();
        queryClient.invalidateQueries(["desks"]);
      },
    }
  );
  const {data: countries} = useQuery<{content: ICountry[]}>(
    ["countries"],
    getAllCountries,
    {
      enabled: open,
    }
  );

  const countriesOptions = useMemo(
    () =>
      countries?.content.map((country: ICountry) => ({
        label: country.name,
        id: country.id,
      })) || [],
    [countries]
  );
  const handleSubmit = (values: typeof initialValues) => {
    if (values.city?.id && values.country?.id) {
      const data = {
        name: values.name,
        cityId: values.city.id,
        countryId: values.country.id,
      };
      mutate(data);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>New desk</DialogTitle>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <DialogContent
            sx={{
              overflow: "visible",
            }}
          >
            <Stack direction={"column"} spacing={3}>
              <TextField
                label="Name"
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
              />
              <Autocomplete
                onChange={(_, value) => {
                  setFieldValue("country", value);
                  if (values.city?.country?.id !== value?.id) {
                    setFieldValue("city", null);
                  }
                }}
                value={values.country}
                isOptionEqualToValue={(option, value) =>
                  option.id === value?.id
                }
                options={countriesOptions}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={!!touched.country && !!errors.country}
                    label="Country"
                  />
                )}
              />
              <CitySelect
                value={values.city}
                countryId={values.country?.id}
                onChange={(value) => {
                  setFieldValue("city", value);
                }}
                error={!!touched.city && !!errors.city}
              />
            </Stack>
            <DialogActions
              sx={{
                marginTop: 2,
              }}
            >
              <Button onClick={onClose}>Cancel</Button>
              <Button
                onClick={() => handleSubmit()}
                color="primary"
                variant="contained"
              >
                Create
              </Button>
            </DialogActions>
          </DialogContent>
        )}
      </Formik>
    </Dialog>
  );
};

const CitySelect = ({
  countryId,
  value,
  onChange,
  error,
}: {
  countryId?: number;
  value: ICity | null;
  onChange: (value: ICity | null) => void;
  error: boolean;
}) => {
  const {data: cities, isFetching} = useQuery<{content: ICity[]}>(
    ["citiesByCountry", countryId],
    () => getCityByCountry(String(countryId)),
    {
      enabled: !!countryId,
    }
  );
  const citiesOptions = useMemo(
    () =>
      cities?.content.map((city) => ({
        ...city,
        label: city.name,
        id: city.id,
      })) || [],
    [cities]
  );

  return (
    <Autocomplete
      onChange={(_, value) => onChange(value)}
      loading={isFetching}
      value={value}
      isOptionEqualToValue={(option, value) => option.id === value?.id}
      options={citiesOptions}
      renderInput={(params) => (
        <TextField {...params} error={error} label="City" />
      )}
    />
  );
};
