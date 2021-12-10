class NegociacaoController{

    constructor(){
        let $ = document.querySelector.bind(document)
        this._inputData = $("#data")
        this._inputQuantidade = $("#quantidade")
        this._inputValor = $("#valor")
    }

    adiciona(event){

        event.preventDefault()

        //Enviando os dados pegos pelo controller para a classe model
        let negociacao = new Negociacao(
            this._inputData.value,
            this._inputQuantidade.value,
            this._inputValor.value
        )
    }
}