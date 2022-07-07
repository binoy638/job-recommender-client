import { Text } from '@mantine/core';

const LabelWithLeftIcon = ({
  label,
  icon,
}: {
  label: string;
  icon: React.ReactElement;
}) => {
  return (
    <div className="flex items-center gap-1">
      {icon}
      <Text size="sm">{label}</Text>
    </div>
  );
};

export default LabelWithLeftIcon;
