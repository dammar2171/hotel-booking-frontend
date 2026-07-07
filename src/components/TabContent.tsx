import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useToast } from "../contexts/ToastContext";
import api from "../api/axios";
import type { User } from "../types";

interface ProfileForm {
  name:  string;
  email: string;
}

interface PasswordForm {
  currentPassword: string;
  newPassword:     string;
  confirmPassword: string;
}
type ActiveTab = "profile" | "password" | "appearance" | "about";
interface Card {
  background: string;
  border: string;
  borderRadius: string;
  overflow: string;
  boxShadow: string;
}

interface   TabContentProps {
  activeTab: ActiveTab;
  setActiveTab: React.Dispatch<React.SetStateAction<ActiveTab>>;
  card: Card;
  user:User | null;
}
function TabContent({activeTab,setActiveTab,card,user}:TabContentProps) {
  const { theme, themeToggle } = useTheme();
  const { addToast }           = useToast();
  const [submittingProfile,  setSubmittingProfile]  = useState(false);
    const [submittingPassword, setSubmittingPassword] =useState(false);

    const [profileForm, setProfileForm] = useState<ProfileForm>({
    name:  user?.name  ?? "",
    email: user?.email ?? "",
  });

  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    currentPassword: "",
    newPassword:     "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    newPass: false,
    confirm: false,
  });

  // ── Handle profile change ────────────────
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ── Handle password change ───────────────
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ── Submit profile ───────────────────────
  const handleProfileSubmit = async () => {
    if (!profileForm.name || !profileForm.email) {
      addToast("All fields are required", "error");
      return;
    }
    setSubmittingProfile(true);
    try {
      await api.put(`/users/${user?.id}`, profileForm);
      addToast("Profile updated successfully!", "success");
    } catch (err: any) {
      addToast(
        err?.response?.data?.message || "Update failed",
        "error"
      );
    } finally {
      setSubmittingProfile(false);
    }
  };

  // ── Submit password ──────────────────────
  const handlePasswordSubmit = async () => {
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      addToast("All fields are required", "error");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      addToast("New password must be at least 6 characters", "error");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      addToast("New passwords do not match", "error");
      return;
    }
    setSubmittingPassword(true);
    try {
      await api.put(`auth/${user?.id}/password`, {
        currentPassword: passwordForm.currentPassword,
        newPassword:     passwordForm.newPassword,
      });
      addToast("Password changed successfully!", "success");
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err: any) {
      addToast(
        err?.response?.data?.message || "Password change failed",
        "error"
      );
    } finally {
      setSubmittingPassword(false);
    }
  };
  return (
      <div className="col-lg-9">

          {/* ── PROFILE TAB ──────────────── */}
          {activeTab === "profile" && (
            <div style={card}>
              <div style={{
                padding:      "20px 24px",
                borderBottom: "1px solid var(--color-border)",
                background:   "var(--color-bg-tertiary)",
              }}>
                <h5 style={{
                  fontWeight: 700,
                  color:      "var(--color-text-primary)",
                  margin:     0,
                }}>
                  👤 Profile Information
                </h5>
                <p style={{
                  color:     "var(--color-text-muted)",
                  fontSize:  "var(--text-xs)",
                  marginTop: "4px",
                  margin:    "4px 0 0",
                }}>
                  Update your name and email address
                </p>
              </div>

              <div style={{ padding: "28px 24px" }}>
                <div style={{
                  display:       "flex",
                  flexDirection: "column",
                  gap:           "20px",
                  maxWidth:      "480px",
                }}>

                  {/* Name */}
                  <div>
                    <label style={{
                      display:      "block",
                      fontSize:     "var(--text-sm)",
                      fontWeight:   600,
                      color:        "var(--color-text-secondary)",
                      marginBottom: "6px",
                    }}>
                      Full Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      value={profileForm.name}
                      onChange={handleProfileChange}
                      className="custom-input"
                      placeholder="Your full name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label style={{
                      display:      "block",
                      fontSize:     "var(--text-sm)",
                      fontWeight:   600,
                      color:        "var(--color-text-secondary)",
                      marginBottom: "6px",
                    }}>
                      Email Address
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={profileForm.email}
                      onChange={handleProfileChange}
                      className="custom-input"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Role — read only */}
                  <div>
                    <label style={{
                      display:      "block",
                      fontSize:     "var(--text-sm)",
                      fontWeight:   600,
                      color:        "var(--color-text-secondary)",
                      marginBottom: "6px",
                    }}>
                      Role
                    </label>
                    <div style={{
                      padding:      "10px 14px",
                      background:   "var(--color-bg-tertiary)",
                      border:       "1px solid var(--color-border)",
                      borderRadius: "var(--radius-sm)",
                      fontSize:     "var(--text-sm)",
                      color:        "var(--color-text-muted)",
                      display:      "flex",
                      alignItems:   "center",
                      gap:          "8px",
                    }}>
                      🔒
                      <span style={{ textTransform: "capitalize" }}>
                        {user?.role}
                      </span>
                      <span style={{
                        fontSize:  "var(--text-xs)",
                        color:     "var(--color-text-placeholder)",
                        marginLeft:"auto",
                      }}>
                        Cannot be changed
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleProfileSubmit}
                    disabled={submittingProfile}
                    style={{
                      background:   "var(--color-accent)",
                      border:       "none",
                      borderRadius: "var(--radius-sm)",
                      padding:      "11px 24px",
                      cursor:       submittingProfile ? "not-allowed" : "pointer",
                      color:        "var(--color-accent-text)",
                      fontWeight:   600,
                      fontSize:     "var(--text-sm)",
                      opacity:      submittingProfile ? 0.7 : 1,
                      alignSelf:    "flex-start",
                      transition:   "var(--transition-fast)",
                    }}
                  >
                    {submittingProfile ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── PASSWORD TAB ─────────────── */}
          {activeTab === "password" && (
            <div style={card}>
              <div style={{
                padding:      "20px 24px",
                borderBottom: "1px solid var(--color-border)",
                background:   "var(--color-bg-tertiary)",
              }}>
                <h5 style={{
                  fontWeight: 700,
                  color:      "var(--color-text-primary)",
                  margin:     0,
                }}>
                  🔒 Change Password
                </h5>
                <p style={{
                  color:     "var(--color-text-muted)",
                  fontSize:  "var(--text-xs)",
                  margin:    "4px 0 0",
                }}>
                  Make sure to use a strong password
                </p>
              </div>

              <div style={{ padding: "28px 24px" }}>
                <div style={{
                  display:       "flex",
                  flexDirection: "column",
                  gap:           "20px",
                  maxWidth:      "480px",
                }}>

                  {[
                    {
                      name:        "currentPassword",
                      label:       "Current Password",
                      showKey:     "current" as const,
                      placeholder: "Enter current password",
                    },
                    {
                      name:        "newPassword",
                      label:       "New Password",
                      showKey:     "newPass" as const,
                      placeholder: "Min. 6 characters",
                    },
                    {
                      name:        "confirmPassword",
                      label:       "Confirm New Password",
                      showKey:     "confirm" as const,
                      placeholder: "Repeat new password",
                    },
                  ].map((field) => (
                    <div key={field.name}>
                      <label style={{
                        display:      "block",
                        fontSize:     "var(--text-sm)",
                        fontWeight:   600,
                        color:        "var(--color-text-secondary)",
                        marginBottom: "6px",
                      }}>
                        {field.label}
                      </label>
                      <div style={{ position: "relative" }}>
                        <input
                          name={field.name}
                          type={showPasswords[field.showKey] ? "text" : "password"}
                          value={passwordForm[field.name as keyof PasswordForm]}
                          onChange={handlePasswordChange}
                          className="custom-input"
                          placeholder={field.placeholder}
                          style={{ paddingRight: "44px" }}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowPasswords((prev) => ({
                              ...prev,
                              [field.showKey]: !prev[field.showKey],
                            }))
                          }
                          style={{
                            position:   "absolute",
                            right:      "12px",
                            top:        "50%",
                            transform:  "translateY(-50%)",
                            background: "transparent",
                            border:     "none",
                            cursor:     "pointer",
                            color:      "var(--color-text-muted)",
                            fontSize:   "1rem",
                            padding:    "0",
                          }}
                        >
                          {showPasswords[field.showKey] ? "🙈" : "👁️"}
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Password rules */}
                  <div style={{
                    background:   "var(--color-info-bg)",
                    border:       "1px solid var(--color-info-border)",
                    borderRadius: "var(--radius-sm)",
                    padding:      "12px 16px",
                  }}>
                    <div style={{
                      fontSize:     "var(--text-xs)",
                      fontWeight:   600,
                      color:        "var(--color-info-text)",
                      marginBottom: "6px",
                    }}>
                      Password Requirements:
                    </div>
                    {[
                      "Minimum 6 characters",
                      "New password must be different from current",
                      "Confirm password must match new password",
                    ].map((rule) => (
                      <div key={rule} style={{
                        display:    "flex",
                        alignItems: "center",
                        gap:        "6px",
                        fontSize:   "var(--text-xs)",
                        color:      "var(--color-info-text)",
                        marginTop:  "4px",
                      }}>
                        <span>•</span>
                        <span>{rule}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handlePasswordSubmit}
                    disabled={submittingPassword}
                    style={{
                      background:   "var(--color-accent)",
                      border:       "none",
                      borderRadius: "var(--radius-sm)",
                      padding:      "11px 24px",
                      cursor:       submittingPassword ? "not-allowed" : "pointer",
                      color:        "var(--color-accent-text)",
                      fontWeight:   600,
                      fontSize:     "var(--text-sm)",
                      opacity:      submittingPassword ? 0.7 : 1,
                      alignSelf:    "flex-start",
                      transition:   "var(--transition-fast)",
                    }}
                  >
                    {submittingPassword ? "Changing..." : "Change Password"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── APPEARANCE TAB ───────────── */}
          {activeTab === "appearance" && (
            <div style={card}>
              <div style={{
                padding:      "20px 24px",
                borderBottom: "1px solid var(--color-border)",
                background:   "var(--color-bg-tertiary)",
              }}>
                <h5 style={{
                  fontWeight: 700,
                  color:      "var(--color-text-primary)",
                  margin:     0,
                }}>
                  🎨 Appearance
                </h5>
                <p style={{
                  color:     "var(--color-text-muted)",
                  fontSize:  "var(--text-xs)",
                  margin:    "4px 0 0",
                }}>
                  Customize how the dashboard looks
                </p>
              </div>

              <div style={{ padding: "28px 24px" }}>

                {/* Theme toggle */}
                <div style={{
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "space-between",
                  padding:        "20px",
                  background:     "var(--color-bg-tertiary)",
                  borderRadius:   "var(--radius-md)",
                  border:         "1px solid var(--color-border)",
                  marginBottom:   "16px",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <div style={{
                      width:         "44px",
                      height:        "44px",
                      borderRadius:  "var(--radius-md)",
                      background:    "var(--color-accent-light)",
                      display:       "flex",
                      alignItems:    "center",
                      justifyContent:"center",
                      fontSize:      "1.3rem",
                    }}>
                      {theme === "light" ? "☀️" : "🌙"}
                    </div>
                    <div>
                      <div style={{
                        fontWeight: 600,
                        color:      "var(--color-text-primary)",
                        fontSize:   "var(--text-sm)",
                      }}>
                        {theme === "light" ? "Light Mode" : "Dark Mode"}
                      </div>
                      <div style={{
                        color:    "var(--color-text-muted)",
                        fontSize: "var(--text-xs)",
                        marginTop:"2px",
                      }}>
                        {theme === "light"
                          ? "Switch to dark for a better night experience"
                          : "Switch to light for a cleaner look"}
                      </div>
                    </div>
                  </div>

                  {/* Toggle switch */}
                  <div
                    onClick={themeToggle}
                    style={{
                      width:        "48px",
                      height:       "26px",
                      borderRadius: "var(--radius-full)",
                      background:   theme === "dark"
                        ? "var(--color-accent)"
                        : "var(--color-border-hover)",
                      position:     "relative",
                      cursor:       "pointer",
                      transition:   "var(--transition-base)",
                      flexShrink:   0,
                    }}
                  >
                    <div style={{
                      position:     "absolute",
                      top:          "3px",
                      left:         theme === "dark" ? "25px" : "3px",
                      width:        "20px",
                      height:       "20px",
                      borderRadius: "var(--radius-full)",
                      background:   "#ffffff",
                      transition:   "var(--transition-base)",
                      boxShadow:    "0 1px 3px rgba(0,0,0,0.2)",
                    }} />
                  </div>
                </div>

                {/* Theme preview cards */}
                <div style={{
                  fontSize:     "var(--text-sm)",
                  fontWeight:   600,
                  color:        "var(--color-text-secondary)",
                  marginBottom: "12px",
                }}>
                  Theme Preview
                </div>
                <div className="row g-3">
                  {[
                    {
                      label:   "Light Mode",
                      active:  theme === "light",
                      bg:      "#ffffff",
                      text:    "#1c1917",
                      accent:  "#b45309",
                      border:  "#e7e5e4",
                    },
                    {
                      label:   "Dark Mode",
                      active:  theme === "dark",
                      bg:      "#0f0e0d",
                      text:    "#fafaf9",
                      accent:  "#f59e0b",
                      border:  "#292524",
                    },
                  ].map((t) => (
                    <div key={t.label} className="col-sm-6">
                      <div
                        onClick={themeToggle}
                        style={{
                          background:   t.bg,
                          border:       t.active
                            ? `2px solid var(--color-accent)`
                            : `1px solid ${t.border}`,
                          borderRadius: "var(--radius-md)",
                          padding:      "16px",
                          cursor:       "pointer",
                          transition:   "var(--transition-fast)",
                        }}
                      >
                        {/* Mini navbar preview */}
                        <div style={{
                          height:       "8px",
                          background:   t.bg,
                          border:       `1px solid ${t.border}`,
                          borderRadius: "4px",
                          marginBottom: "8px",
                        }} />
                        {/* Mini content */}
                        <div style={{
                          display:      "flex",
                          gap:          "6px",
                          marginBottom: "6px",
                        }}>
                          {[40, 30, 50].map((w, i) => (
                            <div key={i} style={{
                              height:       "6px",
                              width:        `${w}%`,
                              background:   i === 0 ? t.accent : t.border,
                              borderRadius: "3px",
                            }} />
                          ))}
                        </div>
                        <div style={{
                          height:       "24px",
                          background:   t.border,
                          borderRadius: "4px",
                        }} />
                        <div style={{
                          marginTop:  "8px",
                          fontSize:   "10px",
                          fontWeight: 600,
                          color:      t.active ? t.accent : t.text,
                          opacity:    t.active ? 1 : 0.5,
                        }}>
                          {t.label} {t.active && "✓"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── ABOUT TAB ────────────────── */}
          {activeTab === "about" && (
            <div style={card}>
              <div style={{
                padding:      "20px 24px",
                borderBottom: "1px solid var(--color-border)",
                background:   "var(--color-bg-tertiary)",
              }}>
                <h5 style={{
                  fontWeight: 700,
                  color:      "var(--color-text-primary)",
                  margin:     0,
                }}>
                  ℹ️ About This App
                </h5>
              </div>

              <div style={{ padding: "28px 24px" }}>

                {/* App info */}
                <div style={{
                  display:       "flex",
                  alignItems:    "center",
                  gap:           "20px",
                  padding:       "24px",
                  background:    "var(--color-bg-tertiary)",
                  borderRadius:  "var(--radius-md)",
                  border:        "1px solid var(--color-border)",
                  marginBottom:  "24px",
                }}>
                  <div style={{ fontSize: "3.5rem" }}>🏨</div>
                  <div>
                    <h4 style={{
                      fontWeight: 800,
                      color:      "var(--color-text-primary)",
                      margin:     "0 0 4px",
                    }}>
                      Hotel Booking System
                    </h4>
                    <div style={{
                      color:     "var(--color-text-muted)",
                      fontSize:  "var(--text-sm)",
                    }}>
                      Version 1.0.0
                    </div>
                    <div style={{
                      marginTop:    "8px",
                      display:      "inline-block",
                      background:   "var(--color-success-bg)",
                      color:        "var(--color-success-text)",
                      border:       "1px solid var(--color-success-border)",
                      padding:      "2px 10px",
                      borderRadius: "var(--radius-full)",
                      fontSize:     "var(--text-xs)",
                      fontWeight:   600,
                    }}>
                      ● Live
                    </div>
                  </div>
                </div>

                {/* Tech stack */}
                <div style={{
                  fontSize:     "var(--text-sm)",
                  fontWeight:   600,
                  color:        "var(--color-text-secondary)",
                  marginBottom: "12px",
                }}>
                  Tech Stack
                </div>
                <div className="row g-2 mb-4">
                  {[
                    { name: "React + TypeScript", icon: "⚛️",  color: "var(--color-info-bg)",    text: "var(--color-info-text)" },
                    { name: "Node.js + Express",  icon: "🟢",  color: "var(--color-success-bg)", text: "var(--color-success-text)" },
                    { name: "PostgreSQL",          icon: "🐘",  color: "var(--color-info-bg)",    text: "var(--color-info-text)" },
                    { name: "JWT Auth",            icon: "🔐",  color: "var(--color-warning-bg)", text: "var(--color-warning-text)" },
                    { name: "Bootstrap 5",         icon: "🎨",  color: "var(--color-danger-bg)",  text: "var(--color-danger-text)" },
                    { name: "Chart.js",            icon: "📊",  color: "var(--color-accent-light)", text: "var(--color-accent)" },
                  ].map((tech) => (
                    <div key={tech.name} className="col-sm-6 col-md-4">
                      <div style={{
                        background:   tech.color,
                        borderRadius: "var(--radius-sm)",
                        padding:      "10px 14px",
                        display:      "flex",
                        alignItems:   "center",
                        gap:          "8px",
                        fontSize:     "var(--text-xs)",
                        fontWeight:   600,
                        color:        tech.text,
                      }}>
                        <span>{tech.icon}</span>
                        <span>{tech.name}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Developer info */}
                <div style={{
                  fontSize:     "var(--text-sm)",
                  fontWeight:   600,
                  color:        "var(--color-text-secondary)",
                  marginBottom: "12px",
                }}>
                  Developer
                </div>
                <div style={{
                  padding:      "20px",
                  background:   "var(--color-bg-tertiary)",
                  borderRadius: "var(--radius-md)",
                  border:       "1px solid var(--color-border)",
                  display:      "flex",
                  alignItems:   "center",
                  gap:          "16px",
                }}>
                  <div style={{
                    width:         "48px",
                    height:        "48px",
                    borderRadius:  "var(--radius-full)",
                    background:    "var(--color-accent-light)",
                    border:        "1px solid var(--color-accent-border)",
                    display:       "flex",
                    alignItems:    "center",
                    justifyContent:"center",
                    fontSize:      "1.2rem",
                    fontWeight:    800,
                    color:         "var(--color-accent)",
                  }}>
                    D
                  </div>
                  <div>
                    <div style={{
                      fontWeight: 700,
                      color:      "var(--color-text-primary)",
                      fontSize:   "var(--text-sm)",
                    }}>
                      Dammar Bhatt
                    </div>
                    <div style={{
                      color:    "var(--color-text-muted)",
                      fontSize: "var(--text-xs)",
                      marginTop:"2px",
                    }}>
                      Full Stack Developer
                    </div>
                    <div style={{
                      color:    "var(--color-text-muted)",
                      fontSize: "var(--text-xs)",
                    }}>
                      dammarbhatt111@gmail.com
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
  )
}

export default TabContent