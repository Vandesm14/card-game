import { StyledComponentProps } from './styles';

interface PProps extends StyledComponentProps {
  children?: React.ReactNode;
}

export const P = (props: PProps) => {
  return (
    <p
      {...props}
      style={{
        margin: '0.4rem',
        ...props.style,
      }}
    />
  );
};
