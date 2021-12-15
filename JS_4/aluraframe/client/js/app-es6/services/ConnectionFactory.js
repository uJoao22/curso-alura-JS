const stores = ['negociacoes']
const version = 4
const dbName = 'aluraframe'

let connection = null

let close = null

export class ConnectionFactory {
    constructor() {
        //Exibindo uma mensagem de erro, caso tentem instanciar a class ConnectionFactory
        throw new Error("Não é possível criar instâncias de ConnectionFactory")
    }

    static getConnection() { //Criando o método estatico getConnection, para retornar os dados da conexão
        return new Promise((resolve, reject) => { //Retornando para o metodo uma promesa
            //Fazendo uma requisição de abertura para o banco de dados indexedDB
            let openRequest = window.indexedDB.open(dbName, version) //Criando o banco aluraframe, (nome do banco, versão do banco)

            //TRIADE DE EVENTOS DA CONEXÃO

            //Este evento cria ou altera um banco já eistente
            openRequest.onupgradeneeded = e => { //Quando este evento for disparada a função recebe os dados do evento como prametro
                ConnectionFactory._createStores(e.target.result) //Chamando ao metodo estatico passando os dados da conexão como parametro
            }

            //Este evento é executado quando conseguir estabelecer uma conexão
            openRequest.onsuccess = e => {
                if (!connection) { //Se connection for nula, faça
                    connection = e.target.result //connection receber os dados da conexão
                    close = connection.close.bind(connection) //Fazendo um backup da função de fechar a conexão, para a variavel close, tendo a variavel connection como referencia para o this
                    connection.close = function () { //Alterando a função do metodo close, para que não possa ser fechado diretamente por qualquer um
                        throw new Error("Você não pode fechar diretamente a conexão")
                    }
                }

                resolve(connection) //Passando para o resolve da promise, como resultado de sucesso, a connection
            }

            //Este evento é executado se houver algum erro na conexão
            openRequest.onerror = e => {
                console.log(e.target.error) //Se a conexão não tiver sido bem estabelecidade, imprima no console o erro
                reject(e.target.error.name) //Retornando para o reject da promise, como resultado de erro, uma mensagem de erro
            }

        })
    }

    static _createStores(connection) { //Criando um método estatico para evitar repetição de código
        stores.forEach(store => { //Percorrendo o array stores para criar ObjectStores com os nomes dentro do array
            if (connection.objectStoreNames.contains(store)) //Conferindo se já existe algum ObjectStore já criado com o nome da posição do array, se sim, faça
                connection.deleteObjectStore(store) //Se já existir apague ela

            //Após apagar a ObjectStore acima, crie novamente, com o mesmo nome, e tendo sua chave como auto Incremento
            connection.createObjectStore(store, { autoIncrement: true })
        })
    }

    static closeConnection() { //Método estatico para fechar a conexão
        if (connection) { //Se existir a conexão, faça
            close() //Fechando a conexão
            connection = null //E definir a variavel connection como null
        }
    }
}