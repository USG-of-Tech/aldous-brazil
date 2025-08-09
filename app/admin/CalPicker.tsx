import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css"; // don't forget the styles

interface PickerProps {
  date: Date;
  setDate: (date: Date | undefined) => void;
}

function CalPicker({ date, setDate }: PickerProps) {
  return (
    <div>
      <button
        type="button"
        popoverTarget="rdp-popover"
        className="input input-border"
      >
        {date ? date.toLocaleDateString() : "Pick a date"}
      </button>
      <div
        id="rdp-popover"
        popover="auto"
        className="dropdown"
        style={{ padding: "1rem", background: "white", border: "1px solid #ccc" }}
      >
        <DayPicker
          mode="single"
          selected={date}
          onSelect={setDate}
        />
      </div>
    </div>
  );
}

export default CalPicker;
