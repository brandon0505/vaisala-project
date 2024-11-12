import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  TimeFilterKeys,
  timeFilterOptions,
} from "../constants/TimeFilterConfig";
import { EventTypeKeys, eventTypeOptions } from "../constants/EventTypeConfig";
import { FilterFormProps } from "../interfaces/FilterFormProps";

const FilterForm: React.FC<FilterFormProps> = ({
  locationInput,
  setLocationInput,
  timeFilter,
  setTimeFilter,
  eventTypes,
  setEventTypes,
  onSubmit,
}) => {
  const handleEventTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value, checked } = event.target;
    setEventTypes((prevTypes) =>
      checked
        ? [...prevTypes, value as EventTypeKeys]
        : prevTypes.filter((type) => type !== value),
    );
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="max-w-[30rem] w-full"
    >
      <div className="flex items-center gap-2 mb-2">
        <input
          type="text"
          value={locationInput}
          onChange={(e) => setLocationInput(e.target.value)}
          className="p-3 border border-bright rounded bg-dark text-white w-60 h-full text-lg"
          placeholder="Enter location"
        />
        <button
          type="submit"
          className="bg-bright text-dark p-3 rounded w-12 h-full flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>

      <a
        href="https://www.xweather.com/docs/weather-api/reference/places"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm underline text-blue-500 hover:text-blue-700 mb-4 inline-block"
      >
        What's acceptable as a location input?
      </a>

      <div className="mb-4">
        <label className="block font-medium text-bright mb-1">Time Frame</label>
        <select
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value as TimeFilterKeys)}
          className="p-3 border border-bright rounded bg-dark text-white w-full text-lg"
        >
          {timeFilterOptions.map((option) => (
            <option key={option.key} value={option.key}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-medium text-bright mb-1">
          Event Types
        </label>
        <div className="flex flex-wrap gap-4">
          {eventTypeOptions.map((type) => (
            <label
              key={type.key}
              className="flex items-center border border-bright rounded px-3 py-2 text-white text-lg cursor-pointer gap-2"
            >
              <input
                type="checkbox"
                value={type.key}
                checked={eventTypes.includes(type.key as EventTypeKeys)}
                onChange={handleEventTypeChange}
                className="text-middle"
              />
              <FontAwesomeIcon
                icon={type.icon}
                className={`mr-2 ${type.color}`}
              />
              {type.label}
            </label>
          ))}
        </div>
      </div>
    </form>
  );
};

export default FilterForm;
