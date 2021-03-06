'use strict';

System.register(['./HttpService', './ConnectionFactory', '../dao/NegociacaoDao', '../models/Negociacao'], function (_export, _context) {
    "use strict";

    var HttpService, ConnectionFactory, NegociacaoDao, Negociacao, _createClass, NegociacaoServices;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_HttpService) {
            HttpService = _HttpService.HttpService;
        }, function (_ConnectionFactory) {
            ConnectionFactory = _ConnectionFactory.ConnectionFactory;
        }, function (_daoNegociacaoDao) {
            NegociacaoDao = _daoNegociacaoDao.NegociacaoDao;
        }, function (_modelsNegociacao) {
            Negociacao = _modelsNegociacao.Negociacao;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export('NegociacaoServices', NegociacaoServices = function () {
                function NegociacaoServices() {
                    _classCallCheck(this, NegociacaoServices);

                    this._http = new HttpService();
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
                                reject("N??o foi poss??vel obter as negocia????es da semana");
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
                                reject("N??o foi poss??vel obter as negocia????es da semana anterior");
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
                                reject("N??o foi poss??vel obter as negocia????es da semana retrasada");
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
                        //Estabelecendo a conex??o com o banco IndexedDB, se a conex??o retornar sucessso, ent??o cria uma nova NegociacaoDao para adicionar os itens no banco, se der certo retorna uma mensagem de sucesso, se n??o ele retorna uma menssagem de erro
                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDao(connection);
                        }).then(function (dao) {
                            return dao.adiciona(negociacao);
                        }).then(function () {
                            return "Negocia????o adicionada com sucesso";
                        }).catch(function (erro) {
                            console.log(erro);
                            throw new Error("N??o foi poss??vel adicionar a negocia????o");
                        });
                    }
                }, {
                    key: 'lista',
                    value: function lista() {
                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDao(connection);
                        }).then(function (dao) {
                            return dao.listaTodos();
                        }).catch(function (erro) {
                            console.log(erro);
                            throw new Error("N??o foi posss??vel obter as negocia????es");
                        });
                    }
                }, {
                    key: 'apaga',
                    value: function apaga() {
                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDao(connection);
                        }).then(function (dao) {
                            return dao.apagaTodos();
                        }).then(function () {
                            return "Negocia????es apagadas com sucesso";
                        }).catch(function (erro) {
                            console.log(erro);
                            throw new Error("N??o foi poss??vel apagar as negocia????es");
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
                            throw new Error("N??o foi poss??vel buscar negocia????es para importar");
                        });
                    }
                }]);

                return NegociacaoServices;
            }());

            _export('NegociacaoServices', NegociacaoServices);
        }
    };
});
//# sourceMappingURL=NegociacaoServices.js.map