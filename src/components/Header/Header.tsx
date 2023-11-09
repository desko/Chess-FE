import "./Header.scss";
import { useState } from "react";
import Nav from "../Nav/Nav";
import { NAV_LINKS } from "./../../common/constants/navLinks";

const Header = ({ title }: { title: string }) => {
	const [active, setActive] = useState(false);

	const changeHeaderState = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setActive(!active);
	};

	return (
		<header className={"header " + (active ? "is-active " : "")}>
			<div className='header__inner'>
				<aside className='header__aside'>
					<h1>
						<a href='' className='logo'>
							{title}
						</a>
					</h1>
				</aside>

				<div className='header__menu'>
					<div className='header__content'>
						<Nav links={NAV_LINKS} />
					</div>
				</div>

				<button
					className={`nav-trigger ${active ? "is-active" : null}`}
					onClick={changeHeaderState}
				>
					<span></span>
				</button>
			</div>
		</header>
	);
};

export default Header;
