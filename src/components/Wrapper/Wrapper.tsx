type Props = {
	children?: React.ReactNode;
};

const Wrapper = ({children}: Props) => {
	return (
		<div className='Wrapper'>
			{
				children
			}
		</div>
	)
}

export default Wrapper