'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NegociacaoServices = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _HttpService = require('./HttpService');

var _ConnectionFactory = require('./ConnectionFactory');

var _NegociacaoDao = require('../dao/NegociacaoDao');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoServices = exports.NegociacaoServices = function () {
    function NegociacaoServices() {
        _classCallCheck(this, NegociacaoServices);

        this._http = new _HttpService.HttpService();
    }

    //USANDO AJAX COM JAVASCRIPT PURO


    _createClass(NegociacaoServices, [{
        key: 'obterNegociacoesDaSemana',
        value: function obterNegociacoesDaSemana() {
            var _this = this;

            return new Promise(function (resolve, reject) {
                //Criando a promessa, com os parametros de sucesso e erro
                _this._http.get("negociacoes/semana").then(function (negociacoes) {
                    resolve(negociacoes.map(function (objeto) {
                        return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                    }));
                }).catch(function (error) {
                    console.log(eror);
                    reject("Não foi possível obter as negociações da semana");
                });
            });
        }
    }, {
        key: 'obterNegociacoesDaSemanaAnterior',
        value: function obterNegociacoesDaSemanaAnterior() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                _this2._http.get("negociacoes/anterior").then(function (negociacoes) {
                    resolve(negociacoes.map(function (objeto) {
                        return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                    }));
                }).catch(function (error) {
                    console.log(eror);
                    reject("Não foi possível obter as negociações da semana anterior");
                });
            });
        }
    }, {
        key: 'obterNegociacoesDaSemanaRetrasada',
        value: function obterNegociacoesDaSemanaRetrasada() {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                _this3._http.get("negociacoes/retrasada").then(function (negociacoes) {
                    resolve(negociacoes.map(function (objeto) {
                        return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                    }));
                }).catch(function (error) {
                    console.log(eror);
                    reject("Não foi possível obter as negociações da semana retrasada");
                });
            });
        }
    }, {
        key: 'obterNegociacoes',
        value: function obterNegociacoes() {
            //Retornando um Promise.all para o metodo. O Promise.all executa varias promesas e retorna na ordem que foram inseridas, se ele retornar sucesso nas promesas, ele pega as os dados de cada semana que vieram repetidos e reduz para apenas uma vez, em seguinda mapeia o array criando uma nova negociacao com os dados, e por final se tudo der certo ele retorna a nova Negociacao criada, se der errado, retorna uma mensagem de erro
            return Promise.all([this.obterNegociacoesDaSemana(), this.obterNegociacoesDaSemanaAnterior(), this.obterNegociacoesDaSemanaRetrasada()]).then(function (periodos) {
                var negociacoes = periodos.reduce(function (dados, periodo) {
                    return dados.concat(periodo);
                }, []).map(function (dado) {
                    return new Negociacao(new Date(dado.data), dado.quantidade, dado.valor);
                });
                return negociacoes;
            }).catch(function (erro) {
                throw new Error(erro);
            });
        }
    }, {
        key: 'cadastra',
        value: function cadastra(negociacao) {
            //Estabelecendo a conexão com o banco IndexedDB, se a conexão retornar sucessso, então cria uma nova NegociacaoDao para adicionar os itens no banco, se der certo retorna uma mensagem de sucesso, se não ele retorna uma menssagem de erro
            return _ConnectionFactory.ConnectionFactory.getConnection().then(function (connection) {
                return new _NegociacaoDao.NegociacaoDao(connection);
            }).then(function (dao) {
                return dao.adiciona(negociacao);
            }).then(function () {
                return "Negociação adicionada com sucesso";
            }).catch(function (erro) {
                console.log(erro);
                throw new Error("Não foi possível adicionar a negociação");
            });
        }
    }, {
        key: 'lista',
        value: function lista() {
            return _ConnectionFactory.ConnectionFactory.getConnection().then(function (connection) {
                return new _NegociacaoDao.NegociacaoDao(connection);
            }).then(function (dao) {
                return dao.listaTodos();
            }).catch(function (erro) {
                console.log(erro);
                throw new Error("Não foi posssível obter as negociações");
            });
        }
    }, {
        key: 'apaga',
        value: function apaga() {
            return _ConnectionFactory.ConnectionFactory.getConnection().then(function (connection) {
                return new _NegociacaoDao.NegociacaoDao(connection);
            }).then(function (dao) {
                return dao.apagaTodos();
            }).then(function () {
                return "Negociações apagadas com sucesso";
            }).catch(function (erro) {
                console.log(erro);
                throw new Error("Não foi possível apagar as negociações");
            });
        }
    }, {
        key: 'importa',
        value: function importa(listaAtual) {
            return this.obterNegociacoes().then(function (negociacoes) {
                return negociacoes.filter(function (negociacao) {
                    return !listaAtual.some(function (negociacaoExistente) {
                        return negociacao.isEquals(negociacaoExistente);
                    });
                });
            }).catch(function (erro) {
                console.log(erro);
                throw new Error("Não foi possível buscar negociações para importar");
            });
        }
    }]);

    return NegociacaoServices;
}();
//# sourceMappingURL=NegociacaoServices.js.map