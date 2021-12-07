console.log(`Trabalhando com Loops`)

const listaDeDestinos = new Array(
    `Salvador`,
    `São Paulo`,
    `Rio de Janeiro`,
)

const idadeComprador = 18
const estaAcompanhada = false
let temPassagemComprada = false
const destino = "Curitiba"
const podeComprar = idadeComprador >= 18 || estaAcompanhada == true

console.log("\nDestinos possíveis:")
console.log(listaDeDestinos+"\n")

let contador = 0
let destinoExiste = false
while(contador < listaDeDestinos.length){
    if(listaDeDestinos[contador] == destino){
        destinoExiste = true
        break
    }
    contador += 1
}

console.log("Destino existe:", destinoExiste)

if(podeComprar && destinoExiste)
    console.log("Boa viagem!!")
else
    console.log("Desculpe, tivemos um erro!")

for (let i=0; i<listaDeDestinos.length; i++) {
    if (listaDeDestinos[i] == destino) {
        destinoExiste = true
    }
}