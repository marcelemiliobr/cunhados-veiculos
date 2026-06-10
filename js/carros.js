/* ============================================================
   CUNHADOS VEÍCULOS — DADOS DO SITE
   ------------------------------------------------------------
   ESTE É O ÚNICO ARQUIVO QUE VOCÊ PRECISA MEXER NO DIA A DIA.

   1) CONFIG  -> dados da loja (WhatsApp, Instagram, endereço)
   2) CARROS  -> lista de veículos do estoque

   Para ADICIONAR um carro: copie um bloco { ... } inteiro,
   cole logo abaixo (sem esquecer a vírgula) e troque as infos.
   Para REMOVER um carro: apague o bloco { ... } dele.
   ============================================================ */

const CONFIG = {
  // >>> TROQUE pelo número real da loja (formato: 55 + DDD + número, só dígitos)
  // Ex.: (66) 99999-0050  ->  "5566999990050"
  whatsapp: "5566999990054",

  instagram: "cunhadosveiculos",          // sem o @
  facebook:  "Cunhados Veiculos",
  endereco:  "Av. Bandeirantes, 3306 — Jardim Oliveira, Rondonópolis/MT, 78700-464",
  horario:   "Seg a Sex 07:30–17:30 · Sáb 07:30–12:00",
};

/* ------------------------------------------------------------
   LISTA DE CARROS
   Campos de cada carro:
     id          -> apelido único (sem espaço/acento). Usado na pasta de fotos.
     destaque    -> true mostra o selo "DESTAQUE" (use em poucos)
     nome        -> nome em destaque do anúncio
     marca, modelo, ano, cor, motor, combustivel, cambio, km
     preco       -> número (sem R$ e sem pontos). Ex.: 42900
     itens       -> lista de opcionais ["Ar-condicionado", "Direção", ...]
     fotos       -> lista de imagens. A 1ª é a capa.
                    Coloque as fotos em:  img/carros/SEU_ID/
   ------------------------------------------------------------ */

const CARROS = [
  {
    id: "kwid-zen-2018",
    destaque: true,
    nome: "Renault Kwid Zen 1.0",
    marca: "Renault",
    modelo: "Kwid Zen 1.0 12v",
    ano: "2018/2019",
    cor: "Prata",
    motor: "1.0 12v",
    combustivel: "Flex (Gasolina/Etanol)",
    cambio: "Manual",
    km: "—",
    preco: 42900,
    itens: [
      "Ar-condicionado",
      "Direção elétrica",
      "Vidros elétricos",
      "Trava elétrica",
      "Computador de bordo",
      "Som com entrada USB/Bluetooth",
      "Rodas liga-leve",
    ],
    fotos: [
      "img/carros/kwid-zen-2018/1.jpg",
      // Adicione mais fotos aqui, ex.:
      // "img/carros/kwid-zen-2018/2.jpg",
      // "img/carros/kwid-zen-2018/3.jpg",
    ],
  },

  /* ====== MODELO PARA COPIAR (apague as // para usar) ======
  {
    id: "novo-carro",
    destaque: false,
    nome: "Marca Modelo Versão",
    marca: "Marca",
    modelo: "Modelo Versão",
    ano: "2020/2021",
    cor: "Branco",
    motor: "1.0 Turbo",
    combustivel: "Flex",
    cambio: "Automático",
    km: "45.000",
    preco: 59900,
    itens: ["Ar-condicionado", "Multimídia", "Câmera de ré"],
    fotos: [
      "img/carros/novo-carro/1.jpg",
      "img/carros/novo-carro/2.jpg",
    ],
  },
  ========================================================== */
];
