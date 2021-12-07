
const notasAlunos = [10, 7, 8, 5, 10]
notasAlunos.pop()
let soma = 0

for(let i=0; i<notasAlunos.length; i++)
    soma += notasAlunos[i]

let media = soma/notasAlunos.length
console.log(`A média é: ${media}`)