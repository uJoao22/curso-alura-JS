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
        this._listaNegociacoes.adiciona(this._criaNegociacao())
        this._mensagem.texto = "Negociação adicionada com sucesso" //Quando for adicionada uma nova negociação irá inserir a mensagem no metodo texto de class Mensagem
        this._limpaFormulario()
    }

    importaNegociacoes(){
        //USANDO AJAX COM JAVASCRIPT PURO
        let xhr = new XMLHttpRequest() //Criando uma instancia de XMLHttp

        xhr.open('GET', 'negociacoes/semana') //Preparando para abrir o servidor XMLHttp no metodo GET para o endreço local negociacoes/semana

        // Configurações
        xhr.onreadystatechange = () => { //Toda vez que uma requisição ajax mudar de estado, ela irá executar está função
            if(xhr.readyState == 4){
                if(xhr.status == 200){

                } else {
                    console.log("Não foi possivel obter as negociações do servidor")
                }
            }
        }

        xhr.send() //Eecutar a operação de abrir
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