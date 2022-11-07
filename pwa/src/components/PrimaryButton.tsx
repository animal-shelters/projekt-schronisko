import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<string> {
  children: string;
  onClick?: () => void;
}

function PrimaryButton(props: Props): JSX.Element {
  return (
    <button
      onClick={props.onClick}
      className="bg-primary hover:big-primary-hover dark:bg-primary-dark dark:hover:bg-primary-dark-hover dark:text-white px-6 py-2 rounded-xl"
    >
      {props.children}
    </button>
  );
}

export default PrimaryButton;
