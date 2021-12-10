class Cliente{
    constructor(nome, email, cpf, saldo){ //Criando o construtor para criar o objeto
        this.nome = nome
        this.email = email
        this.cpf = cpf
        this.saldo = saldo
    }

    //Definindo os metodos
    deposiatar(valor){
        this.saldo += valor
    }

    exibirSaldo(){
        console.log(`Esté é seu saldo atual: R$ ${this.saldo},00`)
    }
}

const joao = new Cliente("João Pedro", "joao@email.com", "123.456.789-90", 100)

joao.exibirSaldo()
joao.deposiatar(50)
joao.exibirSaldo()

console.log(joao)