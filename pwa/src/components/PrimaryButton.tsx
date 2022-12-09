import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<string> {
  children: string;
  onClick?: () => void;
  busy?: boolean;
}

function PrimaryButton(props: Props): JSX.Element {
  return (
    <button
      onClick={props.onClick}
      className={`${props.busy ? "bg-primary-hover dark:bg-primary-dark-hover" : "bg-primary dark:bg-primary-dark"} hover:bg-primary-hover dark:hover:bg-primary-dark-hover dark:text-white px-6 py-2 rounded-xl ` + props.className}
      type={props.type}
      disabled={props.disabled || props.busy}
    >
      {props.children}
    </button>
  );
}

export default PrimaryButton;
