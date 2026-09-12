// Original animated diagrams for physiology study reference.
// Hand-built for this app — not sourced or traced from any textbook.
import { violet, teal, amber, rose, emerald } from "@/lib/palette";

function Step({ x, y, w = 108, h = 40, label, sub, color }: { x: number; y: number; w?: number; h?: number; label: string; sub?: string; color: { bg: string; fg: string } }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill={color.bg} stroke={color.fg} strokeOpacity={0.25} />
      <text x={x + w / 2} y={y + (sub ? 18 : 25)} textAnchor="middle" fontSize="12" fontWeight={700} fill={color.fg}>{label}</text>
      {sub && (
        <text x={x + w / 2} y={y + 31} textAnchor="middle" fontSize="9.5" fill={color.fg} opacity={0.85}>
          {sub}
        </text>
      )}
    </g>
  );
}

function Arrow({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--color-muted-foreground)" strokeWidth={1.6} markerEnd="url(#arrowhead)" opacity={0.55} />;
}

function ArrowDefs() {
  return (
    <defs>
      <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6 Z" fill="var(--color-muted-foreground)" opacity={0.7} />
      </marker>
    </defs>
  );
}

export function ActionPotentialDiagram() {
  const curve = "M 20 130 L 80 130 C 100 130, 105 20, 130 20 C 150 20, 155 90, 180 110 C 220 145, 260 132, 320 130 L 460 130";
  return (
    <svg viewBox="0 0 480 190" className="w-full" role="img" aria-label="Nerve action potential diagram">
      <ArrowDefs />
      <line x1="20" y1="150" x2="470" y2="150" stroke="var(--color-muted-foreground)" strokeWidth={1.5} />
      <line x1="20" y1="150" x2="20" y2="15" stroke="var(--color-muted-foreground)" strokeWidth={1.5} />
      <text x="245" y="175" textAnchor="middle" fontSize="10" fill="var(--color-muted-foreground)">Time →</text>
      <text x="10" y="80" textAnchor="middle" fontSize="10" fill="var(--color-muted-foreground)" transform="rotate(-90 10 80)">Membrane potential (mV) →</text>
      <path d={curve} fill="none" stroke={violet.fg} strokeWidth={2.5} />
      <text x="95" y="65" fontSize="9" fontWeight={700} fill={teal.fg}>Depolarization</text>
      <text x="60" y="15" fontSize="9" fontWeight={700} fill={teal.fg}>(Na⁺ channels open)</text>
      <text x="195" y="100" fontSize="9" fontWeight={700} fill={amber.fg}>Repolarization</text>
      <text x="185" y="185" fontSize="9" fontWeight={700} fill={amber.fg}>(K⁺ channels open, Na⁺ inactivate)</text>
      <text x="330" y="145" fontSize="9" fontWeight={700} fill={rose.fg}>Resting potential (−70mV)</text>
      <circle r="5" fill={violet.fg}>
        <animateMotion dur="4s" repeatCount="indefinite" path={curve} />
      </circle>
    </svg>
  );
}

export function SlidingFilamentDiagram() {
  const steps = ["Ca²⁺ binds troponin C", "Tropomyosin shifts, exposes binding site", "Myosin head binds actin (cross-bridge)", "Power stroke pulls thin filament", "ATP binds → cross-bridge releases"];
  const colW = 100;
  return (
    <svg viewBox={`0 0 ${steps.length * colW + 20} 130`} className="w-full" role="img" aria-label="Sliding filament cross-bridge cycle diagram">
      <ArrowDefs />
      {steps.map((s, i) => {
        const x = 10 + i * colW;
        return (
          <g key={s}>
            <Step x={x} y={40} w={88} h={50} label={s} color={i === 0 ? amber : teal} />
            {i < steps.length - 1 && <Arrow x1={x + 88} y1={65} x2={x + colW - 4} y2={65} />}
          </g>
        );
      })}
      <path d={`M ${steps.length * colW - 12} 90 C ${steps.length * colW - 12} 115, 50 115, 50 90`} fill="none" stroke={amber.fg} strokeOpacity={0.4} strokeWidth={1.6} markerEnd="url(#arrowhead)" />
      <text x={(steps.length * colW + 20) / 2} y={20} textAnchor="middle" fontSize="10" fill="var(--color-muted-foreground)">Cycle repeats as long as Ca²⁺ and ATP are available — rigor mortis occurs when ATP runs out</text>
      <circle r="5" fill={amber.fg}>
        <animateMotion dur="6s" repeatCount="indefinite" path={`M 54 65 ${steps.map((_, i) => `L ${10 + i * colW + 44} 65`).join(" ")}`} />
      </circle>
    </svg>
  );
}

export function ReflexArcDiagram() {
  return (
    <svg viewBox="0 0 460 200" className="w-full" role="img" aria-label="Stretch reflex arc diagram">
      <ArrowDefs />
      <Step x={20} y={20} w={150} label="Muscle spindle" sub="detects stretch" color={teal} />
      <Arrow x1={95} y1={60} x2={95} y2={80} />
      <Step x={20} y={85} w={150} label="Ia sensory afferent" sub="→ dorsal root ganglion" color={teal} />
      <Arrow x1={170} y1={105} x2={220} y2={105} />
      <Step x={230} y={85} w={150} label="Alpha motor neuron" sub="spinal cord, same segment" color={amber} />
      <Arrow x1={305} y1={125} x2={305} y2={145} />
      <Step x={230} y={150} w={150} label="Same muscle contracts" color={rose} />

      <rect x="20" y="150" width="180" height="34" rx="8" fill={violet.bg} opacity={0.4} />
      <text x="110" y="171" textAnchor="middle" fontSize="9" fill={violet.fg}>Monosynaptic — no interneuron</text>

      <circle r="4.5" fill={teal.fg}>
        <animateMotion dur="4s" repeatCount="indefinite" path="M 95 40 L 95 105 L 305 105 L 305 165" />
      </circle>
    </svg>
  );
}

export function CardiacCycleDiagram() {
  const phases = ["Atrial systole", "Isovolumetric contraction", "Ventricular ejection", "Isovolumetric relaxation", "Ventricular filling"];
  const colW = 100;
  return (
    <svg viewBox={`0 0 ${phases.length * colW + 20} 130`} className="w-full" role="img" aria-label="Cardiac cycle diagram">
      <ArrowDefs />
      {phases.map((p, i) => {
        const x = 10 + i * colW;
        return (
          <g key={p}>
            <Step x={x} y={40} w={88} h={44} label={p} color={i === 1 || i === 3 ? amber : teal} />
            {i < phases.length - 1 && <Arrow x1={x + 88} y1={62} x2={x + colW - 4} y2={62} />}
          </g>
        );
      })}
      <path d={`M ${phases.length * colW - 12} 84 C ${phases.length * colW - 12} 110, 50 110, 50 84`} fill="none" stroke={teal.fg} strokeOpacity={0.4} strokeWidth={1.6} markerEnd="url(#arrowhead)" />
      <text x={(phases.length * colW + 20) / 2} y={20} textAnchor="middle" fontSize="10" fill="var(--color-muted-foreground)">S1 = AV valve closure (start of systole) · S2 = semilunar valve closure (start of diastole)</text>
      <circle r="5" fill={teal.fg}>
        <animateMotion dur="6s" repeatCount="indefinite" path={`M 54 62 ${phases.map((_, i) => `L ${10 + i * colW + 44} 62`).join(" ")}`} />
      </circle>
    </svg>
  );
}

export function CardiacConductionDiagram() {
  const steps = ["SA node", "Atria depolarize", "AV node (delay)", "Bundle of His", "Purkinje fibers → ventricles"];
  const colW = 100;
  return (
    <svg viewBox={`0 0 ${steps.length * colW + 20} 110`} className="w-full" role="img" aria-label="Cardiac conduction system diagram">
      <ArrowDefs />
      {steps.map((s, i) => {
        const x = 10 + i * colW;
        return (
          <g key={s}>
            <Step x={x} y={35} w={88} h={40} label={s} color={i === 2 ? amber : violet} />
            {i < steps.length - 1 && <Arrow x1={x + 88} y1={55} x2={x + colW - 4} y2={55} />}
          </g>
        );
      })}
      <circle r="5" fill={violet.fg}>
        <animateMotion dur="5s" repeatCount="indefinite" path={`M 54 55 ${steps.map((_, i) => `L ${10 + i * colW + 44} 55`).join(" ")}`} />
      </circle>
      <text x={(steps.length * colW + 20) / 2} y="20" textAnchor="middle" fontSize="10" fill="var(--color-muted-foreground)">AV nodal delay allows atrial contraction to finish filling the ventricles before they contract</text>
      <text x={(steps.length * colW + 20) / 2} y="100" textAnchor="middle" fontSize="9.5" fill="var(--color-muted-foreground)">SA node has the fastest intrinsic rate — the heart's normal pacemaker</text>
    </svg>
  );
}

export function OxyHemoglobinCurveDiagram() {
  const normalCurve = "M 30 160 C 60 158, 90 145, 120 100 C 150 55, 200 35, 320 30";
  const rightShift = "M 30 165 C 70 163, 110 155, 150 120 C 190 80, 240 50, 340 40";
  return (
    <svg viewBox="0 0 400 200" className="w-full" role="img" aria-label="Oxygen-hemoglobin dissociation curve diagram">
      <ArrowDefs />
      <line x1="30" y1="175" x2="360" y2="175" stroke="var(--color-muted-foreground)" strokeWidth={1.5} />
      <line x1="30" y1="175" x2="30" y2="15" stroke="var(--color-muted-foreground)" strokeWidth={1.5} />
      <text x="195" y="195" textAnchor="middle" fontSize="10" fill="var(--color-muted-foreground)">PO₂ (mmHg) →</text>
      <text x="14" y="95" textAnchor="middle" fontSize="10" fill="var(--color-muted-foreground)" transform="rotate(-90 14 95)">% Hb saturation →</text>
      <path d={normalCurve} fill="none" stroke={teal.fg} strokeWidth={2.5} />
      <text x="245" y="30" fontSize="9" fontWeight={700} fill={teal.fg}>Normal</text>
      <path d={rightShift} fill="none" stroke={rose.fg} strokeWidth={2.5} strokeDasharray="5 3" />
      <text x="270" y="55" fontSize="9" fontWeight={700} fill={rose.fg}>Right shift (Bohr effect)</text>
      <text x="60" y="35" fontSize="8.5" fill={rose.fg}>↑CO₂ ↓pH ↑temp ↑2,3-BPG</text>
      <circle r="4.5" fill={teal.fg}>
        <animateMotion dur="4s" repeatCount="indefinite" path={normalCurve} />
      </circle>
    </svg>
  );
}

export function BaroreceptorReflexDiagram() {
  return (
    <svg viewBox="0 0 460 210" className="w-full" role="img" aria-label="Baroreceptor reflex diagram" >
      <ArrowDefs />
      <Step x={20} y={20} w={180} label="↓Blood pressure" color={rose} />
      <Arrow x1={110} y1={60} x2={110} y2={80} />
      <Step x={20} y={85} w={180} label="↓Baroreceptor firing" sub="carotid sinus, aortic arch" color={rose} />
      <Arrow x1={110} y1={125} x2={110} y2={145} />
      <Step x={20} y={150} w={180} label="↓Vagal, ↑sympathetic outflow" color={amber} />

      <Arrow x1={200} y1={170} x2={240} y2={170} />
      <Step x={250} y={150} w={190} label="↑Heart rate, ↑contractility, vasoconstriction" color={teal} />
      <Arrow x1={345} y1={148} x2={345} y2={40} />
      <Step x={250} y={20} w={190} label="Blood pressure restored" color={emerald} />

      <circle r="4.5" fill={amber.fg}>
        <animateMotion dur="5s" repeatCount="indefinite" path="M 110 40 L 110 105 L 110 170 L 345 170 L 345 40" />
      </circle>
      <text x="230" y="200" textAnchor="middle" fontSize="9.5" fill="var(--color-muted-foreground)">Fast-acting negative feedback loop — buffers acute BP changes within seconds</text>
    </svg>
  );
}

export function HpaAxisDiagram() {
  const steps = ["Hypothalamus\nCRH", "Anterior pituitary\nACTH", "Adrenal cortex\nCortisol", "Negative feedback\non hypothalamus/pituitary"];
  const colW = 118;
  return (
    <svg viewBox={`0 0 ${steps.length * colW + 20} 130`} className="w-full" role="img" aria-label="Hypothalamic-pituitary-adrenal axis diagram">
      <ArrowDefs />
      {steps.map((s, i) => {
        const x = 10 + i * colW;
        const [label, sub] = s.split("\n");
        return (
          <g key={s}>
            <Step x={x} y={40} w={104} h={44} label={label!} sub={sub} color={i === 3 ? violet : amber} />
            {i < steps.length - 1 && <Arrow x1={x + 104} y1={62} x2={x + colW - 6} y2={62} />}
          </g>
        );
      })}
      <path d={`M ${steps.length * colW - 8} 84 C ${steps.length * colW - 8} 110, 60 110, 60 84`} fill="none" stroke={violet.fg} strokeOpacity={0.4} strokeWidth={1.6} markerEnd="url(#arrowhead)" />
      <text x={(steps.length * colW + 20) / 2} y="20" textAnchor="middle" fontSize="10" fill="var(--color-muted-foreground)">Rising cortisol suppresses further CRH/ACTH release — classic negative feedback endocrine axis</text>
      <circle r="5" fill={amber.fg}>
        <animateMotion dur="6s" repeatCount="indefinite" path={`M 62 62 ${steps.map((_, i) => `L ${10 + i * colW + 52} 62`).join(" ")}`} />
      </circle>
    </svg>
  );
}

export function MenstrualCycleDiagram() {
  const phases = [
    { label: "Follicular phase", sub: "↑Estrogen from developing follicle", color: teal },
    { label: "Ovulation", sub: "LH surge (positive feedback)", color: amber },
    { label: "Luteal phase", sub: "Corpus luteum → progesterone", color: rose },
    { label: "Menstruation", sub: "Corpus luteum regresses, hormones fall", color: violet },
  ];
  const cx = 230, cy = 120, r = 78;
  return (
    <svg viewBox="0 0 460 240" className="w-full" role="img" aria-label="Menstrual cycle hormone phases diagram">
      <ArrowDefs />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--color-muted-foreground)" strokeOpacity={0.3} strokeWidth={1.5} />
      {phases.map((p, i) => {
        const angle = (i / phases.length) * 2 * Math.PI - Math.PI / 2;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        return (
          <g key={p.label}>
            <circle cx={x} cy={y} r={48} fill={p.color.bg} stroke={p.color.fg} strokeOpacity={0.35} />
            <text x={x} y={y - 4} textAnchor="middle" fontSize="10" fontWeight={700} fill={p.color.fg}>{p.label}</text>
            <foreignObject x={x - 42} y={y - 0} width="84" height="36">
              <p style={{ fontSize: "7.5px", textAlign: "center", color: p.color.fg, lineHeight: 1.2, margin: 0 }}>{p.sub}</p>
            </foreignObject>
          </g>
        );
      })}
      <circle r="5" fill={amber.fg}>
        <animateMotion dur="8s" repeatCount="indefinite" path={`M ${cx + r} ${cy} A ${r} ${r} 0 1 1 ${cx + r - 0.01} ${cy}`} />
      </circle>
      <text x={cx} y="20" textAnchor="middle" fontSize="10" fill="var(--color-muted-foreground)">Average cycle ~28 days; ovulation ~14 days before next expected period</text>
    </svg>
  );
}

export function NephronSegmentsDiagram() {
  const segments = [
    { label: "Glomerulus", sub: "filtration" },
    { label: "Proximal tubule", sub: "~65% Na⁺/H₂O reabsorbed" },
    { label: "Loop of Henle", sub: "countercurrent multiplier" },
    { label: "Distal tubule", sub: "fine Na⁺/Ca²⁺ tuning" },
    { label: "Collecting duct", sub: "ADH-regulated water reabsorption" },
  ];
  const colW = 108;
  return (
    <svg viewBox={`0 0 ${segments.length * colW + 20} 130`} className="w-full" role="img" aria-label="Nephron segments and function diagram">
      <ArrowDefs />
      {segments.map((s, i) => {
        const x = 10 + i * colW;
        return (
          <g key={s.label}>
            <Step x={x} y={40} w={96} h={48} label={s.label} sub={s.sub} color={i === 0 ? rose : teal} />
            {i < segments.length - 1 && <Arrow x1={x + 96} y1={64} x2={x + colW - 6} y2={64} />}
          </g>
        );
      })}
      <circle r="5" fill={teal.fg}>
        <animateMotion dur="7s" repeatCount="indefinite" path={`M 58 64 ${segments.map((_, i) => `L ${10 + i * colW + 48} 64`).join(" ")}`} />
      </circle>
      <text x={(segments.length * colW + 20) / 2} y={20} textAnchor="middle" fontSize="10" fill="var(--color-muted-foreground)">Filtration → reabsorption → secretion — urine composition is finalized by the collecting duct</text>
    </svg>
  );
}

export function FrankStarlingDiagram() {
  const curve = "M 30 170 C 100 160, 160 60, 260 40 C 320 28, 360 30, 390 35";
  return (
    <svg viewBox="0 0 420 200" className="w-full" role="img" aria-label="Frank-Starling curve diagram">
      <ArrowDefs />
      <line x1="30" y1="180" x2="400" y2="180" stroke="var(--color-muted-foreground)" strokeWidth={1.5} />
      <line x1="30" y1="180" x2="30" y2="15" stroke="var(--color-muted-foreground)" strokeWidth={1.5} />
      <text x="215" y="196" textAnchor="middle" fontSize="10" fill="var(--color-muted-foreground)">Ventricular end-diastolic volume (preload) →</text>
      <text x="14" y="100" textAnchor="middle" fontSize="10" fill="var(--color-muted-foreground)" transform="rotate(-90 14 100)">Stroke volume →</text>
      <path d={curve} fill="none" stroke={violet.fg} strokeWidth={2.5} />
      <path d="M 30 175 C 100 168, 160 90, 260 70 C 320 58, 360 60, 390 65" fill="none" stroke={teal.fg} strokeWidth={2} strokeDasharray="5 3" opacity={0.7} />
      <text x="300" y="55" fontSize="9" fontWeight={700} fill={teal.fg}>↑Contractility (e.g. sympathetic)</text>
      <text x="280" y="30" fontSize="9" fontWeight={700} fill={violet.fg}>Normal</text>
      <circle r="5" fill={violet.fg}>
        <animateMotion dur="4s" repeatCount="indefinite" path={curve} />
      </circle>
      <text x="215" y="14" textAnchor="middle" fontSize="10" fill="var(--color-muted-foreground)">The whole curve shifts up-left with increased contractility, down-right in heart failure</text>
    </svg>
  );
}
