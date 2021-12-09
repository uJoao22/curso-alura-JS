const clientes = [{
    nome: "João",
    cpf: "012.345.678-90",
    dependentes: [{
        nome: "Sara",
        parentesco: "Prima",
        dataNascimento: "20/03/2011"
    },{
        nome: "Samia Maria",
        parentesco: "Tia",
        dataNascimento: "04/01/1970"
    }],
},
{
    nome: "Juliana",
    cpf: "098.765.432.10",
    dependentes: [{
        nome: "Sophia",
        parentesco: "Filha",
        dataNascimento: "30/08/2020"
    }]
}]

const listaDependentes = []
for(let i=0; i<clientes.length; i++){
    //Operador de espalhamento, usado para espalhar os objeto do array dentro de um array, espalhar seus itens
    listaDependentes.push(...clientes[i].dependentes)
}

//Console.table exibe os dados no formato de uma tabela
console.table(listaDependentes)