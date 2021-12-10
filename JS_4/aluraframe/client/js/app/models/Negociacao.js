    class Negociacao {
    constructor(data, quantidade, valor){
        this._data = new Date(data.getTime())
        this._quantidade = quantidade
        this._valor = valor
        Object.freeze(this) //Congelando o objeto, deixando ele imutavel
    }

    get volume(){
        return this._quantidade*this.valor
    }
    get data(){
        return new Date(this._data.getTime())
    }
    get quantidade(){
        return this._quantidade
    }
    get valor(){
        return this._valor
    }
}