import { AppConfig, BookingRequest, QuizOption } from '../types';

export const DEFAULT_APP_CONFIG: AppConfig = {
  branding: {
    clinicName: 'Clínica Eterna',
    subtitle: 'Santuário & Haute Botanique',
    logoText: 'Clínica Eterna',
    primaryColor: '#5D7052',
    headerStyle: 'architectural',
    phone: '(11) 98765-4321',
    whatsapp: '5511987654321',
    email: 'concierge@clinicaeterna.com.br',
    address: 'Avenida Europa, Jardins',
    cityState: 'São Paulo, SP',
    operatingHoursWeekdays: 'Terça a Sábado: 09h às 20h',
    operatingHoursSunday: 'Domingo: 10h às 18h • Atendimento sob consulta',
  },
  content: {
    heroBadge: 'BEM-ESTAR & SPA DE ALTÍSSIMO PADRÃO',
    heroHeadline: 'Redefina seu',
    heroHeadlineItalic1: 'tempo',
    heroHeadlineItalic2: 'essência',
    heroSubtext: 'Um refúgio sensorial no coração da cidade dedicado à descompressão profunda, cura integrativa e restauração do equilíbrio vital através de botânicos raros e terapias ancestrais.',
    metricYears: '15+',
    metricYearsLabel: 'Anos de Excelência',
    metricClients: '10k+',
    metricClientsLabel: 'Clientes Restaurados',
    metricRituals: '50+',
    metricRitualsLabel: 'Rituais Exclusivos',
    aboutTitle: 'SOBRE NÓS',
    aboutHeadline: 'O Luxo Silencioso do Cuidado Autêntico',
    aboutManifesto: 'Nascemos da convicção de que a verdadeira regeneração não pode ser apressada. Em um mundo de estímulos constantes, criamos um oásis termal e botânico onde o silêncio é sagrado, o toque é cirúrgico e cada fórmula é colhida em respeito aos ciclos naturais.',
    aboutPillar1Title: 'Natureza Pura',
    aboutPillar1Desc: '100% bioativos orgânicos, extratos puros e aromaterapia clínica personalizada.',
    aboutPillar2Title: 'Cuidado Integral',
    aboutPillar2Desc: 'Terapeutas sêniores e anamnese individualizada para cada visitante.',
    aboutPillar3Title: 'Excelência Sensorial',
    aboutPillar3Desc: 'Acústica serena, temperatura controlada e toalhas de linho egípcio.',
  },
  media: {
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-87ASUH2UwXQy4dGVR8kBu02KN6DIDx4utsEJU7_-vas4y3Hhjuq2adn_hmgayWTKv88_ddovwP8fVMtHFKABQjMqoSPavdUoan6sGYSKV-rCP_I2Eqhry2p16aYAnsfbLPuiC8WOrSo72hA-dWIbAVvqoD7egGsVG3nztEzPVYvZa7vcstvP5txxRy98KPPsP0IStojT8ibutYN16AihylPP9OmFQ0GYiiQi5Zg',
    aboutImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4_X9wcFH4mwn_-q8RFHDZjDSpkfenrQV2qNpZRF2Tq4W1cnOp0yqFT7NJofpFjXSivC0DKhNwP7vD7rkqYjZKoFPW2aronh6kDDh3IFcbLrz1nT4d8Up2VCerdEoPXegTAS5QYaXMmLA0ZrnGkh6K_ij-a4zji2GEBXvMxLOz4NhjT80znqhXA9F-QWX-7WwsT2Y2XdXaZsoRjRg29CKvP1D8wLdRi0_O7l9llJQ',
    contactImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwm7O3F6cRgaH-X2zrDVlXZxru7LIfm_36sN4dUiBGprpU_hSnyZjumv_WO8I9TlnTSDXWS1UMA68A9_weQ_GeZoliMTsotyUuYTCbnzwaQgzl75zmVbCqVvW-qj_6svVa6UGl6p1SLGYdDIcRMRXTZVgVvEhU4Gv15zJE0DGr1XHGKKjfFTlOYqh0N3WuCyf1b3YQteg1TrSLOwMvMQKXiHeksprRq033jSr2WlQ',
    overlayImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-87ASUH2UwXQy4dGVR8kBu02KN6DIDx4utsEJU7_-vas4y3Hhjuq2adn_hmgayWTKv88_ddovwP8fVMtHFKABQjMqoSPavdUoan6sGYSKV-rCP_I2Eqhry2p16aYAnsfbLPuiC8WOrSo72hA-dWIbAVvqoD7egGsVG3nztEzPVYvZa7vcstvP5txxRy98KPPsP0IStojT8ibutYN16AihylPP9OmFQ0GYiiQi5Zg',
  },
  rituals: [
    {
      id: 'rit-1',
      title: 'Limpeza de Pele Botânica & Glow',
      category: 'renovacao',
      durationMinutes: 80,
      priceBrl: 420,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwm7O3F6cRgaH-X2zrDVlXZxru7LIfm_36sN4dUiBGprpU_hSnyZjumv_WO8I9TlnTSDXWS1UMA68A9_weQ_GeZoliMTsotyUuYTCbnzwaQgzl75zmVbCqVvW-qj_6svVa6UGl6p1SLGYdDIcRMRXTZVgVvEhU4Gv15zJE0DGr1XHGKKjfFTlOYqh0N3WuCyf1b3YQteg1TrSLOwMvMQKXiHeksprRq033jSr2WlQ',
      shortDescription: 'Higienização profunda não agressiva com vapores de camomila e lavanda, esfoliação enzimática de romã e máscara mineral antioxidante.',
      protocolSteps: [
        'Aromaterapia de boas-vindas com lavanda e vetiver',
        'Higienização com leite botânico de amêndoas',
        'Vaporização morna de camomila para abertura suave de poros',
        'Extração manual delicada sem traumas cutâneos',
        'Máscara de argila verde com hialurônico e romã',
        'Massagem facial modeladora com guasha de quartzo rosa'
      ],
      bioactiveIngredients: ['Sálvia Officinalis', 'Extrato de Romã', 'Argila Caolim', 'Óleo de Jojoba'],
      featured: true,
    },
    {
      id: 'rit-2',
      title: 'Massagem Terapêutica com Óleos Quentes',
      category: 'descompressao',
      durationMinutes: 60,
      priceBrl: 380,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4_X9wcFH4mwn_-q8RFHDZjDSpkfenrQV2qNpZRF2Tq4W1cnOp0yqFT7NJofpFjXSivC0DKhNwP7vD7rkqYjZKoFPW2aronh6kDDh3IFcbLrz1nT4d8Up2VCerdEoPXegTAS5QYaXMmLA0ZrnGkh6K_ij-a4zji2GEBXvMxLOz4NhjT80znqhXA9F-QWX-7WwsT2Y2XdXaZsoRjRg29CKvP1D8wLdRi0_O7l9llJQ',
      shortDescription: 'Manobras firmes com pedras vulcânicas aquecidas e infusão personalizada de sálvia e bergamota para dissolver tensões crônicas.',
      protocolSteps: [
        'Anamnese táctil e seleção da sinergia de óleos',
        'Escalda-pés com sais de Epsom e alecrim marroquino',
        'Descompressão miofascial na região dorsal e cervical',
        'Deslize contínuo com óleos botânicos mornos',
        'Termoterapia localizada com pedras vulcânicas polidas'
      ],
      bioactiveIngredients: ['Óleo de Sésamo Prensado a Frio', 'Extrato de Arnica', 'Essência de Bergamota', 'Vitamina E'],
      featured: true,
    },
    {
      id: 'rit-3',
      title: 'Spa Day Signature Eterna',
      category: 'imersao',
      durationMinutes: 180,
      priceBrl: 980,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-87ASUH2UwXQy4dGVR8kBu02KN6DIDx4utsEJU7_-vas4y3Hhjuq2adn_hmgayWTKv88_ddovwP8fVMtHFKABQjMqoSPavdUoan6sGYSKV-rCP_I2Eqhry2p16aYAnsfbLPuiC8WOrSo72hA-dWIbAVvqoD7egGsVG3nztEzPVYvZa7vcstvP5txxRy98KPPsP0IStojT8ibutYN16AihylPP9OmFQ0GYiiQi5Zg',
      shortDescription: 'Banho de imersão em ofurô de cedro com sais botânicos, esfoliação corporal suave, massagem holística de corpo inteiro e ritual facial express.',
      protocolSteps: [
        'Ritual de acolhimento com infusão botânica morna',
        'Imersão privativa de 40 min em ofurô com óleos essenciais',
        'Esfoliação corporal completa com cristais de sal rosa e cedro',
        'Massagem corporal holística de 60 min',
        'Facial regenerativo express com drenagem crânio-facial',
        'Degustação de chá artesanal e frutas da estação na sala de repouso'
      ],
      bioactiveIngredients: ['Sais de Sal Magnésio', 'Flor de Calêndula', 'Óleo de Macadâmia', 'Hidrolato de Gerânio'],
      featured: true,
    },
    {
      id: 'rit-4',
      title: 'Ritual Alívio & Equilíbrio Botânico',
      category: 'equilibrio',
      durationMinutes: 75,
      priceBrl: 450,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4_X9wcFH4mwn_-q8RFHDZjDSpkfenrQV2qNpZRF2Tq4W1cnOp0yqFT7NJofpFjXSivC0DKhNwP7vD7rkqYjZKoFPW2aronh6kDDh3IFcbLrz1nT4d8Up2VCerdEoPXegTAS5QYaXMmLA0ZrnGkh6K_ij-a4zji2GEBXvMxLOz4NhjT80znqhXA9F-QWX-7WwsT2Y2XdXaZsoRjRg29CKvP1D8wLdRi0_O7l9llJQ',
      shortDescription: 'Combina massagem miofascial aquecida com compressas aromáticas de arnica e sálvia para liberar contraturas crônicas e restaurar a mobilidade.',
      protocolSteps: [
        'Acompanhamento postural e alinhamento articular suave',
        'Compressas herbais aquecidas na coluna vertebral',
        'Massagem muscular profunda com foco em nós de tensão',
        'Drenagem linfática localizada para eliminar resíduos'
      ],
      bioactiveIngredients: ['Sálvia Clary', 'Eucalipto Citriodora', 'Resina de Copaíba'],
      featured: false,
    },
    {
      id: 'rit-5',
      title: 'Imersão Aromaterapêutica & Calma Interior',
      category: 'descompressao',
      durationMinutes: 60,
      priceBrl: 390,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-87ASUH2UwXQy4dGVR8kBu02KN6DIDx4utsEJU7_-vas4y3Hhjuq2adn_hmgayWTKv88_ddovwP8fVMtHFKABQjMqoSPavdUoan6sGYSKV-rCP_I2Eqhry2p16aYAnsfbLPuiC8WOrSo72hA-dWIbAVvqoD7egGsVG3nztEzPVYvZa7vcstvP5txxRy98KPPsP0IStojT8ibutYN16AihylPP9OmFQ0GYiiQi5Zg',
      shortDescription: 'Sinergia de lavanda francesa, camomila e escalda-pés com sais minerais, seguida de massagem crânio-cervical suave para apaziguar a mente.',
      protocolSteps: [
        'Escalda-pés com sais minerais e óleo essencial de lavanda',
        'Massagem relaxante crânio-sacral e facial',
        'Meditação guiada assistida por aromas de vetiver'
      ],
      bioactiveIngredients: ['Lavanda de Provença', 'Flor de Camomila Romana', 'Madeira de Sândalo'],
      featured: false,
    },
    {
      id: 'rit-6',
      title: 'Tratamento Sculpt & Detox Corporal',
      category: 'renovacao',
      durationMinutes: 75,
      priceBrl: 460,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwm7O3F6cRgaH-X2zrDVlXZxru7LIfm_36sN4dUiBGprpU_hSnyZjumv_WO8I9TlnTSDXWS1UMA68A9_weQ_GeZoliMTsotyUuYTCbnzwaQgzl75zmVbCqVvW-qj_6svVa6UGl6p1SLGYdDIcRMRXTZVgVvEhU4Gv15zJE0DGr1XHGKKjfFTlOYqh0N3WuCyf1b3YQteg1TrSLOwMvMQKXiHeksprRq033jSr2WlQ',
      shortDescription: 'Drenagem linfática manual refinada combinada com pincelamento a seco corporal e argiloterapia verde firmadora.',
      protocolSteps: [
        'Dry brushing (escovação a seco) ativadora da microcirculação',
        'Drenagem linfática no método exclusivo Eterna',
        'Aplicação de gel frio de centella asiática e cafeína'
      ],
      bioactiveIngredients: ['Centella Asiática', 'Grapefruit Orgânica', 'Extrato de Castanha da Índia'],
      featured: false,
    }
  ],
  testimonials: [
    {
      id: 'test-1',
      authorName: 'Dra. Helena Guimarães',
      authorRole: 'Arquiteta & Urbanista',
      rating: 5,
      quote: 'A Clínica Eterna transformou completamente minha percepção de autocuidado. O silêncio, os aromas e a atenção personalizada me trouxeram uma sensação de paz que eu não sentia há anos.',
      ritualName: 'Spa Day Signature Eterna',
    },
    {
      id: 'test-2',
      authorName: 'Patrícia Albuquerque',
      authorRole: 'Diretora Criativa',
      rating: 5,
      quote: 'O atendimento do Concierge é impecável do primeiro momento ao pós-ritual. A limpeza de pele botânica deixou meu rosto radiante sem nenhuma vermelhidão.',
      ritualName: 'Limpeza de Pele Botânica & Glow',
    },
    {
      id: 'test-3',
      authorName: 'Marcio Vianna',
      authorRole: 'Empresário',
      rating: 5,
      quote: 'Como executivo, meu nível de estresse muscular nas costas era insustentável. A massagem com pedras e óleos quentes foi o melhor investimento na minha saúde mental este ano.',
      ritualName: 'Massagem Terapêutica com Óleos Quentes',
    }
  ],
  calendarSync: {
    googleCalendarEnabled: true,
    googleCalendarId: 'agenda.concierge@clinicaeterna.com.br',
    googleApiKey: 'AIzaSyA_clinica_eterna_google_cal_key_sample',
    googleOAuthToken: 'ya29.a0ARdaC_sample_google_oauth_access_token_eterna',
    googleAutoSyncConfirmedOnly: true,
    appleIcalEnabled: true,
    icalFeedUrl: 'webcal://clinicaeterna.com.br/api/calendar/feed.ics',
    outlookEnabled: true,
    outlookCalendarEmail: 'santuario@clinicaeterna.com.br',
    outlookApiToken: 'EwBoA8l6BAAU_sample_microsoft_graph_token_eterna',
    outlookClientId: '8f7a912b-3c4d-[#E6E2D8]',
    outlookAutoSyncConfirmedOnly: true,
    autoSyncBookings: true,
    bufferMinutesBetweenRituals: 20,
    whatsappRemindersEnabled: true,
    whatsappReminderHoursBefore: 24,
    syncIntervalMinutes: 15,
    lastSyncedAt: new Date().toISOString(),
    lastAutoSyncCount: 2,
  }
};

export const QUIZ_OPTIONS: QuizOption[] = [
  {
    id: 'alivio',
    icon: 'bolt',
    title: 'Cansaço & Tensão Muscular',
    description: 'Preciso de alívio físico e descompressão profunda nas costas e ombros.',
    recommendedRitualId: 'rit-2'
  },
  {
    id: 'calmaria',
    icon: 'energy_savings_leaf',
    title: 'Sobrecarga Mental & Ansiedade',
    description: 'Busco calmaria, silêncio e equilíbrio interior para desacelerar pensamentos.',
    recommendedRitualId: 'rit-5'
  },
  {
    id: 'brilho',
    icon: 'auto_awesome',
    title: 'Pele Opaca & Cansaço Visível',
    description: 'Desejo regeneração, viço natural e hidratação iluminada para o rosto.',
    recommendedRitualId: 'rit-1'
  },
  {
    id: 'desconexao',
    icon: 'self_improvement',
    title: 'Necessidade de Desconexão Total',
    description: 'Quero uma pausa completa de horas e uma imersão restauradora exclusiva.',
    recommendedRitualId: 'rit-3'
  }
];

export const INITIAL_BOOKINGS: BookingRequest[] = [
  {
    id: 'bk-101',
    createdAt: new Date().toISOString(),
    name: 'Helena Guimarães',
    email: 'helena.guimaraes@exemplo.com.br',
    phone: '(11) 99887-6655',
    ritualTitle: 'Spa Day Signature Eterna',
    date: '2026-09-22',
    time: '14:00',
    sensoryPreference: 'Aromaterapia de Lavanda e pressão moderada',
    status: 'Confirmado',
    notes: 'Reserva VIP recebida via Concierge'
  },
  {
    id: 'bk-102',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    name: 'Gabriel Siqueira',
    email: 'gabriel.siqueira@exemplo.com.br',
    phone: '(11) 98112-3344',
    ritualTitle: 'Massagem Terapêutica com Óleos Quentes',
    date: '2026-09-24',
    time: '10:30',
    sensoryPreference: 'Pedras aquecidas e essência de sálvia',
    status: 'Pendente',
    notes: 'Aguardando confirmação de agenda pelo cliente'
  }
];
