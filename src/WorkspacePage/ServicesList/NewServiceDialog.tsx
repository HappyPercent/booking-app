import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Formik} from "formik";
import * as Yup from "yup";
import api from "../../client/api";

const schema = Yup.object().shape({
  name: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
  shortDescr: Yup.string(),
  descr: Yup.string().typeError("Must be a string"),
  duration: Yup.number().required("Required"),
  price: Yup.number().required("Required"),
});

const initialValues = {
  name: "",
  category: "",
  shortDescr: "",
  descr: "",
  duration: 0,
  price: 0,
};

export const NewServiceDialog = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const queryClient = useQueryClient();
  const {mutate: addService} = useMutation(api.createService, {
    onSuccess: () => {
      queryClient.invalidateQueries(["services"]);
      onClose();
    },
  });
  return (
    <Dialog open={open} fullWidth onClose={onClose}>
      <DialogTitle>Create service</DialogTitle>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => addService(values)}
        validationSchema={schema}
      >
        {({values, handleChange, touched, errors, handleSubmit}) => (
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
              <TextField
                label="Category"
                onChange={handleChange}
                value={values.category}
                name="category"
                error={!!touched.category && !!errors.category}
              />
              <TextField
                label="Description"
                multiline
                rows={3}
                onChange={handleChange}
                value={values.descr}
                name="descr"
                error={!!touched.descr && !!errors.descr}
              />
              <TextField
                label="Short description"
                onChange={handleChange}
                value={values.shortDescr}
                name="shortDescr"
                error={!!touched.shortDescr && !!errors.shortDescr}
              />
              <TextField
                label="Duration"
                type="number"
                onChange={handleChange}
                value={values.duration}
                name="duration"
                error={!!touched.duration && !!errors.duration}
              />
              <TextField
                label="Price"
                type="number"
                onChange={handleChange}
                value={values.price}
                name="price"
                error={!!touched.price && !!errors.price}
              />
            </Stack>
            <DialogActions>
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
