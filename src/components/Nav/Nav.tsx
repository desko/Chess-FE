import "./Nav.scss";

type Link = {
	to: string;
	name: string;
};

type Links = Link[];

const Nav = ({ links }: { links: Links }) => {
	return (
		<nav className='nav'>
			<ul>
				{links.map((link, index) => {
					return (
						<li key={index}>
							<a href={link.to}>{link.name}</a>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default Nav;
