interface MiniCardProps{
  summary:{
    label:string;
    value:number | string;
    icon:string;
    color:string;
    bg:string;
    border?:string;
  }
}
const MiniCard =({summary}:MiniCardProps)=>{
  return  <div style={{
                background:   "var(--color-bg-card)",
                border:       "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                padding:      "20px",
                display:      "flex",
                alignItems:   "center",
                gap:          "14px",
                boxShadow:    "var(--shadow-card)",
              }}>
                <div style={{
                  width:         "46px",
                  height:        "46px",
                  borderRadius:  "var(--radius-md)",
                  background:    summary.bg,
                  display:       "flex",
                  alignItems:    "center",
                  justifyContent:"center",
                  fontSize:      "1.3rem",
                  flexShrink:    0,
                }}>
                  {summary.icon}
                </div>
                <div>
                  <div style={{
                    fontSize:   "1.4rem",
                    fontWeight: 800,
                    color:      summary.color,
                    lineHeight: 1,
                  }}>
                    {summary.value}
                  </div>
                  <div style={{
                    fontSize:  "var(--text-xs)",
                    color:     "var(--color-text-muted)",
                    marginTop: "3px",
                  }}>
                    {summary.label}
                  </div>
                </div>
              </div>
}
export default MiniCard;