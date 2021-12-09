const cliente = {
    nome: "João",
    idade: "18",
    cpf: "012.345.678-90",
    email: "joaopaniciobotelho@hotmail.com",
    celular: ["9 1234-5678", "9 8765-4321"]
}
console.log(cliente)

cliente.dependentes = {
    nome: "Sara",
    parentesco: "prima",
    dataNascimento: "20/03/2011"
}
console.log(cliente)

cliente.dependentes.nome = "Sara Silva"
console.log(cliente)