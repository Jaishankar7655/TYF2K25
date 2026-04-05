import { useState, useEffect } from "react";

const pulseKeyframes = `
@keyframes pulse-ring {
  0% { transform: scale(0.8); opacity: 1; }
  100% { transform: scale(2.2); opacity: 0; }
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}
@keyframes slide-up {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes dot-bounce {
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-6px); }
}
`;

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#0a0c10",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Courier New', monospace",
    padding: "24px",
  },
  card: {
    backgroundColor: "#0f1117",
    border: "1px solid #1e2330",
    borderRadius: "16px",
    padding: "48px 40px",
    maxWidth: "480px",
    width: "100%",
    textAlign: "center",
    boxShadow: "0 0 60px rgba(239,68,68,0.06), 0 24px 48px rgba(0,0,0,0.6)",
    animation: "slide-up 0.5s ease forwards",
  },
  iconWrapper: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "32px",
  },
  pulseRing: {
    position: "absolute",
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    border: "2px solid rgba(239,68,68,0.4)",
    animation: "pulse-ring 2s ease-out infinite",
  },
  pulseRing2: {
    position: "absolute",
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    border: "2px solid rgba(239,68,68,0.2)",
    animation: "pulse-ring 2s ease-out infinite 0.6s",
  },
  iconCircle: {
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    backgroundColor: "rgba(239,68,68,0.1)",
    border: "1.5px solid rgba(239,68,68,0.35)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: 1,
  },
  statusBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    backgroundColor: "rgba(239,68,68,0.08)",
    border: "1px solid rgba(239,68,68,0.2)",
    borderRadius: "999px",
    padding: "4px 12px",
    marginBottom: "20px",
    fontSize: "11px",
    letterSpacing: "0.12em",
    color: "#f87171",
    textTransform: "uppercase",
  },
  dot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    backgroundColor: "#ef4444",
    animation: "blink 1.4s ease infinite",
  },
  heading: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#f1f5f9",
    marginBottom: "10px",
    letterSpacing: "-0.3px",
    fontFamily: "Georgia, serif",
  },
  subtext: {
    fontSize: "13.5px",
    color: "#64748b",
    lineHeight: "1.7",
    marginBottom: "32px",
  },
  divider: {
    height: "1px",
    backgroundColor: "#1e2330",
    marginBottom: "28px",
  },
  metaGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginBottom: "32px",
    textAlign: "left",
  },
  metaBox: {
    backgroundColor: "#0a0c10",
    border: "1px solid #1e2330",
    borderRadius: "10px",
    padding: "14px 16px",
  },
  metaLabel: {
    fontSize: "10px",
    color: "#475569",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginBottom: "4px",
  },
  metaValue: {
    fontSize: "13px",
    color: "#94a3b8",
    fontFamily: "'Courier New', monospace",
  },
  metaValueRed: {
    fontSize: "13px",
    color: "#f87171",
    fontFamily: "'Courier New', monospace",
  },
  retryBtn: {
    width: "100%",
    padding: "13px 24px",
    backgroundColor: "transparent",
    border: "1px solid #1e2330",
    borderRadius: "10px",
    color: "#94a3b8",
    fontSize: "13px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "all 0.2s ease",
    marginBottom: "10px",
    letterSpacing: "0.04em",
  },
  primaryBtn: {
    width: "100%",
    padding: "13px 24px",
    backgroundColor: "#ef4444",
    border: "none",
    borderRadius: "10px",
    color: "#fff",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "all 0.2s ease",
    letterSpacing: "0.04em",
  },
  footer: {
    marginTop: "28px",
    fontSize: "11px",
    color: "#334155",
    letterSpacing: "0.05em",
  },
  footerHighlight: {
    color: "#475569",
  },
};

function formatTime(date) {
  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

export default function ServerUnreachable() {
  const [retrying, setRetrying] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [timestamp] = useState(new Date());
  const [btnHover, setBtnHover] = useState(false);
  const [retryHover, setRetryHover] = useState(false);

  const handleRetry = () => {
    if (retrying) return;
    setRetrying(true);
    setTimeout(() => {
      setRetrying(false);
      setRetryCount((c) => c + 1);
    }, 2200);
  };

  return (
    <>
      <style>{pulseKeyframes}</style>
      <div style={styles.page}>
        <div style={styles.card}>
          {/* Icon */}
          <div style={styles.iconWrapper}>
            <div style={styles.pulseRing} />
            <div style={styles.pulseRing2} />
            <div style={styles.iconCircle}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 9v4M12 17h.01"
                  stroke="#ef4444"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M3 3l18 18M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                  stroke="#ef4444"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Badge */}
          <div style={styles.statusBadge}>
            <span style={styles.dot} />
            Service Unavailable
          </div>

          {/* Heading */}
          <h1 style={styles.heading}>Server Unreachable</h1>
          <p style={styles.subtext}>
            Unable to establish a connection with the backend server.
            <br />
            The service may be temporarily down .
          </p>

          <div style={styles.divider} />

          {/* Meta Info */}
          <div style={styles.metaGrid}>
            <div style={styles.metaBox}>
              <div style={styles.metaLabel}>Error Code</div>
              <div style={styles.metaValueRed}>ECONNREFUSED</div>
            </div>
            <div style={styles.metaBox}>
              <div style={styles.metaLabel}>HTTP Status</div>
              <div style={styles.metaValueRed}>503</div>
            </div>
            <div style={styles.metaBox}>
              <div style={styles.metaLabel}>Timestamp</div>
              <div style={styles.metaValue}>{formatTime(timestamp)}</div>
            </div>
            <div style={styles.metaBox}>
              <div style={styles.metaLabel}>Retry Attempts</div>
              <div style={styles.metaValue}>{retryCount} / 3</div>
            </div>
          </div>

          {/* Buttons */}
          <button
            style={{
              ...styles.retryBtn,
              ...(retryHover ? { borderColor: "#334155", color: "#cbd5e1" } : {}),
              opacity: retrying ? 0.5 : 1,
              cursor: retrying ? "not-allowed" : "pointer",
            }}
            onClick={handleRetry}
            onMouseEnter={() => setRetryHover(true)}
            onMouseLeave={() => setRetryHover(false)}
            disabled={retrying}
          >
            {retrying ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ animation: "pulse-ring 0.8s linear infinite" }}>
                  <circle cx="12" cy="12" r="10" stroke="#94a3b8" strokeWidth="2" strokeDasharray="30 10" />
                </svg>
                Attempting to reconnect...
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M1 4v6h6M23 20v-6h-6" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Retry Connection
              </>
            )}
          </button>

          <button
            style={{
              ...styles.primaryBtn,
              ...(btnHover ? { backgroundColor: "#dc2626" } : {}),
            }}
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
            onClick={() => alert("Redirecting to status page...")}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2" />
              <path d="M12 8v4M12 16h.01" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </svg>
            View System Status
          </button>

          {/* Footer */}
          <p style={styles.footer}>
            If the issue persists, contact{" "}
            <span style={styles.footerHighlight}>jaishankar7655@gmail.com</span>
          </p>
        </div>
      </div>
    </>
  );
}
