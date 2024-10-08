import React, { useState, useEffect } from "react"
import { httpHelper } from "../helpers/httpHelper"

// o componente DropCompanies serve para listar as empresas disponiveis para que o usuário escolha na hora de salvar os seus dados. É passado cmo parãmetro duas variáveis: companiesId recebe o Id de cada empresa e handleValue captura o valor da empresa escolhida
const DropCompanies = ({ companiesId, handleValue }) => {

	// É definido um useState que gerencia os estado das companies/empresas
	const [companies, setCompanies] = useState(null)

	// É definido um hook que gerencia a lista de empresas 
	const [company, setCompany] = useState(companiesId)

	// recebe a url do endpoint companies, a qual irá executar as requisições
	const url = "http://localhost:5000/companies"

	// a variável api recebe a função httpHelper, a qual irá executar os métodos HTTP
	const api = httpHelper()

	useEffect(() => {
		api
			.get(url) // realiza a requisição do tipo GET

			// Se a requisição for bem sucedida, adiciona a lista de empresas as informações atuais e, posteriormente, adicona o restante dos valores da API.
			.then(res => {
				setCompanies([{ id: 0, name: "Select Company" }, ...res])
			})

			// Se a requisição não for bem sucedida, retorna um erro. 
			.catch(err => console.log(err))
	}, [])

	// Se os dados das companias/empresas não existirem, forem falso, retorna nulo.
	if (!companies) return null

	return (
		<select

			//captura o ID da empresa
			name='companiesId'
			value={company}

			onChange={e => {
				//Adiciona o valor escolhido
				setCompany(e.target.value)

				//captura o valor.
				handleValue(e)
			}}
		>
			{/*Lista as empresas disponiveis utilizando a função map()*/}
			{companies.map(c => (
				<option value={c.id} key={c.id}>
					{c.name}
				</option>
			))}
		</select>
	)
}

export default DropCompanies
