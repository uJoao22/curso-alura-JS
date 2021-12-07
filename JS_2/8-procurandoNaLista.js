let listaGeral = [['João', 'Juliana', 'Caio', 'Ana'], [10, 8, 7.5, 9]]

//exibeNomeENota recebe como parametro o nome do aluo para buscar e executa a função abaixo
const exibeNomeENota = (nomeAluno) => { //Criando uma arrow function
    //icludes verifica se o array contém determinado elemento
    if(listaGeral[0].includes(nomeAluno)){ //Se a lista de nomes tiver um aluno com o nome recebido por parametro, faça
        let indice = listaGeral[0].indexOf(nomeAluno) //Variavel indice recebe o indice em que está o nome deste determinado aluno
        return listaGeral[0][indice]+", sua média é: " + listaGeral[1][indice ] // A função irá retornar o nome do Aluno, e sua média
    } else { //Caso não exista nenhum aluno com o nome determinado, faça
        return "Aluno não está cadastrado"
    }
}

console.log(exibeNomeENota("Juliana")) //Chamanndo a arrow function exibeNomeENota com o nome para procurar por parametro