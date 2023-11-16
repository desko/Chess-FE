import './Shell.scss';

type Props = {
	children?: React.ReactNode;
};

const Shell = ({ children }: Props) => {
	return <div className='shell'>{children}</div>;
};

export default Shell;
