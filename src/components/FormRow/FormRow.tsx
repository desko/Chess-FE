import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import './FormRow.scss';

type Props<T extends FieldValues> = {
	type: 'text' | 'email' | 'password' | 'date' | 'number';
	label: string;
	name: Path<T>;
	error?: string;
	hint?: string;
	placeholder?: string;
	register: UseFormRegister<T>;
};

const FormRow = <T extends FieldValues>({
	type,
	label,
	name,
	placeholder = '',
	hint = '',
	error = '',
	register,
}: Props<T>) => {
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
