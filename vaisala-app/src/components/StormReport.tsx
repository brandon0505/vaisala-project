import React, { useState, useEffect } from "react";
import { StormReportProps } from "../interfaces/StormReportProps";
import {
  TimeFilterKeys,
  timeFilterOptions,
} from "../constants/TimeFilterConfig";
import { EventTypeKeys } from "../constants/EventTypeConfig";
import ReportCard from "./ReportCard";
import FilterForm from "./FilterForm";

const StormReport: React.FC<StormReportProps> = ({
  client_id,
  client_secret,
  defaultLocation = "",
  defaultTimeFilter = "24H",
  defaultEventTypes = ["flood", "hail"],
}) => {
  const [locationInput, setLocationInput] = useState<string>(defaultLocation);
  const [timeFilter, setTimeFilter] =
    useState<TimeFilterKeys>(defaultTimeFilter);
  const [eventTypes, setEventTypes] =
    useState<EventTypeKeys[]>(defaultEventTypes);
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const isLatitudeLongitude = (input: string): boolean => {
    const [lat, lon] = input
      .split(",")
      .map((coord) => parseFloat(coord.trim()));
    return (
      !isNaN(lat) &&
      !isNaN(lon) &&
      lat >= -90 &&
      lat <= 90 &&
      lon >= -180 &&
      lon <= 180
    );
  };

  const handleSubmit = async () => {
    if (!locationInput.trim()) {
      setLocationError("Please enter a valid location.");
      setError(null);
      setData([]);
      setHasFetched(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    setLocationError(null);

    const selectedTimeOption = timeFilterOptions.find(
      (option) => option.key === timeFilter,
    );
    const fromParam = selectedTimeOption?.urlParam || "-24hours";
    const filterParam = eventTypes.join(";");
    const encodedLocation = encodeURIComponent(locationInput.trim());

    const locationPath = isLatitudeLongitude(locationInput)
      ? `/closest?p=${encodedLocation}&`
      : `/${encodedLocation}?`;

    const requestURL = `https://data.api.xweather.com/stormreports${locationPath}from=${fromParam}&filter=${filterParam}&limit=100&client_id=${client_id}&client_secret=${client_secret}`;
    console.log("Request URL:", requestURL);

    try {
      const response = await fetch(requestURL);
      const result = await response.json();

      if (!result.success || result.error) {
        if (result.error.code === "warn_no_data") {
          setError("No results available based on your query parameters.");
          setData([]);
        } else {
          throw new Error(result.error.description || "Unknown error");
        }
      } else {
        setData(result.response);
        setHasFetched(true);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (hasFetched && locationInput.trim()) {
      handleSubmit();
    }
  }, [eventTypes, timeFilter]);

  return (
    <div className="storm-report bg-dark text-white p-4 w-full max-w-[30rem] mx-auto">
      <h2 className="text-2xl font-semibold text-bright mb-4">
        Filter Storm Reports
      </h2>

      <div className="filter-form w-full max-w-[30rem]">
        <FilterForm
          locationInput={locationInput}
          setLocationInput={setLocationInput}
          timeFilter={timeFilter}
          setTimeFilter={setTimeFilter}
          eventTypes={eventTypes}
          setEventTypes={setEventTypes}
          onSubmit={handleSubmit}
        />
      </div>

      <div className="w-full mt-4">
        {isLoading ? (
          <p className="text-center text-bright">Loading data...</p>
        ) : locationError ? (
          <p className="text-center text-red-500">{locationError}</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : data.length > 0 ? (
          <div className="report-list flex flex-col gap-4">
            {data.map((report, index) => (
              <ReportCard key={index} report={report} />
            ))}
          </div>
        ) : (
          <p className="text-center text-bright">
            No reports available for the selected filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default StormReport;
