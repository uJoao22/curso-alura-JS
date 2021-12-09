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
    }]
}

//Adicionando um objeto usando push
cliente.dependentes.push({
    nome: "Samia Maria",
    parentesco: "Tia",
    dataNascimento: "04/01/1970"
})
console.log(cliente)

const pessoaMaisNova = cliente.dependentes.filter(dependente => dependente.dataNascimento.substring(6)=="2011")
console.log(pessoaMaisNova[0].nome)