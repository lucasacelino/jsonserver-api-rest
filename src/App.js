import { LogoIcon } from "./assets/icons"
import CrudUser from "./components/CrudUser"
import "./styles/App.css"

function App() {
	return (
		<>
			{/*Cabeçalho da aplicação da página*/}
			<header>
				<div className='header__content'>
					<div className='logo'>
						<LogoIcon />
						<strong>JSON SERVER API</strong>
					</div>
				</div>
			</header>
			{/*Abaixo, é definido a página principal da aplicação*/}
			<main>
				<CrudUser />
			</main>
		</>
	)
}

export default App
