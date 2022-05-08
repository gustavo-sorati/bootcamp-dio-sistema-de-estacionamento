interface ICarro {
  nome: string;
  placa: string;
  time: Date | string;
}

(function () {
  const $ = (query: string): HTMLInputElement | null => document.querySelector(query);

  function calcTempo(mil: number): string {
    const min = Math.floor(mil / 60000)
    const sec = Math.floor((mil % 60000) / 1000)

    return `${min}m e ${sec}s`
  }


  function patio() {
    function ler(): ICarro[] | any  {
      return localStorage.garagem ? JSON.parse(localStorage.garagem) : [];
    }

    function salvar(veiculos: ICarro[]){
      localStorage.setItem('garagem', JSON.stringify(veiculos))
    }

    function adicionar(veiculo: ICarro, salva: boolean) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${veiculo.nome}</td>
        <td>${veiculo.placa}</td>
        <td>${veiculo.time}</td>
        <td>
          <button class="delete" data-placa="${veiculo.placa}">X</button>
        </td>
      `

      row.querySelector('.delete')?.addEventListener('click', function(){
        remover(this.dataset.placa);
      });

      $("#garage")?.appendChild(row);

      if(salva) salvar([...ler(), veiculo]);
    }

    function remover(placa: string) {
      const veiculos = ler();

      const veiculo = veiculos.find(veiculo => veiculo.placa === placa);
      
      const tempo = calcTempo(new Date().getTime() - new Date(veiculo.time).getTime());

      if(!confirm(`O veiculo ${veiculo.nome} permaneceu por ${tempo}. Deseja encerrar?`)) return;

      salvar(ler().filter((veiculo) => veiculo.placa !== placa));
      render();
    }

    function render(){
      $('#garage').innerHTML = '';
      const garagem = ler();

      if(garagem.length) {
        garagem.forEach(veiculo => adicionar(veiculo, false))
      }
    }

    
    return { ler, adicionar, remover, render, salvar }
  }


  patio().render();

  $("#send")?.addEventListener('click', () => {
    const nome = $("#name")?.value;
    const placa = $("#licence")?.value;

    if(!nome || !placa) {
      alert("Os campos são obrigatórios.");
      return;
    }

    const carro = { nome, placa, time: new Date().toISOString() };

    patio().adicionar(carro, true);
  });
})();