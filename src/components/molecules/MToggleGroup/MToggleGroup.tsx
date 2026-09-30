import { AButton } from "@/components/atoms/AButton/AButton";

type ToggleOption<Value extends string> = {
  value: Value;
  label: string;
  itemCount?: number;
};

type ToggleGroupProps<Value extends string> = {
  options: ToggleOption<Value>[];
  value: Value;
  onChange: (value: Value) => void;
};

export const MToggleGroup = <Value extends string>({
  options,
  value,
  onChange,
}: ToggleGroupProps<Value>) => (
  <div className="flex flex-wrap gap-2">
    {options.map((option) => (
      <AButton
        key={option.value}
        variant="secondary"
        aria-pressed={value === option.value}
        onClick={() => onChange(option.value)}
      >
        {option.label}
        {option.itemCount !== undefined && <span className="tabular-nums">{option.itemCount}</span>}
      </AButton>
    ))}
  </div>
);
