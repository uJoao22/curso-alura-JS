import {ListaNegociacoes} from '../models/ListaNegociacoes'
import {Mensagem} from '../models/Mensagem'
import {NegociacoesView} from '../views/NegociacoesView'
import {MensagemView} from '../views/MensagemView'
import {NegociacaoServices} from '../services/NegociacaoServices'
import {DateHelper} from '../helpers/DateHelper'
import {Bind} from '../helpers/Bind'
import {Negociacao} from '../models/Negociacao'

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

        this._service = new NegociacaoServices()

        this._init()
    }

    _init(){
        //Instanciando uma NegociacaoSerives e chamando o metodo lista que me retorna uma promesa de que os dados serão listados, se der sucesso, ele pega os dados e insere na lista de negociacoes, de der erro ele exibe a mensagem de erro
        this._service.lista().then(negociacoes => negociacoes.forEach(
            negociacao => this._listaNegociacoes.adiciona(negociacao)))
        .catch(error => this._mensagem.texto = error)

        //Chamando o metodo de importaNegociacoes de 3 em 3 segundoss, para que ele messmo se atualize
        setInterval(() => {
            this.importaNegociacoes()
        }, 3000)
    }

    adiciona(event){
        event.preventDefault()

        let negociacao = this._criaNegociacao()

        this._service.cadastra(negociacao).then(mensagem => {
            //Inserindo os dados na lista de negociacao para ver na tela
            this._listaNegociacoes.adiciona(negociacao)
            this._mensagem.texto = mensagem
            this._limpaFormulario()
        }).catch(erro => this._mensagem.texto = erro)
    }

    importaNegociacoes(){
        //Chamando o metodo importa de NegociacaoServices, passando a lista de negociacoes como parametro, recebendo uma promesa informando se essa lista já foi importada ou não, se não ele importa e informa o ususario, se já existe ele não importa e se der erro, ele informa o erro
        this._service.importa(this._listaNegociacoes.negociacoes).then(negociacoes => {
            negociacoes.forEach(negociacao => {
            this._listaNegociacoes.adiciona(negociacao);
            this._mensagem.texto = 'Negociações do período importadas'})
        }).catch(erro => this._mensagem.texto = erro);
    }

    apaga(){
        this._service.apaga().then(mensagem => {
            this._mensagem.texto = mensagem //Inserindo a mensagem no alerta de sucesso
            this._listaNegociacoes.esvazia() //Esvaziando o array que contem as negociações
        }).catch(error => this._mensagem.texto(error))
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