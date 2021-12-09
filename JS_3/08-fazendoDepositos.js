
const cliente = {
    nome: "João",
    idade: "18",
    cpf: "012.345.678-90",
    email: "joaopaniciobotelho@hotmail.com",
    celular: ["9 1234-5678", "9 8765-4321"],
    dependentes: [{
        nome: "Sara",
        parentesco: "Prima",
        dataNascimento: "20/03/2011"
    },{
        nome: "Samia Maria",
        parentesco: "Tia",
        dataNascimento: "04/01/1970"
    }],
    saldo: 100,
    depositar: function(valor){ //Criando um campo com seu valor como uma função
        this.saldo += valor //Este objeto no campo saldo irá receber ele mesmo mais o parametro da função
    }
}

console.log("R$ "+cliente.saldo+",00")
cliente.depositar(30) //Chamando a função dentro do objeto e envinado 30 como parametro
console.log("R$ "+cliente.saldo+",00")