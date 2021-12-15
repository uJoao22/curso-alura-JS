class NegociacaoServices{
    constructor(){
        this._http = new HttpService()
    }

    //USANDO AJAX COM JAVASCRIPT PURO
    obterNegociacoesDaSemana(){
        return new Promise((resolve, reject) => { //Criando a promessa, com os parametros de sucesso e erro
            this._http.get("negociacoes/semana").then(negociacoes => {
                resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data),  objeto.quantidade, objeto.valor)))
            }).catch(error => {
                console.log(eror)
                reject("Não foi possível obter as negociações da semana")
            })
        })
    }

    obterNegociacoesDaSemanaAnterior(){
        return new Promise((resolve, reject) => {
            this._http.get("negociacoes/anterior").then(negociacoes => {
                resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data),  objeto.quantidade, objeto.valor)))
            }).catch(error => {
                console.log(eror)
                reject("Não foi possível obter as negociações da semana anterior")
            })
        })
    }

    obterNegociacoesDaSemanaRetrasada(){
        return new Promise((resolve, reject) => {
            this._http.get("negociacoes/retrasada").then(negociacoes => {
                resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data),  objeto.quantidade, objeto.valor)))
            }).catch(error => {
                console.log(eror)
                reject("Não foi possível obter as negociações da semana retrasada")
            })
        })
    }

    obterNegociacoes() {
        //Retornando um Promise.all para o metodo. O Promise.all executa varias promesas e retorna na ordem que foram inseridas, se ele retornar sucesso nas promesas, ele pega as os dados de cada semana que vieram repetidos e reduz para apenas uma vez, em seguinda mapeia o array criando uma nova negociacao com os dados, e por final se tudo der certo ele retorna a nova Negociacao criada, se der errado, retorna uma mensagem de erro
        return Promise.all([
            this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()
        ]).then(periodos => {
            let negociacoes = periodos
                .reduce((dados, periodo) => dados.concat(periodo), [])
                .map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor ))
            return negociacoes
        }).catch(erro => {
            throw new Error(erro)
        })
    }

    cadastra(negociacao){
        //Estabelecendo a conexão com o banco IndexedDB, se a conexão retornar sucessso, então cria uma nova NegociacaoDao para adicionar os itens no banco, se der certo retorna uma mensagem de sucesso, se não ele retorna uma menssagem de erro
        return ConnectionFactory.getConnection().then(connection => new NegociacaoDao(connection))
            .then(dao => dao.adiciona(negociacao)).then(() => "Negociação adicionada com sucesso")
            .catch((erro) => {
                console.log(erro)
                throw new Error("Não foi possível adicionar a negociação")
            })
    }

    lista(){
        return ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .catch(erro => {
                console.log(erro)
                throw new Error("Não foi posssível obter as negociações")
            })
    }

    apaga(){
        return ConnectionFactory.getConnection()
        .then(connection => new NegociacaoDao(connection))
        .then(dao => dao.apagaTodos())
        .then(() => "Negociações apagadas com sucesso")
        .catch(erro => {
            console.log(erro)
            throw new Error("Não foi possível apagar as negociações")
        })
    }
}