class NegociacoesView {
    constructor(elemento){ //Recebendon a div #negociacoesView como parametro
        this._elemento = elemento
    }

    _template() {
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
            </tbody>

            <tfoot>
            </tfoot>
        </table> `

    }

    update(){
        this._elemento.innerHTML = this._template() //Quando o metodo update for chamado ele irá inserir a tabela na div #negociacoesView
    }
}