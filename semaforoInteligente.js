// Semáforo Inteligente - Duas vias sendo uma vertical e outra horizontal

const VeiculosViaA = new Set(["V1", "V2", "V3"]);
const VeiculosViaB = new Set(["H1", "H2", "H3"]);
const Pedestres = new Set(["P1", "P2", "P3"]);

const EstadosPossiveis = {
    VERDE_VIA_A: "10000101",
    AMARELO_VIA_A: "01000101",
    VERDE_VIA_B: "00110010",
    AMARELO_VIA_B: "00101010",
    VERMELHO_VIA_A: "00110010",
    VERMELHO_VIA_B: "10000101"
};

const vias = {
    A: { estado: EstadosPossiveis.VERDE_VIA_A, veiculos: VeiculosViaA, nome: "Vertical" },
    B: { estado: EstadosPossiveis.VERMELHO_VIA_B, veiculos: VeiculosViaB, nome: "Horizontal" }
};

let TempoVerde = 5000, TempoVermelho = 5000, TempoAmarelo = 2000;
let SemaforoAtivo = true;
let ContadorCiclos = 0;
const CiclosDesejados = 1;

// função para simular o tempo de espera (delay) usando Promises
const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Função para iniciar o semáforo em uma via, em seguida alternar para a outra via após o ciclo completo
async function iniciarSemaforo(via) {
    if (!SemaforoAtivo) return;

    let outraVia;
    if (via === vias.A) {
        outraVia = vias.B;
    } else {
        outraVia = vias.A;
    }

    // iniciando na via A
    if (via === vias.A) {
        via.estado = EstadosPossiveis.VERDE_VIA_A;
    } else {
        via.estado = EstadosPossiveis.VERDE_VIA_B;
    }
    console.log(`\n--- [VIA ${via.nome}] FICOU VERDE ---`);
    console.log(`Veículos liberados: ${Array.from(via.veiculos).join(", ")}`);
    await esperar(TempoVerde); // O programa espera aqui 5 segundos

    if (via === vias.A) {
        via.estado = EstadosPossiveis.AMARELO_VIA_A;
    } else {
        via.estado = EstadosPossiveis.AMARELO_VIA_B;
    }
    console.log(`[${via.nome}] ATENÇÃO: Sinal Amarelo!`);
    await esperar(TempoAmarelo); // O programa espera aqui 2 segundos

    if (via === vias.A) {
        via.estado = EstadosPossiveis.VERMELHO_VIA_A;
    } else {
        via.estado = EstadosPossiveis.VERMELHO_VIA_B;
    }
    console.log(`[${via.nome}] PARE: Sinal Vermelho.`);
    
    // Liberação dos pedestres na via 
    console.log(`[PEDESTRES] Liberados na via ${via.nome}: ${Array.from(Pedestres).join(", ")}`);
    await esperar(TempoVermelho); // O programa espera aqui 5 segundos

    // Troca de Via
    if (via === vias.A) {
        // Se terminou a Via A, passa para a B
        iniciarSemaforo(vias.B);
    } else {
        // Se finalizou a Via B, retorna para a A
        ContadorCiclos++;
        if (ContadorCiclos < CiclosDesejados) {
            iniciarSemaforo(vias.A);
        } else {
            console.log("\n--- Ciclo finalizado. Semáforo desligado. ---");
            SemaforoAtivo = false;
        }
    }
}

// Iniciar a execução
iniciarSemaforo(vias.A);

//