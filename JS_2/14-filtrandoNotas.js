const nomes = ["Ana", "Marcos", "Maria", "Mauro"]
const notas = [7, 4.5, 7, 7.5]

//Usando o filter para mapear o array de nomes e filtrar todos os alunos que tem uma nota abaixo de 5
//reprovados recebe o array nomes com a função filter, passando o primeiro parametro como _ para dizer que não está sendo usado, e o segundo parametro como o indice daquele elemento, se caso o array notas no mesmo indice possuir um número menor que 5 ele retorna true e entra no filtro
const reprovados = nomes.filter((_, i) => notas[i] < 5)

console.log(`Reprovados: ${reprovados}`)