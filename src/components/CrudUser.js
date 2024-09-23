import React, { useState, useEffect } from "react"
import Form from "./Form"
import Table from "./Table"

import { httpHelper } from "../helpers/httpHelper"

const CrudUser = () => {

	// é definifdo o hook useState para gerenciar as modificações em usuários
	const [users, setUsers] = useState(null)

	// na variável url é definida o endpont(users) que fará as requisições
	const url = "http://localhost:5000/users"

	const api = httpHelper()

	useEffect(() => {
		getUsers()
	}, [])

	const postUser = user => {
		api
			.post(`${url}`, { body: user })
			.then(res => getUsers())
			.catch(err => console.log(err))
	}

	const updateUser = (id, user) => {
		api
			.put(`${url}/${id}`, { body: user })
			.then(res => getUsers())
			.catch(err => console.log(err))
	}

	const deleteUser = id => {
		api
			.del(`${url}/${id}`, {})
			.then(res => getUsers())
			.catch(err => console.log(err))
	}

	const getUsers = () => {
		api
			.get(`${url}?_expand=companies`)
			.then(res => {
				setUsers(res)
			})
			.catch(err => console.log(err))
	}

	// Se não existir usuários, retorna null.
	if (!users) return null

	return (
		<>

			{/*Parte que adiciona um novo usuário*/}
			<h3>New user</h3>
			<Form postUser={postUser} />

			{/*Parte que lista os usuários salvos*/}
			<div className='all-users'>
				<h3>All users</h3>
				<Table
					users={users}
					setUsers={setUsers}
					postUser={postUser}
					updateUser={updateUser}
					deleteUser={deleteUser}
				/>
			</div>
		</>
	)
}

export default CrudUser
