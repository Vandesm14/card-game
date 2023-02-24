import { StyledComponentProps } from '../compose/styles';
import { Button } from '@blueprintjs/core';

interface ActionMenuProps extends StyledComponentProps {
  actions: string[];
  onActionClick: (action: string) => void;
}

export const ActionMenu = ({
  actions,
  onActionClick,
  style,
}: ActionMenuProps) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        ...style,
      }}
    >
      {actions.map((action, i) => (
        <Button key={i} onClick={() => onActionClick(action)}>
          {action}
        </Button>
      ))}
    </div>
  );
};
