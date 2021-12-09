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
    depositar: function(valor){
        this.saldo += valor
    }
}

let relatorio = ""

for(let info in cliente){ //Percorrendo todos os itens do meu objeto e passando para info o nome de cada campo
    if(typeof cliente[info] === "object" || typeof cliente[info] === "function")
        continue
    else
        relatorio += `${info}: ${cliente[info]}\n`
}

console.log(relatorio)