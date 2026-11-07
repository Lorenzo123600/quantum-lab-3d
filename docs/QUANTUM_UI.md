# Quantum UI

Design system próprio para lições de física do Ensino Médio. A interface organiza **entender → experimentar → conferir**. As simulações WebGL conservam suas cenas, fórmulas e parâmetros; somente o laboratório usa uma superfície escura. A leitura, os controles, a revisão e a trilha usam superfícies claras.

## Referências consultadas
- https://design.duolingo.com/
- https://design.duolingo.com/identity/typography
- https://blog.duolingo.com/shape-language-duolingos-art-style/
- https://sitepeel.dev/design-md/duolingo.com/

Os dois primeiros endereços redirecionaram para a área de artigos de design durante a consulta. O artigo de shape language embasou a prioridade de clareza, poucos detalhes, formas arredondadas e espaço para leitura. Sitepeel foi usado como análise secundária de hierarquia e cores, não como especificação obrigatória. As decisões seguem o pedido do projeto: Nunito livre, botões com profundidade, cores de tema e fundo claro. Não são usadas Feather, DIN Next Rounded, mascotes ou ilustrações proprietárias. Os ícones vetoriais foram construídos para o Quantum Lab.

## Tokens
Fonte: Nunito local via `@fontsource/nunito` (400, 600, 700, 800, 900). Títulos: 900; seções: 800/900; controles: 700/800. KaTeX mantém suas próprias fontes matemáticas.

| Papel | Valor |
|---|---|
| Verde / profundidade | #58CC02 / #58A700 |
| Azul | #1CB0F6 |
| Amarelo | #FFC800 |
| Laranja | #FF9600 |
| Roxo | #CE82FF |
| Vermelho | #FF4B4B |
| Superfícies | #FFFFFF / #F7F7F7 |
| Texto / borda | #4B4B4B / #E5E5E5 |

Textos em superfícies vibrantes usam tons escuros para leitura. Cada tema tem tokens `--theme`, `--theme-edge`, `--theme-soft` e `--theme-ink`. Estados não dependem apenas da cor: há rótulos, ícones e feedback. Raios: 12, 18 e 24 px; espaçamento em múltiplos de 4/8 px. Botões têm sombra inferior sólida de 4 px e deslocamento ao pressionar. Foco visível, estado desabilitado e `aria-busy` para tela cheia. Movimento reduzido desativa transições e celebrações.

## Componentes e aprendizagem
- Cartão da ideia principal, painéis expansíveis de exemplos e símbolos, laboratório, revisão por capítulo e notas do apresentador.
- Trilha com 16 nós, acesso livre, capítulo atual e capítulos concluídos. Toda escolha de capítulo mantém a navegação por hash.
- Revisões aceitam novas tentativas sem punição. Depois de ler feedback, o estudante pode concluir a lição; o apresentador também pode navegar sem responder.
- XP simbólico: 20 por lição, máximo 320. Repetições não somam pontos extras. O quiz final também conclui sua lição, sem premiação duplicada.
- Quatro conquistas: primeira lição, quatro, oito e dezesseis. Não há ranking, vidas, perda de pontos, contas ou envio de dados.
- `quantum-lab-progress-v1` armazena apenas os IDs concluídos e o último capítulo em localStorage. Entradas são validadas. Se o armazenamento estiver bloqueado, o curso funciona em memória. Configurações permite zerar somente esse progresso.
- A trilha e as configurações suspendem a cena enquanto cobrem o laboratório.

## Validação
`npm test`, `npm run build` e `npm run test:e2e`. Playwright cobre lições, controle dos experimentos, quiz, teclado, apresentação, persistência e conquistas em desktop e celular emulado. Capturas da lição, trilha, quiz e apresentador ficam nos artefatos do GitHub Actions. A emulação não substitui um aparelho físico ou um projetor.
