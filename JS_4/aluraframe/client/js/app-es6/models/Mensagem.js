export class Mensagem{
    constructor(texto=''){ //Atribuindo um valor padrão para o parametro do construtor
        this._texto = texto;
    }

    get texto(){ //Usando o metodo get para visualizar o valor do objeto
        return this._texto
    }

    set texto(texto){ //Usando o metodo set para alterar os dados
        this._texto = texto
    }
}