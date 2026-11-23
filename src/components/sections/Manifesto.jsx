export default function Manifesto() {
  return (
    <section className="manifesto" id="manifesto" aria-label="Manifesto">
      <div className="wrap">
        {/* &nbsp; antes do travessão: ele nunca abre uma linha. */}
        <p className="t-manifesto reveal">
          <span className="dim">Planilhas paralelas. Atendimento manual. Decisões no escuro.</span>{' '}
          A Gaussix organiza esse ruído com dados, IA e engenharia&nbsp;— até sobrar o que importa: o próximo passo.
        </p>
      </div>
    </section>
  );
}
