import React, { useState, useEffect } from "react"
import Form from "./Form"
import Table from "./Table"

import { httpHelper } from "../helpers/httpHelper"

const CrudUser = () => {

	// é definifdo o hook useState para gerenciar as modificações em usuários
	const [users, setUsers] = useState(null)

	// na variável url é definida o endpont(users) que fará as requisições
	const url = "http://localhost:5000/users"
	
	// A variável api recebe a função httpHelper, a qual irá executar as requisições via os métodos HTTP
	const api = httpHelper()

	useEffect(() => {
		getUsers()
	}, [])

 /* a função postUser cria um novo usuário. Tem como parâmetro a variável user. 
	const postUser = user => {
		api
   // passa como parâmetro a url e user no corpo da requisição
			.post(`${url}`, { body: user })
   
   // Se a requisição for realizada com sucesso retorna uma lista de usuários com o usuário criado. 
			.then(res => getUsers())
			.catch(err => console.log(err))
	}

	const updateUser = (id, user) => {
		api
			.put(`${url}/${id}`, { body: user })
			.then(res => getUsers())
			.catch(err => console.log(err))
	}

	//A função deleteUser, deleta um usuário através do id. 
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
