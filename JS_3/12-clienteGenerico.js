function Cliente(nome, cpf, email, saldo){
    this.nome = nome
    this.cpf = cpf
    this.email = email
    this.saldo = saldo
    this.depositar = function(valor){
        this.saldo += valor
    }
}

const joao = new Cliente("João Pedro", "123.456.78-90", "joao@hotmail.com", 100)

console.log(joao)