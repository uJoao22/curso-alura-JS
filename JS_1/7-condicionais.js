console.log(`Trabalhando com condicionais`)

const listaDeDestinos = new Array(
    `Salvador`,
    `São Paulo`,
    `Rio de Janeiro`,
)

const idadeComprador = 18
const estaAcompanhada = false
const temPassagemComprada = true

console.log("Destinos possíveis:")
console.log(listaDeDestinos)

// if(idadeComprador >= 18){
//     console.log("Comprador maior de idade")
//     listaDeDestinos.splice(1, 1) //Removendo item
// } else if(estaAcompanhada){
//     console.log("Comprador é menor de idade, mas está acompanhado")
//     listaDeDestinos.splice(1, 1) //Removendo item
// } else
//     console.log("Comprador não é maior de idade e não posso vender")

if (idadeComprador >= 18 || estaAcompanhada == true) {
    console.log("Passagem comprada")
    listaDeDestinos.splice(2, 1) //Removendo item
} else
    console.log("Comprador não é maior de idade e não está acompanhado, não posso vender")

console.log("\n\nEmbarque: ")
if(idadeComprador >= 18 && temPassagemComprada)
    console.log("Boa viagem!!")
else
    console.log("Você não pode embarcar")


console.log(listaDeDestinos)

// console.log(idadeComprador > 18)
// console.log(idadeComprador < 18)
// console.log(idadeComprador <= 18)
// console.log(idadeComprador >= 18)
// console.log(idadeComprador == 18)