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

        this._init()
    }

    _init(){
        //Chamando a promessa de getConnection, se ela for success e gerar a conexão, vai ser criado uma instancia de NegociacaoDao com a conexão como parametro e será chamado o método listaTodos como uma promesa, se ela der success um forEach irá iterar cada uma das negociações trazidas da promessa do listaTodos e irá inserir na lista de negociacoes através do metodo adiciona
        ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .then(negociacoes => negociacoes.forEach(
                negociacao => this._listaNegociacoes.adiciona(negociacao)))
            .catch(error => {
                console.log(erro)
                this._mensagem.texto = error
            })

        //Chamando o metodo de importaNegociacoes de 3 em 3 segundoss, para que ele messmo se atualize
        setInterval(() => {
            this.importaNegociacoes()
        }, 3000)
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
        //Instanciando a claas NegociacaoService para importar as negociacoes
        let service = new NegociacaoServices()

        //Chamando o método obterNegociacoes da class instanciada que me retorna os dados da negociacao importadas como uma promesa, se me retornar corretamente, faço um filtro para comparar se aquelas negociações já foram importadas, se não ele importa, se sim não importa, e então se não tiverem sido importadas cria um loop com a lista com todas negociacoes e insere cada negociacao na class listaNegociacao e exibe a mensagem para o usuario, em caso de erro, ele retorna uma mensagem de erro para o ususario
        service.obterNegociacoes()
        .then(negociacoes => negociacoes.filter(negociacao =>
            !this._listaNegociacoes.negociacoes.some(negociacaoExistente =>
                JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente))))
        .then(negociacoes => negociacoes.forEach(negociacao => {
            this._listaNegociacoes.adiciona(negociacao);
            this._mensagem.texto = 'Negociações do período importadas'
        })).catch(erro => this._mensagem.texto = erro);
    }

    apaga(){
        ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos()
            .then(mensagem => {
                this._mensagem.texto = mensagem //Inserindo a mensagem no alerta de sucesso
                this._listaNegociacoes.esvazia() //Esvaziando o array que contem as negociações
            }))
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