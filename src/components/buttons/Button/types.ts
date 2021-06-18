export type ButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactText;
  className?: string;
  type?: 'submit' | 'button' | 'reset';
}
