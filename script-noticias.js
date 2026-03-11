const modalNoticia = document.getElementById('modal-noticia');
const imagemModalNoticia = document.getElementById('imagem-modal-noticia');
const tituloModalNoticia = document.getElementById('titulo-modal-noticia');
const botaoFecharNoticia = document.getElementById('fechar-modal-noticia');
const botaoLerNoticia = document.getElementById('botao-ler-noticia');
const botaoLinkNoticia = document.getElementById('botao-link-noticia');
const gatilhosNoticia = document.querySelectorAll('.gatilho-noticia');

// EDITE AQUI: coloque o texto completo que deve ser lido para cada noticia.
const TEXTOS_NOTICIAS = {
  inauguracao: `Na tarde desta quinta-feira, 10 de julho de 2025, Jardim Alegre viveu um momento histórico:
  foi inaugurada a Unidade de Beneficiamento de Ovos Caipira e Orgânico da COCAVI – Cooperativa de 
  Comercialização Camponesa Vale do Ivaí. Com este marco, Jardim Alegre passa a abrigar a primeira 
  agroindústria de ovos orgânicos em áreas de Reforma Agrária do Estado do Paraná, um avanço pioneiro 
  que fortalece a agricultura familiar e eleva o protagonismo do nosso município no cenário estadual.
As benfeitorias realizadas na estrutura da Unidade de beneficiamento foram contempladas por meio do 
Programa de Apoio ao Cooperativismo da Agricultura Familiar do Paraná (Coopera Paraná) sendo uma ação 
 governamental com o objetivo de fortalecer as cooperativas da agricultura familiar do Paraná, por 
 meio de ações integradas entre setor público e privado, para que melhorem sua eficiência, promovendo 
 maiores condições para a sustentabilidade das organizações.
Neste primeiro momento, a agroindústria tem capacidade de beneficiar cerca de 3 mil ovos por dia,
utilizando processo manual com bandejas classificadoras por diâmetro e balança para aferição do peso médio.
Com atuação prevista para atender cooperados e cooperadas de 33 municípios da área do Consórcio 
Intermunicipal CID Centro, a produção de ovos caipiras de Jardim Alegre está prestes a ganhar o 
Brasil, levando junto o exemplo de organização, trabalho coletivo e pioneirismo de nossa gente.`,

  ambiental: `A Secretaria de Meio Ambiente realizou uma importante ação de educação ambiental com alunos 
  da rede municipal, promovendo aprendizado de forma leve, interativa e educativa.
Com a atividade "Colorindo e Aprendendo", as crianças participaram de momentos lúdicos voltados à 
conscientização sobre a reciclagem de materiais, entendendo de forma prática a importância da 
separação correta do lixo, do cuidado com o meio ambiente e da responsabilidade coletiva.
Durante a ação, os estudantes puderam colorir materiais educativos, identificar as cores da 
coleta seletiva e aprender como pequenas atitudes no dia a dia fazem grande diferença para o 
futuro do planeta.
A iniciativa reforça o compromisso da Secretaria com a formação de cidadãos mais conscientes, 
incentivando desde cedo hábitos sustentáveis e o respeito ao meio ambiente.`,

  conselho: `O Conselho Municipal de Desenvolvimento Rural Sustentável e Solidário realizou uma reunião 
ordinária em conjunto com a Secretaria de Agricultura e Abastecimento, com foco na discussão de ações 
e estratégias voltadas ao fortalecimento do meio rural.

Durante o encontro, foram debatidas iniciativas que buscam melhorar as condições de trabalho, ampliar o 
apoio aos produtores e promover o desenvolvimento sustentável no campo, sempre alinhadas às necessidades 
da agricultura local.

O diálogo permanente entre o Conselho e o poder público reforça o compromisso com a construção de 
políticas públicas eficientes, garantindo mais oportunidades, qualidade de vida e valorização para 
quem vive e produz no meio rural`,
};

let textoNoticiaAtivo = '';
let urlNoticiaAtiva = '';

function pararLeituraNoticia() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  botaoLerNoticia.textContent = 'Ler notícia';
}

function abrirModalNoticia(gatilho) {
  const titulo = gatilho.dataset.tituloNoticia || 'Notícia';
  const imagem = gatilho.dataset.imagemNoticia || '';
  const idNoticia = gatilho.dataset.idNoticia || '';
  const urlNoticia = gatilho.dataset.urlNoticia || '';

  tituloModalNoticia.textContent = titulo;
  imagemModalNoticia.src = imagem;
  imagemModalNoticia.alt = titulo;
  textoNoticiaAtivo = TEXTOS_NOTICIAS[idNoticia] || '';
  urlNoticiaAtiva = urlNoticia;

  modalNoticia.classList.add('ativo');
  document.body.classList.add('modal-aberto');
}

function fecharModalNoticia() {
  pararLeituraNoticia();
  modalNoticia.classList.remove('ativo');
  document.body.classList.remove('modal-aberto');
  imagemModalNoticia.src = '';
  imagemModalNoticia.alt = '';
  tituloModalNoticia.textContent = '';
  urlNoticiaAtiva = '';
}

function lerNoticia() {
  if (!('speechSynthesis' in window)) {
    alert('Leitura por voz não suportada neste navegador.');
    return;
  }

  if (!textoNoticiaAtivo.trim()) {
    alert('Adicione o texto da notícia no arquivo script-noticias.js (objeto TEXTOS_NOTICIAS).');
    return;
  }

  pararLeituraNoticia();
  const leitura = new SpeechSynthesisUtterance(textoNoticiaAtivo);
  leitura.lang = 'pt-BR';
  leitura.rate = 1;
  leitura.pitch = 1;

  leitura.onstart = () => {
    botaoLerNoticia.textContent = 'Lendo...';
  };

  leitura.onend = () => {
    botaoLerNoticia.textContent = 'Ler notícia';
  };

  window.speechSynthesis.speak(leitura);
}

function abrirNoticiaCompleta() {
  if (!urlNoticiaAtiva.trim()) {
    alert('Adicione a URL da notícia no data-url-noticia do botão no index.html.');
    return;
  }

  window.open(urlNoticiaAtiva, '_blank', 'noopener');
}

gatilhosNoticia.forEach((gatilho) => {
  gatilho.addEventListener('click', () => abrirModalNoticia(gatilho));
});

botaoLerNoticia.addEventListener('click', lerNoticia);
botaoLinkNoticia.addEventListener('click', abrirNoticiaCompleta);
botaoFecharNoticia.addEventListener('click', fecharModalNoticia);

modalNoticia.addEventListener('click', (event) => {
  if (event.target === modalNoticia) fecharModalNoticia();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modalNoticia.classList.contains('ativo')) {
    fecharModalNoticia();
  }
});
