console.log(`Trabalhando com listas`)

//Declarando e inserindo itens no array
const listaDeDestinos = new Array(
    `Salvador`,
    `São Paulo`,
    `Rio de Janeiro`,
)

listaDeDestinos.push(`Curitiba`) //Adicionando um item na lista
console.log(listaDeDestinos)

listaDeDestinos.splice(1, 1) //Removendo um item da lista
console.log(listaDeDestinos)

console.log(listaDeDestinos[1]) //Exibindo apenas um item especifico da lista