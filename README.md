# Semaforo-Inteligente
Semaforo-Inteligente Projeto Academico, onde nos foi proposto realizar a montagem de um sistema de semaforo inteligente na linguagem de nossa preferencia, e que contemplasse conceitos de matematica computacional

## Representacao Binaria dos Estados

Para controlar o cruzamento de forma eficiente (simulando sistemas embarcados como Arduino ou CLPs), utilizamos um barramento de **8 bits**. Cada bit atua como um interruptor liga/desliga (`1` ou `0`) para uma lampada especifica do semaforo.

Os 3 bits da esquerda (mais significativos) controlam a **Via A (Vertical)**, e os 3 bits seguintes da direita (menos significativos) controlam a **Via B (Horizontal)**, e os 2 ultimos bits controlam os pedestres.

### Mapeamento dos Bits

        VIA A (Vertical)        |    VIA B (Horizontal)          |  Pedestres
  Verde   | Amarelo  | Vermelho |  Verde   | Amarelo  | Vermelho | Pedestre | Pedestre
 (Bit 5)  | (Bit 4)  | (Bit 3)  | (Bit 2)  | (Bit 1)  | (Bit 0)  | Via A    | Via B

    |          |          |          |          |          |          |           |
   0 / 1      0 / 1      0 / 1      0 / 1      0 / 1      0 / 1      0 / 1       0 / 1

Tabela de Estados do Sistema para garantir a seguranca do cruzamento, os estados binarios sao configurados para que as duas vias nunca fiquem abertas ao mesmo tempo:

Estado Real do Sistema:       VIA A |    VIA B   | Painel de Bits
 
Via A Verde(B Fechada):        Verde|	 Vermelho |	10000101

Via A Amarela(B Fechada):    Amarelo|   Vermelho |  01000101

Via B Verde(A Fechada):	    Vermelho|	 Verde	 |  00110010

Via B Amarela(A Fechada):	 Vermelho|	Amarelo	 |  00101010 