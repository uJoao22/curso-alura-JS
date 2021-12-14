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

            request.onsuccess = e => { //Se a adição de dados na ObjectStore der certo, faça
                resolve() //Enviando o resolve na promise, informando que ela "Cumpriu o que prometeu"
            }

            request.onerror = e => { //Se a adição dder errado, retorne o erro
                console.log(e.target.error) //Imprimindo o erro no console
                reject("Não foi possível adicionar a negociação") //Retornando para o reject uma mensagem, para dizer que "Não foi possível cumprir a promesa"
            }
        })
    }
}