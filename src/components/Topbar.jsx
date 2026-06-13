export default function Topbar({ label, title, description, highlights = [] }) {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">CopyIt</p>
        <h1>{title}</h1>
        <p className="subtext">{description}</p>
      </div>
      {highlights.length > 0 ? (
        <div className="hero-card">
          {highlights.map((text) => (
            <span key={text}>{text}</span>
          ))}
        </div>
      ) : null}
    </header>
  );
}
