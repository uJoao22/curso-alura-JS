const chamada = ['João', 'Ana', 'Caio', 'Lara', 'Marjorie', 'Leo']

//Removendo e adicionando elementos usando o splice
//splice remove elemento de um ponto inicial até um ponto final e adiciona o elemento do terceiro parametro em seu lugar (Terceiro parametro é opcional)
//array.splice(pontoInicial, pontoFInal, elementoParaAdicionarNoLugar)
chamada.splice(1, 2, 'Rodrigo')

//Usando o splice para adicionar um item em uma determina posição, sem remover nada
chamada.splice(2, 0, 'Jonathan')

console.log(`LIsta de chamada: ${chamada}`)