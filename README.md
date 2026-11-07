# QUANTUM LAB
**A natureza surpreendente da luz e da matéria.**

## Trabalho escolar: abertura e agradecimento
Título oficial: **Trabalho sobre física quântica**. Disciplina: Física. Turma: 3º ano do Ensino Médio. Ano: 2026. Integrantes: **Lorenzo, Maria, Rafaella, Heloá e Heloísa**. Heloá e Heloísa são duas integrantes distintas. A identidade técnica da plataforma continua sendo Quantum Lab.

O endereço inicial e `#inicio` mostram a abertura. **Pular animação** revela imediatamente os elementos; **INICIAR APRESENTAÇÃO**, espaço, Enter ou seta direita iniciam o capítulo 1. Os links `#capitulo-1` a `#capitulo-16` continuam entrando diretamente nas lições, sem obrigar a assistir à abertura. A abertura e o agradecimento não contam como capítulos ou recompensas.

Depois do capítulo 16, **Encerrar** ou seta direita/espaço abre `#agradecimento`. A seta esquerda retorna ao capítulo 16. A tela final nunca reinicia sozinha: seus botões voltam à abertura, abrem a trilha ou levam à dupla fenda de Young. A apresentação pode incluir todas essas telas em sequência; notas e controles científicos permanecem disponíveis nos capítulos.

O mesmo renderizador WebGL é movido entre laboratório e telas escolares. A cena anterior é descartada na troca. O átomo da abertura é artístico; a onda e os pontos do agradecimento são uma metáfora. Sem WebGL, uma ilustração vetorial permite continuar navegando. Animações curtas respeitam movimento reduzido. A identificação dos integrantes fica centralizada em `src/content/school.js`.

Apresentação educacional 3D em português para o 3º ano do Ensino Médio. Dezesseis capítulos com Three.js/WebGL, gráficos quantitativos, simulações controláveis, quiz e modo apresentador. Aplicação estática: não usa contas, APIs de cálculo ou backend.

## Quantum UI: aprender, experimentar e conferir
A interface usa fundos claros, Nunito local, cartões temáticos e botões com profundidade. O laboratório mantém uma superfície escura para ondas, elétrons e orbitais. A **Trilha** reúne os 16 capítulos, todos abertos, com progresso salvo neste aparelho. Cada lição tem uma revisão curta, feedback sem punição e conclusão opcional. Concluir uma lição dá 20 XP simbólicos uma única vez; há conquistas em 1, 4, 8 e 16 lições. O quiz final também pode concluir sua lição. Não há contas, ranking ou envio de dados. Configurações permite zerar o progresso local. Reiniciar a apresentação reinicia o roteiro, sem apagar conquistas.

O design system e as referências consultadas estão em [docs/QUANTUM_UI.md](docs/QUANTUM_UI.md). Os ícones são originais e nenhuma fonte, mascote ou ilustração proprietária foi copiada. A estrutura científica, os parâmetros e as fórmulas das simulações foram preservados.

## Atualização 3.0
- **Estudar este capítulo** abre, em cada uma das 16 lições, introdução de 80–130 palavras, explicação de 180–300 palavras, história, pelo menos dois exemplos, curiosidade, resumo e referências. As fórmulas têm símbolos, unidades e exemplos resolvidos quando apropriado. O texto curto continua disponível para projetar.
- **Investigue**, no laboratório, propõe uma hipótese opcional nos nove experimentos de Young a orbitais. A conclusão exige uma sequência coerente de valores reais e uma interpretação correta; clicar em qualquer controle não basta. As simulações continuam livres, sem precisar iniciar desafios.
- **Quântico** é um mascote SVG original e fictício, dentro do cartão de conteúdo. Reage a capítulos, respostas, evidências e conclusões. Configurações permite desativar suas mensagens e animações; movimento reduzido é respeitado.
- **Modo apresentação (P)**, em Configurações, amplia o laboratório e os títulos, reduz elementos de estudo e tenta tela cheia. Se a API não estiver disponível, o layout funciona na janela. Há pausa global, reinício do experimento, dicas de câmera e navegação livre. Os avisos científicos continuam visíveis mesmo ao ocultar dicas.
- As notas só abrem por comando explícito e incluem fala, explicação científica, exemplos, curiosidade, demonstração, pergunta e transição. Elas ficam na mesma janela: não são uma tela privada separada do projetor.
- Leitura é uma marcação pessoal, não uma medição automática de compreensão. Progresso de estudo e de investigações fica localmente, junto ao progresso anterior, sem alterar a pontuação de lições. Zerar o progresso limpa essas marcações também.

Conteúdo ampliado: `src/content/extended.js`. Predicados dos desafios: `src/simulations/investigations.js`. Componentes de estudo, investigação e mascote ficam em `src/components/`. Os modelos matemáticos e as cenas não foram substituídos.

## Uma apresentação para aprender junto
Cada capítulo oferece uma explicação curta, um cartão colorido com a ideia principal e uma tarefa para explorar o experimento. As seções expansíveis trazem comparações, explicações dos símbolos das fórmulas e o que observar no resultado. As analogias são identificadas e seus limites são explicitados; os modelos físicos mantêm suas hipóteses e referências. Ciano, violeta, amarelo, rosa e verde dão identidade aos temas, com rótulos que também comunicam as ideias sem depender só da cor.

O conteúdo do material fornecido `quantum_lab_conteudo_codex.md` foi integrado aos 16 capítulos. `chapters.js` reúne explicações, roteiro de fala, exemplos, cuidados e notas de demonstração; `learning.js` mantém as versões curtas em tela. No botão **Notas**, o roteiro oral aparece primeiro, com seções expansíveis para explicação, exemplos, demonstração e limites científicos. Os exemplos calculados incluem Young (2 mm), Planck (3,31 × 10⁻¹⁹ J), Bohr (10,2 eV) e a bola de de Broglie (6,63 × 10⁻³⁴ m). O quiz segue as dez perguntas do material, e as referências incluem Halliday–Resnick–Walker e Hewitt. Fórmulas, parâmetros e motores dos experimentos foram preservados.

## Executar
Requer Node.js 22+ e npm.
```sh
npm install
npm run dev
```
Abra o endereço exibido pelo Vite. No celular na mesma rede, use o IP local do computador e a porta 5173; permita o acesso à porta no firewall, se necessário.

```sh
npm test
npm run build
npm run preview
```
O build fica em `dist/`. O caminho relativo configurado no Vite permite hospedar numa subpasta. Bibliotecas, fontes tipográficas e fontes do KaTeX são empacotadas. Não há carregamento de fontes externas em tempo de execução. Após instalar e construir, os cálculos e recursos essenciais não dependem de serviços externos.

## Apresentar
- Setas esquerda/direita: capítulos; espaço: avançar.
- F: tela cheia; H: ocultar/restaurar interface; N: notas do apresentador.
- Os atalhos não capturam teclas em campos, links, botões, menus ou controles do experimento.
- Menu de capítulos e botões anterior/próximo funcionam por toque.
- Arraste a cena para girar; rolagem ou pinça para zoom. “Câmera” restaura a vista.
- Configurações: qualidade baixa/média/alta e som opcional (desativado inicialmente).
- Notas: explicações simples, roteiro, duração estimada e cronômetro. As notas aparecem no mesmo dispositivo; não são uma segunda janela privada.
- Duração sugerida: 38 minutos, ajustável conforme as demonstrações.
- Use o modo tela cheia do navegador se a Fullscreen API não estiver disponível.

## Capítulos
1. Abertura artística com nuvem atômica
2. Onda, partícula e sistema quântico
3. Newton e Huygens
4. Young: parâmetros e franjas de interferência
5. Planck: degraus e energia do quantum
6. Einstein: frequência de corte, intensidade e metais
7. Bohr: transições do hidrogênio
8. De Broglie: momento e comprimento de onda
9. Davisson e Germer: difração cristalina simplificada
10. Elétrons individuais: acúmulo Monte Carlo e informação de caminho
11. Heisenberg: pacote gaussiano e dispersões
12. Orbitais 1s, 2s, 2pₓ, 2pᵧ e 2p𝓏
13. Linha do tempo com 12 marcos
14. Seis aplicações tecnológicas
15. Quiz de 10 questões, feedback e resultado
16. Encerramento, metáfora visual e referências

## Publicar gratuitamente
### GitHub Pages
1. Em **Settings → Pages**, selecione **GitHub Actions** como fonte.
2. Em **Actions → Publish to GitHub Pages → Run workflow**, execute o workflow manual.
3. O link será informado pelo job de publicação.

Depois da configuração inicial do Pages, a publicação é atualizada automaticamente quando o workflow de validação da branch main termina com sucesso. Também é possível executar a publicação manualmente. GitHub Pages é gratuito para este repositório público; em repositórios privados a disponibilidade depende do plano.

### Vercel ou Netlify
Importe o repositório e selecione Vite. Comando de build: `npm run build`; pasta de saída: `dist`. Não há variáveis de ambiente. Nenhuma integração da Vercel é necessária para desenvolver ou executar localmente.

## Arquitetura
- `src/content/`: conteúdo, notas, perguntas, cronologia e referências.
- `src/physics/`: modelos matemáticos puros em SI, com saídas de energia em eV documentadas.
- `src/simulations/`: estados e ações dos experimentos; amostrador de eventos eletrônicos.
- `src/scenes/`: geometrias e animações 3D.
- `src/components/`: renderizador, controles acessíveis e gráficos Canvas 2D.
- `src/utils/`: som sintetizado na Web Audio API.
- `tests/`: testes físicos e testes de navegador Playwright.

Só a cena ativa existe na GPU. A troca descarta geometrias, materiais e texturas. O cristal usa InstancedMesh. Nuvens e detecções usam BufferGeometry/Points. O pixel ratio é limitado; a qualidade cai automaticamente após uma janela de quadros lentos. Frames usam tempo decorrido limitado, pausam em abas ocultas e respeitam movimento reduzido. Perda/restauração de contexto WebGL tem tratamento; sem WebGL o conteúdo, os controles e gráficos continuam disponíveis.

## Física e limites dos modelos
- **Young:** `I(y) ∝ sinc²(πay/λL) cos²(πdy/λL)`, com `a = 40 µm`. Coerência ideal, iluminação uniforme, campo distante e aproximação paraxial. `Δy ≈ λL/d`. Tela gráfica entre −12 e +12 mm. As distâncias do aparato 3D não estão em escala física.
- **Elétrons:** mesma forma de Fraunhofer, com `λ = 5 pm`, `L = 1 m`, `d = 2 nm` e `a = 0,4 nm`. Sem caminho distinguível, soma coerente; com informação ideal, média de envelopes de fenda única deslocados. A CDF é normalizada na janela finita de ±12 mm. O eixo transversal secundário é uniforme e didático. A memória guarda os últimos 12.000 pontos, mas o contador e histograma acumulam todos os eventos. Trocar a configuração limpa os dados para não misturar distribuições. Não há trajetórias clássicas não medidas.
- **Fotoelétrico:** `Kmax = max(0, hf − φ)`, com emissão somente se `hf ≥ φ`. Intensidade controla fluxo, não o limiar. φ típicos: Cs 2,14 eV, Na 2,28 eV, Zn 4,30 eV. Superfícies reais variam; processos multifotônicos não são modelados. O gráfico mostra energia máxima, não a distribuição de energias emitidas.
- **Planck:** escada `Eₙ = nhf`; não simula o espectro de corpo negro.
- **Bohr:** `Eₙ = −13,6/n² eV`. Diferenças de energia do hidrogênio, sem probabilidades de transição ou regras de seleção orbitais. Anéis pertencem ao modelo histórico, com raios comprimidos para leitura.
- **De Broglie:** `λ = h/p`. Onda desenhada com escala ampliada, sem supor vibração material do elétron.
- **Cristal:** soma coerente de oito planos, espaçamento 0,091 nm e energia não relativística eV. Máximos satisfazem Bragg; não é ajuste aos dados originais nem reprodução da geometria Davisson–Germer.
- **Incerteza:** gaussiana de incerteza mínima, `Δp = ℏ/(2Δx)`; Δ é desvio padrão. Curvas normalizadas na altura, com eixos de unidades diferentes identificados.
- **Orbitais:** rejeição de propostas uniformes no volume por densidades hidrogenoides: `1s ∝ e⁻²ʳ`, `2s ∝ (2−r)² e⁻ʳ`, `2pᵢ ∝ rᵢ² e⁻ʳ`, com r em raios de Bohr. Normalização implícita na amostragem; domínio truncado. Escalas visuais diferentes entre 1s e os demais. Cores não representam fase. Pontos não são elétrons simultâneos nem trajetórias.
- A animação final é metáfora. Não se atribui medição à consciência humana.
- Tonomura (1989) utilizou biprisma eletrônico, não uma barreira material com duas fendas.

As referências verificáveis estão no capítulo 16 e em `src/content/chapters.js`: OpenStax University Physics vol. 3; Griffiths & Schroeter (2018); Nobel Prize; artigos de Davisson–Germer, Jönsson e Tonomura e colaboradores.

## Testes e estado da validação
```sh
npm test
npx playwright install chromium
npm run test:e2e
```
Playwright usa Chromium desktop e viewport/touch de Galaxy S9+, verificando os 16 capítulos, ausência de erros, overflow, quiz, controles, notas, teclado e informação de caminho. Emulação não substitui teste num aparelho Samsung real.

O ambiente local da sessão de criação estava indisponível; a execução foi feita pelo GitHub Actions. Na primeira validação, **instalação npm, 8 testes físicos, build de produção e 10 testes de navegador passaram**, cobrindo desktop e celular emulado. A suíte também inclui uma varredura ampliada de sliders, seletores, toggles, câmera e navegação, adicionada na revisão final. O workflow `Validate Quantum Lab` executa todos os testes e fornece o build e capturas de tela como artefatos. Consulte a execução mais recente antes de apresentar. Não houve inspeção visual manual das capturas nessa sessão. A checagem em projetor, smartphone físico, tela cheia e restauração real de WebGL continua pendente.

## Checklist antes da aula
Abra o site no computador da apresentação, confirme o workflow verde e teste som (se desejado), tela cheia, câmera e o capítulo 10. Carregue a página antes da aula. Ajuste a qualidade para o equipamento. As cores luminosas e pontos pequenos podem precisar de mais brilho em projetores.

### Conquista quântica de 320 pontos

As 16 lições continuam valendo 20 XP cada. Somente as 16 conclusões únicas reais desbloqueiam a comemoração; valores numéricos de XP armazenados não concedem pontos. A exibição automática acontece uma vez por navegador, registrada separadamente em `quantum-maximum-achievement-v1`, sem alterar o progresso existente. Depois, clique no contador de XP ou em **Trilha → Suas conquistas → Conquista quântica** para rever a medalha.

**Minha conquista** mostra um cartão PNG gerado localmente. **Compartilhar conquista** usa o compartilhamento nativo de arquivos quando disponível e oferece o download da imagem nos demais dispositivos. Nenhum dado é enviado automaticamente. A medalha reutiliza o renderizador Three.js, pausa o laboratório enquanto aberta e possui alternativa visual sem WebGL. A animação respeita movimento reduzido e não acrescenta sons automáticos.

### Identidade sonora original (Web Audio API)

O botão de alto-falante no cabeçalho abre controles independentes de música, efeitos e seus volumes. **Música e efeitos vêm ligados** para novos visitantes, conforme a solicitação posterior à versão 4.0. O som só começa após um clique, toque ou interação de teclado. Os volumes continuam ajustáveis independentemente. O som começa somente após uma interação, conforme as regras dos navegadores. Preferências já salvas, inclusive áudio desligado ou volumes menores, são preservadas. Preferências locais usam `lorenzos-physics-audio-v1`. Preferências já ativadas só voltam a tocar depois de uma nova interação no navegador, nunca no carregamento.

Toda a trilha e todos os efeitos são composições instrumentais originais sintetizadas pelo projeto, sem samples, músicas comerciais, arquivos de terceiros ou licenças externas. A trilha usa quatro compassos de oito segundos (Cmaj7, Am7, Fmaj7, Gsus2), com acordes suaves e notas cristalinas sobrepostas. Ataques e caudas graduais permitem repetição sem cortes. O gerenciador central mantém um único contexto e um único agendador, limita vozes simultâneas, libera os nós finalizados e pausa ao ocultar a página. Não há sons em sliders, movimentos da câmera ou emissões contínuas.

As respostas das revisões, do quiz e das investigações emitem eventos semânticos. Conclusões de lições e conquistas usam a pontuação real existente. Ao desbloquear os 320/320 pela primeira vez, a medalha inicia uma fanfarra original de 7,2 segundos **somente se os efeitos estiverem ativados e o navegador já tiver sido desbloqueado por interação**. A música reduz suavemente de volume durante a fanfarra e depois retorna ao volume escolhido. Reabrir uma conquista não repete a fanfarra. Desativar os efeitos ou sair da página interrompe a sequência. O checkbox antigo em Configurações permanece sincronizado com os novos controles. Falhas ou ausência de Web Audio não impedem os capítulos e experimentos.


## Lorenzo's Physics 4.0

A auditoria está em [docs/4.0-auditoria.md](docs/4.0-auditoria.md). A adaptação do PDF recebido e suas correções científicas estão em [docs/caderno-revisao.md](docs/caderno-revisao.md). Os 16 capítulos e todos os textos anteriores foram preservados. Nenhuma atividade nova concede XP; o máximo permanece 320.

### Modo Apresentador independente

Abra **Trilha → Roteiros em outra aba** ou **Apresentador → Abrir roteiro profissional em outra aba**. Também é possível usar `?modo=apresentador#capitulo-4` após o endereço base do site. A rota é pública, não autenticação. Não inicializa o laboratório nem altera `quantum-lab-progress-v1`; a simulação na outra aba continua no mesmo estado. Nenhuma aba controla os aparelhos dos colegas.

O seletor navega pelos 16 roteiros, com responsável e cor oficial. Cada roteiro contém abertura, fala completa, conceitos, demonstração, participação, pergunta com resposta oculta e transição. O tempo sugerido é ajustável de 1 a 30 minutos. O cronômetro é opcional e não avança sozinho. A+/A− ajustam a fonte; Leitura confortável amplia o espaçamento; Exibir respostas é uma escolha da aba. Checkboxes marcam tópicos e o campo de notas aceita até 6000 caracteres por capítulo. Notas, marcações, fonte e minutos ficam na chave local `physics-presenter-v4`. Use setas ou espaço fora dos campos para navegar. Os controles preservam suas teclas nativas.

Distribuição: Heloá (1), Rafaella (2 e 15), Maria (3 e 14), Lorenzo (4–13), Heloísa (16).

### Atividades, leituras e acessibilidade

- **Trilha → Desafios D1–D5**: previsão, instruções, acesso ao experimento e reflexão. Links `#desafio-D1` até `#desafio-D5` abrem atividades específicas. Previsões são locais, opcionais e sem sincronização. Evidências das nove investigações existentes continuam sendo verificadas pelo modelo.
- **Trilha → Sala dos Mistérios Quânticos** ou `#misterios`: seis temas opcionais, exemplos esquemáticos e reflexões sobre interpretações, sem prometer consenso onde não existe.
- **Do caderno ao laboratório**: tópicos associados aos capítulos, em três níveis; páginas de origem e fontes da revisão. Trechos ilegíveis e os desenhos originais não foram inventados. O texto existente de Estudar este capítulo continua disponível.
- **Configurações → Leitura e movimento**: resumo simplificado, texto maior e redução de animações persistentes. Movimento reduzido do sistema também é respeitado; áudio e mascote têm controles próprios.
- **Restaurar parâmetros iniciais** reinicia a preparação do capítulo sem apagar XP. O roteiro da investigação identifica objetivo, hipótese, controles, procedimento, observação, explicação e reflexão.
- Nos capítulos 11 e 12, o laboratório gaussiano 1D permite comparar ψ, |ψ|², distribuição de momento e amostras independentes. No 11, Δx acompanha o controle principal. No 12, é um estado didático distinto dos orbitais 3D. Dados são limpos quando muda a preparação, e medidas fora da janela continuam nas estatísticas. Os gráficos principais de posição e momento têm eixos separados.
- As seis medalhas adicionais são simbólicas: interação experimental, hipótese verificada pelas investigações, resposta correta, metade, 16 lições e 320 pontos. Não acrescentam XP. As quatro conquistas anteriores e a comemoração de 320 permanecem.

As animações e a qualidade adaptativa do Stage continuam em uso, sem renderizadores adicionais. A rota de roteiro é carregada sob demanda. Não são garantidos desempenhos específicos em modelos físicos de aparelhos que não estejam disponíveis para teste; testes móveis usam emulação de layout e toque no Chromium. Não há login, backend, serviços pagos ou dependências novas.


### Se o áudio ficar sem som no celular

Abra o botão 🔊 e use **Ativar música e efeitos**. Esse botão ativa os dois canais e libera o contexto no próprio clique/toque, mantendo os volumes escolhidos (um volume em zero volta a 100% nessa ação explícita). **Testar som** toca uma sequência curta quando os efeitos estão habilitados. Em caso de silêncio, confira o volume de mídia e a saída de áudio/Bluetooth do aparelho. Os controles individuais continuam disponíveis e o padrão atual é ligado, com reprodução somente após interação.

O desbloqueio usa `click`, `touchend` e teclado, em vez de depender do início do toque. Um `resume()` pendente pode ser repetido durante um novo gesto sem criar outro contexto ou outra trilha. O botão de retomar permite tentar novamente após falhas transitórias. Testes incluem esse bloqueio simulado e medição de sinal no grafo Web Audio real.

A configuração de áudio migra uma única vez as preferências antigas (version 1) para ambos os canais ativos. Volumes positivos são preservados; volumes em zero passam a 100% nessa migração. Novas escolhas explícitas, inclusive desligar, usam version 2 e permanecem salvas. Essa migração não acessa nem altera progresso, XP, conquistas ou anotações.
