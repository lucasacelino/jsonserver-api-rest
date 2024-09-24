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

	const submitUser = e => {
		e.preventDefault()

		if (user.companiesId === "0") return

		if (userData.id) {
			updateUser(userData.id, user)
		} else {
			postUser(user)
		}
	}

	return (
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
