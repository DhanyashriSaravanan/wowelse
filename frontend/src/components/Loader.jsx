/**
 * src/components/Loader.jsx — A spinning loading indicator.
 *
 * WHY: When a form is submitting (register/login), the user should
 * see a spinner so they know something is happening.
 */
export default function Loader() {
  return (
    <div className="loader-container">
      <div className="loader-spinner" />
      <p>Please wait…</p>
    </div>
  );
}
