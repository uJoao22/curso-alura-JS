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
}