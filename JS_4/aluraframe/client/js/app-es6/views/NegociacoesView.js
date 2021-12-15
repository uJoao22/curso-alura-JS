import {View} from './View'
import {DateHelper} from '../helpers/DateHelper'
export class NegociacoesView extends View{ //Essta class herda tudo o que pertencie a class View
    constructor(elemento){ //Herdando o objeto construido na class View
        super(elemento)
    }

    template(model) { //Recebendo os dados inseridos por parametro
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
                ${model.negociacoes.map(n => //Mapeando os dados da negociação que está em formato de array para serem inseridos dinamicamente
                    `<tr>
                        <td>${DateHelper.dataParaTexto(n.data)}</td>
                        <td>${n.quantidade}</td>
                        <td>${n.valor}</td>
                        <td>${n.volume}</td>
                    </tr>`
                ).join('') /*Usando o join para concatenar todas as strings e retornar apenas uma string para o template string pai*/ }
            </tbody>

            <tfoot>
                <td colspan="3"></td>
                <td>${model.negociacoes.reduce((total, n) => total+n.volume, 0.0) //Usando o reduce para transformar todos os dados do array de negociacoes em apenas um item, o valor total
                }</td>
            </tfoot>
        </table> `

    }
}