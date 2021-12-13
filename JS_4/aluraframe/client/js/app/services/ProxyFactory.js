class ProxyFactory{
    static create(objeto, props, acao){
        return new Proxy(objeto, { //Criando um proxy da class objeto recebida por parametro
            get(target, prop, reciver){ //Interceptando em caso de chamar um metodo
                if(props.includes(prop) && ProxyFactory._ehFUncao(target[prop])){ //Se prop for igual a um dos itens do array e o tipo dele for uma função, faça
                    return function(){//Alterando a função dos metodos adiciona e esvazia para fazer o update dinamico
                        Reflect.apply(target[prop], target, arguments)
                        return acao(target)
                    }
                }
                return Reflect.get(target, prop, reciver)
            },
            set(target, prop, value, reciver){
                if(props.includes(prop)){
                    target[prop] = value;
                    acao(target)
                }
                return Reflect.set(target, prop, value, reciver)
            }
        })
    }

    static _ehFUncao(func){
        return typeof(func) == typeof(Function)
    }
}