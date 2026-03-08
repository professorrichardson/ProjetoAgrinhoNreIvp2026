const newsModal = document.getElementById('news-modal');
const newsModalImage = document.getElementById('news-modal-image');
const newsModalTitle = document.getElementById('news-modal-title');
const closeNewsModalButton = document.getElementById('close-news-modal');
const readNewsButton = document.getElementById('news-read-button');
const newsLinkButton = document.getElementById('news-link-button');
const newsTriggers = document.querySelectorAll('.noticia-trigger');

// EDITE AQUI: coloque o texto completo que deve ser lido para cada noticia.
const NEWS_TEXTS = {
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

conselho:`O Conselho Municipal de Desenvolvimento Rural Sustentável e Solidário realizou uma reunião 
ordinária em conjunto com a Secretaria de Agricultura e Abastecimento, com foco na discussão de ações 
e estratégias voltadas ao fortalecimento do meio rural.

Durante o encontro, foram debatidas iniciativas que buscam melhorar as condições de trabalho, ampliar o 
apoio aos produtores e promover o desenvolvimento sustentável no campo, sempre alinhadas às necessidades 
da agricultura local.

O diálogo permanente entre o Conselho e o poder público reforça o compromisso com a construção de 
políticas públicas eficientes, garantindo mais oportunidades, qualidade de vida e valorização para 
quem vive e produz no meio rural`,
};

let activeNewsText = '';
let activeNewsUrl = '';

function stopNewsReading() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  readNewsButton.textContent = 'Ler notícia';
}

function openNewsModal(trigger) {
  const title = trigger.dataset.newsTitle || 'Notícia';
  const image = trigger.dataset.newsImage || '';
  const newsId = trigger.dataset.newsId || '';
  const newsUrl = trigger.dataset.newsUrl || '';

  newsModalTitle.textContent = title;
  newsModalImage.src = image;
  newsModalImage.alt = title;
  activeNewsText = NEWS_TEXTS[newsId] || '';
  activeNewsUrl = newsUrl;

  newsModal.classList.add('active');
  document.body.classList.add('modal-open');
}

function closeNewsModal() {
  stopNewsReading();
  newsModal.classList.remove('active');
  document.body.classList.remove('modal-open');
  newsModalImage.src = '';
  newsModalImage.alt = '';
  newsModalTitle.textContent = '';
  activeNewsUrl = '';
}

function readNews() {
  if (!('speechSynthesis' in window)) {
    alert('Leitura por voz não suportada neste navegador.');
    return;
  }

  if (!activeNewsText.trim()) {
    alert('Adicione o texto da notícia no arquivo script-noticias.js (objeto NEWS_TEXTS).');
    return;
  }

  stopNewsReading();
  const utterance = new SpeechSynthesisUtterance(activeNewsText);
  utterance.lang = 'pt-BR';
  utterance.rate = 1;
  utterance.pitch = 1;

  utterance.onstart = () => {
    readNewsButton.textContent = 'Lendo...';
  };

  utterance.onend = () => {
    readNewsButton.textContent = 'Ler notícia';
  };

  window.speechSynthesis.speak(utterance);
}

function goToFullNews() {
  if (!activeNewsUrl.trim()) {
    alert('Adicione a URL da notícia no data-news-url do botão no index.html.');
    return;
  }

  window.open(activeNewsUrl, '_blank', 'noopener');
}

newsTriggers.forEach((trigger) => {
  trigger.addEventListener('click', () => openNewsModal(trigger));
});

readNewsButton.addEventListener('click', readNews);
newsLinkButton.addEventListener('click', goToFullNews);
closeNewsModalButton.addEventListener('click', closeNewsModal);

newsModal.addEventListener('click', (event) => {
  if (event.target === newsModal) closeNewsModal();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && newsModal.classList.contains('active')) {
    closeNewsModal();
  }
});
