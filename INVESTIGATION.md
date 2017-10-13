# Hipotese 1 - Desenvolver algoritmos de transformação

- Algoritmos de calculo matricial e manipulação de pontos de origem, etc;
- Error prone;
- Maior tempo de desenvolvimento e testes;
- Estudo muito aprofundado da spec SVG e do seu sistema de coordenadas e como estas afectam o encadeamento de transformações (reinventar a roda);
- O tempo de estudo é imprevisível, com fortes probabilidades de ser bastante extenso.
- Já existem bibliotecas que fazem isto (ver Hipótese 2).

# Hipotese 2 - Utilizar Snap.svg com Freetransform.plugin

- É necessário acrescentar suporte para multi-selecção, ou suporte para propagar transformações a outros elementos (dificuldade baixa/média)
- Alguns requisitos muito específicos do nosso Editor (ex.: multi-selecção com bbox em cada elemento), teriam de ser novamente desenvolvidos com o Snap.svg e o FT.plugin em mente, ou teria de haver flexiblidade na forma como se interage com alguns desses requisitos (ex.: multi-selecção com uma bbox única que envolve os elementos seleccionados).
- Modificar o plugin de Freetransform para desenhar as drag handles na localização das drag handles que existem hoje.
- Existe uma prova de conceito com todas as funcionalidades de transformação, mas que não contempla a funcionalidade de multiselecção tal como existe nos nossos requisitos, isto é, é possível seleccionar multiplos elementos e transformá-los, mas com uma única bounding box que engloba estes elementos.
- O ecossistema do Snap.svg é rico. Futuros requisitos têm a forte possibilidade de serem resolvidos com um plugin já desenvolvido pela comunidade.
- Sem modificações, o plugin agrupa os elementos seleccionados numa unica bounding box. Isto torna impossível escalar Textos com outros elementos devido à forma como os textos são escalados. Para replicar as funcionalidades do editor actual, é necessário modifica a multi-selecção do plugin de forma a criar bboxes em cada elemento seleccionado e propagar as transformações do elemento transformado aos restantes elementes da selecção. Isto permite descriminar o tipo de transformação ao nível do elemento. Assim, caso um dos elementos da selecção seja do tipo Texto, é possível aplicar o algoritmo de escalamento de textos em vez do algoritmo de escalamento dos restantes elementos.

## Implementação (alto nível)
- Teria de ser criado um plugin do editor para gerir as transformações utilizando Snap.svg, tal como temos hoje em dia o plugin `transforms.js`
- Esse novo plugin tem por base o algoritmo de transformações e tracking do FreeTransforms.plugin do Snap.SVG e fica responsável por todas as transformações de Translate, Rotate e Scale de todos os elementos SVG, excepto Textos.




A hipótese 1, contempla a necessidade de desenvolver algorítmos que permitam efectuar transformações compostas (ex.: Rodar, seguido de escalar ou escalar seguido de rodar, etc). Estas operações, por defeito, têm sempre como ponto de origem o centro do objecto e a ordem com que são executadas fazem variar o resultado, por vezes bastante em relação àquilo que seria expectável. No caso concreto das funcionalidades do editor 360imprimir, é adicionalmente complexo porque a larga maioria das operações de transformação ocorrem com um ponto de origem diferente do centro do objecto. Este facto, obriga a cálculos adicionais, bem como obriga à utilização de artifícios, invisiveis ao utilizador, para obter os resultados esperados.

 Contudo, por vezes, o acumular de operações, por vezes, leva a que se descubram falhas de lógica na implementação destes algorítmos e a resultados menos desejáveis. Apesar de tudo, estas operações estão implementadas quase na totalidade, mas atingiram um ponto que consideramos que não é escalável. Por exemplo, actualmente apenas conseguimos fazer Resize de objectos SVG a partir dos cantos, onde os factores de escala e pontos de origem são calculáveis de forma razoável. Fazer Resize a partir dos pontos laterais tem-se revelado um desafio difícil de ultrapassar, e com tendência a continuar a consumir recursos para resolver esta questão.

Um outro aspecto que torna dificil escalar operações sobre objectos SVG é o facto destas operações serem encadeadas directamente no elemento que existe na DOM através do atributo `transform` e com recurso à manipulação de `strings`. Por si só, este tipo de operações é indesejável do ponto de vista da escalabilidade e performance.


Neste contexto, acreditamos que é desejável que os nossos esforços sejam direccionados para a utilização de bibliotecas especialmente desenhadas para resolver este tipo de problemas, como é o caso do Snap.svg da Adobe e utilizar/adaptar plugins comunitários para esta biblioteca, como é o caso do Snap.svg.freeTransform, que implementa todas as funcionalidades de transformação, simples e complexas. 

Assim surge a Hipótese 2, onde são descritas, em alto nível, as tarefas e dificuldades previsíveis, bem como alguns pontos com impacto positivo no futuro.



