class NegociacaoDao{
    constructor(connection){
        this._connection = connection
        this._store = 'negociacoes' //Definindo em qual ObjectStore esse DAO vai operar
    }

    adiciona(negociacao) {
        return new Promise((resolve, reject) => { //A função adiconar retorna uma promise
            //Toda vez que for gravar dados no banco, deve ser feito uma transação

            //Fazendo uma transação para um determinado ObjectStore, do tipo ler e escrever, 'readwrite', solicitando acesso a ela, adicionando a negocicao recebida por parametro dentro da ObjectStore e passando para variavel request o valor da inserção se foi success ou erro
            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(negociacao)

            //Se a adição de dados na ObjectStore der certo, faça
            request.onsuccess = e => resolve() //Enviando o resolve na promise, informando que ela "Cumpriu o que prometeu"

            request.onerror = e => { //Se a adição der errado, retorne o erro
                console.log(e.target.error) //Imprimindo o erro no console
                reject("Não foi possível adicionar a negociação") //Retornando para o reject uma mensagem, para dizer que "Não foi possível cumprir a promesa"
            }
        })
    }

    listaTodos(){
        return new Promise((resolve, reject) => {
            //Fazendo a transação para ter acesso ao ObjectStore, acessando o ObjectStore e criando um cursor para agir como um ponteiro, apontando todos os itens
            let cursor = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor()

            let negociacoes = []

            cursor.onsuccess = e => { //Se o cursor for criado com sucesso, faça
                let atual = e.target.result //atual recebe os dados que o cursor ta apontando naquele momento

                if(atual){ //Se existem dados apontados pelo cursor, faça
                    let dado = atual.value //Passando para dado os valores apontados pelo ponteiro

                    //Inserindo no array os dados como uma nova Negociacao
                    negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor))

                    //Fazendo com que o cursor chame a função 'onsuccess' de novo, mas desta vez com o ponteiro apontando para o proximo item
                    atual.continue()
                } else //Se não tiver dados para listar, ou tiver listado todos, faça
                    resolve(negociacoes) //Passando para resolve o array com os dados das negociacoes
            }

            cursor.onerror = e => {
                console.log(e.target.error)
                reject("Não foi possível listar as negociações")
            }
        })
    }

    apagaTodos(){
        return new Promise((resolve, reject) => {
            //Fazendo a transação para ter acesso ao ObjectStore, acessando o ObjectStore e eecutando um método clear, onde irá retornar uma requisição
            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .clear()

            request.onsuccess = e => resolve("Negociações apagadas com sucesso")

            request.onerror = e => {
                console.log(e.target.error)
                reject("Não foi possível apagar as negociações")
            }
        })
    }
}