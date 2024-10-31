export interface itemI {
  label?: string;
  value: string;
  icon?: () => JSX.Element;
  disabled?: boolean;
}
