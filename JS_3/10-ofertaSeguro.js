const cliente = {
    nome: "João",
    idade: "18",
    cpf: "012.345.678-90",
    email: "joaopaniciobotelho@hotmail.com",
    celular: ["9 1234-5678", "9 8765-4321"],
    dependentes: [{
        nome: "Sara",
        parentesco: "Prima",
        dataNascimento: "20/03/2011"
    },{
        nome: "Samia Maria",
        parentesco: "Tia",
        dataNascimento: "04/01/1970"
    }],
    saldo: 100,
    depositar: function(valor){
        this.saldo += valor
    }
}

function oferecerSeguro(obj){
    //O metodo Object.keys() lista e retorna todas as chaves de campos do objeto colocado como parametro
    const propsClientes = Object.keys(obj)
    if(propsClientes.includes("dependentes")){
        console.log(`Oferta de seguro de vida para ${obj.nome}`)
    }
}
oferecerSeguro(cliente)

// Object.values possui a mesma função do .keys, porém este retorna os valores e não as chaves dos campos
console.log(Object.values(cliente))

// Object.entries tem a função de retornar o objeto em formato de arrays
console.log(Object.entries(cliente))