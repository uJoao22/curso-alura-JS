class NegociacoesView {
    constructor(elemento){ //Recebendon a div #negociacoesView como parametro
        this._elemento = elemento
    }

    _template(model) { //Recebendo os dados inseridos por parametro
        //Usando a template string para retornar a tabela com os dados
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                    <th>VOLUME</th>
                </tr>
            </thead>

            <tbody>
                ${model.negociacoes.map(n => { //Mapeando os dados da negociação que está em formato de array para serem inseridos dinamicamente
                    return `
                        <tr>
                            <td>${DateHelper.dataParaTexto(n.data)}</td>
                            <td>${n.quantidade}</td>
                            <td>${n.valor}</td>
                            <td>${n.volume}</td>
                        </tr>`
                }).join('') /*Usando o join para concatenar todas as strings e retornar apenas uma string para o template string pai*/ }
            </tbody>

            <tfoot>
            </tfoot>
        </table> `

    }

    update(model){ //Quando o metodo update for chamado ele irá inserir a tabela na div #negociacoesView e recebendo como parametro os dados a serem incluidos
        this._elemento.innerHTML = this._template(model) //Inserir no DOM os dados do metodo _templade com o model como parametro
    }
}