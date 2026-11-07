# QUANTUM LAB
**A natureza surpreendente da luz e da matéria.**

Apresentação educacional 3D em português para o 3º ano do Ensino Médio. Dezesseis capítulos com Three.js/WebGL, gráficos quantitativos, simulações controláveis, quiz e modo apresentador. Aplicação estática: não usa contas, APIs de cálculo ou backend.

## Uma apresentação para aprender junto
Cada capítulo oferece uma explicação curta, um cartão colorido com a ideia principal e uma tarefa para explorar o experimento. As seções expansíveis trazem comparações, explicações dos símbolos das fórmulas e o que observar no resultado. As analogias são identificadas e seus limites são explicitados; os modelos físicos mantêm suas hipóteses e referências. Ciano, violeta, amarelo, rosa e verde dão identidade aos temas, com rótulos que também comunicam as ideias sem depender só da cor.

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
