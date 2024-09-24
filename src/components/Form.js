import React, { useState } from "react"
import DropComapies from "./DropCompanies"
/*O componente Form é um componente que irá ser usado para que o usuário informe as informações nos campos especificados. É criado com 3 parâmetros ou props que serão usados para para atualizar os dados de um usuário, criar um novo usuário e manipular os dados do usuário*/
const Form = ({ userData = {}, postUser, updateUser }) => {
	const [user, setUser] = useState({
		name: userData.name ?? "",
		username: userData.username ?? "",
		email: userData.email ?? "",
		phone: userData.phone ?? "",
		companiesId: userData.companiesId ?? "0",
	})

	const handleValue = e => {
		setUser({ ...user, [e.target.name]: e.target.value })
	}

	// A função submitUser, é uma função que realiza a submissão de dados de um usuário.
	const submitUser = e => {
		//A chamada da função preventDefault() evita que ao submeter os dados, a página seja carregada. Apenas os dados serão enviados.
		e.preventDefault()

		//Se o id do usuário for igual a zero, retorne o usuário do mesmo id.
		if (user.companiesId === "0") return

  /*Se o usuário existir, atualize os dados do usuário atual, passando o id e o usuário*/
		if (userData.id) {
			updateUser(userData.id, user)
  //Caso não exista um usuário, é criado um novo usuário. 
		} else {
			postUser(user)
		}
	}

	return (
		
		/* Abaixo é criado um formulário contendo os campos para que sejam preenchidos para a cr de um novo usuário, contendo nome, e-mail, telefone e a empresa */
		<form onSubmit={submitUser} className='row'>
			<input
				type='text'
				name='name'
				value={user.name}
				placeholder='Name'
				onChange={e => handleValue(e)}
			/>
			<input
				type='email'
				name='email'
				value={user.email}
				placeholder='Email'
				onChange={e => handleValue(e)}
			/>
			<input
				type='tel'
				name='phone'
				value={user.phone}
				placeholder='Phone (10)'
				pattern='[0-9]{10}'
				onChange={e => handleValue(e)}
			/>
			<DropComapies companiesId={user.companiesId} handleValue={handleValue} />
			<input
				className='btn-submit'
				type='submit'
				value={`${!userData.id ? "Add new user" : "Save user"}`}
			/>
		</form>
	)
}

export default Form
