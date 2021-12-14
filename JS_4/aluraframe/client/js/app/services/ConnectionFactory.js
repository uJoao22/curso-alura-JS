var stores = ['negociacoes']
var version = 4
var dbName = 'aluraframe'

class ConnectionFactory{
    constructor(){
        //Exibindo uma mensagem de erro, caso tentem instanciar a class ConnectionFactory
        throw new Error("Não é possível criar instâncias de ConnectionFactory")
    }

    static getConnection(){ //Criando o método estatico getConnection, para retornar os dados da conexão
        return new Promise((resolve, reject) => { //Retornando para o metodo uma promesa
            let openRequest = window.indexedDB.open(dbName, version)

            openRequest.onupgradeneeded = e => {

            }

            openRequest.onsuccess = e => {

            }

            openRequest.onerror = e => {

            }

        })
    }
}