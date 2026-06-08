# Semaforo-Inteligente
Semaforo-Inteligente Projeto Academico, onde nos foi proposto realizar a montagem de um sistema de semaforo inteligente na linguagem de nossa preferencia, e que contemplasse conceitos de matematica computacional

## Representacao Binaria dos Estados

Para controlar o cruzamento de forma eficiente (simulando sistemas embarcados como Arduino ou CLPs), utilizamos um barramento de **8 bits**. Cada bit atua como um interruptor liga/desliga (`1` ou `0`) para uma lampada especifica do semaforo.

Os 3 bits da esquerda (mais significativos) controlam a **Via A (Vertical)**, e os 3 bits seguintes da direita (menos significativos) controlam a **Via B (Horizontal)**, e os 2 ultimos bits controlam os pedestres.

### Mapeamento dos Bits

        VIA A (Vertical)        |    VIA B (Horizontal)          |             Pedestres
  Verde   | Amarelo  | Vermelho |  Verde   | Amarelo  | Vermelho | Pedestre        | Pedestre
 (Bit 7)  | (Bit 6)  | (Bit 5)  | (Bit 4)  | (Bit 3)  | (Bit 2)  | Via A (Bit 1)   | Via B (Bit 0)

    |          |          |          |          |          |          |           |
   0 / 1      0 / 1      0 / 1      0 / 1      0 / 1      0 / 1      0 / 1       0 / 1

Tabela de Estados do Sistema para garantir a seguranca do cruzamento, os estados binarios sao configurados para que as duas vias nunca fiquem abertas ao mesmo tempo:

Estado Real do Sistema:       VIA A |    VIA B   | Painel de Bits
 
Via A Verde(B Fechada):        Verde|	 Vermelho |	10000101

Via A Amarela(B Fechada):    Amarelo|   Vermelho |  01000101

Via B Verde(A Fechada):	    Vermelho|	 Verde	 |  00110010

Via B Amarela(A Fechada):	 Vermelho|	Amarelo	 |  00101010 

## Como o Código Utiliza as Regras Lógicas (AND, OR, NOT)

Embora o programa controle o semáforo usando estruturas de decisão (`if` e `else`), ainda funciona a lógica computacional. Abaixo está a explicação de como cada operador atua no sistema:


### Operador NOT
O operador **NOT** serve para inverter um valor ou fazer uma verificação de segurança. No código, ele aparece no uso do símbolo `!`:

 Onde está no código: `if (!SemaforoAtivo) return;`
 Explicação: O programa lê isso como: *"Se o semáforo **NÃO** estiver ativo, pare a execução imediatamente"*. Ele nega a condição para criar uma trava de segurança.
 Nos bits: Quando uma via recebe o sinal verde (`1`), a outra obrigatoriamente recebe o sinal vermelho (`0`), aplicando uma negação lógica de estados para evitar batidas.


### Operador AND
O operador **AND** exige que **todas** as condições sejam verdadeiras ao mesmo tempo para que algo aconteça. 

 Onde está no código: Na lógica de encerramento do loop e na transição de turnos.
 Explicação: Para que o semáforo continue funcionando e reinicie o ciclo na Via A, o sistema valida duas condições juntas: 
   O número de ciclos atuais deve ser menor que o desejado **E** o semáforo precisa continuar ativo. Se uma dessas duas coisas for falsa, o sistema desliga.
 Na segurança: Os pedestres de uma via só são liberados se o semáforo dos carros estiver vermelho **E** o tempo de espera for atingido.


### Operador OR
O operador **OR** define que apenas **uma** das condições precisa ser verdadeira para o sistema tomar um caminho. Ele dita a alternância das vias.

Onde está no código: Nas estruturas `if (via === vias.A) { ... } else { ... }`
Explicação: O semáforo funciona por escolha excludente. O programa avalia: *"A via atual é a Via A? Se sim, faça isso. Se não (ou seja, se for a Via B), faça aquilo"*. O fluxo segue por um caminho **OU** por outro.
Nos bits: Na nossa tabela de 8 bits, as luzes são ligadas de forma combinada. Por exemplo, o estado `VERDE_VIA_A` (`10000101`) diz para o painel acender o Verde da Via A **OU** o Vermelho da Via B **E** o sinal de pedestres correspondente.