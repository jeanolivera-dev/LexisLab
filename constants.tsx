
import React from 'react';

export const GEMINI_MODEL_TEXT = 'gemini-2.5-flash-preview-04-17';

export const SYSTEM_PROMPT_AGENT1 = `Você é um especialista em Análise e Desenvolvimento de Sistemas (ADS). Transforme o seguinte texto extraído de um PDF em um material didático completo e detalhado para estudantes de ADS. O material deve ser bem estruturado, com explicações claras, exemplos práticos (se aplicável), e tópicos relevantes para a área. Formate a saída como texto puro, bem organizado, rico em conteúdo e pronto para ser usado como base para estudo. Utilize Markdown para formatação básica como títulos, listas e negrito, se achar apropriado, mas o foco é o conteúdo textual.`;

export const USER_PROMPT_AGENT1_TEMPLATE = (pdfText: string): string => `
Por favor, transforme o seguinte texto extraído de um PDF em material didático:
---
${pdfText}
---
Lembre-se de focar na clareza, detalhamento e relevância para estudantes de ADS.
`;


export const SYSTEM_PROMPT_AGENT2 = `Você é um desenvolvedor web frontend experiente, especialista em Tailwind CSS e design de interfaces de usuário. Sua tarefa é transformar o material didático fornecido abaixo em uma página web HTML completa, interativa e visualmente atraente.
Requisitos da página HTML:
1.  Deve ser um único arquivo HTML.
2.  Inclua a tag <script src="https://cdn.tailwindcss.com"></script> no <head> para habilitar Tailwind CSS.
3.  Utilize classes do Tailwind CSS para toda a estilização. Crie um layout limpo, moderno e responsivo (ex: bg-slate-100 text-slate-800, use containers com max-width, padding, etc.).
4.  Incorpore ícones da biblioteca Heroicons (https://heroicons.com/) para melhorar a interface. Você DEVE usar os SVGs completos dos ícones diretamente no HTML. Escolha ícones apropriados para o contexto do material didático (ex: para seções, listas, etc.).
5.  O título da página (\`<title>\`) deve ser conciso e representar o tema principal do material didático fornecido. Por exemplo, se o material é sobre 'Introdução a Redes de Computadores', o título poderia ser 'Material Interativo: Introdução a Redes de Computadores'. Analise o conteúdo do material didático para criar um título descritivo e específico.
6.  O conteúdo deve ser bem estruturado, utilizando tags semânticas HTML5 (e.g., <article>, <section>, <nav>, <header>, <footer>). Use headings (h1, h2, h3) de forma hierárquica.
7.  A estética é muito importante: use uma paleta de cores agradável (ex: tons de azul, cinza, com cores de destaque), tipografia legível (ex: font-sans), bom espaçamento cars, tabelas, etc.
8.  O conteúdo principal deve estar dentro de um <body>. Envolva o conteúdo principal em um <main class="container mx-auto p-4 md:p-8">.
9.  Se o material didático tiver seções, apresente-as claramente. Considere usar cards ou divisões estilizadas para cada grande tópico.
10. Gere apenas o código HTML completo. Não inclua nenhuma explicação, comentário ou texto fora do código HTML resultante. A saída deve começar com <!DOCTYPE html> ou <html> e terminar com </html>.
RETORNE APENAS O CÓDIGO HTML SEM COMENTÁRIOS`;

export const USER_PROMPT_AGENT2_TEMPLATE = (didacticMaterial: string): string => `
Aqui está o material didático para transformar em uma página HTML:
---
${didacticMaterial}
---
Lembre-se de todos os requisitos de design e estrutura. Crie uma página web bonita e funcional.
`;

// Font Families
export const FONT_TITLE = 'font-poppins';
export const FONT_BODY = 'font-sans'; // 'Inter' is set as default sans-serif in HTML

// Icons for App UI (Heroicons)
export const UploadCloudIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l-3 3m3-3l3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.338 0 4.5 4.5 0 01-1.41 8.775H6.75z" />
  </svg>
);

export const BookOpenIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);

export const AlertTriangleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);

export const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 12L17 14.188l-1.25-2.188a2.25 2.25 0 00-1.637-1.637L12 9.25l2.188-1.25a2.25 2.25 0 001.637-1.637L17 4.125l1.25 2.188a2.25 2.25 0 001.637 1.637L22.75 9.25l-2.188 1.25a2.25 2.25 0 00-1.637 1.637zM9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
    </svg>
);

export const AppTitle: React.FC<{className?: string}> = ({ className = ""}) => (
    <h1 className={`${FONT_TITLE} text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-emerald-500 ${className}`}>
      <SparklesIcon className="h-8 w-8 mr-2 inline-block text-yellow-400" />
      LexisLab
    </h1>
);

export const DocumentTextIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

export const CogIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5M12 4.5v.01M12 19.5v.01M4.5 12H3m18 0h-1.5M12 4.5V3m0 18v-1.5m7.5-7.5h1.5M3 12h1.5m15 0a7.5 7.5 0 11-15 0" />
  </svg>
);

export const ArrowPathIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
);

// New Icons
export const MenuIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

export const XMarkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const SunIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-6.364-.386l1.591-1.591M3 12h2.25m.386-6.364l1.591 1.591" />
  </svg>
);

export const MoonIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
  </svg>
);

export const QuestionMarkCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
  </svg>
);

// Illustration Icon for the initial upload view
export const InteractiveLearningIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" {...props}>
    <defs>
      <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: "var(--tw-color-accent-blue, #3B82F6)", stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: "var(--tw-color-accent-green, #10B981)", stopOpacity: 1}} />
      </linearGradient>
    </defs>
    {/* Simplified Book/Document Pages */}
    <path d="M60,30 Q40,30 40,50 L40,150 Q40,170 60,170 L70,170 L70,30 L60,30 Z" fill="rgba(255,255,255,0.1)" stroke="currentColor" strokeWidth="3"/>
    <path d="M70,30 L130,30 Q150,30 150,50 L150,150 Q150,170 130,170 L70,170 Z" fill="rgba(255,255,255,0.2)" stroke="currentColor" strokeWidth="3"/>
    
    {/* Abstract representation of processing/arrows */}
    <path d="M80,70 L110,70 L110,60 L125,75 L110,90 L110,80 L80,80 Z" fill="url(#iconGradient)"/>
    
    {/* Sparkle/Idea element */}
    <path d="M140,60 L145,50 L150,60 L160,65 L150,70 L145,80 L140,70 L130,65 Z" fill="var(--tw-color-accent-yellow, #FACC15)"/>

    {/* Abstract lines representing text/content */}
    <line x1="80" y1="110" x2="130" y2="110" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <line x1="80" y1="120" x2="140" y2="120" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <line x1="80" y1="130" x2="120" y2="130" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);
