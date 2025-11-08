import { Tabs } from "@radix-ui/themes";

interface PillTabProps {
  value: string;
  isActive: boolean;
  text: string;
  onClick?: () => void;
}

export const PillTab = ({ value, text, onClick }: PillTabProps) => (
  <Tabs.Trigger className="pill-tab" value={value} onClick={onClick}>
    {text}
  </Tabs.Trigger>
);
