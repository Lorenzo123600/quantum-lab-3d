import {chapters} from './chapters.js';
import {learning} from './learning.js';
import {extendedLessons} from './extended.js';
import {reviews} from './review.js';
import {presenters,assignments} from './presenter-assignments.js';
export {presenters,assignments} from './presenter-assignments.js';
const openings=['Um elétron parece mais com uma bolinha ou com uma onda?','Uma única imagem consegue explicar toda a natureza?','Como decidir entre duas ideias defendidas por grandes cientistas?','Como duas aberturas podem produzir várias faixas claras?','A natureza pode trocar energia em qualquer quantidade?','Será que uma luz muito intensa sempre consegue arrancar elétrons?','Por que cada elemento tem sua própria assinatura de cores?','Se a luz tem momento, a matéria também pode ter comprimento de onda?','Como um cristal pode testar uma ideia sobre elétrons?','Um ponto de cada vez pode formar um desenho organizado?','Dá para preparar posição e momento com dispersões arbitrariamente pequenas?','Uma nuvem de pontos é uma órbita ou um mapa de possibilidades?','Uma teoria científica nasce pronta?','O que o nosso celular tem a ver com física quântica?','Qual ideia desta viagem mais desafiou a nossa intuição?','O que mudou na maneira como vocês imaginam a natureza?'];
const demonstrations=[
 'Use o átomo inicial e arraste a cena. Diga que se trata de representação artística, sem trajetórias reais. Clique em Iniciar exploração quando a turma estiver pronta.',
 'Em Visualização, compare Onda clássica, Partícula clássica e Sistema quântico. Destaque a diferença entre amplitude distribuída e registro localizado.',
 'Em Teoria em destaque, selecione Newton, Huygens e Comparar. Os lados mostram modelos históricos; não são filmagens da luz.',
 'No capítulo 4, mantenha d = 0,25 mm e L = 1,8 m. Compare λ = 500 nm e 700 nm: Δy passa de aproximadamente 3,60 mm para 5,04 mm. Depois aumente d e veja as franjas se aproximarem.',
 'Na Frequência, compare 500 e 1000 THz. A energia por quantum dobra, porque E = hf. Quantidade de quanta não é frequência.',
 'Escolha Zinco. Use 300 THz e intensidade de 90%: hf < φ, sem emissão. Aumente a frequência para 1500 THz, mantendo o metal: haverá emissão e Kmax positivo.',
 'Em Nível final, passe de n = 1 para n = 3 e depois para n = 2. A primeira transição exige absorção; a segunda emite um fóton. Os anéis pertencem ao modelo histórico de Bohr.',
 'No Momento do elétron p, compare 1 e 2 × 10⁻²⁴ kg·m/s. O comprimento de onda cai pela metade. Compare com o objeto macroscópico informado no resultado.',
 'Use 54 V. Varie Ângulo rasante θ de 50° para perto de 67° e observe o máximo deste modelo. A rede tem planos repetidos que somam amplitudes; a geometria é simplificada, não reproduz os dados históricos de níquel.',
 'Sem informação de caminho, clique Emitir 1 elétron e aguarde a chegada. Acumule 1000 eventos. Ative Obter informação de caminho: os dados são limpos para não misturar condições. Emita novamente e compare.',
 'Em Largura espacial Δx, compare 1,0 e 0,5 nm. Δp dobra. Use as distribuições separadas e o laboratório gaussiano opcional para comparar amplitude, densidade e medições.',
 'Selecione 1s, 2s e 2pₓ. Arraste e faça zoom; compare nó radial e plano nodal. No módulo 1D opcional, faça medições da gaussiana: ele é um exemplo distinto dos orbitais 3D.',
 'Selecione Young, de Broglie, Davisson e Germer e Tonomura na linha do tempo. Compare proposta teórica e evidência. Tonomura utilizou biprisma eletrônico.',
 'Em Tecnologia, compare microscópios eletrônicos, semicondutores e painéis solares. Relacione cada uso à explicação exibida, sem chamar um processador comum de computador quântico.',
 'Faça o quiz: selecione uma alternativa, leia a explicação e use Próxima pergunta. Errar não retira XP. O resultado do quiz e as conclusões das lições têm funções diferentes.',
 'Use Referências e leituras para indicar as fontes. Retome interferência e detecções localizadas. Use Encerrar para o agradecimento; a animação final é uma metáfora artística.'
];
const activities=[
 'Cada pessoa diga ou anote uma previsão: o que espera ver em uma dupla fenda? Não precisa acertar agora.',
 'Abram o desafio D1 e alternem os três modelos. Escolham qual observação exige somar amplitudes.',
 'Escolham uma das duas teorias e expliquem que experimento poderia testar uma previsão dela.',
 'Abram D2. Registrem a previsão antes de aumentar λ de 500 para 700 nm. Comparem o resultado mantendo d e L.',
 'Cada um escolha uma frequência e depois o dobro dela, dentro do controle. Compare a energia individual.',
 'Tentem produzir emissão com luz abaixo do limiar e intensidade alta. Depois mudem somente a frequência.',
 'Façam uma absorção seguida de uma emissão. Digam qual transição liberou energia.',
 'Dobrem p e comparem λ. Expliquem a relação inversa ao colega ao lado.',
 'Abram D3. Procurem uma direção de intensidade baixa e um máximo, sem mudar a tensão.',
 'Abram D5. Compare um evento individual e muitos eventos; repitam com informação de caminho.',
 'Abram D4. Reduzam Δx à metade e leiam o novo Δp. Registrem se sua previsão se confirmou.',
 'Compare os orbitais e depois faça 100 medições no exemplo gaussiano 1D. As marcas isoladas não são órbitas.',
 'Escolham dois marcos históricos e expliquem como um deles testou ou ampliou uma proposta anterior.',
 'Escolham uma tecnologia presente no cotidiano e contem qual princípio quântico ajuda a entendê-la.',
 'Respondam individualmente e leiam o feedback antes de conversar com os colegas. Ninguém perde pontos por errar.',
 'Revisem a previsão anotada no início. Compartilhem uma ideia que mudou e uma pergunta que continua aberta.'
];
const essentialConcepts=[
 ['Interferência testa amplitudes e fases.','Uma detecção é um registro localizado.','Uma imagem artística não determina a trajetória.'],
 ['Amplitude não é probabilidade.','Probabilidade vem do módulo ao quadrado.','Modelos clássicos têm domínios de validade.'],
 ['Newton e Huygens propuseram modelos históricos.','Previsões precisam ser testadas.','Reflexão e refração não encerram a discussão.'],
 ['Reforço e cancelamento dependem de fase.','Δy cresce com λ e L e diminui com d.','O envelope de difração depende da largura da fenda.'],
 ['A energia de cada quantum é hf.','Frequência é diferente de intensidade.','Quantização surgiu no estudo do corpo negro.'],
 ['Cada metal possui uma função trabalho.','A frequência precisa atingir o limiar ideal.','Mais fluxo não substitui energia por fóton.'],
 ['O hidrogênio tem níveis de energia ligados.','Subir exige absorção; descer permite emissão.','Bohr não descreve orbitais modernos.'],
 ['O momento determina λ = h/p.','Dobrar p reduz λ à metade.','Coerência e escalas importam na observação.'],
 ['Cristais têm estruturas periódicas.','Elétrons apresentam difração.','A cena é um modelo qualitativo de planos.'],
 ['Cada evento tem posição localizada.','Muitos eventos revelam uma distribuição.','Informação de caminho envolve interação física.'],
 ['Δx e Δp são dispersões de preparações equivalentes.','Uma gaussiana mínima satura o limite.','Incerteza não é só imperfeição instrumental.'],
 ['ψ descreve amplitudes, |ψ|² densidade.','Orbitais não são trajetórias.','Nós são regiões de densidade nula no estado ideal.'],
 ['Teorias e experimentos se influenciam.','Resultados precisam de contexto histórico.','Biprisma eletrônico não é uma dupla fenda material.'],
 ['Semicondutores dependem de estrutura de bandas.','Lasers usam emissão estimulada.','Computadores comuns não são todos computadores quânticos.'],
 ['Justificar importa mais que adivinhar.','Feedback permite revisar ideias.','O quiz não muda o limite de 320 XP.'],
 ['A teoria prevê probabilidades testáveis.','Modelos visuais são representações.','Conhecimento científico permanece aberto a novas evidências.']
];
export const presenterScripts=chapters.map((chapter,i)=>({
 chapter:i,owner:assignments[i],color:presenters[assignments[i]],opening:openings[i],
 speech:chapter.notes+'\n\n'+extendedLessons[i].deeper+'\n\n'+learning[i].key,
 essentials:[learning[i].key,...essentialConcepts[i]],
 demonstration:demonstrations[i],participation:activities[i],question:reviews[i][0],answer:reviews[i][1][reviews[i][2]],explanation:reviews[i][3],
 transition:i<15?'Essa ideia prepara a próxima pergunta: '+openings[i+1]:'Agora podemos agradecer à turma, ouvir perguntas e continuar explorando as referências.',minutes:chapter.time,
}));
