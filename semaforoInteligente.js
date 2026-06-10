// Semáforo Inteligente - Duas vias sendo uma vertical e outra horizontal
const readline = require('readline');

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
    A: { estado: EstadosPossiveis.VERDE_VIA_A, veiculos: [], nome: "Vertical", prefixo: "V" },
    B: { estado: EstadosPossiveis.VERMELHO_VIA_B, veiculos: [], nome: "Horizontal", prefixo: "H" }
};

let TempoVerde = 5000, TempoVermelho = 5000, TempoAmarelo = 2000;
const CiclosDesejados = 2; // Coloquei 2 para podermos testar a mudança de veículos!

// função para simular o tempo de espera (delay) usando Promises
const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function iniciarSemaforo(via) {
    if (via === vias.A) {
        via.estado = EstadosPossiveis.VERDE_VIA_A;
    } else {
        via.estado = EstadosPossiveis.VERDE_VIA_B;
    }
    console.log(`\n--- [VIA ${via.nome}] FICOU VERDE ---`);
    
    // Agora exibe os veículos que foram gerados especificamente para esta rodada
    console.log(`Veículos liberados: ${via.veiculos.join(", ")}`);
    await esperar(TempoVerde);

    if (via === vias.A) {
        via.estado = EstadosPossiveis.AMARELO_VIA_A;
    } else {
        via.estado = EstadosPossiveis.AMARELO_VIA_B;
    }
    console.log(`[${via.nome}] ATENÇÃO: Sinal Amarelo!`);
    await esperar(TempoAmarelo);

    if (via === vias.A) {
        via.estado = EstadosPossiveis.VERMELHO_VIA_A;
    } else {
        via.estado = EstadosPossiveis.VERMELHO_VIA_B;
    }
    console.log(`[${via.nome}] PARE: Sinal Vermelho.`);
    
    console.log(`[PEDESTRES] Liberados na via ${via.nome}: ${Array.from(Pedestres).join(", ")}`);
    await esperar(TempoVermelho);
}

function perguntarAmbulancia() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {
        rl.question('\n[SISTEMA] Deseja simular a aproximação de uma ambulância para o próximo ciclo? (s/n): ', (resposta) => {
            rl.close();
            resolve(resposta.toLowerCase() === 's');
        });
    });
}

// Função auxiliar para gerar dinamicamente os carros com base no número do ciclo
function gerarVeiculosParaO_Ciclo(cicloAtual) {
    let inicio = (cicloAtual - 1) * 3 + 1;

    vias.A.veiculos = [`${vias.A.prefixo}${inicio}`, `${vias.A.prefixo}${inicio + 1}`, `${vias.A.prefixo}${inicio + 2}`];
    vias.B.veiculos = [`${vias.B.prefixo}${inicio}`, `${vias.B.prefixo}${inicio + 1}`, `${vias.B.prefixo}${inicio + 2}`];
}

async function executarSemaforo() {
    
    for (let contador = 1; contador <= CiclosDesejados; contador++) {
        console.log(`INICIANDO CICLO CHAVE Nº ${contador}/${CiclosDesejados}`);
        
        gerarVeiculosParaO_Ciclo(contador);

        // 1. Roda a Via A
        await iniciarSemaforo(vias.A);

        // 2. Roda a Via B
        await iniciarSemaforo(vias.B);

        // 3. Pergunta da ambulância ao final de cada ciclo completo
        const temAmbulancia = await perguntarAmbulancia();

        if (temAmbulancia) {
            console.log("\n Ambulância detectada!");
            console.log(" Fechando todos os sinais para a passagem da ambulância...");

            vias.A.estado = "00100100";
            vias.B.estado = "00100100";

            console.log(" Aguardando passagem da ambulância...");
            await esperar(7000); 

            console.log(" Ambulância passou. Preparando próximo ciclo normal...");
        } else {
            console.log("\n Nenhuma ambulância detectada.");
        }
    }

    console.log("\n--- Ciclos finalizados. Semáforo desligado. ---");
}

executarSemaforo();