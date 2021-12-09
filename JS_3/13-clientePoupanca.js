function Cliente(nome, cpf, email, saldo){
    this.nome = nome
    this.cpf = cpf
    this.email = email
    this.saldo = saldo
    this.depositar = function(valor){
        this.saldo += valor
    }
}

function ClientePoupanca(nome, cpf, email, saldo, saldoPoup){
    //Usando o call, para chamar as propriedades existentes no Cliente para o ClientePoupanca
    Cliente.call(this, nome, cpf, email, saldo) //Primeiro informo que vou chamar para este objeto e depois informa quais propriedades eu quero chamar
    this.saldoPoup = saldoPoup
}

//Instanciando um novo objeto chamado ju, criando ele através do contrutor ClientePoupanca e passando os dados dele por parametro
const ju = new ClientePoupanca("Ju", "345.567.234.12", "ju@email.com", 100, 200)

//Acessando obejto ClientePoupanca entrar dentro de prototype e adicionar um novo metodo chamado depositarPoup à esta propriedade
ClientePoupanca.prototype.depositarPoup = function(valor){
    this.saldoPoup += valor
}

ju.depositarPoup(30)

console.log(ju.saldoPoup)