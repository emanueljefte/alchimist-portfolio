import type { Project } from '@/src/components/ProjectDetail';
import edificaquizImg from '@/src/assets/images/edificaquiz.png';

// adiciona os outros imports de imagem aqui
// import kwanzaImg from '@/assets/images/meu_kwanza_controlado.png';

export const projects: Project[] = [
  {
    id: 'edificaquiz',
    index: 1,
    title: 'EdificaQuiz',
    tagline: 'Transformar o estudo em experiência de vida — o companheiro digital de cada aluno da Escola da Edificação.',
    desc: 'App mobile de quizzes para alunos da Escola da Edificação.',
    badge: 'Versão 1.0.4 lançada',
    badgeType: 'released',
    tags: ['React Native', 'TypeScript', 'Drizzle', 'SQLite', 'Expo'],
    heroImg: edificaquizImg,
    screenshots: [
      // { src: edificaquizScreen1, label: 'Ecrã inicial' },
    ],
    problem: 'Os alunos da Escola da Edificação não tinham forma de estudar de modo interactivo fora das aulas. O conteúdo existia apenas em papel — sem acesso offline, sem feedback imediato, sem acompanhamento do progresso.',
    solution: 'Uma app mobile com quizzes por tema, progresso persistido localmente e funcionamento 100% offline. Escolhi SQLite com Drizzle para eliminar a dependência de rede — o aluno estuda mesmo sem dados móveis.',
    codeSnippet: {
      filename: 'db/progress.ts',
      code: `// progresso persistido localmente — sem rede
const db = drizzle(client);

await db.insert(progress).values({
  userId: user.id,
  quizId: quiz.id,
  score: result.score,
  completedAt: new Date(),
}).onConflictDoUpdate({
  target: [progress.userId, progress.quizId],
  set: { score: result.score, completedAt: new Date() },
});`,
    },
    highlights: [
      {
        icon: '🗄️',
        title: 'Drizzle + SQLite',
        desc: 'Offline-first por design. Prisma não corre em React Native — Drizzle foi a escolha certa.',
      },
      {
        icon: '🧭',
        title: 'Expo Router',
        desc: 'Navegação baseada em ficheiros com deep links para partilhar quizzes entre alunos.',
      },
      {
        icon: '⚡',
        title: 'Migrações automáticas',
        desc: 'useMigrations do Drizzle garante que o schema está sempre actualizado sem intervenção.',
      },
      {
        icon: '🎨',
        title: 'TypeScript estrito',
        desc: 'Schema tipado end-to-end — da base de dados ao componente sem um único any.',
      },
    ],
    metrics: [
      { value: '1.0.4', label: 'versão actual' },
      { value: '100%', label: 'offline' },
      { value: '0',    label: 'dependências cloud' },
    ],
    result: 'Aplicação em uso activo na Escola da Edificação. Quatro versões lançadas desde o início do projecto, com feedback real dos alunos a guiar cada iteração.',
    repoUrl: 'https://github.com/emanueljefte/edificaquiz',
  },

  {
    id: 'meu-kwanza-controlado',
    index: 2,
    title: 'Meu Kwanza Controlado',
    tagline: 'Gere o seu dinheiro de uma forma mais inteligente.',
    desc: 'App de gestão financeira pessoal para o mercado angolano.',
    badge: 'Versão de testes',
    badgeType: 'beta',
    tags: ['React Native', 'TypeScript', 'Drizzle', 'SQLite', 'Express', 'PostgreSQL'],
    heroImg: '', // kwanzaImg
    screenshots: [],
    problem: '',
    solution: '',
    highlights: [],
    metrics: [],
    result: '',
  },

  {
    id: 'mlo',
    index: 3,
    title: 'MLO — Logística de Passageiros',
    tagline: 'Sistema inteligente de gestão logística para transporte executivo em tempo real.',
    desc: 'Plataforma de gestão de transporte executivo com optimização de rotas.',
    badge: 'Em construção',
    badgeType: 'wip',
    tags: ['React Native', 'Node.js', 'PostgreSQL'],
    heroImg: '',
    screenshots: [],
    problem: '',
    solution: '',
    highlights: [],
    metrics: [],
    result: '',
  },
];
