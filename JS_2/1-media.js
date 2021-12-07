const notasAlunos = [10, 6.5, 8, 7.5]
let soma = 0

for(let i=0; i<notasAlunos.length; i++)
    soma += notasAlunos[i]

let media = soma/notasAlunos.length
console.log(media)