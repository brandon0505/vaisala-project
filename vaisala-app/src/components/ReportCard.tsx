import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  eventTypeOptions,
  EventTypeOption,
} from "../constants/EventTypeConfig";

interface ReportCardProps {
  report: any;
}

const ReportCard: React.FC<ReportCardProps> = ({ report }) => {
  const eventType: EventTypeOption | undefined = eventTypeOptions.find(
    (type) => type.key === report.report.cat.toLowerCase(),
  );

  const icon = eventType ? eventType.icon : eventTypeOptions[0].icon;
  const iconColor = eventType ? eventType.color : "text-middle";
  const observedValueLabel = eventType?.observedValueLabel;

  return (
    <div className="report-card bg-white shadow-lg rounded-lg p-4 border border-middle flex items-center max-w-[30rem]">
      <div className="flex items-center justify-center w-12 h-full relative">
        <FontAwesomeIcon icon={icon} className={`text-2xl ${iconColor}`} />
        <div className="absolute right-0 h-full border-l border-gray-300 opacity-50"></div>
      </div>

      <div className="pl-4 flex-grow">
        <p className="text-lg font-bold text-middle">
          Type: {report.report.type}
        </p>
        <p className="text-sm text-dark">
          Date: {new Date(report.report.dateTimeISO).toLocaleString()}
        </p>
        <p className="text-sm text-dark">
          Location: {report.place.name}, {report.place.state}
        </p>
        <p className="text-sm text-dark">
          Distance: {report.relativeTo.distanceMI} miles{" "}
          {report.relativeTo.bearingENG}
        </p>
        {report.report.detail.text && observedValueLabel && (
          <p className="text-sm text-dark mt-2">
            {observedValueLabel}: {report.report.detail.text}
          </p>
        )}
        
        {report.report.comments && (
          <p className="text-sm text-dark mt-2">
            Comments: {report.report.comments}
          </p>
        )}
      </div>
    </div>
  );
};

export default ReportCard;
