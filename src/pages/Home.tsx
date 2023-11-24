import Section from '../components/Section/Section';
import SectionHeader from '../components/SectionHeader/SectionHeader';
import SectionBody from '../components/SectionBody/SectionBody';
import Board from '../components/Board/Board';
import Shell from '../components/Shell/Shell';

const Home = () => {
	return (
		<Section>
			<Shell>
				<SectionHeader>
					<h2>Play</h2>
				</SectionHeader>

				<SectionBody>
					<Board />
				</SectionBody>
			</Shell>
		</Section>
	);
};

export default Home;
