type Props = {
	children?: React.ReactNode;
};

const SectionBody = ({ children }: Props) => {
	return <div className='section__body'>{children}</div>;
};

export default SectionBody;
