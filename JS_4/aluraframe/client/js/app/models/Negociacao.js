    class Negociacao {
    constructor(data, quantidade, valor){
        this._data = data
        this._quantidade = quantidade
        this._valor = valor
        Object.freeze(this) //Congelando o objeto, deixando ele imutavel
    }

    get volume(){
        return this._quantidade*this.valor
    }
    get data(){
        return this._data
    }
    get quantidade(){
        return this._quantidade
    }
    get valor(){
        return this._valor
    }
}