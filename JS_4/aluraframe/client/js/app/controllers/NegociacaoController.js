'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ListaNegociacoes = require('../models/ListaNegociacoes');

var _Mensagem = require('../models/Mensagem');

var _NegociacoesView = require('../views/NegociacoesView');

var _MensagemView = require('../views/MensagemView');

var _NegociacaoServices = require('../services/NegociacaoServices');

var _DateHelper = require('../helpers/DateHelper');

var _Bind = require('../helpers/Bind');

var _Negociacao = require('../models/Negociacao');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoController = function () {
    function NegociacaoController() {
        _classCallCheck(this, NegociacaoController);

        var $ = document.querySelector.bind(document);
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");

        this._listaNegociacoes = new _Bind.Bind( //Instanciando a class ProxyFactory e chamando o metodo create com, 3 parametros
        new _ListaNegociacoes.ListaNegociacoes(), //MOdelo
        new _NegociacoesView.NegociacoesView($('#negociacoesView')), //View
        'adiciona', 'esvazia'); //Condição para instanciar

        this._mensagem = new _Bind.Bind(new _Mensagem.Mensagem(), new _MensagemView.MensagemView($('#mensagemView')), 'texto');

        this._service = new _NegociacaoServices.NegociacaoServices();

        this._init();
    }

    _createClass(NegociacaoController, [{
        key: '_init',
        value: function _init() {
            var _this = this;

            //Instanciando uma NegociacaoSerives e chamando o metodo lista que me retorna uma promesa de que os dados serão listados, se der sucesso, ele pega os dados e insere na lista de negociacoes, de der erro ele exibe a mensagem de erro
            this._service.lista().then(function (negociacoes) {
                return negociacoes.forEach(function (negociacao) {
                    return _this._listaNegociacoes.adiciona(negociacao);
                });
            }).catch(function (error) {
                return _this._mensagem.texto = error;
            });

            //Chamando o metodo de importaNegociacoes de 3 em 3 segundoss, para que ele messmo se atualize
            setInterval(function () {
                _this.importaNegociacoes();
            }, 3000);
        }
    }, {
        key: 'adiciona',
        value: function adiciona(event) {
            var _this2 = this;

            event.preventDefault();

            var negociacao = this._criaNegociacao();

            this._service.cadastra(negociacao).then(function (mensagem) {
                //Inserindo os dados na lista de negociacao para ver na tela
                _this2._listaNegociacoes.adiciona(negociacao);
                _this2._mensagem.texto = mensagem;
                _this2._limpaFormulario();
            }).catch(function (erro) {
                return _this2._mensagem.texto = erro;
            });
        }
    }, {
        key: 'importaNegociacoes',
        value: function importaNegociacoes() {
            var _this3 = this;

            //Chamando o metodo importa de NegociacaoServices, passando a lista de negociacoes como parametro, recebendo uma promesa informando se essa lista já foi importada ou não, se não ele importa e informa o ususario, se já existe ele não importa e se der erro, ele informa o erro
            this._service.importa(this._listaNegociacoes.negociacoes).then(function (negociacoes) {
                negociacoes.forEach(function (negociacao) {
                    _this3._listaNegociacoes.adiciona(negociacao);
                    _this3._mensagem.texto = 'Negociações do período importadas';
                });
            }).catch(function (erro) {
                return _this3._mensagem.texto = erro;
            });
        }
    }, {
        key: 'apaga',
        value: function apaga() {
            var _this4 = this;

            this._service.apaga().then(function (mensagem) {
                _this4._mensagem.texto = mensagem; //Inserindo a mensagem no alerta de sucesso
                _this4._listaNegociacoes.esvazia(); //Esvaziando o array que contem as negociações
            }).catch(function (error) {
                return _this4._mensagem.texto(error);
            });
        }
    }, {
        key: '_criaNegociacao',
        value: function _criaNegociacao() {
            return new _Negociacao.Negociacao(_DateHelper.DateHelper.textoParaData(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
        }
    }, {
        key: '_limpaFormulario',
        value: function _limpaFormulario() {
            this._inputData.value = '';
            this._inputQuantidade.value = 1;
            this._inputValor.value = 0.0;
            this._inputData.focus();
        }
    }]);

    return NegociacaoController;
}();
//# sourceMappingURL=NegociacaoController.js.map