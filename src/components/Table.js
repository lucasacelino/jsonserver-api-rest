import React from "react"
import Form from "./Form"

/*
O componente Table
*/
const Table = ({ users, postUser, updateUser, deleteUser }) => {
	const showUpdateUser = id => {
		const form = document.getElementsByClassName(`show-form-${id}`)
		form[0].classList.toggle("hide-form")
	}

	/*Abaixo é criado um componente Row que recebe a variável user como um props. a variável user irá receber as propriedades que serão solicitadas para salvar as informações de um usuário.
	*/
	const Row = ({ user }) => {
		return (
			<>

				{/*Na div abaixo, são exibidos os valores de cada propridade do usuário, como: nome, email, telefone e empresa*/}
				<div className='row'>
					<div>{user.name}</div>
					<div>{user.email}</div>
					<div>{user.phone}</div>
					<div>{user.companies.name}</div>
					<div className='buttons'>
						
						{/*Quando clicado, o botão abaixo atualiza os dados de um usuário específico através do seu id*/}
						<button onClick={() => showUpdateUser(user.id)}>Update</button>

						{/*Quando clicado, o botão abaixo deleta um usuário específico através do seu id*/}
						<button onClick={() => deleteUser(user.id)}>Delete</button>
					</div>
				</div>

				{/*A div abaixo funciona da seguinte forma: Quando o botão update é clicado os dados do usuário atual são mostrados. O usuário decide se atualiza ou não.*/}
				<div className={`hide-form show-form-${user.id}`}>
					<Form userData={user} postUser={postUser} updateUser={updateUser} />
				</div>
			</>
		)
	}

	return (
		/* é retornado um JSX contendo uma div que especifica o nome das propriedades que devem ser preenchidas*/
		<div className='table'>
			<div className='titles'>
				<div>Name</div>
				<div>Email</div>
				<div>Phone</div>
				<div>Company</div>
				<div>Actions</div>
			</div>

			{/*A div abaixo todos os dados dos usuários salvos*/}
			<div className='rows'>
				{users && users.map(u => <Row user={u} key={u.id} />)}
			</div>
		</div>
	)
}

export default Table
