import { TimeFilterKeys } from "../constants/TimeFilterConfig";
import { EventTypeKeys } from "../constants/EventTypeConfig";

export interface FilterFormProps {
  locationInput: string;
  setLocationInput: React.Dispatch<React.SetStateAction<string>>;
  timeFilter: TimeFilterKeys;
  setTimeFilter: React.Dispatch<React.SetStateAction<TimeFilterKeys>>;
  eventTypes: EventTypeKeys[];
  setEventTypes: React.Dispatch<React.SetStateAction<EventTypeKeys[]>>;
  onSubmit: () => void;
}
