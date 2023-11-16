import './FormRow.scss';

type Props = {
	type: 'text' | 'email' | 'password' | 'date' | 'number';
	label: string;
	name: string;
	error?: string;
	hint?: string;
	placeholder?: string;
	// need to figure out register type when passed as prop
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	register: any;
};

const FormRow = ({
	type,
	label,
	name,
	placeholder = '',
	hint = '',
	error = '',
	register,
}: Props) => {
	return (
		<div className='form-row'>
			<label htmlFor={name}>{label}</label>

			<div className='form__input'>
				<input
					type={type}
					id={name}
					placeholder={placeholder}
					{...register(name)}
				/>
			</div>

			{!!hint.length && (
				<div className='form__hint'>
					<p>{hint}</p>
				</div>
			)}

			{!!error.length && (
				<div className='form__error'>
					<p>{error}</p>
				</div>
			)}
		</div>
	);
};

export default FormRow;
