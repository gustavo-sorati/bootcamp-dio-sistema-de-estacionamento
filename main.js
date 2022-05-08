var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
(function () {
    var _a;
    var $ = function (query) { return document.querySelector(query); };
    function calcTempo(mil) {
        var min = Math.floor(mil / 60000);
        var sec = Math.floor((mil % 60000) / 1000);
        return "".concat(min, "m e ").concat(sec, "s");
    }
    function patio() {
        function ler() {
            return localStorage.garagem ? JSON.parse(localStorage.garagem) : [];
        }
        function salvar(veiculos) {
            localStorage.setItem('garagem', JSON.stringify(veiculos));
        }
        function adicionar(veiculo, salva) {
            var _a, _b;
            var row = document.createElement('tr');
            row.innerHTML = "\n        <td>".concat(veiculo.nome, "</td>\n        <td>").concat(veiculo.placa, "</td>\n        <td>").concat(veiculo.time, "</td>\n        <td>\n          <button class=\"delete\" data-placa=\"").concat(veiculo.placa, "\">X</button>\n        </td>\n      ");
            (_a = row.querySelector('.delete')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
                remover(this.dataset.placa);
            });
            (_b = $("#garage")) === null || _b === void 0 ? void 0 : _b.appendChild(row);
            if (salva)
                salvar(__spreadArray(__spreadArray([], ler(), true), [veiculo], false));
        }
        function remover(placa) {
            var veiculos = ler();
            var veiculo = veiculos.find(function (veiculo) { return veiculo.placa === placa; });
            var tempo = calcTempo(new Date().getTime() - new Date(veiculo.time).getTime());
            if (!confirm("O veiculo ".concat(veiculo.nome, " permaneceu por ").concat(tempo, ". Deseja encerrar?")))
                return;
            salvar(ler().filter(function (veiculo) { return veiculo.placa !== placa; }));
            render();
        }
        function render() {
            $('#garage').innerHTML = '';
            var garagem = ler();
            if (garagem.length) {
                garagem.forEach(function (veiculo) { return adicionar(veiculo, false); });
            }
        }
        return { ler: ler, adicionar: adicionar, remover: remover, render: render, salvar: salvar };
    }
    patio().render();
    (_a = $("#send")) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
        var _a, _b;
        var nome = (_a = $("#name")) === null || _a === void 0 ? void 0 : _a.value;
        var placa = (_b = $("#licence")) === null || _b === void 0 ? void 0 : _b.value;
        if (!nome || !placa) {
            alert("Os campos são obrigatórios.");
            return;
        }
        var carro = { nome: nome, placa: placa, time: new Date().toISOString() };
        patio().adicionar(carro, true);
    });
})();
