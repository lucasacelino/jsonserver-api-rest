import React, { useState, useEffect } from "react"
import { httpHelper } from "../helpers/httpHelper"

const DropCompanies = ({ companiesId, handleValue }) => {
	const [companies, setCompanies] = useState(null)
	const [company, setCompany] = useState(companiesId)

	// recebe a url do endpoint companies, a qual irá executar as requisições
	const url = "http://localhost:5000/companies"

	// a variável api recebe a função httpHelper, a qual irá os métodos HTTP
	const api = httpHelper()

	useEffect(() => {
		api
			.get(url)
			.then(res => {
				setCompanies([{ id: 0, name: "Select Company" }, ...res])
			})
			.catch(err => console.log(err))
	}, [])

	// Se os dados das companias/empresas não existirem, forem falso, retorna nulo.
	if (!companies) return null

	return (
		<select
			name='companiesId'
			value={company}
			onChange={e => {
				setCompany(e.target.value)
				handleValue(e)
			}}
		>
			{companies.map(c => (
				<option value={c.id} key={c.id}>
					{c.name}
				</option>
			))}
		</select>
	)
}

export default DropCompanies
