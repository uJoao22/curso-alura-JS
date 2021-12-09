const notas = [10, 9, 8, 7, 6]

//Mapeando o array usando map
//variavel nota recebe cada elemento do array e se for diferente de 10 ele adiciona mais um
const notasAtualizadas = notas.map(nota => nota==10 ? nota : ++nota)

console.log(notasAtualizadas)