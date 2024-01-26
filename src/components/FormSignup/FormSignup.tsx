import { SubmitHandler, useForm } from 'react-hook-form';
import FormRow from '../FormRow/FormRow';
import registerSchema from '../../schemas/registerSchema';
import { z } from 'zod';
import { registerUser } from '../../services/servicesUser';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

type RegisterSchema = z.infer<typeof registerSchema>;
export type ZodError = {
	message: string;
	path: string[];
};

const FormSignup = () => {
	const navigate = useNavigate();
	const { register, handleSubmit, setError, formState } =
		useForm<RegisterSchema>({
			mode: 'onTouched',
			resolver: zodResolver(registerSchema),
		});

	const { errors, isSubmitting, isValid } = formState;

	const onSubmit: SubmitHandler<RegisterSchema> = async (formData) => {
		const response = await registerUser(formData);

		if (response.data[1]) {
			console.log(response.data[1]);

			response.data[1].forEach((field: ZodError) => {
				setError(field.path[0] as keyof RegisterSchema, {
					message: field.message,
				});
			});
		}

		if (response.data[0].success) {
			navigate('/login');
		}
	};

	return (
		<div className='form'>
			<header className='form__header'>
				<h2>Signup</h2>
			</header>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='form__body'>
					<FormRow
						type='email'
						label='Email Address'
						placeholder='Email Address'
						name='email'
						register={register}
						error={
							typeof errors?.email?.message === 'string'
								? errors?.email?.message
								: ''
						}
					/>
					<FormRow
						type='text'
						label='Username'
						placeholder='Username'
						name='username'
						register={register}
						error={
							typeof errors?.username?.message === 'string'
								? errors?.username?.message
								: ''
						}
					/>
					<FormRow
						type='password'
						label='Password'
						placeholder='Password'
						name='password'
						register={register}
						error={
							typeof errors?.password?.message === 'string'
								? errors?.password?.message
								: ''
						}
					/>
					<FormRow
						type='password'
						label='Confirm Password'
						placeholder='Confirm Password'
						name='confirmPassword'
						register={register}
						error={
							typeof errors?.confirmPassword?.message === 'string'
								? errors?.confirmPassword?.message
								: ''
						}
					/>
				</div>

				<div className='form__actions'>
					<Button
						type='submit'
						disabled={!isValid}
					>
						Sign Up
					</Button>
					{isSubmitting && <Loader />}
				</div>
			</form>
		</div>
	);
};

export default FormSignup;
