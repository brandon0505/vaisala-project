export interface TimeFilterOption {
  key: string; // Time frame identifier
  label: string; // Display label
  urlParam: string; // URL parameter format
}

export const timeFilterOptions: TimeFilterOption[] = [
  { key: "24H", label: "Past 24 Hours", urlParam: "-24hours" },
  { key: "48H", label: "Past 48 Hours", urlParam: "-48hours" },
  { key: "7D", label: "Past 7 Days", urlParam: "-7days" },
];

export type TimeFilterKeys = (typeof timeFilterOptions)[number]["key"];
