const salaJS = [7, 8, 8, 7, 10, 6.5, 4, 10, 7]
const salaJava = [6, 5, 8, 9, 5, 6]
const salaPython = [7, 3.5, 8, 9.5]

function mediaSala(notasSala){ //O array irá entrar na função como parametro
    const somaNotas = notasSala.reduce((acum, atual) => atual + acum,0) //somaNotas irá receber o o array notasSala reduzido à apenas um item, usando o reduce que recebe como primeiro parametro uma variavel acumuladora, e como segundo o valor do elemento naquele loop. o valor atual do elemento será somado com o acumulador que cada loop se torna o valor antigo, sendo iniciado como zero
    return somaNotas/notasSala.length
}

console.log(`Média da sala de JS ${mediaSala(salaJS)}`)
console.log(`Média da sala de Java ${mediaSala(salaJava)}`)
console.log(`Média da sala de Python ${mediaSala(salaPython)}`)
