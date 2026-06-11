import Navbar from '@/components/Navbar';
import Link from 'next/link';

const services = [
  { icon: '♈', title: 'Astrologia', desc: 'Mapa natal e trânsitos do dia revelam os ciclos que influenciam sua jornada.' },
  { icon: '✦', title: 'Numerologia Cabalística', desc: 'Decodifique os números que regem seu propósito, alma e expressão no mundo.' },
  { icon: '🌙', title: 'Tarot — Arcanos Maiores', desc: 'Os 22 arcanos iluminam o caminho com mensagens de Luz e Sombra para cada dia.' },
  { icon: '🌟', title: 'Análise Diária', desc: 'Integração dos três sistemas em uma leitura única e personalizada para você.' },
  { icon: '🔮', title: 'Oracle Cards', desc: 'Mensagens do campo espiritual para orientar decisões e ampliar consciência.' },
  { icon: '🌿', title: 'Atendimentos Energéticos', desc: 'Constelação familiar, hipnose e regressão de vidas passadas para cura profunda.' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0d0918]">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-[#0d0918] to-indigo-950 opacity-80" />
        <div className="absolute inset-0 bg-stars opacity-60" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-purple-300 text-sm tracking-widest uppercase mb-4 font-medium">
            Astrologia · Numerologia · Tarot
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Descubra a mensagem<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              do seu dia
            </span>
          </h1>
          <p className="text-purple-200 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            Uma análise profunda e personalizada que integra os três sistemas esotéricos para revelar seus caminhos de Luz e Sombra.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cadastro"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200 shadow-lg shadow-purple-900/50"
            >
              Criar minha conta gratuita
            </Link>
            <Link
              href="#servicos"
              className="border border-purple-400/40 text-purple-300 hover:text-white hover:border-purple-300 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200"
            >
              Conhecer os serviços
            </Link>
          </div>
        </div>

        {/* Decorative orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Sobre */}
      <section id="sobre" className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-purple-400 text-sm tracking-widest uppercase mb-3">Sobre</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Sandrä Costa</h2>
          <div className="glass rounded-2xl p-8 md:p-12 text-purple-200 text-base md:text-lg leading-relaxed space-y-4">
            <p>
              Com anos de experiência nos campos esotérico e terapêutico, Sandrä Costa une <strong className="text-white">Astrologia, Numerologia Cabalística, Tarot e Oracle Cards</strong> a abordagens terapêuticas como Constelação Familiar, Hipnose e Regressão de Vidas Passadas.
            </p>
            <p>
              Atende presencialmente em <strong className="text-white">São Paulo, SP</strong> e online, com foco em mulheres de 30 a 55 anos que buscam clareza, propósito e reconexão com sua essência.
            </p>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="py-24 px-4 bg-gradient-to-b from-transparent to-purple-950/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-purple-400 text-sm tracking-widest uppercase mb-3">O que ofereço</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Serviços & Especialidades</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} className="glass rounded-2xl p-6 hover:border-purple-400/30 transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3 className="text-white font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-purple-300 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronta para descobrir<br />a mensagem do seu dia?
          </h2>
          <p className="text-purple-300 text-lg mb-10">
            Crie sua conta gratuita e acesse sua análise personalizada de Astrologia, Numerologia e Tarot.
          </p>
          <Link
            href="/cadastro"
            className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-10 py-4 rounded-xl font-semibold text-base transition-all duration-200 shadow-lg shadow-purple-900/50"
          >
            Começar agora — é gratuito
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4 text-center text-purple-400 text-sm">
        <p>© {new Date().getFullYear()} Sandrä Costa. Praia Grande & São Paulo, SP.</p>
      </footer>
    </div>
  );
}
