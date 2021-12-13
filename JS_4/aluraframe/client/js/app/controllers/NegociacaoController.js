class NegociacaoController{

    constructor(){
        let $ = document.querySelector.bind(document)
        this._inputData = $("#data")
        this._inputQuantidade = $("#quantidade")
        this._inputValor = $("#valor")

        // ?????????
        // this._listaNegociacoes = new ListaNegociacoes(model =>  //Usando a arrow function para manter o escopo do this, seu contexto
        //     this._negociacoesView.update(model) //Função para atualizar a view, os dados da tabela
        // )

        this._negociacoesView = new NegociacoesView($('#negociacoesView'))
        this._negociacoesView.update(this._listaNegociacoes) //Quando executar esta função a tabela devera ser incluida no DOM

        this._mensagem = new Mensagem()
        this._mensagemView = new MensagemView($('#mensagemView'))
        this._mensagemView.update(this._mensagem)
    }

    adiciona(event){
        event.preventDefault()
        this._listaNegociacoes.adiciona(this._criaNegociacao())

        this._mensagem.texto = "Negociação adicionada com sucesso" //Quando for adicionada uma nova negociação irá inserir a mensagem no metodo texto de class Mensagem
        this._mensagemView.update(this._mensagem)

        this._limpaFormulario()
    }

    apaga(){
        this._listaNegociacoes.esvazia() //Esvaziando o array que contem as negociações

        this._mensagem.texto = "Negociações apagadas com sucesso" //Inserindo a mensagem no alerta de sucesso
        this._mensagemView.update(this._mensagem) //Exibindo o alerta
    }

    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        )
    }

    _limpaFormulario() {
        this._inputData.value = ''
        this._inputQuantidade.value = 1
        this._inputValor.value = 0.0
        this._inputData.focus()
    }
}