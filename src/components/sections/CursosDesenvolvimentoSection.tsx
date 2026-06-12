import { IconClock } from '@tabler/icons-react';

export default function CursosDesenvolvimentoSection() {
  return (
    <section id="cursos-desenvolvimento" className="py-24 px-4 bg-[#f5fbf5]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-bold mb-4" style={{ color: '#1E6F30' }}>
            Cursos de Desenvolvimento Pessoal
          </h2>
        </div>

        <hr className="divider-green mb-14" />

        <div className="max-w-lg mx-auto text-center">
          <div className="card-site p-12 flex flex-col items-center gap-5">
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: '#f0faf0', border: '2px solid #98BE98' }}>
              <IconClock size={30} style={{ color: '#6CC24A' }} />
            </div>
            <h3 className="font-bold" style={{ color: '#1E6F30' }}>Em Breve</h3>
            <p className="text-base leading-relaxed" style={{ color: '#000000' }}>
              Novos cursos de desenvolvimento pessoal estão sendo preparados com muito cuidado.
            </p>
            <p className="font-semibold" style={{ color: '#1E6F30' }}>Em Breve Novidades</p>
          </div>
        </div>
      </div>
    </section>
  );
}
