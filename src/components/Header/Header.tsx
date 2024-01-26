import './Header.scss';
import { useState } from 'react';
import Nav from '../Nav/Nav';
import { NAV_LINKS } from './../../common/constants/navLinks';
import { Link } from 'react-router-dom';
import Shell from '../Shell/Shell';
import { useHeaderHeight } from '../../hooks/useHeaderHeight';
import useAppSelector from '../../hooks/useAppSelector';
import useAppDispatch from '../../hooks/useAppDispatch';
import Button from '../Button/Button';
import { logout } from '../../store/features/userSlice';

const Header = ({ title }: { title: string }) => {
	const [active, setActive] = useState(false);
	const dispatch = useAppDispatch();
	const headerRef = useHeaderHeight();
	const { loggedIn } = useAppSelector((store) => store.user);
	const changeHeaderState = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setActive(!active);
	};

	const logoutUser = () => {
		dispatch(logout());
	};

	return (
		<header
			ref={headerRef}
			className={'header ' + (active ? 'is-active ' : '')}
		>
			<Shell>
				<div className='header__inner'>
					<aside className='header__aside'>
						<h1>
							<Link to={'/'}>{title}</Link>
						</h1>
					</aside>

					<div className='header__content'>
						{!loggedIn && (
							<>
								<Link to={'/login'}>login</Link>

								<Link to={'/signup'}>signup</Link>
							</>
						)}

						{loggedIn && (
							<Button onClick={logoutUser} >logout</Button>
						)}

						<div className='header__menu'>
							<div className='header__content'>
								<Nav links={NAV_LINKS} />
							</div>
						</div>

						<button
							className={`nav-trigger ${
								active ? 'is-active' : null
							}`}
							onClick={changeHeaderState}
						>
							<span></span>
						</button>
					</div>
				</div>
			</Shell>
		</header>
	);
};

export default Header;
