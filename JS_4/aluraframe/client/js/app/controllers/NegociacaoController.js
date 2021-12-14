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
        let service = new NegociacaoServices()

        service.obterNegociacoesDaSemana() //Criando uma promessa de que a função irá obter os dados
            .then(negociacoes => { //Se ela cumprir essa promessa, entrar dentro do resolve, execute
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
                this._mensagem.texto = "Negociação da semana obtida com sucesso."
            }).catch(erro => this._mensagem.texto = erro)

        service.obterNegociacoesDaSemanaAnterior()
            .then(negociacoes => { 
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
                this._mensagem.texto = "Negociação da semana anterior obtida com sucesso."
            }).catch(erro => this._mensagem.texto = erro) 

        service.obterNegociacoesDaSemanaRetrasada()
            .then(negociacoes => { 
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
                this._mensagem.texto = "Negociação da semana retrasada obtida com sucesso."
            }).catch(erro => this._mensagem.texto = erro) 


        // service.obterNegociacoesDaSemana((erro, negociacoes) => {
        //     if(erro){
        //         this._mensagem.texto = erro
        //         return
        //     }

        //     negociacoes.forEach((negociacao => this._listaNegociacoes.adiciona(negociacao)))

        //     service.obterNegociacoesDaSemanaAnterior((erro, negociacoes) => {
        //         if(erro){
        //             this._mensagem.texto = erro
        //             return
        //         }

        //         negociacoes.forEach((negociacao => this._listaNegociacoes.adiciona(negociacao)))

        //         service.obterNegociacoesDaSemanaRetrasada((erro, negociacoes) => {
        //             if(erro){
        //                 this._mensagem.texto = erro
        //                 return
        //             }

        //             negociacoes.forEach((negociacao => this._listaNegociacoes.adiciona(negociacao)))
        //             this._mensagem.texto = "Negociações importadas com sucesso"
        //         })
        //     })
        // })
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