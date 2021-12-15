'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoDao = function () {
    function NegociacaoDao(connection) {
        _classCallCheck(this, NegociacaoDao);

        this._connection = connection;
        this._store = 'negociacoes'; //Definindo em qual ObjectStore esse DAO vai operar
    }

    _createClass(NegociacaoDao, [{
        key: 'adiciona',
        value: function adiciona(negociacao) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                //A função adiconar retorna uma promise
                //Toda vez que for gravar dados no banco, deve ser feito uma transação

                //Fazendo uma transação para um determinado ObjectStore, do tipo ler e escrever, 'readwrite', solicitando acesso a ela, adicionando a negocicao recebida por parametro dentro da ObjectStore e passando para variavel request o valor da inserção se foi success ou erro
                var request = _this._connection.transaction([_this._store], 'readwrite').objectStore(_this._store).add(negociacao);

                //Se a adição de dados na ObjectStore der certo, faça
                request.onsuccess = function (e) {
                    return resolve();
                }; //Enviando o resolve na promise, informando que ela "Cumpriu o que prometeu"

                request.onerror = function (e) {
                    //Se a adição der errado, retorne o erro
                    console.log(e.target.error); //Imprimindo o erro no console
                    reject("Não foi possível adicionar a negociação"); //Retornando para o reject uma mensagem, para dizer que "Não foi possível cumprir a promesa"
                };
            });
        }
    }, {
        key: 'listaTodos',
        value: function listaTodos() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                //Fazendo a transação para ter acesso ao ObjectStore, acessando o ObjectStore e criando um cursor para agir como um ponteiro, apontando todos os itens
                var cursor = _this2._connection.transaction([_this2._store], 'readwrite').objectStore(_this2._store).openCursor();

                var negociacoes = [];

                cursor.onsuccess = function (e) {
                    //Se o cursor for criado com sucesso, faça
                    var atual = e.target.result; //atual recebe os dados que o cursor ta apontando naquele momento

                    if (atual) {
                        //Se existem dados apontados pelo cursor, faça
                        var dado = atual.value; //Passando para dado os valores apontados pelo ponteiro

                        //Inserindo no array os dados como uma nova Negociacao
                        negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));

                        //Fazendo com que o cursor chame a função 'onsuccess' de novo, mas desta vez com o ponteiro apontando para o proximo item
                        atual.continue();
                    } else //Se não tiver dados para listar, ou tiver listado todos, faça
                        resolve(negociacoes); //Passando para resolve o array com os dados das negociacoes
                };

                cursor.onerror = function (e) {
                    console.log(e.target.error);
                    reject("Não foi possível listar as negociações");
                };
            });
        }
    }, {
        key: 'apagaTodos',
        value: function apagaTodos() {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                //Fazendo a transação para ter acesso ao ObjectStore, acessando o ObjectStore e eecutando um método clear, onde irá retornar uma requisição
                var request = _this3._connection.transaction([_this3._store], 'readwrite').objectStore(_this3._store).clear();

                request.onsuccess = function (e) {
                    return resolve("Negociações apagadas com sucesso");
                };

                request.onerror = function (e) {
                    console.log(e.target.error);
                    reject("Não foi possível apagar as negociações");
                };
            });
        }
    }]);

    return NegociacaoDao;
}();
//# sourceMappingURL=NegociacaoDao.js.map