import './SectionHeader.scss';

type Props = {
	children?: React.ReactNode;
};

const SectionHeader = ({ children }: Props) => {
	return <header className='section__head'>{children}</header>;
};

export default SectionHeader;
