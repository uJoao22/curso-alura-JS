const salaGeral = [
    'João', 'Juliana', 'Ana', 'Caio', 'Lara', 'Marjorie', 'Guilherme', 'Aline', 'Fabiana', 'Andre',
    'Carlos', 'Paulo', 'Bia', 'Vivian', 'Isabela', 'Vinícius', 'Renan', 'Renata', 'Daisy', 'Camilo'
]

//Dividindo um array usando o metodo slice, informando o indice de inicio e o indice final
const sala1 = salaGeral.slice(0, (salaGeral.length/2))
const sala2 = salaGeral.slice(salaGeral.length/2)


console.log(`Alunos da sala 1: ${sala1}`)
console.log(`Alunos da sala 2: ${sala2}`)