import { IconBrandWhatsapp, IconChevronDown } from '@tabler/icons-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "url('/assets/Logotipo.jpg')",
        backgroundRepeat: 'repeat',
        backgroundSize: '110px 110px',
        opacity: 0.04,
      }} />
      <div className="absolute inset-0" style={{ background: '#F5E6C8', opacity: 0.97 }} />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none hidden xl:block" style={{
        width: 420, height: 420,
        backgroundImage: "url('/assets/Logotipo.jpg')",
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        opacity: 0.05,
      }} />

      <div className="relative z-10 w-full max-w-[600px] mx-auto px-10 text-center py-24">
        <p className="font-display text-[11px] tracking-[0.32em] mb-8" style={{ color: '#98BE98' }}>
          TERAPEUTA HOLÍSTICA DESDE 2001
        </p>

        <h1 className="text-[32px] font-semibold leading-[1.35] mb-6" style={{ color: '#1E6F30' }}>
          Um espaço de acolhimento<br />
          <span className="italic font-semibold" style={{ color: '#1E6F30' }}>para sua reconexão interior</span>
        </h1>

        <p className="text-[18px] italic leading-[1.8] mb-10" style={{ color: '#98BE98' }}>
          Se você chegou até aqui, algo em você já sabe<br className="hidden sm:block" />
          que é hora de uma mudança.
        </p>

        <p className="text-[16px] leading-[1.8] mb-10" style={{ color: '#4A4A4A' }}>
          Transformar desafios em aprendizados, liberar pesos que não são
          mais seus e abrir espaço para uma vida mais leve e verdadeira.
          <br /><br />
          Caminho ao seu lado com escuta, cuidado e propósito.
        </p>

        <p className="text-[14px] leading-[1.8] mb-14" style={{ color: '#888888' }}>
          Atendimentos somente com horário agendado
        </p>

        <a
          href="https://wa.me/5511957947776"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[15px] tracking-wide pb-0.5 cta-wa-link"
        >
          <IconBrandWhatsapp size={16} />
          Vamos juntas?
        </a>
      </div>

      <a
        href="#atendimentos"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        style={{ color: 'rgba(152,190,152,0.4)' }}
        aria-label="Rolar para baixo"
      >
        <IconChevronDown size={22} />
      </a>
    </section>
  );
}
