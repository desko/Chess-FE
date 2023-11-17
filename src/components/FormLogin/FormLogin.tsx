import loginSchema from '../../schemas/loginSchema';
import Button from '../Button/Button';
import FormRow from '../FormRow/FormRow';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { loginUser } from '../../services/servicesUser';
import { useNavigate } from 'react-router-dom';
import './FormLogin.scss';
import { useEffect } from 'react';
import useAppSelector from '../../hooks/useAppSelector';
import useAppDispatch from '../../hooks/useAppDispatch';
import Loader from '../Loader/Loader';

export type LoginSchema = z.infer<typeof loginSchema>;

const FormLogin = () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const dispatch = useAppDispatch();
	const { loginErrors, loggedIn } = useAppSelector((state) => state.user);
	const navigate = useNavigate();
	const { register, handleSubmit, setError, formState } =
		useForm<LoginSchema>({
			mode: 'onTouched',
			resolver: zodResolver(loginSchema),
		});
	const { errors, isSubmitting, isValid } = formState;

	const onSubmit: SubmitHandler<LoginSchema> = async (formData) => {
		await dispatch(loginUser(formData));
	};

	useEffect(() => {
		if (loggedIn) {
			navigate('/');
		}
	}, [loggedIn, navigate]);

	useEffect(() => {
		if (loginErrors) {
			loginErrors?.path?.forEach((field: string) => {
				setError(field as keyof LoginSchema, {
					message: loginErrors.message,
				});
			});
		}
	}, [loginErrors, setError]);

	return (
		<div className='form'>
			<header className='form__header'>
				<h2>Login</h2>
			</header>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='form__body'>
					<FormRow
						type='email'
						label='Email Address'
						name='email'
						placeholder='Email Address'
						register={register}
						error={
							typeof errors?.email?.message === 'string'
								? errors?.email?.message
								: ''
						}
					/>

					<FormRow
						type='password'
						label='Password'
						name='password'
						placeholder='Password'
						register={register}
						error={
							typeof errors?.password?.message === 'string'
								? errors?.password?.message
								: ''
						}
					/>
				</div>

				<div className='form__actions'>
					<Button type='submit' text='Login' disabled={!isValid} />
					{isSubmitting && <Loader />}
				</div>
			</form>
		</div>
	);
};

export default FormLogin;
