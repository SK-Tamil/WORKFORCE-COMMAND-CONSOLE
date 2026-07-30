import React, { useEffect, useState, useRef } from "react";
import {
  Users,
  Building2,
  Mail,
  Trash2,
  Pencil,
  Plus,
  Hash,
  Radar,
  TerminalSquare,
  Activity,
  Wifi,
} from "lucide-react";
 
/* ---------------------------------------------------------
   Employee Management System — CRUD logic is UNCHANGED.
   Presentation: sci-fi mission-control / HUD console theme.
--------------------------------------------------------- */
 
function useAnimatedCounter(target, duration = 900) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);
  useEffect(() => {
    const start = performance.now();
    const to = Number(target) || 0;
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(to * eased));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);
  return value;
}
 
function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}
 
function useTypedText(text, speed = 35) {
  const [out, setOut] = useState("");
  useEffect(() => {
    setOut("");
    let i = 0;
    const t = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(t);
    }, speed);
    return () => clearInterval(t);
  }, [text, speed]);
  return out;
}
 
function Bracket() {
  return (
    <>
      <span className="corner tl" />
      <span className="corner tr" />
      <span className="corner bl" />
      <span className="corner br" />
    </>
  );
}
 
function App() {
  const [employees, setEmployees] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
 
  const API = "/api";
 
  const loadEmployees = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API}/employees`);
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error loading employees:", error);
    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => {
    loadEmployees();
  }, []);
 
  const addEmployee = async () => {
    if (!name || !department || !email) {
      alert("Please fill all fields");
      return;
    }
    try {
      const response = await fetch(`${API}/employees`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, department, email }),
      });
      if (response.ok) {
        alert("Employee Added Successfully");
        loadEmployees();
        setName("");
        setDepartment("");
        setEmail("");
      } else {
        alert("Failed to Add Employee");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };
 
  const updateEmployee = async () => {
    if (!id || !name || !department || !email) {
      alert("Please fill all fields");
      return;
    }
    try {
      const response = await fetch(`${API}/employees/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, department, email }),
      });
      if (response.ok) {
        alert("Employee Updated Successfully");
      } else {
        alert("Employee Not Found");
      }
      loadEmployees();
      setId("");
      setName("");
      setDepartment("");
      setEmail("");
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };
 
  const deleteEmployee = async () => {
    if (!id) {
      alert("Enter Employee ID");
      return;
    }
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (!confirmDelete) return;
    try {
      const response = await fetch(`${API}/employees/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Employee Deleted Successfully");
      } else {
        alert("Employee Not Found");
      }
      loadEmployees();
      setId("");
      setName("");
      setDepartment("");
      setEmail("");
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };
 
  const departmentCount = [
    ...new Set(employees.map((emp) => emp.department)),
  ].length;
 
  const animatedEmployees = useAnimatedCounter(employees.length);
  const animatedDepartments = useAnimatedCounter(departmentCount);
  const clock = useClock();
  const timeStr = clock.toLocaleTimeString([], {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const dateStr = clock
    .toLocaleDateString(undefined, { year: "numeric", month: "2-digit", day: "2-digit" })
    .replace(/\//g, ".");
  const typedTitle = useTypedText("WORKFORCE COMMAND CONSOLE", 32);
 
  return (
    <div className="hud-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
 
        .hud-root {
          --void: #05070B;
          --panel: #0A121E;
          --panel-alt: #0D1B2B;
          --line: rgba(0,229,255,0.14);
          --cyan: #00E5FF;
          --amber: #FFB020;
          --green: #39FF88;
          --red: #FF3B5C;
          --text: #C7D6E5;
          --text-dim: #5C7488;
 
          font-family: 'JetBrains Mono', monospace;
          color: var(--text);
          min-height: 100vh;
          width: 100%;
          background: var(--void);
          position: relative;
          overflow-x: hidden;
          box-sizing: border-box;
          padding: 28px 22px 60px;
        }
        .hud-root *, .hud-root *::before, .hud-root *::after { box-sizing: border-box; }
 
        /* ---------- background: grid + radar sweep + scanlines ---------- */
        .hud-grid {
          position: fixed; inset: 0; z-index: -3;
          background-image:
            linear-gradient(var(--line) 1px, transparent 1px),
            linear-gradient(90deg, var(--line) 1px, transparent 1px);
          background-size: 42px 42px;
          mask-image: radial-gradient(circle at 50% 30%, black 10%, transparent 75%);
          -webkit-mask-image: radial-gradient(circle at 50% 30%, black 10%, transparent 75%);
          animation: gridDrift 30s linear infinite;
        }
        @keyframes gridDrift {
          from { background-position: 0 0, 0 0; }
          to { background-position: 84px 0, 0 84px; }
        }
        .hud-vignette {
          position: fixed; inset: 0; z-index: -3;
          background: radial-gradient(ellipse at 50% 0%, rgba(0,229,255,0.08), transparent 60%),
                      radial-gradient(ellipse at 80% 100%, rgba(255,176,32,0.05), transparent 55%);
        }
        .hud-radar {
          position: fixed;
          top: -40vw; left: 50%;
          width: 130vw; height: 130vw;
          transform: translateX(-50%);
          z-index: -2;
          border-radius: 50%;
          background: conic-gradient(from 0deg, rgba(0,229,255,0.16), transparent 22%, transparent 100%);
          animation: radarSpin 9s linear infinite;
          opacity: 0.5;
        }
        @keyframes radarSpin { to { transform: translateX(-50%) rotate(360deg); } }
        .hud-scanlines {
          position: fixed; inset: 0; z-index: -1; pointer-events: none;
          background: repeating-linear-gradient(
            to bottom, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px,
            transparent 1px, transparent 3px
          );
          opacity: 0.5;
        }
        .hud-sweep {
          position: fixed; left: 0; right: 0; height: 140px; z-index: -1;
          background: linear-gradient(to bottom, transparent, rgba(0,229,255,0.05), transparent);
          animation: sweepDown 7s linear infinite;
        }
        @keyframes sweepDown {
          from { top: -140px; } to { top: 100vh; }
        }
 
        /* ---------- shell ---------- */
        .hud-shell { max-width: 1180px; margin: 0 auto; animation: bootIn 0.6s ease both; }
        @keyframes bootIn { from { opacity: 0; filter: brightness(2); } to { opacity: 1; filter: brightness(1); } }
 
        /* ---------- status bar ---------- */
        .hud-statusbar {
          display: flex; justify-content: space-between; align-items: center;
          font-size: 0.72rem; letter-spacing: 1px; color: var(--text-dim);
          padding-bottom: 12px; margin-bottom: 18px;
          border-bottom: 1px solid var(--line);
        }
        .hud-statusbar .grp { display: flex; align-items: center; gap: 18px; }
        .hud-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--green); display: inline-block; margin-right: 6px; box-shadow: 0 0 8px var(--green); animation: blink 1.6s ease-in-out infinite; }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0.35; } }
        .hud-clockval { color: var(--cyan); font-weight: 600; letter-spacing: 2px; }
 
        /* ---------- header ---------- */
        .hud-header { text-align: center; margin: 20px 0 40px; }
        .hud-eyebrow {
          font-size: 0.68rem; letter-spacing: 4px; color: var(--amber);
          margin-bottom: 10px; text-transform: uppercase;
        }
        .hud-title {
          font-family: 'Orbitron', sans-serif;
          font-weight: 800;
          font-size: clamp(1.3rem, 3vw, 2.1rem);
          letter-spacing: 2px;
          color: #EAF6FF;
          text-shadow: 0 0 18px rgba(0,229,255,0.55), 0 0 40px rgba(0,229,255,0.2);
          margin: 0;
          min-height: 1.4em;
        }
        .hud-title .cursor { display: inline-block; width: 10px; background: var(--cyan); margin-left: 4px; animation: blink 0.9s steps(1) infinite; }
        .hud-subtitle { margin-top: 12px; font-size: 0.8rem; color: var(--text-dim); letter-spacing: 0.5px; }
 
        /* ---------- panels (shared) ---------- */
        .hud-panel {
          position: relative;
          background: linear-gradient(160deg, var(--panel), var(--panel-alt));
          border: 1px solid var(--line);
          clip-path: polygon(0 12px, 12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%);
          padding: 24px 26px;
        }
        .corner { position: absolute; width: 16px; height: 16px; border: 2px solid var(--cyan); pointer-events: none; opacity: 0.85; }
        .corner.tl { top: -1px; left: -1px; border-right: none; border-bottom: none; }
        .corner.tr { top: -1px; right: -1px; border-left: none; border-bottom: none; }
        .corner.bl { bottom: -1px; left: -1px; border-right: none; border-top: none; }
        .corner.br { bottom: -1px; right: -1px; border-left: none; border-top: none; }
 
        /* ---------- stat readouts ---------- */
        .hud-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 26px; }
        @media (max-width: 640px) { .hud-stats { grid-template-columns: 1fr; } }
        .hud-stat { animation: fadeUp 0.5s ease both; }
        .hud-stat-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
        .hud-stat-label { font-size: 0.68rem; letter-spacing: 2.5px; text-transform: uppercase; color: var(--text-dim); }
        .hud-stat-value {
          font-family: 'Orbitron', sans-serif;
          font-weight: 700;
          font-size: 2.4rem;
          letter-spacing: 1px;
        }
        .val-cyan { color: var(--cyan); text-shadow: 0 0 16px rgba(0,229,255,0.6); }
        .val-amber { color: var(--amber); text-shadow: 0 0 16px rgba(255,176,32,0.6); }
        .hud-stat-bar { height: 4px; margin-top: 12px; background: rgba(255,255,255,0.06); position: relative; overflow: hidden; }
        .hud-stat-bar span { position: absolute; inset: 0; width: 60%; animation: barFill 2.4s ease-in-out infinite alternate; }
        .bar-cyan span { background: linear-gradient(90deg, transparent, var(--cyan)); }
        .bar-amber span { background: linear-gradient(90deg, transparent, var(--amber)); }
        @keyframes barFill { from { width: 20%; } to { width: 92%; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
 
        /* ---------- form panel ---------- */
        .hud-card { margin-bottom: 26px; animation: fadeUp 0.55s ease both; }
        .hud-card-title {
          font-family: 'Orbitron', sans-serif;
          font-size: 0.92rem; letter-spacing: 2px; text-transform: uppercase;
          color: #EAF6FF; margin: 0 0 20px; display: flex; align-items: center; gap: 10px;
        }
        .hud-card-title svg { color: var(--cyan); }
 
        .hud-form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 22px; }
        @media (max-width: 640px) { .hud-form-grid { grid-template-columns: 1fr; } }
        .hud-field label {
          display: block; font-size: 0.65rem; letter-spacing: 2px; text-transform: uppercase;
          color: var(--text-dim); margin-bottom: 6px;
        }
        .hud-field input {
          width: 100%;
          background: rgba(0,0,0,0.3);
          border: 1px solid rgba(0,229,255,0.22);
          color: var(--text);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.88rem;
          padding: 11px 14px;
          outline: none;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
        }
        .hud-field input::placeholder { color: #3E5266; }
        .hud-field input:focus {
          border-color: var(--cyan);
          background: rgba(0,229,255,0.05);
          box-shadow: 0 0 0 1px rgba(0,229,255,0.3), 0 0 16px rgba(0,229,255,0.25);
        }
 
        .hud-actions { display: flex; flex-wrap: wrap; gap: 14px; }
        .hud-btn {
          position: relative;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
          font-size: 0.78rem;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--void);
          border: none;
          padding: 12px 22px;
          display: inline-flex; align-items: center; gap: 8px;
          cursor: pointer;
          clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
          overflow: hidden;
          transition: transform 0.2s ease, filter 0.2s ease;
        }
        .hud-btn::after {
          content: ''; position: absolute; top: 0; left: -60%; width: 40%; height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.55), transparent);
          transform: skewX(-20deg);
          transition: left 0.5s ease;
        }
        .hud-btn:hover::after { left: 130%; }
        .hud-btn:hover { transform: translateY(-2px); filter: brightness(1.1); }
        .hud-btn:active { transform: translateY(0); }
        .btn-add { background: var(--green); box-shadow: 0 0 18px rgba(57,255,136,0.45); }
        .btn-update { background: var(--amber); box-shadow: 0 0 18px rgba(255,176,32,0.45); }
        .btn-delete { background: var(--red); box-shadow: 0 0 18px rgba(255,59,92,0.45); color: #1A0508; }
 
        /* ---------- table panel ---------- */
        .hud-table-wrap { overflow-x: auto; }
        table.hud-table { width: 100%; border-collapse: collapse; min-width: 560px; font-size: 0.85rem; }
        .hud-table thead th {
          text-align: left; padding: 10px 14px;
          font-size: 0.66rem; letter-spacing: 2px; text-transform: uppercase;
          color: var(--cyan); border-bottom: 1px solid var(--line);
        }
        .hud-table thead th .th-inner { display: flex; align-items: center; gap: 7px; }
        .hud-table tbody td { padding: 11px 14px; border-bottom: 1px solid rgba(255,255,255,0.04); color: var(--text); }
        .hud-table tbody tr { animation: rowIn 0.4s ease both; transition: background 0.2s ease; }
        .hud-table tbody tr:hover { background: rgba(0,229,255,0.06); }
        @keyframes rowIn { from { opacity: 0; transform: translateX(-8px);} to { opacity: 1; transform: translateX(0);} }
        .hud-id { color: var(--amber); font-weight: 700; }
 
        .hud-empty { display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 44px 0; color: var(--text-dim); }
        .hud-empty svg { animation: blink 2s ease-in-out infinite; }
        .hud-empty span { font-size: 0.8rem; letter-spacing: 2px; text-transform: uppercase; }
 
        .hud-loading { display: flex; align-items: center; justify-content: center; gap: 12px; padding: 40px 0; color: var(--text-dim); font-size: 0.8rem; letter-spacing: 1.5px; }
        .hud-spinner { width: 16px; height: 16px; border: 2px solid rgba(0,229,255,0.2); border-top-color: var(--cyan); border-radius: 50%; animation: spin 0.7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
 
        .hud-footer { text-align: center; margin-top: 34px; font-size: 0.68rem; letter-spacing: 1.5px; color: var(--text-dim); text-transform: uppercase; }
        .hud-footer .heart { color: var(--red); }
      `}</style>
 
      <div className="hud-grid" />
      <div className="hud-vignette" />
      <div className="hud-radar" />
      <div className="hud-sweep" />
      <div className="hud-scanlines" />
 
      <div className="hud-shell">
        <div className="hud-statusbar">
          <div className="grp">
            <span><span className="hud-dot" />ONLINE</span>
            <span><Wifi size={12} style={{ verticalAlign: "middle", marginRight: 5 }} />LINK STABLE</span>
          </div>
          <div className="grp">
            <span>{dateStr}</span>
            <span className="hud-clockval">{timeStr}</span>
          </div>
        </div>
 
        <div className="hud-header">
          <div className="hud-eyebrow">// SYSTEM MODULE : HR-OPS</div>
          <h1 className="hud-title">
            {typedTitle}
            <span className="cursor">&nbsp;</span>
          </h1>
          <p className="hud-subtitle">React · Flask · AWS — live data uplink</p>
        </div>
 
        <div className="hud-stats">
          <div className="hud-panel hud-stat">
            <Bracket />
            <div className="hud-stat-top">
              <span className="hud-stat-label">Total Employees</span>
              <Users size={18} color="var(--cyan)" />
            </div>
            <div className="hud-stat-value val-cyan">{String(animatedEmployees).padStart(2, "0")}</div>
            <div className="hud-stat-bar bar-cyan"><span /></div>
          </div>
 
          <div className="hud-panel hud-stat">
            <Bracket />
            <div className="hud-stat-top">
              <span className="hud-stat-label">Departments</span>
              <Building2 size={18} color="var(--amber)" />
            </div>
            <div className="hud-stat-value val-amber">{String(animatedDepartments).padStart(2, "0")}</div>
            <div className="hud-stat-bar bar-amber"><span /></div>
          </div>
        </div>
 
        <div className="hud-panel hud-card">
          <Bracket />
          <h4 className="hud-card-title">
            <TerminalSquare size={17} />
            Employee Input Terminal
          </h4>
 
          <div className="hud-form-grid">
            <div className="hud-field">
              <label>Employee ID (update / delete)</label>
              <input type="number" value={id} onChange={(e) => setId(e.target.value)} placeholder="e.g. 104" />
            </div>
            <div className="hud-field">
              <label>Employee Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
            </div>
            <div className="hud-field">
              <label>Department</label>
              <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Department" />
            </div>
            <div className="hud-field">
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" />
            </div>
          </div>
 
          <div className="hud-actions">
            <button className="hud-btn btn-add" onClick={addEmployee}>
              <Plus size={14} /> Add
            </button>
            <button className="hud-btn btn-update" onClick={updateEmployee}>
              <Pencil size={14} /> Update
            </button>
            <button className="hud-btn btn-delete" onClick={deleteEmployee}>
              <Trash2 size={14} /> Delete
            </button>
          </div>
        </div>
 
        <div className="hud-panel hud-card">
          <Bracket />
          <h4 className="hud-card-title">
            <Activity size={17} />
            Employee Records Feed
          </h4>
 
          {loading ? (
            <div className="hud-loading">
              <span className="hud-spinner" />
              SYNCING RECORDS…
            </div>
          ) : (
            <div className="hud-table-wrap">
              <table className="hud-table">
                <thead>
                  <tr>
                    <th><span className="th-inner"><Hash size={12} /> ID</span></th>
                    <th><span className="th-inner"><Users size={12} /> Name</span></th>
                    <th><span className="th-inner"><Building2 size={12} /> Department</span></th>
                    <th><span className="th-inner"><Mail size={12} /> Email</span></th>
                  </tr>
                </thead>
                <tbody>
                  {employees.length > 0 ? (
                    employees.map((emp, idx) => (
                      <tr key={emp.id} style={{ animationDelay: `${idx * 0.04}s` }}>
                        <td className="hud-id">#{emp.id}</td>
                        <td>{emp.name}</td>
                        <td>{emp.department}</td>
                        <td>{emp.email}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">
                        <div className="hud-empty">
                          <Radar size={36} />
                          <span>NO RECORDS DETECTED</span>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
 
        <div className="hud-footer">
          Built with <span className="heart">♥</span> — React + Flask + AWS
        </div>
      </div>
    </div>
  );
}
 
export default App;
 
