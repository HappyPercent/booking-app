import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {Formik, FormikErrors} from "formik";
import * as Yup from "yup";
import api from "../../../client/api";
import {useTranslation} from "react-i18next";
import {useGetCategories} from "../../../core/hooks/useGetCategories";
import {
  INewServiceDialogProps,
  INewServiceFormData,
  ISubcategorySelectProps,
} from "./types";
import AddIcon from "@mui/icons-material/Add";
import {useCurrencyAll} from "../../../core/hooks/useCurrencyAll";

const schema = Yup.object().shape({
  name: Yup.string().required("Required"),
  categoryGroupId: Yup.string().required("Required"),
  categoryId: Yup.string().required("Required"),
  shortDescr: Yup.string(),
  descr: Yup.string(),
  pricePack: Yup.array().of(
    Yup.object().shape({
      duration: Yup.number()
        .required("Required")
        .min(15, "Min duration - 15 min"),
      price: Yup.number().required("Required").min(1),
      currency: Yup.object()
        .shape({
          code: Yup.string().required("Required"),
        })
        .required("Required"),
    })
  ),
});

const initialValues: INewServiceFormData = {
  name: "",
  categoryGroupId: "",
  categoryId: "",
  shortDescr: "",
  descr: "",
  pricePack: [
    {
      duration: 0,
      price: 0,
      currency: {code: ""},
    },
  ],
};

export const NewServiceDialog = ({open, onClose}: INewServiceDialogProps) => {
  const {data: categories} = useGetCategories();
  const {t} = useTranslation();
  const queryClient = useQueryClient();
  const {mutate: addService} = useMutation(api.createService, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["services"]);
      if (data.ok) {
        onClose();
      }
    },
  });
  const {data: currency} = useCurrencyAll();

  const handleSubmit = (values: INewServiceFormData) => {
    addService({
      ...values,
      pricePack: values.pricePack.map((pack) => ({
        ...pack,
        currency: pack.currency?.code || "USD",
      })),
    });
  };

  return (
    <Dialog open={open} fullWidth onClose={onClose}>
      <DialogTitle>{t("Add service")}</DialogTitle>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        {({
          values,
          handleChange,
          touched,
          errors,
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
                label={t("Name")}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
              />
              <FormControl
                error={!!touched.categoryGroupId && !!errors.categoryGroupId}
              >
                <InputLabel>{t("Category")}</InputLabel>
                <Select
                  label={t("Category")}
                  onChange={(e) => {
                    setFieldValue("categoryGroupId", e.target.value);
                    setFieldValue("categoryId", "");
                  }}
                  value={values.categoryGroupId}
                  name="categoryGroupId"
                  error={!!touched.categoryGroupId && !!errors.categoryGroupId}
                >
                  {categories?.content.map((category) => (
                    <MenuItem value={category.id}>{category.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <SubcategorySelect
                categoryId={values.categoryGroupId}
                onChange={handleChange}
                value={values.categoryId}
                error={!!touched.categoryId && !!errors.categoryId}
              />
              <TextField
                label={t("Description")}
                multiline
                rows={3}
                onChange={handleChange}
                value={values.descr}
                name="descr"
                error={!!touched.descr && !!errors.descr}
              />
              <TextField
                label={t("Short description")}
                onChange={handleChange}
                value={values.shortDescr}
                name="shortDescr"
                error={!!touched.shortDescr && !!errors.shortDescr}
              />
              {values.pricePack.map((pricePack, index) => (
                <>
                  <InputLabel>
                    {t("Price pack")} {index + 1}
                  </InputLabel>
                  <TextField
                    label={t("Duration")}
                    type="number"
                    onChange={handleChange}
                    value={pricePack.duration}
                    name={`pricePack.${index}.duration`}
                    error={
                      !!touched.pricePack?.[index]?.duration &&
                      !!(
                        errors.pricePack?.[index] as FormikErrors<{
                          duration: number;
                        }>
                      )?.duration
                    }
                  />
                  <TextField
                    label={t("Price")}
                    type="number"
                    onChange={handleChange}
                    value={pricePack.price}
                    name={`pricePack.${index}.price`}
                    error={
                      !!touched.pricePack?.[index]?.price &&
                      !!(
                        errors.pricePack?.[index] as FormikErrors<{
                          price: number;
                        }>
                      )?.price
                    }
                  />
                  <FormControl
                    error={
                      !!touched.pricePack?.[index]?.currency &&
                      !!(
                        errors.pricePack?.[index] as FormikErrors<{
                          currency: number;
                        }>
                      )?.currency
                    }
                  >
                    <Select
                      value={pricePack.currency?.code}
                      onChange={handleChange}
                      name={`pricePack.${index}.currency.code`}
                      error={
                        !!touched.pricePack?.[index].currency &&
                        !!(
                          errors.pricePack?.[index] as FormikErrors<{
                            currency: number;
                          }>
                        )?.currency
                      }
                    >
                      {currency?.data?.map((currency) => (
                        <MenuItem key={currency.code} value={currency.code}>
                          {currency.code}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </>
              ))}
              <Button
                color="primary"
                variant="contained"
                onClick={() =>
                  setFieldValue("pricePack", [
                    ...values.pricePack,
                    {duration: 0, price: 0, currency: {code: ""}},
                  ])
                }
                endIcon={<AddIcon />}
              >
                {t("Add pack")}
              </Button>
            </Stack>
            <DialogActions>
              <Button onClick={onClose}>{t("Cancel")}</Button>
              <Button
                onClick={() => handleSubmit()}
                color="primary"
                variant="contained"
              >
                {t("Create")}
              </Button>
            </DialogActions>
          </DialogContent>
        )}
      </Formik>
    </Dialog>
  );
};

const SubcategorySelect = ({
  categoryId,
  value,
  onChange,
  error,
}: ISubcategorySelectProps) => {
  const {t} = useTranslation();
  const subcategories = useQuery(
    ["subcategories", categoryId],
    () => api.getCategoryChildByRootId(categoryId),
    {
      enabled: !!categoryId,
    }
  );
  return (
    <FormControl error={error}>
      <InputLabel>{t("Subcategory")}</InputLabel>
      <Select
        label={t("Subcategory")}
        onChange={onChange}
        value={value}
        name="categoryId"
        error={error}
      >
        {subcategories.data?.data?.content.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
