class Cliente{
    constructor(nome, email, cpf, saldo){
        this.nome = nome
        this.email = email
        this.cpf = cpf
        this.saldo = saldo
    }

    deposiatar(valor){
        this.saldo += valor
    }

    exibirSaldo(){
        console.log(`Esté é seu saldo atual: R$ ${this.saldo},00`)
    }
}

class ClientePoupanca extends Cliente{ //Usando extends para ClientePoupanca herdar os atributos de Cliente
    constructor(nome, email, cpf, saldo, saldoPoup){
        super(nome, email, cpf, saldo)
        this.saldoPoup = saldoPoup
    }

    deposiatarPoup(valor){
        this.saldoPoup += valor
    }

    exibirSaldoPoup(){
        console.log(`Esté é saldo da sua poupança: R$ ${this.saldo},00`)
    }
}

const joao = new ClientePoupanca("João Pedro", "joao@email.com", "123.456.789-90", 100, 200)

joao.deposiatar(50)
joao.deposiatarPoup(150)

console.log(joao)