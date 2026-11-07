// Scientific content and oral script integrated from the supplied teaching document.
export const chapters = [
  {
    "title": "Dualidade onda-partícula",
    "kicker": "Uma viagem além da intuição",
    "text": "A luz é uma onda ou uma partícula? E os elétrons?",
    "detail": "Explore como propagação, interferência e detecção revelam aspectos diferentes dos sistemas quânticos.",
    "kind": "Representação artística",
    "formula": "",
    "notes": "Durante séculos, a luz foi motivo de debates. Alguns cientistas imaginavam que ela era formada por partículas; outros defendiam que era uma onda. Depois, descobrimos algo mais surpreendente: os elétrons também apresentam fenômenos ondulatórios. Hoje vamos investigar as evidências e entender por que a natureza é mais interessante do que as nossas primeiras explicações.",
    "time": 1,
    "demonstrationNotes": "Abra perguntando como a turma imagina um elétron. O átomo luminoso é uma composição artística: a nuvem não mostra trajetórias. Apresente a pergunta central sem prometer uma resposta clássica.",
    "explanation": "A física clássica distinguia ondas e partículas. Ondas apresentam propagação e interferência; partículas clássicas são tratadas como objetos localizados. Experimentos realizados entre os séculos XIX e XX revelaram que a luz e os elétrons apresentam propriedades que não se encaixam completamente nessa separação. A mecânica quântica surgiu para explicar esses resultados.",
    "example": "Perguntar: \"Se eu lançar um elétron contra duas pequenas aberturas, ele passa por uma só ou aparece um padrão espalhado?\"",
    "caution": "",
    "cautionLabel": "Cuidado com a interpretação"
  },
  {
    "title": "Além de onda ou partícula",
    "kicker": "01 / Dois modelos, uma natureza",
    "text": "Ondas podem interferir. Detecções acontecem em pontos. Objetos quânticos apresentam os dois aspectos.",
    "detail": "A função de onda fornece amplitudes de probabilidade. Sua evolução pode produzir interferência; cada registro no detector é um evento localizado. Não é uma alternância entre duas substâncias.",
    "kind": "Modelo didático simplificado",
    "notes": "Um elétron não precisa se transformar ora em água, ora em bolinha. Ele é um objeto quântico. Dependendo do experimento, observamos fenômenos associados às ondas ou eventos localizados, típicos das partículas. Nenhuma comparação clássica explica tudo sozinha.",
    "time": 2,
    "demonstrationNotes": "Use os três modos. Uma onda clássica tem amplitude distribuída; uma partícula clássica tem localização. O modo quântico combina amplitudes distribuídas e eventos, sem mostrar uma trajetória escondida.",
    "explanation": "Duas ondas podem se sobrepor e produzir interferência. Já uma partícula clássica costuma ser descrita com posição e trajetória definidas. A função de onda na mecânica quântica permite calcular amplitudes e probabilidades dos resultados. Cada detecção de elétron é localizada, mas a distribuição de várias detecções pode apresentar interferência.",
    "example": "Ondas na superfície de um lago e bolinhas de gude ajudam a apresentar as duas ideias, desde que suas limitações sejam explicadas.",
    "caution": "",
    "cautionLabel": "Cuidado com a interpretação"
  },
  {
    "title": "Newton × Huygens",
    "kicker": "02 / O debate sobre a luz",
    "text": "Século XVII: a luz seria formada por corpúsculos ou por ondas?",
    "detail": "Newton sistematizou sua óptica em Opticks (1704). Huygens apresentou sua teoria em 1678 e a publicou em 1690. A proposta corpuscular explicava raios e reflexão; frentes de onda ajudavam a entender refração e propagação. Nenhuma era a teoria quântica atual.",
    "kind": "Reconstrução histórica simplificada",
    "notes": "Newton foi decisivo para a óptica e estudou como a luz branca se separa em cores por meio de prismas. Huygens explicou a propagação por frentes de onda. O mais importante nessa disputa não era a fama de quem defendia a teoria, mas a capacidade de cada explicação prever resultados de experimentos.",
    "time": 2,
    "demonstrationNotes": "A cena divide corpúsculos e frentes de onda. O princípio de Huygens descreve frentes secundárias; a teoria de Fresnel depois incorporou interferência. Evite sugerir que Newton conhecia fótons.",
    "explanation": "Isaac Newton desenvolveu uma interpretação corpuscular da luz e publicou Opticks em 1704. Christiaan Huygens apresentou uma interpretação ondulatória, publicada no Tratado da Luz em 1690. A reflexão e a refração eram discutidas pelas duas abordagens. Experimentos posteriores, como a interferência da luz, forneceram novas evidências favoráveis à teoria ondulatória.",
    "example": "Um espelho ilustra reflexão; ondas circulares na água ilustram frentes de onda.",
    "caution": "Newton demonstrou que a luz branca contém diferentes cores, separadas por um prisma.",
    "cautionLabel": "Curiosidade histórica"
  },
  {
    "title": "Young: luz que interfere",
    "kicker": "03 / Duas fendas, muitas franjas",
    "text": "Duas fendas produzem muitas faixas claras e escuras. Isso é interferência.",
    "detail": "O cálculo usa difração de Fraunhofer para duas fendas retangulares, iluminação coerente e ângulos pequenos. A largura fixa das fendas cria um envelope de difração. As dimensões 3D são ampliadas para visualização.",
    "kind": "Simulação matemática · regime paraxial",
    "formula": "\\Delta y \\approx \\frac{\\lambda L}{d}",
    "notes": "Se fossem somente dois fluxos de bolinhas clássicas, esperaríamos duas regiões de chegada. Mas vemos várias faixas! A luz que atravessa as fendas se comporta de maneira ondulatória: suas amplitudes se somam. Quanto maior o comprimento de onda ou a distância até a tela, mais afastadas ficam as franjas.",
    "time": 3,
    "demonstrationNotes": "Aumente λ e L: as franjas se afastam. Aumente d: elas se aproximam. A largura de cada fenda é 40 µm. As ondas mostradas são esquemáticas; o perfil de intensidade usa os parâmetros em SI.",
    "explanation": "Ao atravessar duas fendas próximas, ondas luminosas coerentes podem interferir. Onde as amplitudes se reforçam, surgem franjas claras; onde se cancelam, surgem franjas escuras. No regime de pequenos ângulos, a separação entre franjas é aproximadamente Δy ≈ λL/d, com λ como comprimento de onda, L como distância até a tela e d como separação entre as fendas.",
    "example": "Luz com λ = 500 nm, L = 2 m e d = 0,5 mm produz Δy ≈ 2 mm.",
    "caution": "",
    "cautionLabel": "Cuidado com a interpretação"
  },
  {
    "title": "Planck: energia em quanta",
    "kicker": "04 / O início de uma revolução",
    "text": "A energia pode ser trocada em pacotes discretos: os quanta.",
    "detail": "Na proposta original, os osciladores da matéria trocam energia em múltiplos de hf. h = 6,62607015 × 10⁻³⁴ J·s. A ideia de quanta de luz foi desenvolvida por Einstein em 1905. A escada representa Eₙ = nhf; não é um gráfico do espectro de corpo negro.",
    "kind": "Modelo didático de quantização",
    "formula": "E = hf",
    "notes": "Uma escada é uma boa comparação: em vez de assumir qualquer altura entre dois degraus, o modelo de Planck estabelece quantidades específicas de energia. Foi uma solução matemática para um problema experimental que acabou revolucionando a ciência.",
    "time": 2,
    "demonstrationNotes": "Mude a frequência. A altura do degrau e a energia do quantum crescem. A física clássica não reproduzia todo o espectro observado, sobretudo em altas frequências.",
    "explanation": "Max Planck estudava a radiação emitida por corpos aquecidos. Para explicar seu espectro, propôs que os osciladores do modelo trocavam energia em múltiplos de hf, onde h = 6,62607015 × 10⁻³⁴ J·s é a constante de Planck e f a frequência. Essa quantização marcou o início da física quântica.",
    "example": "Para f = 5 × 10¹⁴ Hz, E ≈ 3,31 × 10⁻¹⁹ J por quantum.",
    "caution": "Não afirmar que Planck, em 1900, já havia formulado toda a interpretação moderna dos fótons.",
    "cautionLabel": "Cuidado com a interpretação"
  },
  {
    "title": "Einstein: efeito fotoelétrico",
    "kicker": "05 / Quando a luz arranca elétrons",
    "text": "Cada fóton precisa ter energia suficiente para liberar um elétron do metal.",
    "detail": "No modelo ideal de um fóton por elétron, aumentar a intensidade aumenta o fluxo de fótons e a taxa de emissão, desde que f ≥ f₀. A energia cinética máxima depende da frequência. As funções trabalho são valores típicos aproximados e dependem da superfície.",
    "kind": "Simulação matemática · modelo ideal",
    "formula": "K_{\\max}=hf-\\phi \\quad (hf\\geq\\phi)",
    "notes": "Aumentar a intensidade de uma luz com frequência muito baixa não substitui a falta de energia de cada fóton. É por isso que o efeito fotoelétrico foi uma evidência tão importante para a natureza quantizada da luz. Einstein recebeu o Nobel de Física de 1921 principalmente pela explicação desse efeito.",
    "time": 3,
    "demonstrationNotes": "Escolha zinco e diminua a frequência: nenhuma emissão ocorre, mesmo com intensidade alta. Em frequência acima do limiar, varie a intensidade: aumenta a quantidade, não a energia máxima. O resultado exibe Kmax, não a energia de todos os elétrons.",
    "explanation": "O efeito fotoelétrico ocorre quando a luz é absorvida por um material e elétrons são emitidos. No modelo ideal, cada elétron absorve a energia de um fóton. Se hf for menor que a função trabalho φ, não há emissão fotoelétrica. Acima do limiar, Kmax = hf − φ. A intensidade luminosa altera principalmente a quantidade de fótons incidentes; a frequência determina a energia de cada fóton.",
    "example": "Se φ = 3 eV, um fóton de 2 eV não produz emissão nesse modelo; um fóton de 4 eV pode produzir elétrons com energia cinética máxima de 1 eV.",
    "caution": "",
    "cautionLabel": "Cuidado com a interpretação"
  },
  {
    "title": "Bohr: saltos de energia",
    "kicker": "06 / O hidrogênio em níveis",
    "text": "Os estados do átomo de hidrogênio possuem energias permitidas.",
    "detail": "Eₙ = −13,6 eV/n². Subir de nível exige absorção; descer produz emissão. Os anéis são uma representação histórica didática. Orbitais modernos não são órbitas planetárias.",
    "kind": "Modelo histórico · hidrogênio",
    "formula": "|\\Delta E|=hf",
    "notes": "O átomo pode ser comparado a um prédio com andares de energia. Para subir, é necessário receber energia; ao descer, energia é liberada. Isso é uma analogia para estados permitidos, não uma escada real dentro do átomo. O modelo de Bohr é histórico e foi aperfeiçoado pela mecânica quântica.",
    "time": 2,
    "demonstrationNotes": "Selecione n maior e depois menor. A energia de ligação é negativa em relação ao elétron livre. O tamanho visual dos anéis foi comprimido: não está na escala n². Aqui são mostradas diferenças de energia, sem calcular probabilidades de transição ou regras de seleção de orbitais.",
    "explanation": "O modelo de Niels Bohr atribui ao elétron do hidrogênio níveis discretos de energia, dados por En = −13,6 eV/n². Ao passar para um nível mais alto, o átomo absorve energia; ao passar para um mais baixo, emite um fóton. A energia do fóton é o módulo da diferença entre os níveis: |ΔE| = hf.",
    "example": "Uma transição de n = 2 para n = 1 no hidrogênio libera aproximadamente 10,2 eV, na região ultravioleta.",
    "caution": "Anéis do modelo de Bohr não representam trajetórias reais da descrição quântica moderna.",
    "cautionLabel": "Cuidado com a interpretação"
  },
  {
    "title": "De Broglie: ondas de matéria",
    "kicker": "07 / Uma onda para cada momento",
    "text": "Toda partícula com quantidade de movimento possui comprimento de onda associado.",
    "detail": "Quanto maior p, menor λ. Para um elétron lento, o comprimento pode ser comparável a distâncias atômicas. Para uma bola de 0,1 kg a 10 m/s, λ ≈ 6,63 × 10⁻³⁴ m: efeitos de difração são impraticáveis de observar nessa situação.",
    "kind": "Relação matemática · onda esquemática",
    "formula": "\\lambda=\\frac{h}{p}",
    "notes": "De Broglie virou o raciocínio: se a luz, conhecida como onda, também apresenta comportamento de partícula, talvez partículas materiais apresentem comportamento de onda. Os elétrons confirmaram essa previsão nos experimentos posteriores.",
    "time": 2,
    "demonstrationNotes": "A onda não é uma ondulação material do elétron. Explique p = mv no regime não relativístico. O controle varia p em unidades de 10⁻²⁴ kg·m/s; a curva 3D amplia a escala para ser visível.",
    "explanation": "Louis de Broglie propôs λ = h/p, associando comprimento de onda λ à quantidade de movimento p. Quanto maior p, menor o comprimento de onda. A relação vale para objetos macroscópicos, mas seus comprimentos de onda costumam ser pequenos demais para observação de interferência em situações cotidianas.",
    "example": "Uma bola de 0,1 kg a 10 m/s possui p = 1 kg·m/s e comprimento de onda de aproximadamente 6,63 × 10⁻³⁴ m.",
    "caution": "A onda de matéria não é uma ondulação mecânica da superfície do elétron.",
    "cautionLabel": "Cuidado com a interpretação"
  },
  {
    "title": "Davisson & Germer",
    "kicker": "08 / A matéria também difrata",
    "text": "O espalhamento de elétrons por cristais revelou difração.",
    "detail": "O modelo soma amplitudes de oito planos igualmente espaçados e usa λ = h/√(2meV). Mostra a condição de Bragg 2d sen θ = nλ. θ é o ângulo rasante em relação aos planos, não o ângulo total de espalhamento. Não reproduz quantitativamente a geometria e os dados originais.",
    "kind": "Modelo didático de difração cristalina",
    "formula": "2d\\sin\\theta=n\\lambda",
    "notes": "Os átomos de um cristal estão organizados de forma regular. Quando as ondas associadas aos elétrons interagem com essa estrutura, alguns ângulos apresentam reforço de intensidade. Isso foi uma evidência experimental de que a matéria também apresenta propriedades ondulatórias.",
    "time": 2,
    "demonstrationNotes": "Varie tensão e ângulo. O indicador responde à soma coerente dos planos. O espaçamento de 0,091 nm foi escolhido para o modelo; não use a cena como registro do experimento de níquel.",
    "explanation": "Clinton Davisson e Lester Germer observaram que elétrons espalhados por cristais de níquel apresentavam máximos de intensidade em certas direções. Esses resultados eram compatíveis com interferência ondulatória e confirmaram a ideia de de Broglie. Em modelos simplificados, a condição de Bragg é 2d sen θ = nλ.",
    "example": "As distâncias entre átomos de cristais são da ordem de frações de nanômetro, permitindo estudar ondas de matéria com comprimentos comparáveis.",
    "caution": "A simulação didática não deve ser tratada como reprodução fiel dos dados originais de 1927.",
    "cautionLabel": "Cuidado com a interpretação"
  },
  {
    "title": "Um elétron de cada vez",
    "kicker": "09 / O padrão nasce dos eventos",
    "text": "Cada elétron deixa um ponto. Muitos pontos revelam interferência.",
    "detail": "Amostramos |ψ₁ + ψ₂|² com envelope de difração. Com informação de caminho ideal, usamos a soma incoerente das duas distribuições. O detector tem uma janela finita. Não mostramos trajetórias definidas nas fendas. Medição envolve interação física, sem depender da consciência.",
    "kind": "Monte Carlo · distribuições de probabilidade",
    "formula": "P(y)\\propto|\\psi_1+\\psi_2|^2",
    "notes": "Este é o experimento mais impressionante! Vamos enviar primeiro um elétron, depois cem, depois mil. Cada um deixa apenas uma marca, mas com muitos eventos surge o padrão de interferência. Agora, quando o experimento consegue identificar o caminho, o padrão se altera. Não é uma pessoa olhando que causa isso, mas as interações físicas envolvidas na obtenção da informação.",
    "time": 4,
    "demonstrationNotes": "Comece com um evento e depois 100 e 1.000. Ative informação de caminho: os dados são limpos para não misturar configurações. A animação entre fonte e tela mostra amplitude esquemática, não a viagem de uma bolinha. O eixo vertical é uma extensão uniforme didática.",
    "explanation": "Quando as alternativas de passagem por duas fendas permanecem coerentes e indistinguíveis, as amplitudes se combinam e a distribuição das detecções pode apresentar interferência. Cada evento detectado é localizado. Quando as alternativas deixam informação física distinguível sobre o caminho, os termos de interferência desaparecem no padrão observado, em condições ideais.",
    "example": "Comparar 10, 100 e 1.000 detecções. Com poucos registros, a distribuição parece irregular; com muitos, o padrão estatístico fica evidente.",
    "caution": "",
    "cautionLabel": "Cuidado com a interpretação"
  },
  {
    "title": "Heisenberg: um limite fundamental",
    "kicker": "10 / Localização e momento",
    "text": "Quanto mais localizada a posição, maior a dispersão mínima de quantidade de movimento.",
    "detail": "As duas curvas exibem distribuições gaussianas normalizadas pela altura para leitura. O modelo usa desvios padrão e satura o limite: Δp = ℏ/(2Δx). É uma propriedade do estado quântico, não apenas uma limitação de instrumentos.",
    "kind": "Simulação matemática · pacote gaussiano",
    "formula": "\\Delta x\\,\\Delta p\\geq\\frac{\\hbar}{2}",
    "notes": "Na física clássica, imaginamos que seria possível conhecer posição e velocidade com precisão ilimitada. Na teoria quântica, existe uma relação matemática entre as dispersões dessas grandezas. Não significa que nada possa ser previsto: conseguimos calcular probabilidades com enorme precisão.",
    "time": 2,
    "demonstrationNotes": "Estreite o pacote e acompanhe a curva de momentos. Δ significa desvio padrão. Outros estados podem ter produto maior. As alturas dos gráficos não comparam diretamente suas unidades físicas.",
    "explanation": "Heisenberg formulou uma relação fundamental entre as incertezas estatísticas de posição Δx e quantidade de movimento Δp: Δx·Δp ≥ ℏ/2, com ℏ = h/(2π). Ela descreve uma propriedade dos estados quânticos e não apenas limitações dos aparelhos de medição.",
    "example": "Quanto mais estreito for um pacote de ondas no espaço, mais ampla será sua distribuição de momentos.",
    "caution": "",
    "cautionLabel": "Cuidado com a interpretação"
  },
  {
    "title": "Schrödinger: mapas de possibilidade",
    "kicker": "11 / Orbitais, não órbitas",
    "text": "Orbitais descrevem probabilidades de posição; não trajetórias dos elétrons.",
    "detail": "A nuvem usa amostragem tridimensional de densidades hidrogenoides 1s, 2s e 2p. Cada ponto é uma amostra possível, não uma coleção de elétrons simultâneos. O 2s possui nó radial; os 2p têm plano nodal. A cor é artística e não representa fase.",
    "kind": "Amostragem de densidade · átomo hidrogenoide",
    "formula": "\\rho(\\mathbf r)=|\\psi(\\mathbf r)|^2",
    "notes": "Quando olhamos para um orbital, não estamos vendo uma foto de um elétron rodando em torno do núcleo. O desenho representa uma distribuição de probabilidade. É como um mapa das regiões onde uma medição teria maior ou menor chance de encontrar o elétron.",
    "time": 3,
    "demonstrationNotes": "Gire e amplie com mouse ou toque. Mostre o nó do 2s e os dois lobos do 2p. A nuvem é truncada numericamente e a escala de visualização muda entre 1s e os demais; não compare raios aparentes sem considerar isso.",
    "explanation": "A equação de Schrödinger é fundamental para descrever estados quânticos. Para estados eletrônicos em átomos, a função de onda ψ permite calcular a densidade de probabilidade ρ(r) = |ψ(r)|². O orbital 1s é esfericamente simétrico; 2s tem nó radial; os orbitais 2p possuem dois lobos separados por um plano nodal.",
    "example": "Comparar visualmente 1s, 2s e 2p. A forma muda porque os estados eletrônicos possuem funções de onda diferentes.",
    "caution": "",
    "cautionLabel": "Cuidado com a interpretação"
  },
  {
    "title": "Uma história construída em etapas",
    "kicker": "12 / Mais de três séculos de descobertas",
    "text": "As descobertas da física quântica nasceram de debates, previsões e testes.",
    "detail": "Selecione um marco para explorar seu contexto. Datas se referem à proposta, publicação ou demonstração indicada em cada evento.",
    "kind": "Linha do tempo histórica",
    "notes": "A ciência se constrói de forma coletiva. Uma explicação gera uma previsão; um experimento testa a previsão; e o resultado pode aperfeiçoar ou mudar a teoria. Foi assim que saímos dos corpúsculos de Newton e das ondas de Huygens para as descrições quânticas da matéria.",
    "time": 3,
    "demonstrationNotes": "Destaque que ciência se desenvolve por evidências e revisões. Maxwell conectou luz e eletromagnetismo; os experimentos com elétrons individuais vieram muitas décadas após a teoria.",
    "explanation": "A teoria não surgiu de uma única descoberta. Ela evoluiu por séculos de observação, modelos e experimentos.",
    "example": "A linha do tempo funciona como um mapa de descobertas: uma resposta gera novas perguntas. Nem todos os cientistas concordavam, e os modelos foram sendo revistos.",
    "caution": "",
    "cautionLabel": "Cuidado com a interpretação"
  },
  {
    "title": "A física quântica ao nosso redor",
    "kicker": "13 / Da descoberta à tecnologia",
    "text": "O estudo dos elétrons e dos fótons tornou possível desenvolver tecnologias modernas.",
    "detail": "Selecione uma tecnologia. As cenas representam os princípios de funcionamento, sem reproduzir dispositivos em escala ou uma simulação de engenharia.",
    "kind": "Modelos tecnológicos esquemáticos",
    "notes": "A física quântica não ficou apenas nos laboratórios. Os computadores e celulares atuais usam processadores construídos com bilhões de transistores. Painéis solares convertem energia luminosa em eletricidade. Microscópios eletrônicos investigam estruturas muito menores do que as observadas em microscópios ópticos comuns.",
    "time": 2,
    "demonstrationNotes": "Conecte ao celular: transistores, processadores, sensores e telas dependem de materiais quânticos. Nem toda tecnologia usa diretamente interferência de elétrons; distinga cada princípio.",
    "explanation": "Semicondutores, transistores e processadores dependem da física quântica dos materiais. Lasers utilizam emissão estimulada de luz. Painéis solares aproveitam a absorção de fótons para gerar corrente elétrica. Microscópios eletrônicos usam feixes de elétrons e propriedades ondulatórias para alcançar alta resolução.",
    "example": "- Microscópio eletrônico: pequenos comprimentos de onda associados aos elétrons ajudam a atingir elevada resolução.\n- Laser: emissão estimulada de fótons, importante em comunicação, medicina e indústria.\n- Semicondutores: bandas de energia e dopagem regulam o movimento de portadores de carga.\n- Transistor: utiliza sinais elétricos para controlar a corrente e formar circuitos.\n- Processador: reúne muitos transistores; não é necessariamente um computador quântico.\n- Painel solar: fótons podem produzir pares elétron-lacuna, permitindo gerar eletricidade.",
    "caution": "",
    "cautionLabel": "Cuidado com a interpretação"
  },
  {
    "title": "Teste sua intuição",
    "kicker": "14 / Dez desafios quânticos",
    "text": "O que aprendemos sobre luz, elétrons e mecânica quântica?",
    "detail": "Você pode refazer o quiz ao terminar. Pontuação local, sem envio de dados.",
    "kind": "Quiz · revisão conceitual",
    "notes": "A turma vai votar nas respostas antes de revelar a alternativa correta. O importante não é só acertar, mas explicar por que as outras alternativas não representam o fenômeno.",
    "time": 4,
    "demonstrationNotes": "Convide a turma a votar antes de selecionar. Use as explicações para retomar equívocos, principalmente sobre consciência, intensidade luminosa e trajetórias.",
    "explanation": "Discuta as respostas com a turma e use as justificativas após cada escolha.",
    "example": "Faça uma votação por mãos levantadas: A, B, C ou D. Depois, use a explicação para conversar sobre a escolha da turma.",
    "caution": "",
    "cautionLabel": "Cuidado com a interpretação"
  },
  {
    "title": "A natureza surpreende",
    "kicker": "15 / A exploração continua",
    "text": "A natureza não precisa seguir as categorias que criamos para compreendê-la.",
    "detail": "A teoria quântica prevê probabilidades e explica interferência e registros localizados. Modelos visuais ajudam a pensar, mas têm limites. Obrigado por explorar o QUANTUM LAB.",
    "kind": "Metáfora visual · onda e detecções",
    "notes": "Começamos perguntando se a luz é uma onda ou uma partícula. Descobrimos que ela manifesta propriedades relacionadas às duas ideias, assim como os elétrons. Isso não significa que nossa ciência falhou: significa que aprendemos uma descrição mais ampla da natureza. Esses estudos ajudaram a desenvolver tecnologias que utilizamos todos os dias. Obrigado!",
    "time": 1,
    "demonstrationNotes": "A transformação da onda em pontos é uma metáfora visual, não uma filmagem de colapso. Retome a pergunta inicial: modelos clássicos isolados não bastam. Abra as referências e encerre com perguntas.",
    "explanation": "A dualidade onda-partícula demonstra que luz e matéria podem produzir resultados que se assemelham a aspectos de ondas e partículas clássicas. A mecânica quântica oferece um modelo matemático próprio, capaz de prever probabilidades, padrões de interferência e detecções localizadas.",
    "example": "Recordar o experimento da dupla fenda: eventos individuais aparecem como pontos, enquanto o conjunto dos resultados pode formar interferência.",
    "caution": "",
    "cautionLabel": "Cuidado com a interpretação"
  }
];
export const timeline = [
  [
    "1678–1690",
    "Huygens",
    "Apresentação da teoria ondulatória em 1678; publicação do Traité de la lumière em 1690. Frentes secundárias explicam propagação e refração.",
    2
  ],
  [
    "1704",
    "Newton",
    "Opticks sistematiza estudos de luz e cores e desenvolve a interpretação corpuscular.",
    2
  ],
  [
    "1801",
    "Young",
    "Experimentos de interferência fortalecem a descrição ondulatória da luz.",
    3
  ],
  [
    "1860–1865",
    "Maxwell",
    "A teoria eletromagnética identifica a luz como onda eletromagnética; a síntese é publicada em 1865.",
    1
  ],
  [
    "1900",
    "Planck",
    "A lei da radiação de corpo negro e a hipótese de trocas de energia em quanta inauguram uma nova física.",
    4
  ],
  [
    "1905",
    "Einstein",
    "Quanta de luz explicam características do efeito fotoelétrico, incluindo a frequência de corte.",
    5
  ],
  [
    "1913",
    "Bohr",
    "Níveis de energia quantizados explicam o espectro do hidrogênio em um modelo histórico.",
    6
  ],
  [
    "1924",
    "De Broglie",
    "Sua tese propõe uma relação ondulatória para a matéria: λ = h/p.",
    7
  ],
  [
    "1926",
    "Schrödinger",
    "A equação de onda estabelece uma ferramenta central da mecânica quântica.",
    11
  ],
  [
    "1927",
    "Heisenberg · Davisson · Germer",
    "Heisenberg formula a relação de incerteza; Davisson e Germer observam difração de elétrons em níquel.",
    8
  ],
  [
    "1961",
    "Jönsson",
    "Publica experimentos de interferência eletrônica com fendas, incluindo dupla fenda.",
    9
  ],
  [
    "1989",
    "Tonomura e colaboradores",
    "Demonstram o acúmulo de interferência com elétrons individuais usando um biprisma eletrônico, e não duas fendas materiais.",
    9
  ]
];
export const technologies = [
  [
    "Microscópio eletrônico",
    "O pequeno comprimento de onda de elétrons acelerados possibilita alta resolução. Lentes eletromagnéticas controlam o feixe; a resolução também depende de aberrações e da amostra.",
    "Feixe · lentes · amostra"
  ],
  [
    "Laser",
    "A emissão estimulada amplifica luz. Com ganho, realimentação e condições adequadas, o dispositivo gera luz com elevada coerência.",
    "Níveis · emissão estimulada"
  ],
  [
    "Semicondutores",
    "Bandas de energia e dopagem controlam portadores de carga. A estrutura quântica do sólido explica a diferença entre condutor, isolante e semicondutor.",
    "Bandas · lacuna de energia"
  ],
  [
    "Transistor",
    "Uma tensão controla o fluxo de portadores em um dispositivo semicondutor. É a base dos circuitos lógicos e de amplificação.",
    "Porta · canal · corrente"
  ],
  [
    "Processador",
    "Bilhões de transistores executam operações lógicas. A física quântica sustenta os materiais; um processador convencional não é um computador quântico.",
    "Transistores · lógica digital"
  ],
  [
    "Painel solar",
    "Fótons absorvidos podem gerar pares elétron-lacuna no semicondutor. Uma junção ajuda a separar cargas e produzir corrente: efeito fotovoltaico.",
    "Absorção · junção · corrente"
  ]
];
export const quiz = [
  [
    "Qual fenômeno evidencia interferência da luz?",
    [
      "Efeito fotoelétrico",
      "Franjas claras e escuras na dupla fenda",
      "Queda de um corpo",
      "Decaimento nuclear"
    ],
    1,
    "As franjas aparecem pelo reforço e cancelamento de amplitudes luminosas."
  ],
  [
    "Quem propôs as ondas de matéria?",
    [
      "Newton",
      "Einstein",
      "Louis de Broglie",
      "Bohr"
    ],
    2,
    "De Broglie propôs λ = h/p em 1924."
  ],
  [
    "O que acontece no efeito fotoelétrico?",
    [
      "Elétrons podem ser emitidos por um material ao absorver luz adequada",
      "Átomos perdem seus núcleos",
      "A luz sempre muda de cor",
      "Elétrons viram prótons"
    ],
    0,
    "No modelo ideal, a energia do fóton precisa ser pelo menos igual à função trabalho. Acima do limiar, Kmax = hf − φ."
  ],
  [
    "O que acontece com a energia de um fóton quando sua frequência aumenta?",
    [
      "Diminui",
      "Fica igual",
      "Desaparece",
      "Aumenta"
    ],
    3,
    "E = hf: como h é constante, aumentar a frequência aumenta a energia de cada fóton."
  ],
  [
    "Se a quantidade de movimento dobrar, o comprimento de onda de de Broglie…",
    [
      "Dobra",
      "Diminui pela metade",
      "Não muda",
      "Fica negativo"
    ],
    1,
    "λ = h/p: o comprimento de onda é inversamente proporcional à quantidade de movimento."
  ],
  [
    "Na dupla fenda, o que acontece quando há informação física distinguível sobre os caminhos?",
    [
      "A interferência fica mais intensa",
      "Os elétrons desaparecem",
      "O padrão de interferência coerente desaparece",
      "A gravidade é anulada"
    ],
    2,
    "Em condições ideais, a informação física distinguível de caminho elimina o termo de interferência observado. Isso não depende da consciência humana."
  ],
  [
    "A relação de incerteza de Heisenberg envolve…",
    [
      "Posição e quantidade de movimento",
      "Temperatura e pressão",
      "Massa e densidade",
      "Força e energia potencial"
    ],
    0,
    "Δx · Δp ≥ ℏ/2 relaciona as dispersões de posição e quantidade de movimento do estado, mesmo com instrumentos ideais."
  ],
  [
    "O que é um orbital atômico?",
    [
      "Uma estrada circular do elétron",
      "A superfície sólida do átomo",
      "Uma órbita planetária perfeita",
      "Uma função de onda espacial de um estado eletrônico"
    ],
    3,
    "|ψ|² fornece a densidade de probabilidade de posição. Um orbital não é uma trajetória."
  ],
  [
    "Qual experimento confirmou difração de elétrons em um cristal?",
    [
      "Torricelli",
      "Davisson e Germer",
      "Cavendish",
      "Millikan"
    ],
    1,
    "Em 1927, o espalhamento de elétrons em níquel mostrou máximos compatíveis com ondas de matéria."
  ],
  [
    "Qual tecnologia usa o pequeno comprimento de onda dos elétrons para obter imagens?",
    [
      "Microscópio eletrônico",
      "Termômetro de mercúrio",
      "Pêndulo simples",
      "Lupa comum"
    ],
    0,
    "O pequeno comprimento de onda ajuda a alcançar alta resolução, respeitadas as limitações dos instrumentos."
  ]
];
export const references = [
  [
    "OpenStax · University Physics, vol. 3 · capítulos 6–8",
    "https://openstax.org/details/books/university-physics-volume-3"
  ],
  [
    "Nobel Prize · Einstein (1921)",
    "https://www.nobelprize.org/prizes/physics/1921/summary/"
  ],
  [
    "Nobel Prize · Davisson e Thomson (1937)",
    "https://www.nobelprize.org/prizes/physics/1937/summary/"
  ],
  [
    "Tonomura et al. (1989), Demonstration of single-electron buildup of an interference pattern, Am. J. Phys. 57, 117",
    "https://doi.org/10.1119/1.16104"
  ],
  [
    "Jönsson (1961), Elektroneninterferenzen an mehreren künstlich hergestellten Feinspalten, Z. Phys. 161, 454",
    "https://doi.org/10.1007/BF01342460"
  ],
  [
    "Davisson & Germer (1927), Diffraction of Electrons by a Crystal of Nickel, Phys. Rev. 30, 705",
    "https://doi.org/10.1103/PhysRev.30.705"
  ],
  [
    "Griffiths & Schroeter · Introduction to Quantum Mechanics, 3ª ed. · Cambridge University Press (2018)",
    "https://doi.org/10.1017/9781316995433"
  ],
  [
    "Halliday, Resnick & Walker · Fundamentos de Física, vol. 4: Óptica e Física Moderna",
    null
  ],
  [
    "Paul G. Hewitt · Física Conceitual",
    null
  ]
];
