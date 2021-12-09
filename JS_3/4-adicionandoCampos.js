const cliente = {
    nome: "João",
    idade: "18",
    cpf: "012.345.678-90",
    email: "joaopaniciobotelho@hotmail.com"
}
console.log(cliente)

// Adicionando um campo e valor
cliente.celular = "9 1234-5678"
console.log(cliente)

// Removendo um campo e valor
delete cliente.email
console.log(cliente)