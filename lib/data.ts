export type Project = {
  id: string
  title: string
  description: string
  technologies: string[]
  image: string
  github: string
  demo: string
  categories: string[]
  featured?: boolean
  caseMedia?: {
    src: string
    alt: string
    kind: 'image' | 'gif'
  }[]
  caseStudy: {
    problem: string
    solution: string
    role: string
    highlights: string[]
    decisions: { title: string; description: string }[]
    challenges: string[]
    outcome: string
  }
}

export type Experience = {
  company: string
  role: string
  period: string
  description: string
}

export type TimelineStep = {
  year: string
  title: string
  description: string
  details?: string
  technologies?: string[]
}

export type Skill = {
  name: string
  orbit: number
  color: string
}

export const projects: Project[] = [
  {
    id: 'sistema-multiagentes-ia',
    title: 'Sistema Multiagentes com IA',
    description:
      'Sistema criado para centralizar e automatizar atendimentos que exigem diferentes áreas de suporte. Um agente supervisor interpreta mensagens de texto ou áudio no Telegram e encaminha cada solicitação ao especialista adequado, mantendo contexto e integrando calendário e dados externos para reduzir triagens manuais.',
    technologies: ['n8n', 'Google Gemini', 'Telegram', 'Google Calendar', 'Google Sheets', 'IA Generativa'],
    image: '/sistema-multiagentes-n8n.png',
    github: 'https://github.com/Paulo-Vitor-dev/sistema-multiagentes-n8n',
    demo: '#',
    categories: ['automation', 'apis'],
    featured: true,
    caseMedia: [],
    caseStudy: {
      problem: 'Atendimentos com demandas diferentes podem exigir triagem manual e troca constante entre ferramentas, aumentando o tempo para identificar qual fluxo deve tratar cada solicitação.',
      solution: 'Criei uma arquitetura multiagente em que um agente supervisor interpreta mensagens de texto ou áudio recebidas pelo Telegram, preserva o contexto e direciona a solicitação para agentes especializados, com integrações de calendário e dados externos.',
      role: 'Arquitetura do fluxo, integração entre serviços, definição dos agentes e engenharia de prompts.',
      highlights: ['Roteamento inteligente entre agentes especialistas', 'Entrada por texto e áudio via Telegram', 'Integração com Google Calendar e Google Sheets', 'Contexto compartilhado durante o atendimento'],
      decisions: [
        { title: 'n8n como orquestrador', description: 'Escolhido para coordenar agentes, APIs e regras de fluxo de forma visual e modular.' },
        { title: 'Gemini para interpretação', description: 'Usado para classificar a intenção das mensagens e apoiar a geração de respostas contextualizadas.' },
        { title: 'Telegram como interface', description: 'Permite concentrar a experiência do usuário em um canal simples enquanto o processamento acontece nos bastidores.' },
      ],
      challenges: ['Definir limites claros de responsabilidade entre supervisor e especialistas', 'Manter contexto suficiente entre etapas sem acoplar os fluxos', 'Coordenar respostas de serviços externos dentro da automação'],
      outcome: 'O projeto demonstra como centralizar diferentes rotinas de atendimento em uma única entrada, reduzindo a necessidade de triagem manual e deixando a arquitetura preparada para novos agentes e integrações.',
    },
  },
  {
    id: 'agente-reembolso-ia',
    title: 'Agente Inteligente de Reembolso',
    description:
      'Automação desenvolvida para reduzir o trabalho manual no processamento de solicitações de reembolso. O fluxo valida dados, consulta clientes, interpreta o contexto com IA e aplica regras de negócio antes de responder por Gmail ou Telegram, tornando a análise mais rápida e consistente.',
    technologies: ['n8n', 'Google Gemini', 'Google Sheets', 'Gmail', 'Telegram', 'Webhooks'],
    image: '/agente-reembolso-n8n.png',
    github: 'https://github.com/Paulo-Vitor-dev/agente-inteligente-reembolso',
    demo: '#',
    categories: ['automation', 'apis'],
    featured: true,
    caseMedia: [],
    caseStudy: {
      problem: 'Solicitações de reembolso exigem conferência de dados, aplicação de regras e comunicação com o usuário, tarefas que podem se tornar repetitivas quando feitas manualmente.',
      solution: 'Desenvolvi um fluxo automatizado que recebe solicitações, consulta dados, interpreta o contexto com IA, aplica regras de negócio e devolve a resposta pelo canal adequado.',
      role: 'Desenho do fluxo, regras de validação, integração com serviços e prompts para interpretação das solicitações.',
      highlights: ['Validação automatizada de informações', 'Consulta de dados em Google Sheets', 'Respostas por Gmail ou Telegram', 'Uso de webhooks para entrada de eventos'],
      decisions: [
        { title: 'Fluxo baseado em regras + IA', description: 'A IA interpreta o contexto, enquanto decisões determinísticas permanecem em etapas explícitas do workflow.' },
        { title: 'Google Sheets como fonte simples', description: 'Adequado ao escopo do protótipo para consultar e atualizar dados sem introduzir infraestrutura desnecessária.' },
        { title: 'Múltiplos canais de resposta', description: 'Gmail e Telegram mostram como o mesmo processo pode se adaptar ao canal de origem ou atendimento.' },
      ],
      challenges: ['Separar interpretação semântica de validações determinísticas', 'Tratar caminhos diferentes conforme os dados encontrados', 'Garantir continuidade do fluxo entre integrações distintas'],
      outcome: 'A solução organiza o processo de reembolso em etapas rastreáveis e automatizadas, mostrando uma abordagem prática para reduzir tarefas operacionais repetitivas.',
    },
  },
  {
    id: 'agente-comercial-ia',
    title: 'Agente Comercial com IA',
    description:
      'Agente criado para acelerar o atendimento comercial por e-mail e reduzir respostas repetitivas. O fluxo monitora novas mensagens, identifica dúvidas com IA, preserva o contexto da conversa e gera respostas automáticas personalizadas, mantendo o atendimento mais ágil e organizado.',
    technologies: ['n8n', 'Google Gemini', 'Gmail API', 'Prompt Engineering', 'Automação'],
    image: '/agente-comercial-n8n.png',
    github: 'https://github.com/Paulo-Vitor-dev/agente-comercial-n8n',
    demo: '#',
    categories: ['automation', 'apis'],
    featured: true,
    caseMedia: [],
    caseStudy: {
      problem: 'Atendimentos comerciais por e-mail acumulam perguntas semelhantes e exigem tempo para ler histórico, entender a intenção e redigir respostas consistentes.',
      solution: 'Criei um agente que monitora novas mensagens, identifica o contexto da conversa e gera respostas personalizadas com IA, mantendo o histórico necessário para dar continuidade ao atendimento.',
      role: 'Automação do atendimento, integração com Gmail e engenharia de prompts para contexto e resposta.',
      highlights: ['Monitoramento de novas mensagens', 'Classificação de dúvidas com IA', 'Preservação do contexto da conversa', 'Geração automática de respostas personalizadas'],
      decisions: [
        { title: 'Gmail API como canal', description: 'Mantém o atendimento no fluxo de e-mail já conhecido pelo usuário e permite automatizar leitura e resposta.' },
        { title: 'Prompt orientado a contexto', description: 'A resposta considera a conversa em vez de tratar cada mensagem como uma solicitação isolada.' },
        { title: 'n8n para automação', description: 'Centraliza gatilhos, processamento com IA e retorno pelo Gmail em um único workflow.' },
      ],
      challenges: ['Evitar respostas desconectadas do histórico', 'Distinguir informações relevantes no corpo das mensagens', 'Organizar o fluxo para que cada etapa tenha responsabilidade clara'],
      outcome: 'O case mostra como automatizar parte do atendimento comercial sem perder o contexto da conversa, liberando o fluxo manual das respostas mais repetitivas.',
    },
  },
  {
    id: 'spotify-clone',
    title: 'Spotify Clone',
    description:
      'Aplicação criada para praticar a construção de uma experiência de streaming moderna e responsiva. Reproduz padrões de navegação do Spotify com busca dinâmica, organização de playlists e componentes reutilizáveis, reforçando arquitetura de interface com React, Next.js e TypeScript.',
    technologies: ['React', 'Next.js', 'TypeScript', 'HTML', 'CSS', 'JavaScript'],
    image: '/spotify-clone-project.png',
    github: 'https://github.com/Paulo-Vitor-dev/copia-spotify',
    demo: 'https://copia-spotify-hazel.vercel.app/',
    categories: ['web', 'design'],
    featured: true,
    caseMedia: [],
    caseStudy: {
      problem: 'Construir interfaces semelhantes a produtos de streaming exige lidar com navegação rica, hierarquia visual, estados de busca e componentes reutilizáveis em diferentes tamanhos de tela.',
      solution: 'Recriei uma experiência inspirada no Spotify para praticar arquitetura de front-end moderna, organizando componentes, navegação e busca dinâmica com React, Next.js e TypeScript.',
      role: 'Desenvolvimento front-end, componentização, responsividade e comportamento das interações.',
      highlights: ['Interface responsiva inspirada em streaming', 'Busca dinâmica', 'Organização de playlists e conteúdos', 'Componentes reutilizáveis'],
      decisions: [
        { title: 'Next.js + React', description: 'Base escolhida para estruturar páginas e componentes com uma arquitetura moderna de aplicações web.' },
        { title: 'TypeScript', description: 'Adiciona tipagem aos dados e props, ajudando a manter os componentes mais previsíveis.' },
        { title: 'Componentização', description: 'Elementos recorrentes da interface foram tratados como peças reutilizáveis para reduzir repetição.' },
      ],
      challenges: ['Reproduzir uma hierarquia visual complexa sem perder responsividade', 'Organizar estados e dados usados pela busca', 'Manter consistência entre diferentes áreas da interface'],
      outcome: 'O projeto consolidou práticas de React, Next.js e TypeScript em uma interface de maior densidade visual e interação do que uma landing page tradicional.',
    },
  },
  {
    id: 'album-nossa-historia',
    title: 'Nosso Álbum — Nossa História de Amor',
    description:
      'Álbum digital interativo criado para transformar memórias de um casal em uma experiência visual inspirada em um álbum de figurinhas. O projeto combina navegação por páginas, animação de virada, trilha sonora e conteúdo personalizado, com front-end em HTML, CSS e JavaScript e apoio de uma API em FastAPI.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Python', 'FastAPI', 'St.PageFlip'],
    image: '/album-nossa-historia-capa.png',
    github: 'https://github.com/Paulo-Vitor-dev/album-nossa-historia',
    demo: '#',
    categories: ['web', 'design', 'apis'],
    featured: true,
    caseMedia: [
      {
        src: '/album-nossa-historia-demo.gif',
        alt: 'Demonstração animada da navegação e da virada de páginas do álbum digital',
        kind: 'gif',
      },
      {
        src: '/album-nossa-historia-pagina-1.png',
        alt: 'Páginas internas do álbum com aventuras, viagens e momentos do casal',
        kind: 'image',
      },
      {
        src: '/album-nossa-historia-pagina-2.png',
        alt: 'Páginas internas do álbum com cartões de memórias e momentos inesquecíveis',
        kind: 'image',
      },
    ],
    caseStudy: {
      problem: 'Transformar uma coleção de lembranças em algo mais envolvente do que uma galeria estática exigia criar uma experiência com narrativa, personalidade e interação, sem perder a sensação afetiva de folhear um álbum físico.',
      solution: 'Desenvolvi um álbum digital com páginas temáticas, navegação por setas e animação de virada de página. As memórias foram organizadas em uma experiência visual contínua, com imagens, textos personalizados e áudio, enquanto uma API em FastAPI dá suporte à estrutura do projeto.',
      role: 'Concepção da experiência, desenvolvimento front-end, estruturação das páginas, integração da animação de page flip e implementação do backend em Python com FastAPI.',
      highlights: ['Virada de páginas com efeito de álbum físico', 'Páginas temáticas com fotos e memórias personalizadas', 'Controles de navegação e áudio', 'Experiência responsiva em formato de álbum digital', 'Backend com FastAPI para suporte à aplicação'],
      decisions: [
        { title: 'St.PageFlip para a navegação', description: 'A biblioteca foi utilizada para reproduzir o movimento de uma página física e reforçar a proposta de álbum interativo.' },
        { title: 'HTML, CSS e JavaScript no front-end', description: 'A combinação permite controle direto sobre layout, animações e comportamento visual sem adicionar complexidade desnecessária ao projeto.' },
        { title: 'FastAPI no backend', description: 'O backend em Python foi adotado para organizar a camada de API de forma leve, rápida e documentável.' },
      ],
      challenges: ['Manter o efeito de virada natural em diferentes tamanhos de tela', 'Organizar conteúdo visual sem comprometer legibilidade e equilíbrio das páginas', 'Sincronizar navegação, animação e elementos de áudio em uma experiência fluida'],
      outcome: 'O projeto demonstra como desenvolvimento web e narrativa visual podem ser combinados para transformar conteúdo pessoal em uma experiência digital interativa, reforçando domínio de front-end, animações, responsividade e integração com backend.',
    },
  },
  {
    id: 'techpoint-ecommerce',
    title: 'TechPoint E-commerce',
    description:
      'E-commerce desenvolvido para facilitar a descoberta de produtos de tecnologia em um catálogo responsivo. A interface combina busca e filtros dinâmicos para reduzir o tempo até o produto desejado e tornar a navegação mais clara em desktop e dispositivos móveis.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: '/techpoint-project.png',
    github: 'https://github.com/Paulo-Vitor-dev/ecommerce-project',
    demo: '#',
    categories: ['web'],
    caseMedia: [],
    caseStudy: {
      problem: 'Catálogos de tecnologia podem ficar difíceis de explorar quando muitos produtos disputam atenção e o usuário não encontra rapidamente o que procura.',
      solution: 'Desenvolvi um e-commerce responsivo com busca e filtros para facilitar a descoberta de produtos e organizar a navegação em diferentes tamanhos de tela.',
      role: 'Estruturação da interface, estilização responsiva e implementação das interações em JavaScript.',
      highlights: ['Catálogo responsivo', 'Busca de produtos', 'Filtros dinâmicos', 'Navegação adaptada a desktop e mobile'],
      decisions: [
        { title: 'HTML, CSS e JavaScript', description: 'O projeto foi construído com fundamentos da web para exercitar estrutura, estilo e comportamento sem depender de framework.' },
        { title: 'Filtros no cliente', description: 'A interação imediata permite praticar manipulação de dados e atualização da interface.' },
      ],
      challenges: ['Organizar visualmente um catálogo com vários itens', 'Sincronizar filtros e busca na interface', 'Garantir legibilidade em diferentes larguras de tela'],
      outcome: 'O case demonstra domínio dos fundamentos do front-end aplicados a um problema comum de descoberta e organização de produtos.',
    },
  },
  {
    id: 'fullstack-project',
    title: 'Meu primeiro Projeto Full Stack',
    description:
      'Aplicação Full Stack criada para consolidar o fluxo completo entre interface, API e banco de dados. Permite cadastrar, listar e excluir usuários por uma API REST conectada ao MongoDB, demonstrando na prática a integração entre React, Node.js e Express.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
    image: '/fullstack-project.png',
    github: 'https://github.com/Paulo-Vitor-dev/first-fullstack-project',
    demo: '#',
    categories: ['apis', 'web'],
    featured: true,
    caseMedia: [],
    caseStudy: {
      problem: 'Entender Full Stack na prática exige conectar interface, API e persistência de dados em um fluxo completo, não apenas estudar cada camada isoladamente.',
      solution: 'Construí uma aplicação de cadastro de usuários em que React consome uma API REST criada com Node.js e Express, responsável por persistir os dados no MongoDB.',
      role: 'Implementação do front-end, criação da API, integração com banco de dados e conexão entre as camadas.',
      highlights: ['Cadastro de usuários', 'Listagem de registros', 'Exclusão de usuários', 'Integração React + API REST + MongoDB'],
      decisions: [
        { title: 'React no front-end', description: 'Permite separar a interface em componentes e atualizar a tela de acordo com o estado da aplicação.' },
        { title: 'Express na API', description: 'Fornece uma estrutura enxuta para criar endpoints REST e organizar o fluxo HTTP.' },
        { title: 'MongoDB para persistência', description: 'Foi utilizado para praticar armazenamento e manipulação de documentos em uma aplicação Full Stack.' },
      ],
      challenges: ['Conectar corretamente as três camadas da aplicação', 'Sincronizar a interface após alterações no banco', 'Tratar requisições e respostas entre front-end e API'],
      outcome: 'O projeto marcou a consolidação do fluxo Full Stack completo, servindo de base para sistemas posteriores com APIs e bancos relacionais.',
    },
  },
  {
    id: 'pelos-e-patas',
    title: 'Pelos & Patas - PetShop',
    description:
      'Sistema de gestão criado para organizar operações de um pet shop em um único ambiente. Centraliza dados de clientes e pets e evolui para serviços e agendamentos, utilizando API REST e MySQL para substituir controles dispersos por um fluxo estruturado e fácil de manter.',
    technologies: ['Node.js', 'Express', 'MySQL'],
    image: '/Pelos&Patas-project.png',
    github: 'https://github.com/Paulo-Vitor-dev/petshop-project',
    demo: '#',
    categories: ['apis', 'web'],
    caseMedia: [],
    caseStudy: {
      problem: 'Um pet shop precisa relacionar clientes, animais, serviços e agendamentos; controles dispersos dificultam consulta, manutenção e evolução dessas informações.',
      solution: 'Estou desenvolvendo um sistema de gestão com API REST e MySQL para centralizar os dados do negócio e estruturar relacionamentos entre as principais entidades.',
      role: 'Modelagem de dados, desenvolvimento da API REST, operações CRUD e testes dos endpoints.',
      highlights: ['CRUD de clientes', 'Cadastro e relacionamento de pets', 'API REST com Node.js e Express', 'Persistência relacional em MySQL'],
      decisions: [
        { title: 'MySQL para dados relacionais', description: 'O domínio possui relações claras entre clientes, pets, serviços e agendamentos, favorecendo um banco relacional.' },
        { title: 'Express para os endpoints', description: 'Organiza as rotas HTTP e facilita a evolução gradual dos módulos do sistema.' },
        { title: 'Desenvolvimento por módulos', description: 'O sistema evolui entidade por entidade para validar CRUDs e relacionamentos antes de ampliar o domínio.' },
      ],
      challenges: ['Modelar corretamente os relacionamentos entre entidades', 'Manter consultas SQL e endpoints consistentes', 'Validar cada módulo antes de avançar para novas regras do negócio'],
      outcome: 'O projeto evolui de CRUDs isolados para um sistema de gestão conectado, reforçando modelagem relacional, APIs REST e manutenção incremental.',
    },
  },
  {
    id: 'hand',
    title: 'Hand 4 You - Landing Page',
    description:
      'Landing page criada para apresentar uma plataforma de serviços domésticos com foco em conversão e clareza da proposta de valor. A estrutura responsiva destaca benefícios e chamadas para ação, usando Next.js e boas práticas de interface para melhorar descoberta, performance e experiência de navegação.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    image: '/hand4you-project.png',
    github: 'https://github.com/Paulo-Vitor-dev/LandingPage-Hand',
    demo: 'https://landing-page-hand.vercel.app/',
    categories: ['web', 'design'],
    featured: true,
    caseMedia: [],
    caseStudy: {
      problem: 'Uma plataforma de serviços domésticos precisa explicar rapidamente sua proposta de valor e conduzir o visitante para uma ação sem criar atrito na navegação.',
      solution: 'Criei uma landing page responsiva focada em apresentar benefícios, organizar a informação e destacar chamadas para ação, combinando performance e experiência visual.',
      role: 'Desenvolvimento front-end, implementação do layout responsivo e organização da experiência de conversão.',
      highlights: ['Hero com proposta de valor clara', 'CTAs distribuídos ao longo da página', 'Layout responsivo', 'Estrutura preparada para boa indexação e performance'],
      decisions: [
        { title: 'Next.js', description: 'Escolhido para estruturar uma aplicação moderna e oferecer uma base sólida para performance e recursos de SEO.' },
        { title: 'Tailwind CSS', description: 'Facilita consistência visual e ajustes responsivos diretamente nos componentes.' },
        { title: 'Hierarquia orientada a conversão', description: 'Conteúdo e CTAs foram organizados para reduzir dúvidas e conduzir o visitante pela proposta da plataforma.' },
      ],
      challenges: ['Equilibrar impacto visual e clareza da mensagem', 'Manter a página consistente em diferentes telas', 'Organizar seções e CTAs sem tornar a experiência repetitiva'],
      outcome: 'A landing page demonstra como decisões de front-end e UX podem trabalhar juntas para apresentar um serviço de forma clara e direcionar o visitante para a conversão.',
    },
  },
]

export const experiences: Experience[] = [
  {
    company: 'Ply Agency · Home Office',
    role: 'Estagiário de Tecnologia / Web Designer',
    period: '01/2026 - 05/2026',
    description:
      'Desenvolvimento de interfaces web responsivas utilizando HTML, CSS, JavaScript e React. Criação e manutenção de páginas em WordPress, Elementor e Wix, integração de APIs, apoio na organização de dados, correção de bugs, UX/UI, otimização de e-commerces e suporte em ambiente de produção.',
  },
  {
    company: 'Projetos Pessoais e Freelance',
    role: 'Desenvolvedor Full Stack',
    period: '2024 - Atual',
    description:
      'Criação de landing pages, e-commerces, sistemas web e aplicações Full Stack com React, Next.js, Node.js, Express, MongoDB e MySQL. Desenvolvimento de soluções com foco em responsividade, performance, integração de APIs REST e deploy de aplicações web.',
  },
  {
    company: 'Automação e Inteligência Artificial',
    role: 'Desenvolvedor de Automações',
    period: '2025 - Atual',
    description:
      'Criação de fluxos automatizados com n8n, integração de ferramentas externas e uso de IA aplicada ao desenvolvimento. Experiência com agentes automáticos, engenharia de prompts e automações para análise e classificação de informações.',
  },
]

export const timeline: TimelineStep[] = [
  {
    year: '2023',
    title: 'Início na Programação',
    description:
      'Primeiros contatos com lógica de programação, algoritmos e desenvolvimento de software durante a graduação em Análise e Desenvolvimento de Sistemas.',
    details:
      'Nessa fase construí a base da minha forma de pensar como desenvolvedor: lógica, resolução de problemas, estruturação de código e entendimento dos fundamentos que sustentam aplicações reais.',
    technologies: ['Lógica', 'Algoritmos', 'C', 'Git'],
  },
  {
    year: '2024',
    title: 'Desenvolvimento Web',
    description:
      'Criação dos primeiros projetos utilizando HTML, CSS, JavaScript e bancos de dados, explorando desenvolvimento Front-End e Back-End.',
    details:
      'Comecei a transformar estudos em interfaces funcionais, entendendo responsividade, organização visual, manipulação de dados e integração entre tela, lógica e banco de dados.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'MySQL'],
  },
  {
    year: '2025',
    title: 'Projetos Full Stack',
    description:
      'Desenvolvimento de aplicações completas com React, Next.js, Node.js, Express, Prisma ORM, MongoDB e MySQL, conectando interfaces modernas com APIs REST.',
    details:
      'Passei a construir projetos mais completos, conectando front-end, back-end e banco de dados. Essa etapa consolidou minha visão Full Stack e meu cuidado com experiência do usuário, performance e manutenção.',
    technologies: ['React', 'Next.js', 'Node.js', 'Express', 'MongoDB'],
  },
  {
    year: '2026',
    title: 'Experiência Profissional',
    description:
      'Atuação na Ply Agency desenvolvendo interfaces responsivas, integrações com APIs, soluções para e-commerce, UX/UI e manutenção de aplicações em produção.',
    details:
      'Trabalhei com demandas reais, alinhamento com clientes, correções em produção e criação de páginas em diferentes plataformas. Aprendi a equilibrar prazo, qualidade visual, usabilidade e solução técnica.',
    technologies: ['React', 'Next.js', 'WordPress', 'Elementor', 'Figma'],
  },
  {
    year: 'Hoje',
    title: 'IA e Automação',
    description:
      'Desenvolvimento de fluxos automatizados com n8n, integração entre sistemas e criação de agentes inteligentes para otimização de processos.',
    details:
      'Hoje venho combinando desenvolvimento web com n8n, APIs e modelos de IA para automatizar tarefas e integrar ferramentas em fluxos de trabalho.',
    technologies: ['n8n', 'Python', 'APIs', 'IA', 'Automação'],
  },
]

export const skills: Skill[] = [
  { name: 'React', orbit: 1, color: '#61dafb' },
  { name: 'Next.js', orbit: 1, color: '#ffffff' },
  { name: 'TypeScript', orbit: 1, color: '#3178c6' },
  { name: 'JavaScript', orbit: 1, color: '#f7df1e' },
  { name: 'TailwindCSS', orbit: 1, color: '#38bdf8' },
  { name: 'Node.js', orbit: 2, color: '#83cd29' },
  { name: 'Express', orbit: 2, color: '#ffffff' },
  { name: 'Java', orbit: 2, color: '#f89820' },
  { name: 'Spring Boot', orbit: 2, color: '#6db33f' },
  { name: 'Python', orbit: 2, color: '#ffd43b' },
  { name: 'MySQL', orbit: 3, color: '#00758f' },
  { name: 'MongoDB', orbit: 3, color: '#47a248' },
  { name: 'PostgreSQL', orbit: 3, color: '#336791' },
  { name: 'Git', orbit: 3, color: '#f05032' },
  { name: 'GitHub', orbit: 3, color: '#ffffff' },
  { name: 'Figma', orbit: 3, color: '#a259ff' },
  { name: 'n8n', orbit: 3, color: '#ea4b71' },
  { name: 'AWS', orbit: 3, color: '#ff9900' },
]

export const navLinks = [
  { label: 'Início', href: '#hero' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Jornada', href: '#sobre' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experiência', href: '#experiencia' },
  { label: 'Conquistas', href: '#conquistas' },
  { label: 'Contato', href: '#contato' },
]

export const contactLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/Paulo-Vitor-dev',
    handle: '@Paulo-Vitor-dev',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/paulovitor-dev-fullstack',
    handle: 'in/paulovitor-dev-fullstack',
  },
  {
    label: 'Email',
    href: 'mailto:paulov9517@gmail.com',
    handle: 'paulov9517@gmail.com',
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/5521968620934',
    handle: '+55 21 96862-0934',
  },
]
