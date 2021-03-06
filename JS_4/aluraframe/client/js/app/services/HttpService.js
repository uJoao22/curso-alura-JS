"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, HttpService;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
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

            _export("HttpService", HttpService = function () {
                function HttpService() {
                    _classCallCheck(this, HttpService);
                }

                _createClass(HttpService, [{
                    key: "_handleErros",
                    value: function _handleErros(res) {
                        if (!res.ok) throw new Error(res.statusTexxt); //Se der algum erro, ele irá lançar o erro
                        return res; //Se estiver tudo ok ele retornar res
                    }
                }, {
                    key: "get",
                    value: function get(url) {
                        var _this = this;

                        //Simplificando a requisição de dados usando Fetch API, recurso do ES2016
                        return fetch(url).then(function (res) {
                            return _this._handleErros(res);
                        }) //Chamando o metodo para tratar erros, se estive ok, siga
                        .then(function (res) {
                            return res.json();
                        }); //Após tratamento de erros, retorne a resposta em formato JSON


                        // return new Promise((resolve, reject) => {
                        //     let xhr = new XMLHttpRequest()

                        //     xhr.open('GET', url)

                        //     xhr.onreadystatechange = () => {
                        //         if(xhr.readyState == 4){
                        //             if(xhr.status == 200){
                        //                 resolve(JSON.parse(xhr.responseText))
                        //             } else {
                        //                 reject(xhr.responseText)
                        //             }
                        //         }
                        //     }

                        //     xhr.send()
                        // })
                    }
                }]);

                return HttpService;
            }());

            _export("HttpService", HttpService);
        }
    };
});
//# sourceMappingURL=HttpService.js.map