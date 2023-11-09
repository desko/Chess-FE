type Props = {
	children?: React.ReactNode;
};

const SectionHeader = ( { children } : Props ) => {
	return (
		<header className="section__header">
			{
				children
			}
		</header>
	)
}

export default SectionHeader