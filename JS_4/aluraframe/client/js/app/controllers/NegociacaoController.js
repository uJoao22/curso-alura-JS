class NegociacaoController{

    constructor(){
        let $ = document.querySelector.bind(document)
        this._inputData = $("#data")
        this._inputQuantidade = $("#quantidade")
        this._inputValor = $("#valor")

        //Instanciando a class ProxyFactory e chamando o metodo create com, 3 parametros
        this._listaNegociacoes = ProxyFactory.create(new ListaNegociacoes(), ['adiciona', 'esvazia'], model => this._negociacoesView.update(model))

        this._negociacoesView = new NegociacoesView($('#negociacoesView'))
        this._negociacoesView.update(this._listaNegociacoes) //Quando executar esta função a tabela devera ser incluida no DOM

        this._mensagem = ProxyFactory.create(new Mensagem(), ['texto'], model => this._mensagemView.update(model))

        this._mensagemView = new MensagemView($('#mensagemView'))
        this._mensagemView.update(this._mensagem)
    }

    adiciona(event){
        event.preventDefault()
        this._listaNegociacoes.adiciona(this._criaNegociacao())
        this._mensagem.texto = "Negociação adicionada com sucesso" //Quando for adicionada uma nova negociação irá inserir a mensagem no metodo texto de class Mensagem
        this._limpaFormulario()
    }

    apaga(){
        this._listaNegociacoes.esvazia() //Esvaziando o array que contem as negociações
        this._mensagem.texto = "Negociações apagadas com sucesso" //Inserindo a mensagem no alerta de sucesso
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