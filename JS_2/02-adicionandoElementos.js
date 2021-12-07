const notasAlunos = [10, 6, 8]
notasAlunos.push(7)
let soma = 0

for(let i=0; i<notasAlunos.length; i++)
    soma += notasAlunos[i]

let media = soma/notasAlunos.length
console.log(media)