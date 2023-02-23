interface ActionMenuProps {
  actions: string[];
  onActionClick: (action: string) => void;
}

export const ActionMenu = ({ actions, onActionClick }: ActionMenuProps) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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
