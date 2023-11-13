import {SelectChangeEvent} from "@mui/material";

export interface INewServiceDialogProps {
  open: boolean;
  onClose: () => void;
}

export interface ISubcategorySelectProps {
  categoryId: string;
  value: string;
  onChange: (e: SelectChangeEvent<string>) => void;
  error: boolean;
}

export interface INewServiceFormData {
  name: string;
  categoryGroupId: string;
  categoryId: string;
  shortDescr: string;
  descr: string;
  pricePack: {
    duration: number;
    price: number;
    currency?: {code: string};
  }[];
}
