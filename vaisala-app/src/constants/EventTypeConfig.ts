import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faTornado,
  faCloudMeatball,
  faWind,
  faWater,
} from "@fortawesome/free-solid-svg-icons";

export interface EventTypeOption {
  key: string; // Identifier for the event type
  label: string; // Display label
  icon: IconDefinition; // FontAwesome icon for the event
  color: string; // Color for the icon
  observedValueLabel?: string; // Optional label for observed value
}

export const eventTypeOptions: EventTypeOption[] = [
  { key: "tornado", label: "Tornado", icon: faTornado, color: "text-red-500" },
  {
    key: "hail",
    label: "Hail",
    icon: faCloudMeatball,
    color: "text-blue-400",
    observedValueLabel: "Hail Size",
  },
  {
    key: "wind",
    label: "Wind",
    icon: faWind,
    color: "text-gray-500",
    observedValueLabel: "Wind Speed",
  },
  {
    key: "flood",
    label: "Flood",
    icon: faWater,
    color: "text-blue-500",
    observedValueLabel: "Rainfall Amount",
  },
];

export type EventTypeKeys = (typeof eventTypeOptions)[number]["key"];
