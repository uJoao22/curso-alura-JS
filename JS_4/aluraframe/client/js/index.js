let campos = [
    document.querySelector('#data'),
    document.querySelector('#quantidade'),
    document.querySelector('#valor')
]

let tbody = document.querySelector('table tbody') //Pegando o valor do elemento tbody

document.querySelector('.form').addEventListener('submit', function(event){ //Quando o formulario for envaido, execute a função
    event.preventDefault() //Impedindo o envio do formulario

    let tr = document.createElement('tr') //Criando um elemento tr

    campos.forEach(function(campo){ //Percorrendo o array campos
        let td = document.createElement('td') //Criando um elemento td
        td.textContent = campo.value //O conteudo de td sera o valor de cada campo que compõe o array
        tr.appendChild(td) //Adicionando o elemento td dentro do elemento tr
    })

    let tdVolume = document.createElement('td') //Criando um elemento td que não está entre os dados do meu array
    tdVolume.textContent = campos[1].value * campos[2].value //tdVolume recebe o valor do campos de quantidade vezes o valor do campo de valor
    tr.appendChild(tdVolume)

    tbody.appendChild(tr) //O tbody recebe todos os elementos que foram incluidos na tr

    //Zerando os campos após o envio do formulario
    campos[0].value = ''
    campos[1].value = 1
    campos[2].value = 0

    campos[0].focus() //Colocando o foco no campo data
})