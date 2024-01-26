import './App.scss';
import Wrapper from './components/Wrapper/Wrapper';
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
	return (
		<Wrapper>
			<Header title='ChessX' />
			<Routes>
				<Route path={'/'} element={<Home />} />
				<Route path={'/login'} element={<Login />} />
				<Route path={'/signup'} element={<Signup />} />
			</Routes>


			<Outlet />
		</Wrapper>
	);
}

export default App;
