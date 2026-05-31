export default function Toast({ message }) {
  return (
    <div className="toast" role="status" aria-live="polite">
      <span className="toast-dot">●</span>
      <span>{message}</span>
    </div>
  );
}
