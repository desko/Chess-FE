type Props = {
	type?: 'submit' | 'button' | 'reset';
	text: string;
	modifiers?: string[];
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	disabled?: boolean;
};

const Button = ({
	type = undefined,
	text,
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
			{text}
		</button>
	);
};

export default Button;
