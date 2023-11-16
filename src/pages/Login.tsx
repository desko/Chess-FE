import FormLogin from '../components/FormLogin/FormLogin';
import Section from '../components/Section/Section';
import SectionBody from '../components/SectionBody/SectionBody';
import Shell from '../components/Shell/Shell';

const Login = () => {
	return (
		<Section>
			<Shell>
				<SectionBody>
					<FormLogin />
				</SectionBody>
			</Shell>
		</Section>
	);
};

export default Login;
