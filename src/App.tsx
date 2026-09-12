import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  BookOpen,
  ArrowLeft,
  ClipboardList,
  ExternalLink,
  FlaskConical,
  Layers3,
  Search,
  Waypoints,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  FACTS,
  TOPICS,
  WEIGHTAGE_META,
  PRIORITY_META,
  type FactItem,
  type Weightage,
} from "@/data/facts";
import { MCQS, type McqItem } from "@/data/mcqs";
import { NORMAL_VALUES } from "@/data/normal-values";
import { TOPIC_PALETTE } from "@/lib/palette";
import {
  getOrInitCard,
  isDue,
  loadSrsState,
  reviewCard,
  saveSrsState,
  type Grade,
} from "@/lib/srs";
import {
  ActionPotentialDiagram,
  SlidingFilamentDiagram,
  ReflexArcDiagram,
  CardiacCycleDiagram,
  CardiacConductionDiagram,
  OxyHemoglobinCurveDiagram,
  BaroreceptorReflexDiagram,
  HpaAxisDiagram,
  MenstrualCycleDiagram,
  NephronSegmentsDiagram,
  FrankStarlingDiagram,
  RaasDiagram,
  CoagulationCascadeDiagram,
  StarlingForcesDiagram,
  ChemoreceptorControlDiagram,
  HptAxisDiagram,
  GastricPhasesDiagram,
} from "@/components/pathway-diagrams";

type Tab = "sheets" | "flashcards" | "diagrams" | "values";

function topicColor(topicId: string) {
  const index = TOPICS.findIndex((t) => t.id === topicId);
  return (
    TOPIC_PALETTE[(index < 0 ? 0 : index) % TOPIC_PALETTE.length] ??
    TOPIC_PALETTE[0] ?? { bg: "transparent", fg: "currentColor", ring: "currentColor" }
  );
}

// A colored top edge plus a soft, tinted ambient shadow in the same hue —
// used on every card so each section reads as its own color, not a generic
// grey-shadow card kit.
function glowStyle(accent: string) {
  return {
    borderTopColor: accent,
    boxShadow: `0 14px 30px -16px color-mix(in oklch, ${accent} 60%, transparent)`,
  };
}

// Colors used for the four top-level study modes — shared by the header
// nav pills and the landing page feature cards so the same mode always
// carries the same color throughout the app.
const TAB_COLORS: Record<Tab, { bg: string; fg: string; ring: string }> = {
  sheets: TOPIC_PALETTE[0] ?? { bg: "transparent", fg: "currentColor", ring: "currentColor" },
  flashcards: TOPIC_PALETTE[2] ?? { bg: "transparent", fg: "currentColor", ring: "currentColor" },
  diagrams: TOPIC_PALETTE[4] ?? { bg: "transparent", fg: "currentColor", ring: "currentColor" },
  values: TOPIC_PALETTE[6] ?? { bg: "transparent", fg: "currentColor", ring: "currentColor" },
};

function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6">
      <p className="text-xs font-bold uppercase tracking-wide text-primary">{eyebrow}</p>
      <h2 className="mt-1 font-display text-3xl text-foreground">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
  color,
}: {
  active: boolean;
  onClick: () => void;
  icon: ReactNode;
  label: string;
  color: { bg: string; fg: string };
}) {
  return (
    <Button
      variant="tab"
      onClick={onClick}
      aria-pressed={active}
      style={active ? { backgroundColor: color.bg, color: color.fg } : undefined}
      className={`min-w-0 rounded-lg px-2 transition sm:px-3 ${active ? "shadow-sm" : ""}`}
    >
      {icon}
      <span className="hidden text-xs sm:inline sm:text-sm">{label}</span>
    </Button>
  );
}

function ClinicalPearl({ text, color }: { text: string; color: { bg: string; fg: string } }) {
  return (
    <div style={{ backgroundColor: color.bg }} className="mt-3 rounded-lg p-3 text-left">
      <p className="text-[10px] font-bold uppercase tracking-wide" style={{ color: color.fg }}>
        Clinical pearl
      </p>
      <p className="mt-1 text-xs leading-relaxed" style={{ color: color.fg }}>
        {text}
      </p>
    </div>
  );
}

function WeightageBadge({ weightage }: { weightage: Weightage }) {
  const meta = WEIGHTAGE_META[weightage];
  return (
    <span
      style={{ backgroundColor: meta.color.bg, color: meta.color.fg }}
      className="inline-flex shrink-0 items-center rounded-full px-2 py-1 text-[10px] font-bold"
      title={meta.description}
    >
      {meta.label}
    </span>
  );
}

function FurtherReading({
  topicName,
  color,
}: {
  topicName: string;
  color: { bg: string; fg: string };
}) {
  const q = encodeURIComponent(topicName);
  const links = [
    {
      label: "Wikipedia",
      sub: "quick overview & references",
      href: `https://en.wikipedia.org/wiki/Special:Search?search=${q}&go=Go`,
    },
    {
      label: "NCBI Bookshelf",
      sub: "free full-text physiology textbooks",
      href: `https://www.ncbi.nlm.nih.gov/books/?term=${q}`,
    },
    {
      label: "LibreTexts Medicine",
      sub: "open-access physiology course text",
      href: `https://med.libretexts.org/Search?query=${q}`,
    },
  ];
  return (
    <div className="mt-6 rounded-xl border border-border bg-card p-4 sm:p-5">
      <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
        Want the full text? Read further, free
      </p>
      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            style={glowStyle(color.fg)}
            className="group flex flex-col gap-1 rounded-lg border border-border border-t-4 bg-muted/40 p-3 text-sm transition hover:brightness-95"
          >
            <span className="flex items-center gap-1.5 font-bold text-card-foreground">
              {link.label}
              <ExternalLink size={12} className="opacity-60" />
            </span>
            <span className="text-xs leading-snug text-muted-foreground">{link.sub}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

const TOPIC_PEARLS: Record<string, string> = {
  general:
    "Facilitated diffusion is saturable (unlike simple diffusion) because it depends on a finite number of carrier proteins — a favorite way examiners test the difference between the two.",
  blood:
    "Rh-negative mothers receive anti-D immunoglobulin (RhoGAM) during and after pregnancy specifically to prevent sensitization that would endanger a future Rh-positive fetus.",
  "nerve-muscle":
    "Myasthenia gravis (postsynaptic, nicotinic ACh receptor antibodies) causes fatigable weakness that worsens with activity, while Lambert-Eaton syndrome (presynaptic, voltage-gated Ca2+ channel antibodies) classically improves with repeated activity.",
  cns: "Cerebellar lesions cause ipsilateral signs, unlike most cortical/corticospinal lesions which cause contralateral deficits — a frequently tested localization principle.",
  "special-senses":
    "Presbyopia (lens elasticity loss with age) is a different mechanism entirely from myopia/hyperopia (eyeball shape/refractive errors) — a common exam mix-up.",
  cvs: "The Frank-Starling mechanism explains why ventricles matched in preload eject proportionally — heart failure classically shifts this whole curve down and to the right.",
  respiratory:
    "The Bohr effect (right-shifted O2-Hb curve with rising CO2/falling pH) favors oxygen unloading exactly where it's needed most: actively metabolizing, CO2-producing tissue.",
  renal:
    "Creatinine clearance is preferred over BUN for estimating GFR because creatinine production is relatively constant and minimally affected by diet or hydration, unlike urea.",
  gi: "Secretin and CCK work as a coordinated pair — acidic chyme triggers secretin (bicarbonate to neutralize it), while fat/protein triggers CCK (enzymes and bile to digest it).",
  endocrine:
    "A high TSH with low T4 (primary hypothyroidism) and a low TSH with low T4 (secondary/pituitary hypothyroidism) look similar in symptoms but have opposite TSH results — always interpret TSH and T4 together.",
  reproductive:
    "The mid-cycle LH surge is one of physiology's only examples of positive feedback — sustained high estrogen flips from suppressing to stimulating GnRH/LH release.",
};

const GALLERY_ICONS = [
  {
    src: "/icons/heart.svg",
    label: "Human heart (cross-section)",
    caption: "Chambers, valves, and great vessels — the classic labeled anatomy reference.",
    topicId: "cvs",
  },
  {
    src: "/icons/neuron.svg",
    label: "Pyramidal neuron",
    caption: "Dendritic tree, soma, and axon — the basic signaling unit of the CNS.",
    topicId: "cns",
  },
  {
    src: "/icons/cardiomyocyte.svg",
    label: "Cardiomyocyte",
    caption:
      "Cardiac muscle cell — striated, but functions as an electrical syncytium via gap junctions.",
    topicId: "cvs",
  },
  {
    src: "/icons/nephron.svg",
    label: "Nephron",
    caption: "The functional unit of the kidney — filtration, reabsorption, secretion.",
    topicId: "renal",
  },
  {
    src: "/icons/red-blood-cell.svg",
    label: "Red blood cell",
    caption: "Biconcave, no nucleus or mitochondria — maximizes surface area for gas exchange.",
    topicId: "blood",
  },
  {
    src: "/icons/smooth-muscle-cell.svg",
    label: "Smooth muscle cell",
    caption: "Spindle-shaped, involuntary — lines the GI tract, blood vessels, and airways.",
    topicId: "gi",
  },
  {
    src: "/icons/sperm.svg",
    label: "Sperm",
    caption:
      "Haploid male gamete — motile via a flagellum powered by mitochondria in the midpiece.",
    topicId: "reproductive",
  },
  {
    src: "/icons/oocyte.svg",
    label: "Oocyte (MII)",
    caption: "Arrested in metaphase II until fertilization triggers completion of meiosis.",
    topicId: "reproductive",
  },
];

const DIAGRAMS: {
  topicId: string;
  title: string;
  description: string;
  pearl: string;
  Component: () => ReactNode;
  /** Flagged only on the small set of diagrams explicitly called out as exam-favorites. */
  highYield?: boolean;
}[] = [
  {
    topicId: "nerve-muscle",
    title: "Nerve Action Potential",
    description: "Depolarization, repolarization, and the refractory period, phase by phase.",
    pearl:
      "Local anesthetics (e.g. lidocaine) work by blocking voltage-gated Na+ channels, preventing the depolarization phase from ever reaching threshold.",
    Component: ActionPotentialDiagram,
    highYield: true,
  },
  {
    topicId: "nerve-muscle",
    title: "Sliding Filament / Cross-Bridge Cycle",
    description: "How Ca2+ and ATP drive the myosin-actin cross-bridge cycle.",
    pearl:
      "Rigor mortis happens because ATP depletion after death leaves myosin permanently bound to actin — ATP is needed to release the cross-bridge, not just to power it.",
    Component: SlidingFilamentDiagram,
    highYield: true,
  },
  {
    topicId: "cns",
    title: "Stretch Reflex Arc",
    description: "The monosynaptic pathway behind the knee-jerk reflex.",
    pearl:
      "Because it's monosynaptic, the stretch reflex is one of the fastest reflex pathways in the body — clinically tested as deep tendon reflexes (DTRs).",
    Component: ReflexArcDiagram,
    highYield: true,
  },
  {
    topicId: "cvs",
    title: "Cardiac Cycle",
    description: "The five phases from atrial systole to ventricular filling.",
    pearl:
      "A third heart sound (S3) in a young healthy adult can be normal, but in an older adult it often signals volume overload — such as heart failure.",
    Component: CardiacCycleDiagram,
    highYield: true,
  },
  {
    topicId: "cvs",
    title: "Cardiac Conduction System",
    description: "SA node to Purkinje fibers — and why the AV node delays the signal.",
    pearl:
      "If the SA node fails, the AV node can take over as a backup pacemaker, but at a slower intrinsic rate — the basis of a junctional escape rhythm.",
    Component: CardiacConductionDiagram,
    highYield: true,
  },
  {
    topicId: "cvs",
    title: "Baroreceptor Reflex",
    description: "The fast negative feedback loop that buffers acute blood pressure swings.",
    pearl:
      "Standing up suddenly triggers this reflex to prevent orthostatic hypotension — a blunted baroreflex (common with aging or autonomic disease) causes dizziness on standing.",
    Component: BaroreceptorReflexDiagram,
    highYield: true,
  },
  {
    topicId: "cvs",
    title: "Frank-Starling Curve",
    description:
      "How preload determines stroke volume, and how contractility shifts the whole curve.",
    pearl:
      "In heart failure, the Frank-Starling curve flattens and shifts down-right — the same increase in preload produces a smaller rise in stroke volume than normal.",
    Component: FrankStarlingDiagram,
    highYield: true,
  },
  {
    topicId: "respiratory",
    title: "Oxygen-Hemoglobin Dissociation Curve",
    description: "The sigmoid curve, and what shifts it right (Bohr effect) or left.",
    pearl:
      "Fetal hemoglobin (HbF) has a left-shifted curve compared to adult HbA, giving it higher O2 affinity — helping the fetus extract oxygen from maternal blood across the placenta.",
    Component: OxyHemoglobinCurveDiagram,
    highYield: true,
  },
  {
    topicId: "renal",
    title: "Nephron Segments & Function",
    description: "What each part of the nephron actually does to the filtrate.",
    pearl:
      "Loop diuretics (e.g. furosemide) block the Na-K-2Cl transporter in the thick ascending limb, disrupting the countercurrent multiplier and impairing the kidney's ability to concentrate urine.",
    Component: NephronSegmentsDiagram,
    highYield: true,
  },
  {
    topicId: "endocrine",
    title: "HPA Axis",
    description:
      "Hypothalamus → pituitary → adrenal cortex, and the negative feedback that closes the loop.",
    pearl:
      "Long-term exogenous steroid use suppresses the HPA axis via negative feedback — abruptly stopping steroids can cause adrenal insufficiency because the axis needs time to 'wake back up.'",
    Component: HpaAxisDiagram,
    highYield: true,
  },
  {
    topicId: "reproductive",
    title: "Menstrual Cycle Hormone Phases",
    description: "Follicular phase, ovulation, luteal phase, and menstruation.",
    pearl:
      "Combined oral contraceptives work partly by suppressing the LH surge — without it, ovulation is prevented even though follicles may start developing.",
    Component: MenstrualCycleDiagram,
  },
  {
    topicId: "renal",
    title: "Renin-Angiotensin-Aldosterone System",
    description:
      "How falling renal perfusion pressure triggers renin release and ends in vasoconstriction plus aldosterone.",
    pearl:
      "ACE inhibitors (e.g. enalapril) blunt Angiotensin II formation, reducing both vasoconstriction and aldosterone-driven Na+/water retention — the basis of their antihypertensive effect.",
    Component: RaasDiagram,
    highYield: true,
  },
  {
    topicId: "blood",
    title: "Coagulation Cascade",
    description:
      "Extrinsic and intrinsic pathways converging on the common pathway to form a fibrin clot.",
    pearl:
      "PT/INR tests the extrinsic + common pathway (monitors warfarin); aPTT tests the intrinsic + common pathway (monitors heparin) — a classic exam distinction.",
    Component: CoagulationCascadeDiagram,
    highYield: true,
  },
  {
    topicId: "general",
    title: "Capillary Starling Forces",
    description:
      "Why fluid filters out at the arterial end of a capillary and is reabsorbed at the venous end.",
    pearl:
      "Hypoalbuminemia (e.g. nephrotic syndrome, liver failure) lowers plasma oncotic pressure, shifting the balance toward net filtration everywhere — a major cause of generalized edema.",
    Component: StarlingForcesDiagram,
  },
  {
    topicId: "respiratory",
    title: "Chemoreceptor Control of Breathing",
    description:
      "Central chemoreceptors (CO2/pH) versus peripheral chemoreceptors (O2) driving the respiratory center.",
    pearl:
      "In chronic CO2 retainers (e.g. severe COPD), the central drive can become blunted, making hypoxic drive via peripheral chemoreceptors relatively more important — the rationale behind cautious oxygen titration.",
    Component: ChemoreceptorControlDiagram,
  },
  {
    topicId: "endocrine",
    title: "HPT (Thyroid) Axis",
    description:
      "Hypothalamus to pituitary to thyroid, and how TSH/T4 patterns distinguish primary from secondary hypothyroidism.",
    pearl:
      "A high TSH with low T4 points to primary (thyroid) failure, while a low TSH with low T4 points to secondary (pituitary) failure — always read TSH and T4 together, never TSH alone.",
    Component: HptAxisDiagram,
    highYield: true,
  },
  {
    topicId: "gi",
    title: "Phases of Gastric Secretion",
    description:
      "Cephalic, gastric, and intestinal phases — how much each contributes and when they inhibit each other.",
    pearl:
      "The intestinal phase is mostly inhibitory once chyme is very acidic or fatty — this is the enterogastric reflex that slows gastric emptying to protect the duodenum.",
    Component: GastricPhasesDiagram,
  },
];

function DiagramCard({
  title,
  description,
  pearl,
  color,
  onExpand,
  children,
  highYield,
}: {
  title: string;
  description: string;
  pearl: string;
  color: { bg: string; fg: string; ring: string };
  onExpand: () => void;
  children: ReactNode;
  highYield?: boolean;
}) {
  return (
    <div
      style={glowStyle(color.ring)}
      className="rounded-xl border border-border border-t-4 bg-card p-4 shadow-sm sm:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-xl text-card-foreground">{title}</h3>
        {highYield && (
          <span className="shrink-0 rounded-full bg-rose-100 px-2 py-1 text-[10px] font-bold text-rose-800">
            High-Yield
          </span>
        )}
      </div>
      <p className="mt-1 mb-4 text-sm text-muted-foreground">{description}</p>
      <button
        type="button"
        onClick={onExpand}
        aria-label={`Enlarge ${title} diagram`}
        className="group relative w-full overflow-x-auto rounded-lg bg-muted/40 p-3 text-left transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.99]"
      >
        {children}
        <span
          style={{ backgroundColor: color.bg, color: color.fg }}
          className="pointer-events-none absolute bottom-2 right-2 rounded-full px-2 py-1 text-[10px] font-bold opacity-0 shadow-sm transition group-hover:opacity-100"
        >
          Tap to enlarge
        </span>
      </button>
      <ClinicalPearl text={pearl} color={color} />
    </div>
  );
}

function Modal({
  title,
  color,
  onClose,
  children,
}: {
  title: string;
  color: { bg: string; fg: string; ring: string };
  onClose: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={glowStyle(color.ring)}
        className="max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl border-t-4 border-border bg-card p-6 text-center shadow-xl"
      >
        {children}
        <Button variant="secondary" onClick={onClose} className="mt-5 rounded-lg">
          Close
        </Button>
      </div>
    </div>
  );
}

function Diagrams() {
  const units = Array.from(new Set(TOPICS.map((t) => t.unit)));
  const [openIcon, setOpenIcon] = useState<(typeof GALLERY_ICONS)[number] | null>(null);
  const [openDiagram, setOpenDiagram] = useState<(typeof DIAGRAMS)[number] | null>(null);
  return (
    <section>
      <SectionIntro
        eyebrow={`${DIAGRAMS.length} animated diagrams`}
        title="See the systems move"
        description="Original diagrams grouped by chapter, each with a clinical pearl. Tap any diagram or picture to enlarge it."
      />
      <div className="space-y-10">
        {units.map((unit) => {
          const unitTopicIds = new Set(TOPICS.filter((t) => t.unit === unit).map((t) => t.id));
          const diagramsInUnit = DIAGRAMS.filter((d) => unitTopicIds.has(d.topicId));
          const iconsInUnit = GALLERY_ICONS.filter((g) => unitTopicIds.has(g.topicId));
          if (diagramsInUnit.length === 0 && iconsInUnit.length === 0) return null;
          const unitTopic = TOPICS.find((t) => t.unit === unit);
          return (
            <div key={unit}>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <h3 className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  {unit}
                </h3>
                {unitTopic && <WeightageBadge weightage={unitTopic.weightage} />}
              </div>
              {diagramsInUnit.length > 0 && (
                <div className="grid gap-4 lg:grid-cols-2">
                  {diagramsInUnit.map((d, i) => {
                    const color = topicColor(d.topicId);
                    const D = d.Component;
                    return (
                      <DiagramCard
                        key={unit + d.title + i}
                        title={d.title}
                        description={d.description}
                        pearl={d.pearl}
                        color={color}
                        onExpand={() => setOpenDiagram(d)}
                      >
                        <D />
                      </DiagramCard>
                    );
                  })}
                </div>
              )}
              {iconsInUnit.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {iconsInUnit.map((icon) => {
                    const color = topicColor(icon.topicId);
                    return (
                      <button
                        key={icon.src}
                        type="button"
                        onClick={() => setOpenIcon(icon)}
                        style={glowStyle(color.ring)}
                        className="group rounded-xl border border-border border-t-4 bg-card p-3 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95"
                      >
                        <img
                          src={icon.src}
                          alt={icon.label}
                          className="mx-auto h-16 w-16 object-contain transition group-hover:scale-110"
                          loading="lazy"
                        />
                        <p className="mt-2 text-xs font-bold text-card-foreground">{icon.label}</p>
                        <p className="mt-1 text-[11px] leading-snug text-muted-foreground">
                          {icon.caption}
                        </p>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
        Reference illustrations are free/public domain (CC0) via Bioicons.com contributors — see
        public/icons/CREDITS.md. Pathway diagrams are original artwork made for this app.
      </p>
      {openIcon && (
        <Modal
          title={openIcon.label}
          color={topicColor(openIcon.topicId)}
          onClose={() => setOpenIcon(null)}
        >
          <img
            src={openIcon.src}
            alt={openIcon.label}
            className="mx-auto h-40 w-40 object-contain sm:h-56 sm:w-56"
          />
          <p className="mt-4 text-base font-bold text-card-foreground">{openIcon.label}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{openIcon.caption}</p>
        </Modal>
      )}
      {openDiagram && (
        <Modal
          title={openDiagram.title}
          color={topicColor(openDiagram.topicId)}
          onClose={() => setOpenDiagram(null)}
        >
          <p className="mb-3 text-left font-display text-xl text-card-foreground sm:text-2xl">
            {openDiagram.title}
          </p>
          <div className="rounded-lg bg-muted/40 p-4">
            <openDiagram.Component />
          </div>
          <ClinicalPearl text={openDiagram.pearl} color={topicColor(openDiagram.topicId)} />
        </Modal>
      )}
    </section>
  );
}

function FactSheets() {
  const [topicId, setTopicId] = useState<string | null>(null);
  const [studyMode, setStudyMode] = useState<"mbbs" | "neetpg">("mbbs");
  if (!topicId) {
    const weightOrder: Weightage[] = ["very-high", "high", "moderate", "foundational"];
    const groups =
      studyMode === "mbbs"
        ? Array.from(new Set(TOPICS.map((t) => t.unit))).map((unit) => ({
            key: unit,
            heading: unit,
            topics: TOPICS.filter((t) => t.unit === unit),
          }))
        : weightOrder.map((w) => ({
            key: w,
            heading: WEIGHTAGE_META[w].label,
            topics: TOPICS.filter((t) => t.weightage === w),
          }));
    return (
      <section>
        <SectionIntro
          eyebrow={`${FACTS.length} high-yield facts`}
          title="Choose a system"
          description="Browse by NMC-CBME module (curriculum order), or switch to NEET-PG High-Yield to see modules sorted by revision priority."
        />
        <p className="-mt-4 mb-4 text-xs leading-relaxed text-muted-foreground">
          Priority tags reflect a revision-priority hierarchy, not an official NBEMS blueprint or
          published weightage — use them to plan study time, not as a guarantee.
        </p>
        <div className="mb-6 inline-flex rounded-xl bg-muted p-1">
          <button
            type="button"
            onClick={() => setStudyMode("mbbs")}
            aria-pressed={studyMode === "mbbs"}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${studyMode === "mbbs" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
          >
            MBBS / NMC
          </button>
          <button
            type="button"
            onClick={() => setStudyMode("neetpg")}
            aria-pressed={studyMode === "neetpg"}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${studyMode === "neetpg" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
          >
            NEET-PG High-Yield
          </button>
        </div>
        <div className="space-y-8">
          {groups.map((group) => (
            <div key={group.key}>
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                {group.heading}
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {group.topics.map((topic) => {
                  const count = FACTS.filter((f) => f.topicId === topic.id).length;
                  const color = topicColor(topic.id);
                  return (
                    <button
                      key={topic.id}
                      onClick={() => setTopicId(topic.id)}
                      style={glowStyle(color.ring)}
                      className="group min-h-36 rounded-xl border border-border border-t-4 bg-card p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-display text-xl leading-tight text-card-foreground">
                          {topic.name}
                        </h3>
                        <span
                          style={{ backgroundColor: color.bg, color: color.fg }}
                          className="shrink-0 rounded-full px-2 py-1 text-[11px] font-bold"
                        >
                          {count} facts
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {topic.blurb}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <WeightageBadge weightage={topic.weightage} />
                        {studyMode === "mbbs" && (
                          <span className="rounded-full bg-muted px-2 py-1 font-mono text-[10px] font-bold text-muted-foreground">
                            NMC-CBME: {topic.nmcModule}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  const topic = TOPICS.find((t) => t.id === topicId);
  if (!topic) return null;
  const facts = FACTS.filter((f) => f.topicId === topicId);
  const color = topicColor(topicId);
  return (
    <section>
      <Button variant="ghost" onClick={() => setTopicId(null)} className="mb-4 -ml-3">
        <ArrowLeft size={16} />
        All systems
      </Button>
      <SectionIntro
        eyebrow={`${facts.length} high-yield facts`}
        title={topic.name}
        description={topic.blurb}
      />
      <div className="-mt-4 mb-4 flex flex-wrap items-center gap-2">
        <WeightageBadge weightage={topic.weightage} />
        <span className="rounded-full bg-muted px-2 py-1 font-mono text-[10px] font-bold text-muted-foreground">
          NMC-CBME: {topic.nmcModule}
        </span>
        <p className="text-xs leading-relaxed text-muted-foreground">{topic.examNote}</p>
      </div>
      {TOPIC_PEARLS[topicId] && <ClinicalPearl text={TOPIC_PEARLS[topicId] ?? ""} color={color} />}
      <ol className="mt-4 space-y-3">
        {facts.map((fact, index) => (
          <li
            key={fact.id}
            className="flex gap-4 rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5"
          >
            <span
              style={{ backgroundColor: color.bg, color: color.fg }}
              className="flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold"
            >
              {index + 1}
            </span>
            <div>
              {fact.priority && (
                <span className="mb-1 inline-block text-[10px] font-bold text-muted-foreground">
                  {PRIORITY_META[fact.priority].emoji} {PRIORITY_META[fact.priority].label}
                </span>
              )}
              <p className="text-sm leading-7 text-card-foreground">{fact.fact}</p>
            </div>
          </li>
        ))}
      </ol>
      <FurtherReading topicName={topic.name} color={color} />
    </section>
  );
}

function GradeButton({
  variant,
  label,
  sub,
  onClick,
}: {
  variant: "again" | "hard" | "good" | "easy";
  label: string;
  sub: string;
  onClick: () => void;
}) {
  return (
    <Button variant={variant} onClick={onClick} className="h-16 flex-col gap-0 rounded-xl">
      <span>{label}</span>
      <span className="text-[10px] font-medium opacity-75">{sub}</span>
    </Button>
  );
}

function FlashcardMode() {
  const [srs, setSrs] = useState<Record<string, ReturnType<typeof getOrInitCard>>>({});
  const [ready, setReady] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [topicFilter, setTopicFilter] = useState<string | "all">("all");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setSrs(loadSrsState());
    setReady(true);
  }, []);

  const pool = useMemo(
    () => FACTS.filter((f) => topicFilter === "all" || f.topicId === topicFilter),
    [topicFilter],
  );
  const queue = useMemo(() => {
    const due = pool.filter((f) => isDue(getOrInitCard(srs, f.id)));
    return due.length > 0 ? due : pool;
  }, [pool, srs]);
  const current: FactItem | undefined = queue[index % Math.max(queue.length, 1)];
  const dueCount = pool.filter((f) => isDue(getOrInitCard(srs, f.id))).length;

  function changeTopic(value: string) {
    setTopicFilter(value);
    setIndex(0);
    setFlipped(false);
  }

  function grade(value: Grade) {
    if (!current) return;
    const next = { ...srs, [current.id]: reviewCard(getOrInitCard(srs, current.id), value) };
    setSrs(next);
    saveSrsState(next);
    setFlipped(false);
    setIndex((i) => i + 1);
  }

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="sr-only" htmlFor="topic-filter">
          Filter flashcards by system
        </label>
        <select
          id="topic-filter"
          value={topicFilter}
          onChange={(e) => changeTopic(e.target.value)}
          className="min-h-10 rounded-xl border border-input bg-card px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="all">All systems ({FACTS.length})</option>
          {Array.from(new Set(TOPICS.map((t) => t.unit))).map((unit) => (
            <optgroup key={unit} label={unit}>
              {TOPICS.filter((t) => t.unit === unit).map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({FACTS.filter((f) => f.topicId === t.id).length}) ·{" "}
                  {WEIGHTAGE_META[t.weightage].label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <span className="text-xs font-semibold text-muted-foreground">
          {ready ? `${dueCount} due for review` : "Loading review schedule"}
        </span>
      </div>
      {current ? (
        <>
          <button
            onClick={() => setFlipped((v) => !v)}
            style={glowStyle(topicColor(current.topicId).ring)}
            className="flex min-h-72 w-full items-center justify-center rounded-2xl border border-border border-t-4 bg-card p-7 text-center shadow-sm transition hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:min-h-80 sm:p-12"
            aria-label={flipped ? "Show question" : "Reveal answer"}
          >
            <div className="max-w-2xl">
              <span
                style={{
                  backgroundColor: topicColor(current.topicId).bg,
                  color: topicColor(current.topicId).fg,
                }}
                className="mb-5 inline-block rounded-full px-3 py-1 text-xs font-bold"
              >
                {flipped ? "Answer" : "Question"}
              </span>
              <p className="font-display text-2xl leading-relaxed text-card-foreground sm:text-3xl">
                {flipped ? current.answer : current.question}
              </p>
            </div>
          </button>
          <p className="mt-3 text-center text-xs font-medium text-muted-foreground">
            {flipped ? "How well did you remember?" : "Tap the card to reveal the answer"}
          </p>
          {flipped && (
            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
              <GradeButton
                variant="again"
                label="Again"
                sub="Review tomorrow"
                onClick={() => grade(1)}
              />
              <GradeButton variant="hard" label="Hard" sub="1 day" onClick={() => grade(3)} />
              <GradeButton
                variant="good"
                label="Good"
                sub="Up to 6 days"
                onClick={() => grade(4)}
              />
              <GradeButton
                variant="easy"
                label="Easy"
                sub="Longer interval"
                onClick={() => grade(5)}
              />
            </div>
          )}
        </>
      ) : (
        <p className="py-16 text-center text-muted-foreground">No cards in this system yet.</p>
      )}
    </div>
  );
}

function McqPractice() {
  const [topicFilter, setTopicFilter] = useState<string | "all">("all");
  const [priorityFilter, setPriorityFilter] = useState<"all" | "high-yield">("all");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, attempted: 0 });
  const pool = useMemo(() => {
    return MCQS.filter((q) => {
      const matchesTopic = topicFilter === "all" || q.topicId === topicFilter;
      const qTopic = TOPICS.find((t) => t.id === q.topicId);
      const matchesPriority =
        priorityFilter === "all" ||
        qTopic?.weightage === "very-high" ||
        qTopic?.weightage === "high";
      return matchesTopic && matchesPriority;
    });
  }, [topicFilter, priorityFilter]);
  const current: McqItem | undefined = pool[index % Math.max(pool.length, 1)];

  function changeTopic(value: string) {
    setTopicFilter(value);
    setIndex(0);
    setSelected(null);
    setScore({ correct: 0, attempted: 0 });
  }
  function changePriority(value: "all" | "high-yield") {
    setPriorityFilter(value);
    setIndex(0);
    setSelected(null);
    setScore({ correct: 0, attempted: 0 });
  }
  function choose(optionId: string) {
    if (selected || !current) return;
    setSelected(optionId);
    setScore((s) => ({
      correct: s.correct + (optionId === current.correctOptionId ? 1 : 0),
      attempted: s.attempted + 1,
    }));
  }
  function next() {
    setSelected(null);
    setIndex((i) => i + 1);
  }

  if (!current)
    return <p className="py-16 text-center text-muted-foreground">No MCQs in this system yet.</p>;
  const color = topicColor(current.topicId);
  const topic = TOPICS.find((t) => t.id === current.topicId);

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <label className="sr-only" htmlFor="mcq-topic-filter">
            Filter MCQs by system
          </label>
          <select
            id="mcq-topic-filter"
            value={topicFilter}
            onChange={(e) => changeTopic(e.target.value)}
            className="min-h-10 rounded-xl border border-input bg-card px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All systems ({MCQS.length})</option>
            {Array.from(new Set(TOPICS.map((t) => t.unit))).map((unit) => (
              <optgroup key={unit} label={unit}>
                {TOPICS.filter((t) => t.unit === unit && MCQS.some((q) => q.topicId === t.id)).map(
                  (t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({MCQS.filter((q) => q.topicId === t.id).length}) ·{" "}
                      {WEIGHTAGE_META[t.weightage].label}
                    </option>
                  ),
                )}
              </optgroup>
            ))}
          </select>
          <div className="inline-flex rounded-xl bg-muted p-1">
            <button
              type="button"
              onClick={() => changePriority("all")}
              aria-pressed={priorityFilter === "all"}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${priorityFilter === "all" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
            >
              MBBS (all)
            </button>
            <button
              type="button"
              onClick={() => changePriority("high-yield")}
              aria-pressed={priorityFilter === "high-yield"}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${priorityFilter === "high-yield" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
            >
              NEET-PG High-Yield
            </button>
          </div>
        </div>
        <span className="text-xs font-semibold text-muted-foreground">
          Score: {score.correct}/{score.attempted}
        </span>
      </div>
      <div
        style={glowStyle(color.ring)}
        className="rounded-2xl border border-border border-t-4 bg-card p-6 shadow-sm sm:p-8"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span
              style={{ backgroundColor: color.bg, color: color.fg }}
              className="inline-block rounded-full px-3 py-1 text-xs font-bold"
            >
              {topic?.name}
            </span>
            {topic && <WeightageBadge weightage={topic.weightage} />}
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            Q{(index % pool.length) + 1} of {pool.length}
          </span>
        </div>
        <p className="mt-4 font-display text-xl leading-relaxed text-card-foreground sm:text-2xl">
          {current.question}
        </p>
        <div className="mt-5 space-y-2">
          {current.options.map((opt) => {
            const isCorrect = opt.id === current.correctOptionId;
            const isSelected = opt.id === selected;
            let stateClasses = "border-border bg-card hover:bg-muted/50";
            if (selected) {
              if (isCorrect) stateClasses = "border-emerald-500 bg-emerald-50";
              else if (isSelected) stateClasses = "border-rose-500 bg-rose-50";
            }
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => choose(opt.id)}
                disabled={!!selected}
                className={`flex w-full items-center gap-3 rounded-xl border-2 p-3 text-left text-sm transition ${stateClasses} disabled:cursor-default`}
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold uppercase">
                  {opt.id}
                </span>
                <span className="text-card-foreground">{opt.text}</span>
              </button>
            );
          })}
        </div>
        {selected && (
          <div className="mt-5 rounded-lg p-4" style={{ backgroundColor: color.bg }}>
            <p className="text-xs font-bold uppercase tracking-wide" style={{ color: color.fg }}>
              {selected === current.correctOptionId ? "Correct" : "Not quite"}
            </p>
            <p className="mt-1 text-sm leading-relaxed" style={{ color: color.fg }}>
              {current.explanation}
            </p>
          </div>
        )}
        <div className="mt-5 flex justify-end">
          <Button onClick={next} disabled={!selected} className="rounded-lg">
            Next question →
          </Button>
        </div>
      </div>
    </div>
  );
}

function Flashcards() {
  const [mode, setMode] = useState<"cards" | "mcq">("cards");
  return (
    <section>
      <SectionIntro
        eyebrow="Spaced repetition + NEET PG practice"
        title="Recall, then reveal"
        description="Review due cards, or switch to timed multiple-choice practice."
      />
      <div className="mb-6 grid grid-cols-2 gap-2 rounded-xl bg-muted p-1 sm:w-80">
        <Button
          variant="tab"
          active={mode === "cards"}
          onClick={() => setMode("cards")}
          className={mode === "cards" ? "text-primary shadow-sm" : ""}
        >
          <Layers3 size={16} /> Flashcards
        </Button>
        <Button
          variant="tab"
          active={mode === "mcq"}
          onClick={() => setMode("mcq")}
          className={mode === "mcq" ? "text-primary shadow-sm" : ""}
        >
          <ClipboardList size={16} /> MCQ Practice
        </Button>
      </div>
      {mode === "cards" ? <FlashcardMode /> : <McqPractice />}
    </section>
  );
}

function NormalValues() {
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const categories = Array.from(new Set(NORMAL_VALUES.map((v) => v.topicId)));
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return NORMAL_VALUES.filter((v) => {
      const matchesQuery =
        !q || v.parameter.toLowerCase().includes(q) || v.note.toLowerCase().includes(q);
      const matchesCategory = categoryFilter === "all" || v.topicId === categoryFilter;
      return matchesQuery && matchesCategory;
    });
  }, [query, categoryFilter]);
  const [openValue, setOpenValue] = useState<(typeof NORMAL_VALUES)[number] | null>(null);

  return (
    <section>
      <SectionIntro
        eyebrow={`${NORMAL_VALUES.length} normal values`}
        title="Normal Values Reference"
        description="Search by parameter name, or filter by system. Tap any card for the full clinical note."
      />
      <div className="relative mb-3">
        <Search
          aria-hidden="true"
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <label className="sr-only" htmlFor="value-search">
          Search normal values
        </label>
        <input
          id="value-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search heart rate, GFR, TSH…"
          className="min-h-12 w-full rounded-xl border border-input bg-card pl-10 pr-4 text-sm text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
        />
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCategoryFilter("all")}
          className={`rounded-full px-3 py-1 text-xs font-bold transition ${categoryFilter === "all" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"}`}
        >
          All systems
        </button>
        {categories.map((topicId) => {
          const topic = TOPICS.find((t) => t.id === topicId);
          const active = categoryFilter === topicId;
          const color = topicColor(topicId);
          return (
            <button
              key={topicId}
              type="button"
              onClick={() => setCategoryFilter(topicId)}
              style={active ? { backgroundColor: color.bg, color: color.fg } : undefined}
              className={`rounded-full px-3 py-1 text-xs font-bold transition ${active ? "" : "bg-muted text-muted-foreground hover:bg-muted/70"}`}
            >
              {topic?.name ?? topicId}
            </button>
          );
        })}
      </div>
      <p aria-live="polite" className="mb-4 text-xs font-medium text-muted-foreground">
        Showing {results.length} of {NORMAL_VALUES.length} values
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        {results.map((v) => {
          const color = topicColor(v.topicId);
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => setOpenValue(v)}
              style={glowStyle(color.ring)}
              className="group rounded-xl border border-border border-t-4 bg-card p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-sm font-bold text-card-foreground">{v.parameter}</h3>
                {v.frequentlyTested && (
                  <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                    Frequently tested
                  </span>
                )}
              </div>
              <p
                style={{ backgroundColor: color.bg, color: color.fg }}
                className="mt-2 inline-block rounded-md px-2 py-0.5 font-mono text-xs"
              >
                {v.value}
              </p>
              <p className="mt-2 line-clamp-2 text-xs leading-snug text-muted-foreground">
                {v.note}
              </p>
            </button>
          );
        })}
        {results.length === 0 && (
          <p className="col-span-2 py-12 text-center text-sm text-muted-foreground">
            No value matches "{query}".
          </p>
        )}
      </div>
      {openValue && (
        <Modal
          title={openValue.parameter}
          color={topicColor(openValue.topicId)}
          onClose={() => setOpenValue(null)}
        >
          <p className="text-left font-display text-2xl text-card-foreground">
            {openValue.parameter}
          </p>
          <p
            style={{
              backgroundColor: topicColor(openValue.topicId).bg,
              color: topicColor(openValue.topicId).fg,
            }}
            className="mt-3 inline-block rounded-md px-3 py-1 font-mono text-sm"
          >
            {openValue.value}
          </p>
          <p className="mt-4 text-left text-sm leading-relaxed text-card-foreground">
            {openValue.note}
          </p>
          <FurtherReading topicName={openValue.parameter} color={topicColor(openValue.topicId)} />
        </Modal>
      )}
    </section>
  );
}

function LandingPage({ onEnter }: { onEnter: (tab: Tab) => void }) {
  const stats = [
    { label: "NMC-CBME Modules", value: "12" },
    { label: "High-yield facts", value: `${FACTS.length}+` },
    { label: "Animated diagrams", value: `${DIAGRAMS.length}` },
    { label: "Normal values", value: `${NORMAL_VALUES.length}` },
  ];
  const features: {
    tab: Tab;
    title: string;
    description: string;
    icon: ReactNode;
    color: { bg: string; fg: string; ring: string };
  }[] = [
    {
      tab: "sheets",
      title: "Fact Sheets",
      description: "Concise, system-by-system facts with clinical pearls and further reading.",
      icon: <BookOpen size={22} />,
      color: TAB_COLORS.sheets,
    },
    {
      tab: "flashcards",
      title: "Flashcards + MCQs",
      description: "Spaced-repetition review and NEET PG-style MCQ practice.",
      icon: <Layers3 size={22} />,
      color: TAB_COLORS.flashcards,
    },
    {
      tab: "diagrams",
      title: "Diagrams",
      description: "Animated physiology diagrams you can tap to enlarge, grouped by system.",
      icon: <Waypoints size={22} />,
      color: TAB_COLORS.diagrams,
    },
    {
      tab: "values",
      title: "Normal Values",
      description: "Searchable reference for every normal range examiners test.",
      icon: <FlaskConical size={22} />,
      color: TAB_COLORS.values,
    },
  ];
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="h-1.5 w-full animate-gradient-pan bg-[linear-gradient(90deg,oklch(0.55_0.19_300),oklch(0.6_0.14_195),oklch(0.75_0.16_80),oklch(0.62_0.21_15),oklch(0.6_0.16_155),oklch(0.55_0.19_300))]" />
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 py-10 sm:px-6 sm:py-16">
        <div className="relative overflow-hidden rounded-3xl bg-[linear-gradient(135deg,oklch(0.94_0.08_300),oklch(0.93_0.07_195)_45%,oklch(0.94_0.1_75))] p-6 text-center shadow-sm sm:p-12">
          <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-white/30 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-14 -left-10 size-48 rounded-full bg-white/30 blur-2xl" />
          <div className="relative mx-auto flex size-16 items-center justify-center rounded-2xl text-primary-foreground shadow-md bg-[linear-gradient(135deg,oklch(0.55_0.19_300),oklch(0.58_0.16_255))] sm:size-20">
            <Waypoints aria-hidden="true" size={34} />
          </div>
          <h1 className="gradient-text relative mt-5 font-display text-4xl leading-tight sm:text-5xl">
            Physiology High-Yield
          </h1>
          <p className="relative mt-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
            Aligned with NMC-CBME 2024 · MBBS + NEET-PG High-Yield
          </p>
          <p className="relative mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
            Fact sheets, flashcards, animated system diagrams, MCQ practice, and a normal values
            reference — chaptered the way Indian MBBS students study, with clinical pearls
            throughout.
          </p>
          <div className="relative mt-7 flex flex-wrap justify-center gap-2 sm:gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl bg-white/70 px-4 py-2 text-center shadow-sm backdrop-blur"
              >
                <p className="font-display text-xl text-foreground sm:text-2xl">{s.value}</p>
                <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
          <Button
            onClick={() => onEnter("sheets")}
            className="relative mt-8 h-12 rounded-xl px-8 text-base shadow-md"
          >
            Start Studying
          </Button>
        </div>
        <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2">
          {features.map((f) => (
            <button
              key={f.tab}
              type="button"
              onClick={() => onEnter(f.tab)}
              style={glowStyle(f.color.ring)}
              className="group rounded-xl border border-border border-t-4 bg-card p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div
                style={{ backgroundColor: f.color.bg, color: f.color.fg }}
                className="flex size-11 items-center justify-center rounded-xl"
              >
                {f.icon}
              </div>
              <h3 className="mt-3 font-display text-xl text-card-foreground">{f.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
              <span className="mt-3 inline-block text-xs font-bold" style={{ color: f.color.fg }}>
                Explore →
              </span>
            </button>
          ))}
        </div>
      </main>
      <footer className="border-t border-border px-4 py-6 text-center text-xs leading-relaxed text-muted-foreground">
        High-yield facts are original summaries for exam revision. Always cross-check your course
        material.
      </footer>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState<Tab>("sheets");
  const [entered, setEntered] = useState(false);

  if (!entered)
    return (
      <LandingPage
        onEnter={(t) => {
          setTab(t);
          setEntered(true);
        }}
      />
    );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="h-1.5 w-full animate-gradient-pan bg-[linear-gradient(90deg,oklch(0.55_0.19_300),oklch(0.6_0.14_195),oklch(0.75_0.16_80),oklch(0.62_0.21_15),oklch(0.6_0.16_155),oklch(0.55_0.19_300))]" />
      <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setEntered(false)}
              className="flex size-10 items-center justify-center rounded-xl text-primary-foreground shadow-sm bg-[linear-gradient(135deg,oklch(0.55_0.19_300),oklch(0.58_0.16_255))]"
              aria-label="Back to home"
            >
              <Waypoints aria-hidden="true" size={21} />
            </button>
            <div>
              <h1 className="font-display text-2xl leading-none text-foreground">
                Physiology High-Yield
              </h1>
              <p className="mt-1 text-xs font-medium text-muted-foreground">
                Focused exam revision
              </p>
            </div>
          </div>
          <nav aria-label="Study modes" className="grid grid-cols-4 rounded-xl bg-muted p-1">
            <TabButton
              active={tab === "sheets"}
              onClick={() => setTab("sheets")}
              icon={<BookOpen size={16} />}
              label="Fact Sheets"
              color={TAB_COLORS.sheets}
            />
            <TabButton
              active={tab === "flashcards"}
              onClick={() => setTab("flashcards")}
              icon={<Layers3 size={16} />}
              label="Flashcards"
              color={TAB_COLORS.flashcards}
            />
            <TabButton
              active={tab === "diagrams"}
              onClick={() => setTab("diagrams")}
              icon={<Waypoints size={16} />}
              label="Diagrams"
              color={TAB_COLORS.diagrams}
            />
            <TabButton
              active={tab === "values"}
              onClick={() => setTab("values")}
              icon={<FlaskConical size={16} />}
              label="Normal Values"
              color={TAB_COLORS.values}
            />
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-7 sm:px-6 sm:py-10">
        {tab === "sheets" && <FactSheets />}
        {tab === "flashcards" && <Flashcards />}
        {tab === "diagrams" && <Diagrams />}
        {tab === "values" && <NormalValues />}
      </main>
      <footer className="border-t border-border px-4 py-6 text-center text-xs leading-relaxed text-muted-foreground">
        High-yield facts are original summaries for exam revision. Always cross-check your course
        material.
      </footer>
    </div>
  );
}
