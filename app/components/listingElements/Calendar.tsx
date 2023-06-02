"use client";

import { DateRange } from "react-date-range";
import { Range } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface CalendarProps {
  setDateRange: (value: any) => void;
  dateRange: Range;
  disabledDateList: Date[] | undefined;
}

const Calendar: React.FC<CalendarProps> = ({
  setDateRange,
  dateRange,
  disabledDateList,
}) => {
  const handleChange = (ranges: any) => {
    setDateRange(ranges.selection);
  };

  return (
    <DateRange
      rangeColors={["#585755"]}
      ranges={[dateRange]}
      onChange={handleChange}
      minDate={new Date()}
      disabledDates={disabledDateList}
    />
  );
};

export default Calendar;
