class MensagemView extends View { //Essta class herda tudo o que pertencie a class View
    constructor(elemento){ //Herdando o objeto construido na class View
        super(elemento)
    }

    template(model){
        return model.texto ? `<p class="alert alert-info">${model.texto}</p>` : `<p></p>`
    }
}