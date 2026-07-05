function LoadingSpinner() {
  return (
    <div className="loading-wrapper">
      <div className="spinner-border"
        style={{ color: "var(--color-accent)", width: "2.5rem", height: "2.5rem" }}
        role="status"
      />
    </div>
  )
}

export default LoadingSpinner;