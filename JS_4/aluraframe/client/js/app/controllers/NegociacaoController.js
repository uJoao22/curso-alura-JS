class NegociacaoController{

    constructor(){
        let $ = document.querySelector.bind(document)
        this._inputData = $("#data")
        this._inputQuantidade = $("#quantidade")
        this._inputValor = $("#valor")

        this._listaNegociacoes = new Bind( //Instanciando a class ProxyFactory e chamando o metodo create com, 3 parametros
            new ListaNegociacoes(), //MOdelo
            new NegociacoesView($('#negociacoesView')), //View
            'adiciona', 'esvazia') //Condição para instanciar

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto')
    }

    adiciona(event){
        event.preventDefault()

        ConnectionFactory.getConnection().then(connection => { //Criando a conexão com o banco IndexedDB
            let negociacao = this._criaNegociacao() //Instanciando o metodo para criar a negociação

            //Instanciando NegociacaoDao, passando por parametro a conexão criada na class ConnectionFactory e adicionando na ObjectStore definida em NegociacaoDao os dados da negociacao
            new NegociacaoDao(connection).adiciona(negociacao).then(() => {
                //Inserindo os dados na lista de negociacao para ver na teça
                this._listaNegociacoes.adiciona(negociacao)
                this._mensagem.texto = "Negociação adicionada com sucesso" //Quando for adicionada uma nova negociação irá inserir a mensagem no metodo texto de class Mensagem
                this._limpaFormulario()
            })
        }).catch(erro => this._mensagem.texto = erro)
    }

    importaNegociacoes(){
        let service = new NegociacaoServices()

        //Usando o Promise.all para executar as promises em uma ordem e retornar os resultados dela na mesma ordem e em caso de erro exibir a mensagem de erro, inserindo as promises em um array
        Promise.all([service.obterNegociacoesDaSemana(), service.obterNegociacoesDaSemanaAnterior(), service.obterNegociacoesDaSemanaRetrasada()]).then(negociacoes => {
            negociacoes.reduce((arrayAchatado, array) => arrayAchatado.concat(array), []) //Reduzindo o array com varias negociacoes em apenas as necessarias
                .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
            this._mensagem.texto = "Negociações importadas com sucesso"
        }).catch(error => this._mensagem.texto = error)
    }

    apaga(){
        this._listaNegociacoes.esvazia() //Esvaziando o array que contem as negociações
        this._mensagem.texto = "Negociações apagadas com sucesso" //Inserindo a mensagem no alerta de sucesso
    }

    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        )
    }

    _limpaFormulario() {
        this._inputData.value = ''
        this._inputQuantidade.value = 1
        this._inputValor.value = 0.0
        this._inputData.focus()
    }
}