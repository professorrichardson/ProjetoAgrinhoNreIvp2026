const modalVideo = document.getElementById('modal-video');
const frameVideo = document.getElementById('frame-video');
const textoTranscricaoVideo = document.getElementById('texto-transcricao-video');
const botaoFecharVideo = document.getElementById('fechar-modal-video');
const gatilhosVideo = document.querySelectorAll('.gatilho-video');

// EDITE AQUI: transcricoes de cada video do modal.
const TRANSCRICOES_VIDEO = {
  graos: `
Olá, você que nos acompanha. O Paraná deve atingir uma participação maior nesse ano em relação ao restante do país no que se refere à safra paranaense.

O Paraná deve produzir 13,9% de toda a safra de grãos do Brasil. De acordo com o levantamento sistemático da produção agrícola do Instituto Brasileiro de Geografia Estatística, houve um leve crescimento em relação a dezembro, quando a estimativa era de que o Paraná produziria cerca de 13,5% da safra nacional.

O estado historicamente é o segundo maior produtor do Brasil, atrás apenas do Mato Grosso, que reúne 30,3% de participação. Rio Grande do Sul, Goiás e Mato Grosso do Sul são os outros principais produtores do país.

Um dos fatores é a perspectiva de aumento na produção de soja no Paraná, com produção estimada em 22,2 milhões de toneladas. O estado deve ter o segundo maior volume colhido no país, um crescimento significativo em relação às previsões iniciais.

A estimativa de produção nacional da oleaginosa alcançou um novo recorde na série histórica, totalizando 172,5 milhões de toneladas.

Em relação ao milho segunda safra, produto em que o Paraná é o segundo maior produtor do país, o estado tem uma estimativa de produção de 17,4 milhões de toneladas, participando com 16% da safra nacional.

A estimativa nacional da produção de milho, segunda safra, foi de 105 milhões de toneladas, um crescimento de 0,6% em relação ao terceiro prognóstico do ano passado.

O Paraná também é destaque na produção de feijão, sendo o maior produtor do país, com previsão de 736.500 toneladas, representando 24,2% da participação nacional.

Como se vê, o Paraná deve ter um desempenho relevante na atual safra, sem contar também a produção de proteínas, em que o estado é um dos destaques nacionais.

Obrigado, amigos. Voltamos no próximo programa.
`,
  sustentavel: `
Pelo quarto ano consecutivo, o Paraná é considerado o estado mais sustentável do Brasil, com nota máxima no ranking de competitividade dos estados divulgado pelo Centro de Liderança Pública.

Além de liderar o eixo ligado ao meio ambiente, o estado também apresenta o maior crescimento do país no índice de potencial de mercado.

Quem mora ou visita o estado se encanta e imediatamente associa o Paraná a uma palavra: sustentabilidade. Políticas públicas ligadas ao combate ao desmatamento, à coleta seletiva de lixo, associadas à transparência dada pelo governo a essas ações e aos altos índices de tratamento de esgoto, fazem do estado o mais sustentável do país pelo quarto ano consecutivo.

O secretário de Estado do Desenvolvimento Sustentável, Everton Souza, atribui esse desempenho a uma combinação de fatores e aos esforços do poder público. Segundo ele, trata-se de uma gestão de política ambiental dentro do estado que busca criar um ambiente de negócios, atrair empreendimentos e investimentos, gerar emprego, renda, impostos e qualidade de vida para os paranaenses, ao mesmo tempo mantendo importantes preocupações com o meio ambiente.

A nota 100 do Paraná nesse quesito ficou acima da obtida por São Paulo e Goiás. O estado também avançou em outras categorias: subiu 13 posições no potencial de mercado, duas posições em infraestrutura e uma em solidez fiscal.

O desempenho em sustentabilidade ambiental, somado à melhora em outros segmentos analisados pelo estudo, fez com que o Paraná continuasse na terceira colocação na classificação geral, aproximando-se de São Paulo e Santa Catarina, que aparecem na primeira e segunda posições, respectivamente.

Divulgado anualmente, o ranking leva em consideração 99 indicadores agrupados em 10 eixos estratégicos, nas áreas de infraestrutura, sustentabilidade social e ambiental, inovação, capital humano, segurança, educação e eficiência da máquina pública.

O estudo é realizado pelo Centro de Liderança Pública em parceria com a consultoria Tendências e a startup Seall.

O Paraná também se destacou em itens como eficiência da máquina pública, ficando em segundo lugar, entre Rio Grande do Sul e Santa Catarina.

As informações completas do ranking de competitividade de 2024 foram divulgadas durante o 13º Congresso Consad de Gestão Pública, evento que reúne governadores, secretários estaduais e gestores públicos em Brasília.

O governador Carlos Massa Ratinho Júnior, que participou do congresso, comemorou os resultados. Segundo ele, é a quarta vez consecutiva que o Paraná aparece como o estado mais sustentável do país, demonstrando o cuidado com o meio ambiente sem esquecer do desenvolvimento econômico.

Ele destacou que o estado conseguiu criar um equilíbrio entre preservação ambiental e crescimento econômico, além de colocar o Paraná entre os três estados mais competitivos do Brasil.

Segundo o governador, quando a máquina pública funciona e o setor produtivo também, o resultado é um estado que cresce cada vez mais.
  `,
  sanepar: `
Pelo segundo ano seguido, o Paraná foi considerado o estado mais inovador e sustentável do Brasil, segundo o ranking da consultoria Bright Cities.

O ranking leva em conta indicadores utilizados pela Organização das Nações Unidas (ONU) para orientar melhores práticas de desenvolvimento sustentável e inclusivo.

Entre os destaques do estado, as cidades de Curitiba, Maringá e Londrina aparecem entre as melhores cidades do país no levantamento.
  `,
};

function montarUrlEmbed(urlBruta) {
  try {
    const url = new URL(urlBruta);
    let idVideo = '';

    if (url.hostname.includes('youtu.be')) {
      idVideo = url.pathname.slice(1);
    } else if (url.hostname.includes('youtube.com')) {
      if (url.pathname.includes('/embed/')) {
        idVideo = url.pathname.split('/embed/')[1];
      } else {
        idVideo = url.searchParams.get('v') || '';
      }
    }

    idVideo = idVideo.split('?')[0].split('&')[0];
    if (!idVideo) return urlBruta;
    return `https://www.youtube.com/embed/${idVideo}?autoplay=1&mute=0&playsinline=1&rel=0&cc_load_policy=1&hl=pt-BR`;
  } catch {
    return urlBruta;
  }
}

function abrirModalVideo(gatilho) {
  const urlVideo = gatilho.dataset.urlVideo;
  const idVideo = gatilho.dataset.idVideo;
  if (!urlVideo) return;

  textoTranscricaoVideo.textContent = TRANSCRICOES_VIDEO[idVideo] || 'Transcricao ainda nao cadastrada para este video.';
  frameVideo.src = montarUrlEmbed(urlVideo);
  modalVideo.classList.add('ativo');
  document.body.classList.add('modal-aberto');
}

function fecharModalVideo() {
  frameVideo.src = '';
  modalVideo.classList.remove('ativo');
  document.body.classList.remove('modal-aberto');
}

gatilhosVideo.forEach((gatilho) => {
  gatilho.addEventListener('click', () => {
    abrirModalVideo(gatilho);
  });
});

botaoFecharVideo.addEventListener('click', fecharModalVideo);

modalVideo.addEventListener('click', (event) => {
  if (event.target === modalVideo) fecharModalVideo();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modalVideo.classList.contains('ativo')) {
    fecharModalVideo();
  }
});
