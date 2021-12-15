class ListaNegociacoes{
    constructor() {
        this._negociacoes = []
    }

    adiciona(negociacao){
        // this._negociacoes = [].concat(this._negociacoes, negociacao) - Gambiarra que resolve o problema, porém não se deve usar por questões de performance
        this._negociacoes.push(negociacao)
    }

    get negociacoes() {
        return [].concat(this._negociacoes)
    }

    esvazia(){
        this._negociacoes = []
    }
}