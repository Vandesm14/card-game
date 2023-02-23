import { StyledComponentProps } from '../styles';

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
        <button
          key={i}
          style={{
            fontSize: '1.5rem',
            padding: '10px',
          }}
          onClick={() => onActionClick(action)}
        >
          {action}
        </button>
      ))}
    </div>
  );
};
