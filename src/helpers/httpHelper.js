/*a funçaõ httpHelper executa as as ações dos métodos HTTP. Na função é criada uma função customfecth que executa uma requisição HTTP.*/
export const httpHelper = () => {
	//A função customFetch irá executar uma requisição HTTP a partir de uma url e suas opções de métodos. customeFetch receba a palavra async,isto é, uma função assicrona que retorna uma promessa. 
	const customFetch = async (url, options = {}) => {

  //define como o método padrão o GET 
		const defaultMethod = "GET"

  //define o cabeçalho da requisição o conteúdo para que aceite a resposta dos dados um json. 
		const defaultHeaders = {
			"Content-Type": "application/json",
			Accept: "application/json",
		}

  /* A variável controller recebe a classe AbortController, a classe AbortController executa o cancelamento de uma requisição*/
		const controller = new AbortController()

  // Options recebe de controller a propriedade signal. A propriedade signal executa uma sinalização em relação a execução da requisição. 
		options.signal = controller.signal

  // options.method recebe o método já defenido no objeto ou o método padrão que é o GET
		options.method = options.method || defaultMethod

		//A lógica em options headers é a seguinte: Se existir um cabeçalho, options.headers recebe tudo o que tem em default headers mais o conteúdo definido em options.headers. Caso contrário, é retornado o cabeçalho padrão.
		options.headers = options.headers
			? { ...defaultHeaders, ...options.headers }
			: defaultHeaders

		
		/*A variável options.body recebe o contéudo da requisição, se caso, existir ou falso, se o conteúdo não existir.*/
		options.body = JSON.stringify(options.body) || false

		//Se o corpo da requisição não existir, ou seja, se for falso, deleta o corpo da requisição atual. 
		if (!options.body) delete options.body

		/*É definida um função setTimeout para temporizar o tempo da requisição. Nesse caso, se a requisição ultrapassar o limite de 3 segundos, a requisição atual é cancelada.*/
		setTimeout(() => {
			controller.abort()
		}, 3000)

		try {
   			/*As seguintes linhas abaixo executam as ações:
			response: recebe uma requisição com fetch e await, o await faz com que a requisção espere ser resolvida/executda.
			É retornado a resposta da requisição no formato json.
			Se a requisição não for resolvida/executada, é retornado erro.
			*/
			const response = await fetch(url, options)
			return await response.json()
		} catch (err) {
			return err
		}
	}

	// Abaixo é definida funções que irão executar os métodos HTTP, como: GET, POST, PUT e DELETE
	// método GET
	const get = (url, options = {}) => customFetch(url, options)

	// método POST
	const post = (url, options) => {
		options.method = "POST"
		return customFetch(url, options)
	}

	// método PUT
	const put = (url, options) => {
		options.method = "PUT"
		return customFetch(url, options)
	}

	// método DELETE
	const del = (url, options) => {
		options.method = "DELETE"
		return customFetch(url, options)
	}

	// Retorna um objeto contendo as funções que executam os métodos HTTP
	return {
		get,
		post,
		put,
		del,
	}
}