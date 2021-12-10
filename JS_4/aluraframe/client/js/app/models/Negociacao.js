    class Negociacao {
    constructor(data, quantidade, valor){
        //Usando o _ para dizer que as propriedades não devem ser mudadas
        this._data = data
        this._quantidade = quantidade
        this._valor = valor
    }

    getVolume(){
        return this._quantidade*this.valor
    }
    getData(){
        return this._data
    }
    getQuantidade(){
        return this._quantidade
    }
    getValor(){
        return this._valor
    }
}