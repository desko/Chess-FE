import FormSignup from '../components/FormSignup/FormSignup';
import Section from '../components/Section/Section';
import SectionBody from '../components/SectionBody/SectionBody';
import Shell from '../components/Shell/Shell';

const Login = () => {
	return (
		<Section>
			<Shell>
				<SectionBody>
					<FormSignup />
				</SectionBody>
			</Shell>
		</Section>
	);
};

export default Login;
