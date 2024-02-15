import { ReactElement } from "react";
import './Button.scss';

type Props = {
	type?: 'submit' | 'button' | 'reset';
	children: ReactElement | string;
	modifiers?: string[];
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	disabled?: boolean;
};

const Button = ({
	type = undefined,
	children,
	modifiers = undefined,
	onClick,
	disabled = false,
}: Props) => {
	return (
		<button
			type={type ? type : 'submit'}
			className={`btn ${modifiers ? modifiers.join(' ') : ''}`}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default Button;
