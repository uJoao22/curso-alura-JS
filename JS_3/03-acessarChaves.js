const cliente = {
    nome: "João",
    idade: "18",
    cpf: "012.345.678-90",
    email: "joaopaniciobotelho@hotmail.com"
}

const chaves = ["nome", "idade", "cpf", "email"]

console.log(cliente[chaves[0]])

chaves.forEach(element => console.log(`[${element}] = ${cliente[element]}`))

console.log(cliente["email"])