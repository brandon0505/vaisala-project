import { TimeFilterKeys } from "../constants/TimeFilterConfig";
import { EventTypeKeys } from "../constants/EventTypeConfig";

export interface StormReportProps {
  client_id: string;
  client_secret: string;
  defaultLocation?: string;
  defaultTimeFilter?: TimeFilterKeys;
  defaultEventTypes?: EventTypeKeys[];
}
