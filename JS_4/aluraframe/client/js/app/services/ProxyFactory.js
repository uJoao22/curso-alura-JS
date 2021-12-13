class ProxyFactory{
    static create(objeto, props, acao){
        return new Proxy(new ListaNegociacoes(), { //Criando um proxy da class ListaNegociacoes
            get(target, prop, reciver){ //Interceptando em caso de chamar um metodo
                if(props.includes(prop) && typeof(target[prop]) == typeof(Function)){ //Se prop for igual a um dos itens do array e o tipo dele for uma função, faça
                    return function(){//Alterando a função dos metodos adiciona e esvazia para fazer o update dinamico
                        Reflect.apply(target[prop], target, arguments)
                        return acao(target)
                    }
                }
                return Reflect.get(target, prop, reciver)
            }
        })
    }
}