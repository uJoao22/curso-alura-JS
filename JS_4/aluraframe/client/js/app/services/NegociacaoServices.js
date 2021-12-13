class NegociacaoServices{
    //USANDO AJAX COM JAVASCRIPT PURO
    obterNegociacoesDaSemana(cb){
        let xhr = new XMLHttpRequest() //Criando uma instancia de XMLHttp

        xhr.open('GET', 'negociacoes/semana') //Preparando para abrir o servidor XMLHttp no metodo GET para o endreço local negociacoes/semana

        // Configurações
        xhr.onreadystatechange = () => { //Toda vez que uma requisição ajax mudar de estado, ela irá executar está função
            if(xhr.readyState == 4){ //Conferindo se os dados foram recebidos

                if(xhr.status == 200){ //Conferindo se veio os dados que requisitei

                    cb(null, JSON.parse(xhr.responseText).map(objeto => new Negociacao(new Date(objeto.data),  objeto.quantidade, objeto.valor)))//Convertendo a resposta em JSON e mapeando ela usando o map e instanciando a Negociacao
                } else {
                    console.log(xhr.responseText)
                    cb("Não foi possível obter as negociações")
                }
            }
        }

        xhr.send() //Eecutar a operação de abrir
    }

    obterNegociacoesDaSemanaAnterior(cb){
        let xhr = new XMLHttpRequest()

        xhr.open('GET', 'negociacoes/anterior')

        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    cb(null, JSON.parse(xhr.responseText).map(objeto => new Negociacao(new Date(objeto.data),  objeto.quantidade, objeto.valor)))
                } else {
                    console.log(xhr.responseText)
                    cb("Não foi possível obter as negociações")
                }
            }
        }

        xhr.send()
    }

    obterNegociacoesDaSemanaRetrasada(cb){
        let xhr = new XMLHttpRequest()

        xhr.open('GET', 'negociacoes/retrasada')

        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    cb(null, JSON.parse(xhr.responseText).map(objeto => new Negociacao(new Date(objeto.data),  objeto.quantidade, objeto.valor)))
                } else {
                    console.log(xhr.responseText)
                    cb("Não foi possível obter as negociações")
                }
            }
        }

        xhr.send()
    }
}