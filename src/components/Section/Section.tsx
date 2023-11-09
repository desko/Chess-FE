import './Section.scss';

type Props = {
	children?: React.ReactNode;
	modifiers?: string[];
};

const Section = ({ modifiers = [], children }: Props) => {
	return (
		<section className={`section ${modifiers.join(' ')}`}>
			{children}
		</section>
	);
};

export default Section;
