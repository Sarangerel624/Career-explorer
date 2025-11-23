import { Check } from "lucide-react";

type Props = {
  value: number;
  selected: number | null;
  onSelect: () => void;
  color: string;
  plainColor: string;
};

export default function LikertOption({
  value,
  selected,
  onSelect,
  color,
  plainColor,
}: Props) {
  const isActive = selected === value;

  return (
    <button
      onClick={onSelect}
      className={`h-12 w-12 rounded-full flex items-center justify-center border transition-all 
        ${isActive ? color : plainColor}
      `}
    >
      {isActive && <Check className="text-white" />}
    </button>
  );
}
