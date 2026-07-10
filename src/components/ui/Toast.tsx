import { TiDelete } from "react-icons/ti";

type Type = "info" | "success" | "error" | "warning";

interface ToastProps {
  id:      number;
  message: string;
  type?:   Type;
  onClose: (id: number) => void;
}

const typeStyles: Record<Type, { bg: string; color: string; border: string }> = {
  success: {
    bg:     "var(--color-success-bg)",
    color:  "var(--color-success-text)",
    border: "var(--color-success-border)",
  },
  error: {
    bg:     "var(--color-danger-bg)",
    color:  "var(--color-danger-text)",
    border: "var(--color-danger-border)",
  },
  warning: {
    bg:     "var(--color-warning-bg)",
    color:  "var(--color-warning-text)",
    border: "var(--color-warning-border)",
  },
  info: {
    bg:     "var(--color-info-bg)",
    color:  "var(--color-info-text)",
    border: "var(--color-info-border)",
  },
};

function Toast({ id, message="something went wrong!", type = "info", onClose }: ToastProps) {
  const styles = typeStyles[type];

  return (
    <div
      role="alert"
      style={{
        background:    styles.bg,
        color:         styles.color,
        border:        `1px solid ${styles.border}`,
        borderRadius:  "var(--radius-sm)",
        padding:       "12px 16px",
        minWidth:      "280px",
        maxWidth:      "380px",
        display:       "flex",
        alignItems:    "center",
        justifyContent:"space-between",
        gap:           "12px",
        boxShadow:     "var(--shadow-md)",
        fontSize:      "var(--text-sm)",
        fontWeight:    500,
      }}
    >
      <span>{message}</span>
      <TiDelete
        size={20}
        onClick={() => onClose(id)}
        style={{ cursor: "pointer", flexShrink: 0, opacity: 0.7 }}
      />
    </div>
  );
}

export default Toast;