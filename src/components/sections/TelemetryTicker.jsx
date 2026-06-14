import { telemetryItems } from '../../data/content';

export default function TelemetryTicker() {
  // Duplicate items for seamless infinite scroll
  const items = [...telemetryItems, ...telemetryItems];

  return (
    <section className="strip" aria-label="Capacidades">
      <div className="strip-label">
        <span className="sd" />SYS · CAPACIDADES
      </div>
      <div className="strip-vp">
        <div className="strip-row">
          {items.map((item, i) => (
            <span className="strip-item" key={`${item}-${i}`}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
