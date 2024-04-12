const container = document.getElementById('container-popup')
const popup = document.createElement('div')
popup.className = 'popup-e popup'
popup.id = 'popup'

container.appendChild(popup)
const body = document.body
const content = document.getElementById('content')
const api = 'http://localhost:8082/php/bd.php'


function abrirpopup(id, data) {
    container.style.display = 'flex'
    criarpopup(data)
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
            console.log(data[i])
        }
    }
    return null
}
let consulta = "SELECT * FROM filmes ORDER BY nome"

function escolherConsultaGenero(texto){
    sql = "SELECT * FROM filmes WHERE genero LIKE '" + texto + "' ORDER BY nome"
    enviarConsulta(sql)
}

function escolherConsultaPais(texto){
    sql = "SELECT * FROM filmes WHERE pais LIKE '" + texto + "' ORDER BY nome"
    enviarConsulta(sql)
}

function escolherConsultaAno(texto1, texto2){
    sql = "SELECT * FROM filmes WHERE YEAR(data_lancamento) > " + texto1 + " and YEAR(data_lancamento) < " + texto2 + " ORDER BY nome"
    enviarConsulta(sql)
}

function escolherConsultaClassificacao(texto){
    sql = "SELECT * FROM filmes WHERE classificacao = " + texto + " ORDER BY nome"
    enviarConsulta(sql)
}
function pesquisarConsulta(){
    let texto = document.getElementById('pesquisa').value
    sql = "SELECT * FROM filmes WHERE CONCAT(nome, genero, pais, distribuidora) LIKE '%"+texto+"%' ORDER BY nome"
    enviarConsulta(sql)
}
document.getElementById('form').addEventListener('click', function(e){
    e.preventDefault()
})

enviarConsulta(consulta)

function enviarConsulta(consulta){
    fetch(api,{
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "query=" + encodeURIComponent(consulta)
    })
    .then(response =>{
        if (!response.ok){
            throw new Error("Erro ao enviar a consulta: " + response.status)
            
        }
        return response.json()
    })
    .then(data =>{
        catalogo(data)
    })
    .catch(error =>{
        console.error(error)
        while (content.firstChild) {
            content.removeChild(content.firstChild)
        }
    })
}

function catalogo(conteudo){
    const content = document.getElementById('content')
    content.innerHTML = ''
    
    conteudo.forEach(item =>{
        let hover = document.createElement('div')
        hover.className = 'hover'
        let section = document.createElement('section')
        section.id = item.id
        section.dataset.itemData = JSON.stringify(item)
        section.onclick = function(){
            let itemId = this.id
            let itemData = JSON.parse(this.dataset.itemData)
            abrirpopup(itemId, itemData)
        };
        let img = document.createElement('div')
        img.className = 'img'
        let imagem = document.createElement('img')
        imagem.src = item.imagem

        let dados = document.createElement('div')
        dados.className = 'dados'
        let categoria = document.createElement('div')
        categoria.className = 'categoria'
        let pCategoria = document.createElement('p')
        pCategoria.textContent = item.genero + ' / ' + item.pais + ' / ' + item.distribuidora

        let titulo = document.createElement('div')
        titulo.className = 'titulo'
        let pTitulo = document.createElement('p')
        pTitulo.textContent = item.nome

        content.appendChild(hover)
        hover.appendChild(section)
        section.appendChild(img)
        section.appendChild(dados)
        section.appendChild(titulo)

        img.appendChild(imagem)

        dados.appendChild(categoria)
        dados.appendChild(titulo)

        categoria.appendChild(pCategoria)
        titulo.appendChild(pTitulo)
        
    })
}

function criarpopup(data) {
    let titulo = document.createElement('div')
    titulo.className = 'popup-e titulo'
    let img = document.createElement('img')
    img.className = 'popup-e img-popup'
    img.src = data.imagem
    let pTitulo = document.createElement('p')
    pTitulo.className = 'popup-e title-popup'
    pTitulo.textContent = data.nome
    titulo.appendChild(img)
    titulo.appendChild(pTitulo)

    let containerImg = document.getElementById('container-img')
    let imgShow = document.getElementById('img-show')
    titulo.onclick = function abririmg(){
        containerImg.style.display = 'flex'
        imgShow.src = data.imagem
    }
    
    let video = document.createElement('div')
    video.className = 'popup-e video'
    let btn_fechar = document.createElement('div')
    btn_fechar.className = 'popup-e btn-fechar'
    let btn = document.createElement('button')
    btn.className = 'popup-e fechar'
    btn.onclick = function fecharpopup() {
        container.style.display = 'none'
    }
    let img_btn = document.createElement('img')
    img_btn.className = 'popup-e x'
    img_btn.src = './img/x.png'
    let trailer = document.createElement('iframe')
    trailer.id = 'player'
    trailer.src = `https://www.youtube.com/embed/${data.trailer}`
    trailer.width = '497'
    trailer.height = '280'
    trailer.frameBorder = '0'
    video.appendChild(btn_fechar)
    btn_fechar.appendChild(btn)
    btn.appendChild(img_btn)
    video.appendChild(trailer)

    let specs = document.createElement('div')
    specs.className = 'popup-e specs'

    let sinopse = document.createElement('div')
    sinopse.className = 'popup-e sinopse'
    let pSinopse = document.createElement('p')
    pSinopse.className = 'popup-e p-sinopse'
    pSinopse.textContent = data.sinopse
    sinopse.appendChild(pSinopse)

    let info_1 = document.createElement('div')
    info_1.className = 'popup-e info-1'
    let pGenero = document.createElement('p')
    pGenero.className = 'popup-e genero p-popup'
    pGenero.textContent = 'Gênero: ' + data.genero
    let pDirecao = document.createElement('p')
    pDirecao.className = 'popup-e direcao p-popup'
    pDirecao.textContent = 'Direção: ' + data.direcao
    let pElenco = document.createElement('p')
    pElenco.className = 'popup-e elenco p-popup'
    pElenco.textContent = 'Elenco: ' + data.elenco
    let pDuracao = document.createElement('p')
    pDuracao.className = 'popup-e duracao p-popup'
    pDuracao.textContent = 'Duração: ' + data.duracao + ' minutos'
    info_1.appendChild(pGenero)
    info_1.appendChild(pDirecao)
    info_1.appendChild(pElenco)
    info_1.appendChild(pDuracao)

    let info_2 = document.createElement('div')
    info_2.className = 'popup-e info-2'
    let pLancamento = document.createElement('p')
    pLancamento.className = 'popup-e genero p-popup'

    let datatabela = data.data_lancamento
    let data1 = new Date(datatabela)
    let dia = data1.getDate() + 1
    let mes = data1.getMonth() + 1
    let ano = data1.getFullYear()
    let dataformatada = (dia < 10 ? '0' : '') + dia + '/' + (mes < 10 ? '0' : '') + mes + '/' + ano
    pLancamento.textContent = 'Lançamento: ' + dataformatada

    let pPais = document.createElement('p')
    pPais.className = 'popup-e direcao p-popup'
    pPais.textContent = 'País: ' + data.pais
    let pDistribuidora = document.createElement('p')
    pDistribuidora.className = 'popup-e elenco p-popup'
    pDistribuidora.textContent = 'Distribuidora: ' + data.distribuidora
    let pClassificacao = document.createElement('p')
    pClassificacao.className = 'popup-e duracao p-popup'
    let classificacao = data.classificacao
    if (classificacao == 8){
        classificacao = 'Livre'
    }
    pClassificacao.textContent = 'Classificação: ' + classificacao
    info_2.appendChild(pLancamento)
    info_2.appendChild(pPais)
    info_2.appendChild(pDistribuidora)
    info_2.appendChild(pClassificacao)

    while (popup.firstChild) {
        popup.removeChild(popup.firstChild)
    }
    specs.appendChild(sinopse)
    specs.appendChild(info_1)
    specs.appendChild(info_2)

    popup.appendChild(titulo)
    popup.appendChild(video)
    popup.appendChild(specs)
}

function playtrailer(trailerId) {
    let tag = document.createElement('script')
    tag.src = "https://youtube.com/iframe_api"

    let firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

    let player
    function onYouTubeIframeAPIReady() {
        player = new YT.Player("player", {
            height: '360',
            width: '640',
            videoId: trailerId,
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        })
    }
    function onPlayerReady(event) {
        event.target.playVideo()
    }

    let done = false
    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
            setTimeout(stopVideo, 6000)
            done = true
        }
    }
    function stopVideo() {
        player.stopVideo()
    }
}


function categoria(ctg){
    let elemento = document.getElementById(ctg)
    let elementodisplay = window.getComputedStyle(elemento).getPropertyValue('display')
    
    if (elementodisplay == 'none'){
        let divs = document.querySelectorAll('.menu-categoria')
        divs.forEach(function(e){
            e.style.display = 'none'
        })
        elemento.style.display = 'flex'
        elemento.style.left = '22.5%'

    }else if (elementodisplay == 'flex'){
        elemento.style.display = 'none'
        elemento.style.left = '8%'
    }
}
document.addEventListener('click', function(event){
    let menu = document.getElementById('container')
    let btn = document.getElementById('btn-menu')
    let imgbtn = document.getElementById('img-btn')
    let elementos = document.querySelectorAll('.menu-e')
    
    let menudisplay = window.getComputedStyle(menu).getPropertyValue('display')
    if (menudisplay == 'none'){
        if (event.target == btn || event.target == imgbtn){
        menu.style.display = 'flex'
        }
    }
    else if (menudisplay == 'flex'){
        let isElemento = false
        elementos.forEach(function(elemento){
            if (elemento.contains(event.target)){
                isElemento = true
            }
        })
        
        if (!isElemento && event.target !== menu){
            menu.style.display = 'none'
        }
    }   
})

container.addEventListener('click', (event)=>{
    let containerdisplay = window.getComputedStyle(container).getPropertyValue('display')
    if (containerdisplay == 'flex'){
        if (event.target === container){
            container.style.display = 'none'
        }
    }
})
const containerImg = document.getElementById('container-img')
containerImg.addEventListener('click', (event)=>{
    let containerdisplay = window.getComputedStyle(containerImg).getPropertyValue('display')
    if (containerdisplay == 'flex'){
        if (event.target === containerImg){
            containerImg.style.display = 'none'
        }
    }
})



