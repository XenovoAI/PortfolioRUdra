import { type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  MoveRight,
  Sparkles,
  X,
} from 'lucide-react';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const projects = [
  {
    id: '01',
    title: 'Ecommerce websites',
    type: 'Web design / development',
    description: 'Clean, responsive online storefronts that make it easier for customers to explore products and take action.',
    tone: 'sage',
    tags: ['Ecommerce', 'Responsive', 'UI design'],
  },
  {
    id: '02',
    title: 'GFX work',
    type: 'Graphic design / visual work',
    description: 'Visual experiments, digital graphics, and design pieces built to give ideas a strong and memorable presence.',
    tone: 'tomato',
    tags: ['Graphics', 'Composition', 'Visuals'],
  },
  {
    id: '03',
    title: 'Code meets hardware',
    type: 'Technical foundation',
    description: 'Small projects and experiments that bring together programming fundamentals, problem solving, and hardware curiosity.',
    tone: 'mist',
    tags: ['Python', 'C / C++', 'DSA basics'],
  },
];

const capabilities = [
  ['01', 'Graphic design', 'Creating clear, expressive visuals for digital projects, GFX work, and personal brands.'],
  ['02', 'Ecommerce websites', 'Designing responsive online stores that keep products easy to discover and simple to browse.'],
  ['03', 'Programming basics', 'Working with Python, C, and C++ while building a practical foundation in data structures and algorithms.'],
  ['04', 'Hardware curiosity', 'Exploring how software, devices, and hardware work together through hands-on learning.'],
];

function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>('.reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.12 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
}

function SectionLabel({ number, children }: { number: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[var(--ink)]">
      <span className="eyebrow text-[var(--tomato)]">{number}</span>
      <span className="h-px w-8 bg-[var(--tomato)]" />
      <span className="eyebrow">{children}</span>
    </div>
  );
}

function ProjectArtwork({ tone, id }: { tone: string; id: string }) {
  return (
    <div className={`relative h-[265px] overflow-hidden rounded-[1.25rem] ${tone === 'sage' ? 'bg-[var(--lime)]' : tone === 'tomato' ? 'bg-[var(--tomato)]' : 'bg-[var(--mist)]'}`}>
      <div className="absolute inset-0 opacity-35" style={{ backgroundImage: 'linear-gradient(120deg, transparent 0 47%, rgba(27,55,49,.15) 48% 49%, transparent 50%), linear-gradient(25deg, transparent 0 70%, rgba(27,55,49,.1) 71% 72%, transparent 73%)' }} />
      {id === '01' && (
        <>
          <div className="absolute left-[12%] top-[18%] h-28 w-28 rounded-full border-[18px] border-[var(--ink)]" />
          <div className="absolute bottom-[13%] right-[15%] h-24 w-24 rotate-45 bg-[var(--tomato)]" />
          <div className="absolute bottom-[17%] left-[15%] font-display text-[4.7rem] leading-none text-[var(--ink)]">cg</div>
        </>
      )}
      {id === '02' && (
        <>
          <div className="absolute -right-5 -top-10 h-72 w-44 rotate-[24deg] rounded-[50%] border-[16px] border-[var(--ink)]" />
          <div className="absolute bottom-8 left-8 h-28 w-28 rounded-full bg-[var(--ink)]" />
          <p className="absolute bottom-7 left-11 font-mono-custom text-xs uppercase tracking-[.2em] text-[var(--tomato)]">stay up late</p>
        </>
      )}
      {id === '03' && (
        <>
          <div className="hero-orbit absolute left-[18%] top-[8%] h-52 w-52 rounded-full border border-[var(--ink)]">
            <div className="absolute -right-2 top-1/2 h-4 w-4 rounded-full bg-[var(--tomato)]" />
          </div>
          <div className="absolute bottom-8 right-12 h-32 w-32 rounded-full bg-[var(--ink)]" />
          <div className="absolute bottom-[69px] right-[61px] h-14 w-14 rounded-full bg-[var(--mist)]" />
        </>
      )}
      <span className="absolute right-5 top-5 font-mono-custom text-xs text-[var(--ink)]">selected / {id}</span>
    </div>
  );
}

function IntroOverlay({ onFinish }: { onFinish: () => void }) {
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const closeDelay = reducedMotion ? 850 : 2450;
    const closeTimer = window.setTimeout(() => setClosing(true), closeDelay);
    const finishTimer = window.setTimeout(onFinish, closeDelay + (reducedMotion ? 20 : 700));

    return () => {
      window.clearTimeout(closeTimer);
      window.clearTimeout(finishTimer);
    };
  }, [onFinish]);

  const skipIntro = () => {
    setClosing(true);
    window.setTimeout(onFinish, 700);
  };

  return (
    <div className={`intro-overlay ${closing ? 'intro-overlay--closing' : ''}`} role="dialog" aria-label="Patel Rudra portfolio intro" data-testid="intro-overlay">
      <div className="intro-grid" aria-hidden="true" />
      <div className="intro-orbit intro-orbit--outer" aria-hidden="true" />
      <div className="intro-orbit intro-orbit--inner" aria-hidden="true" />
      <div className="intro-wordmark">
        <div className="intro-mark">R</div>
        <p className="intro-name">Patel Rudra<span>.</span></p>
        <p className="intro-role">Graphic design · ecommerce · GFX</p>
      </div>
      <div className="intro-progress" aria-hidden="true"><span /></div>
      <button type="button" onClick={skipIntro} className="intro-skip" data-testid="button-skip-intro">Skip intro <ArrowUpRight size={14} /></button>
    </div>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [introVisible, setIntroVisible] = useState(true);
  useReveal();

  const closeMenu = () => setMenuOpen(false);
  const copyEmail = async () => {
    await navigator.clipboard?.writeText('rudraptel8@gmail.com');
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <>
      {introVisible && <IntroOverlay onFinish={() => setIntroVisible(false)} />}
      <main className="portfolio-noise min-h-[100dvh] bg-[var(--paper)] text-[var(--ink)]">
      <header className="fixed left-0 right-0 top-0 z-20 border-b border-[var(--ink)]/10 bg-[var(--paper)]/90 backdrop-blur-md">
        <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <a href="#top" onClick={closeMenu} className="group flex items-center gap-3" data-testid="link-brand">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--ink)] font-display text-lg text-[var(--paper)]">R</span>
            <span className="text-sm font-semibold tracking-[-.02em]">Patel Rudra<span className="text-[var(--tomato)]">.</span></span>
          </a>
          <nav className={`${menuOpen ? 'flex' : 'hidden'} absolute left-4 right-4 top-[84px] flex-col gap-6 rounded-2xl border border-[var(--ink)]/15 bg-[var(--paper)] p-6 shadow-lg md:static md:flex md:flex-row md:items-center md:gap-8 md:border-0 md:bg-transparent md:p-0 md:shadow-none`} aria-label="Main navigation">
            <a href="#work" onClick={closeMenu} className="line-link text-sm text-[var(--ink)]/75 hover:text-[var(--ink)]" data-testid="link-work">Selected work</a>
            <a href="#about" onClick={closeMenu} className="line-link text-sm text-[var(--ink)]/75 hover:text-[var(--ink)]" data-testid="link-about">About</a>
            <a href="#contact" onClick={closeMenu} className="line-link text-sm text-[var(--ink)]/75 hover:text-[var(--ink)]" data-testid="link-contact">Contact</a>
            <a href="mailto:rudraptel8@gmail.com" className="flex items-center gap-2 text-sm font-semibold md:ml-2" data-testid="link-email">Let&apos;s talk <ArrowUpRight size={15} /></a>
          </nav>
          <button type="button" onClick={() => setMenuOpen(!menuOpen)} className="grid h-10 w-10 place-items-center rounded-full border border-[var(--ink)]/20 md:hidden" aria-label={menuOpen ? 'Close menu' : 'Open menu'} data-testid="button-mobile-menu">
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </header>

      <section id="top" className="relative mx-auto flex min-h-[820px] max-w-[1240px] items-center px-5 pb-20 pt-36 sm:px-8 lg:min-h-[900px] lg:px-12">
        <div className="relative z-10 max-w-[760px]">
          <div className="reveal flex items-center gap-3 text-sm font-medium text-[var(--tomato)]">
            <span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--tomato)] opacity-40" /><span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--tomato)]" /></span>
            Available for graphic design & web projects
          </div>
          <h1 className="reveal reveal-delay-1 mt-8 font-display text-[clamp(4.5rem,12vw,10.8rem)] leading-[.84] tracking-[-.075em]">
             Design<br />
             <span className="ml-[.32em] text-[var(--tomato)]">with</span><br />
             a point<span className="text-[var(--tomato)]">.</span>
          </h1>
          <div className="reveal reveal-delay-2 mt-10 flex max-w-[560px] flex-col gap-6 sm:ml-[18%] sm:flex-row sm:items-end">
            <p className="max-w-[360px] text-lg leading-relaxed text-[var(--ink)]/72">
              I&apos;m Patel Rudra, a graphic designer building expressive visuals, ecommerce websites, and digital work that makes ideas easier to see.
            </p>
            <a href="#work" className="group flex shrink-0 items-center gap-2 text-sm font-semibold" data-testid="link-hero-work">See the work <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--ink)] text-[var(--paper)] transition-transform group-hover:rotate-45"><ArrowDownRight size={18} /></span></a>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-[9%] right-[1%] hidden h-[420px] w-[420px] lg:block">
          <div className="hero-orbit absolute inset-0 rounded-full border border-[var(--ink)]/20" />
          <div className="hero-orbit absolute inset-[13%] rounded-full border border-[var(--tomato)]/40" style={{ animationDirection: 'reverse', animationDuration: '25s' }} />
          <div className="hero-float absolute left-[25%] top-[25%] grid h-52 w-52 rotate-12 place-items-center rounded-[2.5rem] bg-[var(--ink)] text-[var(--paper)] shadow-[14px_16px_0_var(--tomato)]">
            <div className="text-center"><Sparkles className="mx-auto mb-3 text-[var(--lime)]" size={24} /><p className="font-display text-3xl leading-none">make it<br />matter</p><p className="eyebrow mt-4 text-[var(--lime)]">a note to self</p></div>
          </div>
        </div>
        <div className="absolute bottom-8 left-5 hidden items-center gap-3 sm:flex lg:left-12"><span className="h-px w-12 bg-[var(--ink)]/40" /><span className="eyebrow text-[var(--ink)]/55">scroll to wander</span></div>
      </section>

      <div className="overflow-hidden border-y border-[var(--ink)] bg-[var(--tomato)] py-4 text-[var(--ink)]">
        <div className="flex min-w-max items-center gap-8 font-display text-2xl italic">
           <span>Good design makes ideas easier to see</span><span className="text-lg">+</span><span>Good design makes ideas easier to see</span><span className="text-lg">+</span><span>Good design makes ideas easier to see</span>
        </div>
      </div>

      <section id="work" className="mx-auto max-w-[1240px] px-5 py-28 sm:px-8 lg:px-12 lg:py-36">
        <div className="reveal flex flex-col justify-between gap-8 md:flex-row md:items-end">
           <div><SectionLabel number="01">Selected work</SectionLabel><h2 className="mt-6 max-w-[700px] font-display text-5xl leading-[.95] tracking-[-.055em] sm:text-7xl">A few things I&apos;ve<br /><em className="text-[var(--tomato)]">made and explored.</em></h2></div>
           <p className="max-w-[260px] text-sm leading-relaxed text-[var(--ink)]/60">A collection of ecommerce website concepts, graphic design work, and technical experiments.</p>
        </div>
        <div className="mt-16 grid gap-12 md:grid-cols-12 md:gap-x-7 md:gap-y-24">
          {projects.map((project, index) => (
            <article key={project.id} className={`reveal reveal-delay-${index + 1} group ${index === 0 ? 'md:col-span-7' : index === 1 ? 'md:col-span-5 md:mt-24' : 'md:col-span-8 md:col-start-3'}`}>
              <a href="#contact" className="work-card block" data-testid={`card-project-${project.id}`}>
                <ProjectArtwork tone={project.tone} id={project.id} />
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div><p className="eyebrow text-[var(--tomato)]">{project.type}</p><h3 className="mt-2 font-display text-4xl tracking-[-.04em]">{project.title}</h3></div>
                  <span className="work-arrow mt-2 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--ink)]"><ArrowUpRight size={17} /></span>
                </div>
                <p className="mt-3 max-w-[440px] text-sm leading-relaxed text-[var(--ink)]/65">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">{project.tags.map((tag) => <span key={tag} className="rounded-full border border-[var(--ink)]/20 px-3 py-1 font-mono-custom text-[10px] uppercase tracking-[.08em]">{tag}</span>)}</div>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[var(--ink)] text-[var(--paper)]">
        <div className="mx-auto max-w-[1240px] px-5 py-28 sm:px-8 lg:px-12 lg:py-36">
          <div className="reveal grid gap-12 md:grid-cols-12">
             <div className="md:col-span-4"><SectionLabel number="02">What I do</SectionLabel><p className="mt-8 max-w-[260px] text-sm leading-relaxed text-[var(--paper)]/60">I combine visual thinking with a growing technical foundation to turn ideas into clear, useful work.</p></div>
            <div className="md:col-span-8">
              {capabilities.map(([number, title, description], index) => (
                <div key={number} className={`group flex flex-col gap-4 border-t border-[var(--paper)]/20 py-7 transition-colors hover:border-[var(--tomato)] sm:flex-row sm:items-start ${index === capabilities.length - 1 ? 'border-b' : ''}`}>
                  <span className="font-mono-custom text-xs text-[var(--tomato)]">{number}</span><h3 className="min-w-[190px] font-display text-3xl tracking-[-.03em]">{title}</h3><p className="max-w-[320px] text-sm leading-relaxed text-[var(--paper)]/60 sm:ml-auto">{description}</p><MoveRight className="hidden text-[var(--tomato)] transition-transform group-hover:translate-x-2 sm:block" size={19} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-[1240px] px-5 py-28 sm:px-8 lg:px-12 lg:py-36">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
           <div className="reveal lg:col-span-5"><SectionLabel number="03">A little context</SectionLabel><h2 className="mt-6 font-display text-6xl leading-[.9] tracking-[-.06em] sm:text-8xl">The person<br /><span className="ml-[.5em] text-[var(--tomato)]">behind</span><br />the pixels.</h2></div>
          <div className="reveal reveal-delay-1 lg:col-span-6 lg:col-start-7 lg:pt-16">
             <p className="font-display text-3xl leading-[1.12] tracking-[-.03em] sm:text-4xl">I believe good design is where a clear idea, a strong visual, and a useful experience meet.</p>
             <p className="mt-8 max-w-[500px] text-base leading-[1.8] text-[var(--ink)]/68">I&apos;m Patel Rudra, a graphic designer interested in ecommerce websites, GFX work, programming, and the practical details that make digital work feel complete.</p>
            <a href="#contact" className="mt-8 inline-flex items-center gap-2 border-b border-[var(--ink)] pb-2 text-sm font-semibold" data-testid="link-about-contact">Start a conversation <ArrowUpRight size={15} /></a>
          </div>
        </div>
        <div className="reveal reveal-delay-2 mt-28 grid border-t border-[var(--ink)]/20 pt-8 sm:grid-cols-3">
           <div><p className="eyebrow text-[var(--tomato)]">Experience</p><p className="mt-3 text-sm">Graphic designing<br />Visual communication & GFX</p></div>
           <div className="mt-8 sm:mt-0"><p className="eyebrow text-[var(--tomato)]">Skills</p><p className="mt-3 text-sm">Python · C · C++<br />DSA basics · hardware</p></div>
           <div className="mt-8 sm:mt-0"><p className="eyebrow text-[var(--tomato)]">Focus</p><p className="mt-3 text-sm">Ecommerce websites<br />Graphic design projects</p></div>
        </div>
      </section>

      <section className="border-y border-[var(--ink)]/15 bg-[var(--mist)]">
        <div className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 lg:px-12 lg:py-28">
          <div className="reveal grid gap-10 md:grid-cols-12 md:items-center">
            <div className="md:col-span-3"><SectionLabel number="04">A nice note</SectionLabel></div>
             <blockquote className="md:col-span-8 md:col-start-5"><p className="font-display text-4xl leading-[1.06] tracking-[-.04em] sm:text-6xl">“Good work should look clear, feel intentional, and make people curious to see more.”</p><footer className="mt-7 flex items-center gap-3 text-sm"><span className="h-8 w-8 rounded-full bg-[var(--tomato)]" /><span><strong>Patel Rudra</strong><br /><span className="text-[var(--ink)]/60">Graphic designer & creative learner</span></span></footer></blockquote>
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-[1240px] px-5 py-28 sm:px-8 lg:px-12 lg:py-40">
        <div className="reveal relative overflow-hidden rounded-[2rem] bg-[var(--tomato)] px-7 py-14 sm:px-14 sm:py-20">
           <div className="relative z-10 max-w-[780px]"><SectionLabel number="05">Let&apos;s connect</SectionLabel><h2 className="mt-7 font-display text-6xl leading-[.88] tracking-[-.06em] sm:text-8xl">Have a project<br /><span className="ml-[.35em]">in mind?</span></h2><p className="mt-8 max-w-[420px] text-base leading-relaxed text-[var(--ink)]/75">Tell me about your ecommerce website, GFX idea, or the next thing you&apos;re learning. I&apos;d love to hear it.</p><div className="mt-9 flex flex-wrap items-center gap-5"><a href="mailto:rudraptel8@gmail.com" className="inline-flex items-center gap-3 rounded-full bg-[var(--ink)] px-6 py-3.5 text-sm font-semibold text-[var(--paper)] transition-transform hover:-translate-y-1" data-testid="button-send-email">rudraptel8@gmail.com <ArrowUpRight size={17} /></a><button type="button" onClick={copyEmail} className="inline-flex items-center gap-2 text-sm font-semibold" data-testid="button-copy-email">{copied ? <><Check size={16} /> copied</> : <><Mail size={16} /> copy email</>}</button></div></div>
          <div className="absolute -bottom-32 -right-16 h-80 w-80 rounded-full border-[40px] border-[var(--ink)]/10 sm:-right-10 sm:-top-24 sm:bottom-auto sm:h-[440px] sm:w-[440px]" /><div className="absolute bottom-9 right-10 hidden rotate-12 font-display text-8xl text-[var(--ink)]/10 sm:block">hi</div>
        </div>
      </section>

      <footer className="border-t border-[var(--ink)]/15">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-8 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
           <div className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--ink)] font-display text-sm text-[var(--paper)]">R</span><span className="text-sm">Patel Rudra<span className="text-[var(--tomato)]">.</span></span></div>
           <p className="font-mono-custom text-[10px] uppercase tracking-[.12em] text-[var(--ink)]/50">Graphic designer · ecommerce & GFX · © 2025</p>
          <div className="flex items-center gap-4"><a href="https://www.instagram.com/r_p_360/" target="_blank" rel="noreferrer" aria-label="Instagram @r_p_360" className="transition-colors hover:text-[var(--tomato)]" data-testid="link-instagram"><Instagram size={17} /></a><a href="https://www.linkedin.com/in/patel-rudra-5a23222b1?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-[var(--tomato)]" data-testid="link-linkedin"><Linkedin size={17} /></a><a href="#top" className="ml-2 grid h-9 w-9 place-items-center rounded-full border border-[var(--ink)]/20 transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)]" aria-label="Back to top" data-testid="link-back-to-top"><ChevronDown className="rotate-180" size={17} /></a></div>
        </div>
      </footer>
      </main>
    </>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;