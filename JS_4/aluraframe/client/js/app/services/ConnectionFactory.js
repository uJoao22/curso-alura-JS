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
            //Fazendo uma requisição de abertura para o banco de dados indexedDB
            let openRequest = window.indexedDB.open(dbName, version) //Criando o banco aluraframe, (nome do banco, versão do banco)

            //TRIADE DE EVENTOS DA CONEXÃO

            //Este evento cria ou altera um banco já eistente
            openRequest.onupgradeneeded = e => { //Quando este evento for disparada a função recebe os dados do evento como prametro
                ConnectionFactory._createStores(e.target.result) //Chamando ao metodo estatico passando os dados da conexão como parametro
            }

            //Este evento é executado quando conseguir estabelecer uma conexão
            openRequest.onsuccess = e => {
                resolve(e.target.result) //Passando para o resolve da promise, como resultado de sucesso, os dados da conexão
            }

            //Este evento é executado se houver algum erro na conexão
            openRequest.onerror = e => {
                console.log(e.target.error) //Se a conexão não tiver sido bem estabelecidade, imprima no console o erro
                reject(e.target.error.name) //Retornando para o reject da promise, como resultado de erro, uma mensagem de erro
            }

        })
    }

    static _createStores(connection){ //Criando um método estatico para evitar repetição de código
        stores.forEach(store => { //Percorrendo o array stores para criar ObjectStores com os nomes dentro do array
            if(connection.objectStoreNames.contains(store)) //Conferindo se já existe algum ObjectStore já criado com o nome da posição do array, se sim, faça
                connection.deleteObjectStore(store) //Se já existir apague ela

            //Após apagar a ObjectStore acima, crie novamente, com o mesmo nome, e tendo sua chave como auto Incremento
            connection.createObjectStore(store, {autoIncrement: true})
        })
    }
}