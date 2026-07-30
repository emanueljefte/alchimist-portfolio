import { useEffect, useRef, useState } from 'react';
import { AtSign, Linkedin, Github, Send, MapPin, Clock } from 'lucide-react';
import gsap from 'gsap';
import PageWrapper from '@/src/components/PageWrapper';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const ContactPage = () => {
  const pageRef   = useRef<HTMLDivElement>(null);
  const leftRef   = useRef<HTMLDivElement>(null);
  const rightRef  = useRef<HTMLDivElement>(null);

  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo([leftRef.current, rightRef.current],
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.15 }
      );
    }, pageRef);
    return () => ctx.kill();
  }, []);

  const set = (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');
    // substitui pelo teu endpoint (Resend, EmailJS, Formspree, etc.)
    try {
      await fetch('https://formspree.io/f/SEU_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const inputCls = 'w-full bg-background border border-outline-variant/15 rounded-lg px-4 py-3 text-on-surface font-label text-sm placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary/50 transition-colors';

  return (
    <PageWrapper>
      <div ref={pageRef} className="max-w-7xl mx-auto px-6 py-16">

        {/* cabeçalho */}
        <div className="pb-8 border-b border-outline-variant/10 mb-12">
          <span className="font-mono text-[11px] text-on-surface-variant/40 block mb-2 tracking-widest">
            ⚗ alchimist / contacto
          </span>
          <h1 className="font-headline text-4xl lg:text-5xl font-bold text-on-surface tracking-tight">
            Vamos construir algo real.
          </h1>
        </div>

        <div className="grid lg:grid-cols-[1fr_420px] gap-12">

          {/* ── formulário ── */}
          <div ref={leftRef} style={{ opacity: 0 }} className="flex flex-col gap-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[11px] text-on-surface-variant/50 uppercase tracking-widest">Nome</label>
                <input
                  className={inputCls}
                  placeholder="Emanuel Jefté"
                  value={form.name}
                  onChange={set('name')}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[11px] text-on-surface-variant/50 uppercase tracking-widest">Email</label>
                <input
                  type="email"
                  className={inputCls}
                  placeholder="exemplo@email.com"
                  value={form.email}
                  onChange={set('email')}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[11px] text-on-surface-variant/50 uppercase tracking-widest">Assunto</label>
              <input
                className={inputCls}
                placeholder="Projecto, consultoria, parceria..."
                value={form.subject}
                onChange={set('subject')}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[11px] text-on-surface-variant/50 uppercase tracking-widest">Mensagem</label>
              <textarea
                className={`${inputCls} resize-none min-h-[180px]`}
                placeholder="Conta-me o teu projecto..."
                value={form.message}
                onChange={set('message')}
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={status === 'sending' || status === 'sent'}
              className="flex items-center justify-center gap-2 bg-primary text-on-primary font-headline font-bold py-3.5 rounded-lg text-sm uppercase tracking-wider active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_24px_rgba(232,169,77,0.25)]"
            >
              {status === 'sending' ? (
                <span className="animate-pulse">A enviar...</span>
              ) : status === 'sent' ? (
                '✓ Mensagem enviada'
              ) : (
                <><Send className="w-4 h-4" /> Enviar mensagem</>
              )}
            </button>

            {status === 'error' && (
              <p className="font-mono text-[11px] text-red-400 text-center">
                Erro ao enviar. Tenta pelo email directo.
              </p>
            )}
          </div>

          {/* ── info lateral ── */}
          <div ref={rightRef} style={{ opacity: 0 }} className="flex flex-col gap-6">

            {/* disponibilidade */}
            <div className="p-5 rounded-xl bg-surface border border-outline-variant/10">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="font-mono text-[11px] text-green-400 uppercase tracking-widest">Disponível agora</span>
              </div>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Aberto a freelance, consultoria e projectos de longo prazo.
              </p>
            </div>

            {/* localização / fuso */}
            <div className="p-5 rounded-xl bg-surface border border-outline-variant/10 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-on-surface-variant text-sm">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                Luanda, Angola
              </div>
              <div className="flex items-center gap-3 text-on-surface-variant text-sm">
                <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                WAT — UTC+1 · Remote friendly
              </div>
            </div>

            {/* links directos */}
            <div className="flex flex-col gap-3">
              <a
                href="mailto:emanueldinganijoao13@gmail.com"
                className="flex items-center gap-3 p-4 rounded-xl bg-surface border border-outline-variant/10 hover:border-primary/25 transition-colors group"
              >
                <AtSign className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-mono text-[10px] text-on-surface-variant/40 mb-0.5">email</div>
                  <div className="font-label text-sm text-on-surface group-hover:text-primary transition-colors">
                    emanueldinganijoao13@gmail.com
                  </div>
                </div>
              </a>
              <a
                href="https://linkedin.com/in/teu-perfil"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl bg-surface border border-outline-variant/10 hover:border-primary/25 transition-colors group"
              >
                <Linkedin className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-mono text-[10px] text-on-surface-variant/40 mb-0.5">linkedin</div>
                  <div className="font-label text-sm text-on-surface group-hover:text-primary transition-colors">
                    linkedin.com/in/teu-perfil
                  </div>
                </div>
              </a>
              <a
                href="https://github.com/emanueljefte"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl bg-surface border border-outline-variant/10 hover:border-primary/25 transition-colors group"
              >
                <Github className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-mono text-[10px] text-on-surface-variant/40 mb-0.5">github</div>
                  <div className="font-label text-sm text-on-surface group-hover:text-primary transition-colors">
                    github.com/emanueljefte
                  </div>
                </div>
              </a>
            </div>

          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ContactPage;
