import { useState } from "react";
import SideBarTab from "../components/layouts/SideBarTab";
import { useAuth } from "../contexts/AuthContext";
import TabContent from "../components/TabContent";
import { useNavigate } from "react-router";
const Setting=()=>{
  const [activeTab, setActiveTab] = useState<"profile" | "password" | "appearance" | "about">("profile");
  const {user}=useAuth();
  const navigate=useNavigate();

  const card = {
    background:   "var(--color-bg-card)",
    border:       "1px solid var(--color-border)",
    borderRadius: "var(--radius-md)",
    overflow:     "hidden",
    boxShadow:    "var(--shadow-card)",
  };
return <div
      style={{
        background: "var(--color-bg-secondary)",
        minHeight:  "100vh",
        padding:    "40px 0",
      }}
    >
      <div className="container">
      <div style={{ marginBottom: "32px" }}>
          <h2 style={{
            fontWeight: 700,
            color:      "var(--color-text-primary)",
            margin:     0,
          }}>
            Setting
          </h2>
          <p style={{
            color:     "var(--color-text-muted)",
            fontSize:  "var(--text-sm)",
            marginTop: "4px",
          }}>
            Manage your account and preferences
          </p>
        </div>
        <div className="row g-4">

          {/* ── Left — Profile Card ──────────── */}
          <div className="col-lg-4">
            <SideBarTab activeTab={activeTab} setActiveTab={setActiveTab} user={user} card={card}/>
             {/* Admin dashboard shortcut */}
            {user?.role === "admin" && (
              <div
                onClick={() => navigate("/dashboard")}
                style={{
                  ...card,
                  padding:    "16px 20px",
                  display:    "flex",
                  alignItems: "center",
                  gap:        "14px",
                  cursor:     "pointer",
                  marginBottom: "12px",
                  transition: "var(--transition-fast)",
                }}
              >
                <div style={{
                  width:         "40px",
                  height:        "40px",
                  borderRadius:  "var(--radius-sm)",
                  background:    "var(--color-accent-light)",
                  display:       "flex",
                  alignItems:    "center",
                  justifyContent:"center",
                  fontSize:      "1.2rem",
                  flexShrink:    0,
                }}>
                  ⚙️
                </div>
                <div>
                  <div style={{
                    fontWeight: 600,
                    color:      "var(--color-accent)",
                    fontSize:   "var(--text-sm)",
                  }}>
                    Admin Dashboard
                  </div>
                  <div style={{
                    fontSize: "var(--text-xs)",
                    color:    "var(--color-text-muted)",
                  }}>
                    Manage rooms, guests and bookings
                  </div>
                </div>
                <span style={{
                  marginLeft: "auto",
                  color:      "var(--color-text-muted)",
                }}>
                  →
                </span>
              </div>
            )}
          </div>
         
          <div className="col-lg-8">
          <TabContent activeTab={activeTab} setActiveTab={setActiveTab} user={user} card={card}/>
          </div>
          </div>
      </div>
      </div>
}
export default Setting;