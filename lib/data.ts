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
    id: 'spotify-clone',
    title: 'Spotify Clone',
    description:
      'Clone da interface do Spotify desenvolvido com React, Next.js e TypeScript, com busca dinâmica, playlists e layout responsivo.',
    technologies: ['React', 'Next.js', 'TypeScript', 'HTML', 'CSS', 'JavaScript'],
    image: '/spotify-clone-project.png',
    github: 'https://github.com/Paulo-Vitor-dev/copia-spotify',
    demo: 'https://copia-spotify-hazel.vercel.app/',
    categories: ['web', 'design'],
    featured: true,
  },
  {
    id: 'techpoint-ecommerce',
    title: 'TechPoint E-commerce',
    description:
      'E-commerce de tecnologia desenvolvido com HTML, CSS e JavaScript, com filtros, busca dinâmica e interface responsiva.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: '/techpoint-project.png',
    github: 'https://github.com/Paulo-Vitor-dev/ecommerce-project',
    demo: '#',
    categories: ['web'],
  },
  {
    id: 'fullstack-project',
    title: 'Meu primeiro Projeto Full Stack',
    description:
      'Aplicação Fullstack com React, Node.js, MongoDB, integração com API REST, para cadastro e exclusão de usuários, conectado com o front-end para mostrar esses usuários.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
    image: '/fullstack-project.png',
    github: 'https://github.com/Paulo-Vitor-dev/first-fullstack-project',
    demo: '#',
    categories: ['apis', 'web'],
    featured: true,
  },
  {
    id: 'pelos-e-patas',
    title: 'Pelos & Patas - PetShop',
    description:
      'Sistema web para pet shop com autenticação de usuários, backend em Node.js, Express e integração com banco de dados MySQL.',
    technologies: ['Node.js', 'Express', 'MySQL'],
    image: '/Pelos&Patas-project.png',
    github: 'https://github.com/Paulo-Vitor-dev/petshop-project',
    demo: '#',
    categories: ['apis', 'web'],
  },
  {
    id: 'hand',
    title: 'Hand 4 You - Landing Page',
    description:
      'Landing Page para plataforma de serviços domésticos desenvolvida com Next.js, React, TypeScript e Tailwind CSS.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    image: '/hand4you-project.png',
    github: 'https://github.com/Paulo-Vitor-dev/LandingPage-Hand',
    demo: 'https://landing-page-hand.vercel.app/',
    categories: ['web', 'design'],
    featured: true,
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
      'Hoje venho unindo desenvolvimento web com automações e IA, criando fluxos que economizam tempo, conectam ferramentas e tornam processos mais inteligentes e escaláveis.',
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
  { label: 'Jornada', href: '#sobre' },
  { label: 'Conquistas', href: '#conquistas' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Experiência', href: '#experiencia' },
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
