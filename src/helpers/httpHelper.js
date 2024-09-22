export const httpHelper = () => {
	const customFetch = async (url, options = {}) => {
		const defaultMethod = "GET"
		const defaultHeaders = {
			"Content-Type": "application/json",
			Accept: "application/json",
		}
		const controller = new AbortController()
		options.signal = controller.signal

		options.method = options.method || defaultMethod
		options.headers = options.headers
			? { ...defaultHeaders, ...options.headers }
			: defaultHeaders

		options.body = JSON.stringify(options.body) || false
		if (!options.body) delete options.body

		setTimeout(() => {
			controller.abort()
		}, 3000)

		try {
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