export default function OptionCard({ text, selected, onClick }) {
  return (
    <button type="button" className={`option-card ${selected ? 'selected' : ''}`} onClick={onClick}>
      {text}
    </button>
  );
}
