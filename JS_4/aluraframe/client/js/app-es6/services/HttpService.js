export class HttpService{
    _handleErros(res){
        if(!res.ok) throw new Error(res.statusTexxt) //Se der algum erro, ele irá lançar o erro
        return res //Se estiver tudo ok ele retornar res
    }

    get(url) {
        //Simplificando a requisição de dados usando Fetch API, recurso do ES2016
        return fetch(url)
            .then(res => this._handleErros(res)) //Chamando o metodo para tratar erros, se estive ok, siga
            .then(res => res.json()) //Após tratamento de erros, retorne a resposta em formato JSON


        // return new Promise((resolve, reject) => {
        //     let xhr = new XMLHttpRequest()

        //     xhr.open('GET', url)

        //     xhr.onreadystatechange = () => {
        //         if(xhr.readyState == 4){
        //             if(xhr.status == 200){
        //                 resolve(JSON.parse(xhr.responseText))
        //             } else {
        //                 reject(xhr.responseText)
        //             }
        //         }
        //     }

        //     xhr.send()
        // })
    }
}