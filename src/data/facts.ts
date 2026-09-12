export type Weightage = "very-high" | "high" | "moderate" | "foundational";

export interface Topic {
  id: string;
  name: string;
  blurb: string;
  unit: string;
  weightage: Weightage;
  examNote: string;
  /** NMC-CBME module code (e.g. "PY5"), or "NMC mapping pending" where we don't have a verified code. */
  nmcModule: string;
}

export interface FactItem {
  id: string;
  topicId: string;
  fact: string;
  question: string;
  answer: string;
  /** Only set for a subset of facts we're confident about — not every fact is classified. */
  priority?: "must-know" | "important" | "supporting";
  /**
   * Verified NMC-CBME competency code (e.g. "PY7.4"), set only where the
   * fact directly matches a specific competency's text in an official/
   * university-published curriculum document. Left undefined everywhere
   * else rather than guessed.
   */
  nmcCompetency?: string;
}

// 12 modules, aligned to the NMC-CBME 2024 Physiology curriculum structure.
// NMC module codes (PY1-PY11) are verified against official/university-
// published curriculum documents reproducing the MCI/NMC 2018 Competency
// Based UG Curriculum (Vol. 1). Note: the source curriculum combines
// Neurophysiology and Special Senses into a single module (PY10) — our app
// keeps them as separate topics for navigation, so both correctly share the
// PY10 code. We do not fabricate competency-level codes (e.g. "PY5.2") —
// see FactItem.nmcCompetency for the few individually verified exceptions.
export const TOPICS: Topic[] = [
  {
    id: "general",
    unit: "Module 1 · General Physiology",
    name: "General Physiology",
    blurb: "Homeostasis, membrane transport, resting membrane potential, and cell signaling.",
    weightage: "foundational",
    examNote:
      "Conceptual foundation for every other module — fewer standalone NEET PG questions, but essential groundwork.",
    nmcModule: "PY1",
  },
  {
    id: "blood",
    unit: "Module 2 · Blood & Immunity",
    name: "Blood & Immunity",
    blurb: "Plasma, RBC physiology, hemostasis, blood groups, and immunity basics.",
    weightage: "high",
    examNote: "A dependable source of questions — hemostasis and blood groups recur most often.",
    nmcModule: "PY2",
  },
  {
    id: "nerve-muscle",
    unit: "Module 3 · Nerve-Muscle Physiology",
    name: "Nerve-Muscle Physiology",
    blurb: "Action potentials, synaptic transmission, and the sliding filament mechanism.",
    weightage: "high",
    examNote:
      "Core mechanisms (action potentials, NMJ, cross-bridge cycle) come up regularly and underpin CVS and Neurophysiology questions too.",
    nmcModule: "PY3",
  },
  {
    id: "gi",
    unit: "Module 4 · Gastrointestinal Physiology",
    name: "Gastrointestinal Physiology",
    blurb: "Digestion, motility, secretion, and GI hormones.",
    weightage: "moderate",
    examNote:
      "GI hormones and secretion mechanisms are tested moderately, often integrated with biochemistry.",
    nmcModule: "PY4",
  },
  {
    id: "cvs",
    unit: "Module 5 · Cardiovascular Physiology",
    name: "Cardiovascular Physiology",
    blurb: "Cardiac cycle, conduction system, blood pressure regulation, and cardiac output.",
    weightage: "very-high",
    examNote:
      "Consistently one of the highest-priority modules for revision — cardiac cycle, ECG basics, and BP regulation are exam favorites.",
    nmcModule: "PY5",
  },
  {
    id: "respiratory",
    unit: "Module 6 · Respiratory Physiology",
    name: "Respiratory Physiology",
    blurb: "Lung volumes, gas exchange, oxygen-hemoglobin dissociation, and control of breathing.",
    weightage: "very-high",
    examNote:
      "Another top-priority module — the O2-Hb curve and control of breathing are especially frequent.",
    nmcModule: "PY6",
  },
  {
    id: "renal",
    unit: "Module 7 · Renal Physiology",
    name: "Renal Physiology",
    blurb: "Glomerular filtration, tubular transport, and acid-base/fluid regulation.",
    weightage: "very-high",
    examNote: "GFR regulation, acid-base physiology, and RTA subtypes are recurring themes.",
    nmcModule: "PY7",
  },
  {
    id: "endocrine",
    unit: "Module 8 · Endocrine Physiology",
    name: "Endocrine Physiology",
    blurb: "Hormone feedback loops and the physiology of major endocrine glands.",
    weightage: "high",
    examNote:
      "Hormonal axes (thyroid, adrenal, calcium, ADH) are dependably high-priority and integrate heavily with medicine.",
    nmcModule: "PY8",
  },
  {
    id: "reproductive",
    unit: "Module 9 · Reproductive Physiology",
    name: "Reproductive Physiology",
    blurb: "Gametogenesis, menstrual cycle, pregnancy, and lactation physiology.",
    weightage: "high",
    examNote: "The menstrual cycle and key hormone actions are the parts most likely to appear.",
    nmcModule: "PY9",
  },
  {
    id: "cns",
    unit: "Module 10 · Neurophysiology",
    name: "Neurophysiology",
    blurb: "Reflexes, motor pathways, cerebellum, basal ganglia, and higher functions.",
    weightage: "very-high",
    examNote:
      "Reflex arcs, cerebellar/basal ganglia signs, and aphasias are consistently high-priority. Shares its NMC module (PY10) with Special Senses in the official curriculum.",
    nmcModule: "PY10",
  },
  {
    id: "special-senses",
    unit: "Module 11 · Special Senses",
    name: "Special Senses",
    blurb: "Vision, hearing, taste, and smell — receptor physiology and pathways.",
    weightage: "moderate",
    examNote:
      "A smaller, steadier share of questions — worth a solid pass, not deep priority. Shares its NMC module (PY10) with Neurophysiology in the official curriculum.",
    nmcModule: "PY10",
  },
  {
    id: "integrated",
    unit: "Module 12 · Integrated Physiology",
    name: "Integrated Physiology",
    blurb:
      "Exercise physiology, temperature regulation, ageing, growth, obesity, brain death, BLS, and applied physiology.",
    weightage: "foundational",
    examNote:
      "Cuts across every system — shows up as applied/integrated questions rather than a dedicated block.",
    nmcModule: "PY11",
  },
];

export const FACTS: FactItem[] = [
  // ---- General & Cell Physiology ----
  {
    id: "gen-1",
    topicId: "general",
    fact: "The resting membrane potential of most cells (~-70mV) is set mainly by the high resting permeability of the membrane to K+ and the K+ concentration gradient maintained by the Na+/K+-ATPase.",
    question: "What ion's permeability mainly determines the resting membrane potential?",
    answer: "Potassium (K+) — the membrane is far more permeable to K+ at rest than to Na+.",
    priority: "important",
  },
  {
    id: "gen-2",
    topicId: "general",
    fact: "The Na+/K+-ATPase pumps 3 Na+ out and 2 K+ in per ATP hydrolyzed, making it electrogenic and maintaining the ionic gradients that nerve and muscle excitability depend on.",
    question: "How many Na+ and K+ ions does the Na+/K+-ATPase move per cycle?",
    answer: "3 Na+ out, 2 K+ in, per ATP hydrolyzed.",
    priority: "important",
  },
  {
    id: "gen-3",
    topicId: "general",
    fact: "Osmosis is the movement of water across a semipermeable membrane from an area of low solute concentration to high solute concentration; oncotic pressure specifically refers to the osmotic pressure exerted by plasma proteins (mainly albumin).",
    question: "What is oncotic pressure?",
    answer: "The osmotic pressure exerted specifically by plasma proteins, mainly albumin.",
  },
  {
    id: "gen-4",
    topicId: "general",
    fact: "Second messenger systems (cAMP, IP3/DAG, Ca2+) amplify a single hormone-receptor binding event into a large intracellular response — the basis of signal amplification in endocrine and neural signaling.",
    question: "What is the functional purpose of a second messenger system?",
    answer: "To amplify a single receptor-binding event into a much larger intracellular response.",
  },
  {
    id: "gen-5",
    topicId: "general",
    fact: "Negative feedback is the dominant homeostatic control mechanism in physiology (e.g. thyroid axis, blood glucose regulation), where a rise in an output variable suppresses further stimulation; positive feedback (e.g. labor, clotting cascade) is rare and self-amplifying.",
    question: "Which feedback mechanism is more common in maintaining homeostasis?",
    answer:
      "Negative feedback — it opposes a change to restore a set point, unlike positive feedback which amplifies a change.",
    priority: "important",
  },
  {
    id: "gen-6",
    topicId: "general",
    fact: "Facilitated diffusion moves solutes down their concentration gradient via a carrier protein without ATP; it is saturable, unlike simple diffusion, because there are a finite number of carrier proteins.",
    question: "Why is facilitated diffusion saturable, unlike simple diffusion?",
    answer:
      "Because it depends on a limited number of carrier proteins, which can become fully occupied at high solute concentrations.",
  },
  {
    id: "gen-7",
    topicId: "general",
    fact: "Body fluid compartments: total body water is ~60% of body weight, two-thirds intracellular (ICF) and one-third extracellular (ECF); ECF is further split into plasma (~25% of ECF) and interstitial fluid (~75% of ECF).",
    question: "What fraction of extracellular fluid is plasma versus interstitial fluid?",
    answer: "Roughly 25% plasma, 75% interstitial fluid.",
    priority: "must-know",
  },

  // ---- Blood ----
  {
    id: "blood-1",
    topicId: "blood",
    fact: "Erythropoietin, produced mainly by the kidney in response to hypoxia, stimulates RBC production in bone marrow — the basis of anemia seen in chronic kidney disease.",
    question: "Where is erythropoietin mainly produced?",
    answer: "The kidney (peritubular fibroblast-like cells), in response to hypoxia.",
    priority: "must-know",
  },
  {
    id: "blood-2",
    topicId: "blood",
    fact: "The ABO blood group system depends on antigens on RBC surfaces; type O is the universal donor (no A/B antigen) and type AB is the universal recipient (no anti-A/anti-B antibodies).",
    question: "Why is type O blood called the universal donor?",
    answer:
      "Because O RBCs lack both A and B surface antigens, so they don't trigger an ABO-mismatch reaction in any recipient.",
    priority: "must-know",
  },
  {
    id: "blood-3",
    topicId: "blood",
    fact: "Primary hemostasis (platelet plug formation) is followed by secondary hemostasis (the coagulation cascade forming a stable fibrin clot); the two overlap but are mechanistically distinct.",
    question: "What is the difference between primary and secondary hemostasis?",
    answer:
      "Primary hemostasis is platelet plug formation; secondary hemostasis is the coagulation cascade producing a stable fibrin clot.",
    priority: "important",
  },
  {
    id: "blood-4",
    topicId: "blood",
    fact: "The normal hematocrit is roughly 40-50% in men and 36-44% in women; it represents the percentage of blood volume occupied by RBCs.",
    question: "What does hematocrit measure?",
    answer: "The percentage of total blood volume occupied by red blood cells.",
  },
  {
    id: "blood-5",
    topicId: "blood",
    fact: "Neutrophils are the most abundant WBC and the first responders in acute bacterial infection; lymphocytes predominate in chronic/viral infection.",
    question: "Which white blood cell is the first responder in acute bacterial infection?",
    answer: "Neutrophils.",
    priority: "important",
  },
  {
    id: "blood-6",
    topicId: "blood",
    fact: "Plasma proteins (mainly albumin) maintain oncotic pressure, which opposes capillary hydrostatic pressure — an imbalance (e.g. from hypoalbuminemia) causes edema.",
    question: "What imbalance in Starling forces causes edema from hypoalbuminemia?",
    answer:
      "Reduced plasma oncotic pressure fails to oppose capillary hydrostatic pressure, so fluid shifts into the interstitium.",
    priority: "important",
  },
  {
    id: "blood-7",
    topicId: "blood",
    fact: "Rh incompatibility (Rh-negative mother, Rh-positive fetus) can cause hemolytic disease of the newborn in subsequent pregnancies; anti-D immunoglobulin (RhoGAM) given to the mother prevents sensitization.",
    question:
      "What prevents Rh sensitization in an Rh-negative mother carrying an Rh-positive fetus?",
    answer:
      "Anti-D immunoglobulin (RhoGAM), given to prevent the mother's immune system from forming anti-Rh antibodies.",
    priority: "must-know",
  },

  // ---- Nerve & Muscle ----
  {
    id: "nm-1",
    topicId: "nerve-muscle",
    fact: "An action potential is triggered once depolarization reaches threshold, driven by rapid voltage-gated Na+ channel opening (depolarization) followed by Na+ channel inactivation and K+ channel opening (repolarization).",
    question: "Which ion channel opening causes the depolarization phase of an action potential?",
    answer: "Voltage-gated Na+ channels.",
    priority: "must-know",
  },
  {
    id: "nm-2",
    topicId: "nerve-muscle",
    fact: "The absolute refractory period (during Na+ channel inactivation) prevents a second action potential no matter the stimulus strength, ensuring unidirectional propagation along the axon.",
    question: "What causes the absolute refractory period?",
    answer:
      "Inactivation of voltage-gated Na+ channels, which cannot reopen until the membrane repolarizes.",
    priority: "must-know",
  },
  {
    id: "nm-3",
    topicId: "nerve-muscle",
    fact: "At the neuromuscular junction, acetylcholine released from the motor neuron binds nicotinic receptors on the muscle end plate, triggering an end-plate potential that, if threshold is reached, fires a muscle action potential.",
    question: "What neurotransmitter is released at the neuromuscular junction?",
    answer: "Acetylcholine, acting on nicotinic receptors.",
    priority: "must-know",
  },
  {
    id: "nm-4",
    topicId: "nerve-muscle",
    fact: "The sliding filament theory explains muscle contraction: myosin heads bind actin, pivot (power stroke) pulling the thin filament inward, powered by ATP hydrolysis; Ca2+ binding to troponin C exposes the myosin-binding site on actin.",
    question: "What role does calcium play in initiating muscle contraction?",
    answer:
      "Ca2+ binds troponin C, causing a conformational shift in tropomyosin that exposes the myosin-binding site on actin.",
    priority: "must-know",
  },
  {
    id: "nm-5",
    topicId: "nerve-muscle",
    fact: "Myasthenia gravis results from autoantibodies against nicotinic acetylcholine receptors at the neuromuscular junction, causing fatigable muscle weakness that worsens with repeated use.",
    question: "What is the underlying autoimmune target in myasthenia gravis?",
    answer: "Nicotinic acetylcholine receptors at the neuromuscular junction.",
    priority: "must-know",
  },
  {
    id: "nm-6",
    topicId: "nerve-muscle",
    fact: "Nerve conduction velocity is fastest in large-diameter, myelinated fibers (e.g. A-alpha, proprioception/motor) and slowest in small unmyelinated C fibers (e.g. dull pain, temperature).",
    question: "Which type of nerve fiber conducts impulses fastest?",
    answer:
      "Large-diameter, heavily myelinated fibers (A-alpha) — myelination allows fast saltatory conduction.",
    priority: "important",
  },
  {
    id: "nm-7",
    topicId: "nerve-muscle",
    fact: "Rigor mortis occurs because ATP depletion after death prevents myosin heads from detaching from actin, locking muscles in a contracted state until proteolysis breaks down the muscle proteins.",
    question: "Why does rigor mortis occur after death?",
    answer:
      "ATP depletion prevents myosin from detaching from actin, since ATP binding (not just hydrolysis) is required for cross-bridge release.",
    priority: "important",
  },
  {
    id: "nm-8",
    topicId: "nerve-muscle",
    fact: "Type I (slow oxidative) muscle fibers are fatigue-resistant and rely on oxidative metabolism (posture, endurance); type II (fast glycolytic) fibers generate more force quickly but fatigue faster, relying on anaerobic glycolysis (sprinting, powerful brief contractions).",
    question: "Which muscle fiber type is more fatigue-resistant, and why?",
    answer:
      "Type I (slow oxidative) fibers — they rely on oxidative metabolism, which sustains ATP supply longer than the anaerobic glycolysis used by type II fibers.",
    priority: "important",
  },
  {
    id: "nm-9",
    topicId: "nerve-muscle",
    fact: "The length-tension relationship shows that active tension is maximal at an optimal sarcomere length, where actin-myosin overlap allows the greatest number of cross-bridges to form; tension falls at both shorter and longer sarcomere lengths.",
    question:
      "Why does active muscle tension fall when a sarcomere is stretched beyond its optimal length?",
    answer:
      "Reduced actin-myosin filament overlap means fewer cross-bridges can form, lowering the tension the muscle can generate.",
  },

  // ---- Central Nervous System ----
  {
    id: "cns-1",
    topicId: "cns",
    fact: "The knee-jerk (patellar) reflex is a classic monosynaptic stretch reflex: muscle spindle stretch activates a sensory (Ia) neuron that synapses directly onto the motor neuron of the same muscle.",
    question: "Why is the knee-jerk reflex called 'monosynaptic'?",
    answer:
      "Because the sensory afferent (Ia fiber) synapses directly onto the motor neuron with no interneuron in between.",
    priority: "must-know",
  },
  {
    id: "cns-2",
    topicId: "cns",
    fact: "The cerebellum coordinates movement, balance, and motor learning without initiating movement itself; damage causes ataxia, intention tremor, and dysdiadochokinesia, typically on the same (ipsilateral) side as the lesion.",
    question:
      "Is cerebellar damage typically ipsilateral or contralateral to the resulting deficits?",
    answer: "Ipsilateral — unlike most cortical motor lesions, which cause contralateral deficits.",
    priority: "must-know",
  },
  {
    id: "cns-3",
    topicId: "cns",
    fact: "The basal ganglia (striatum, globus pallidus, substantia nigra, subthalamic nucleus) regulate the initiation and smoothness of voluntary movement; dopamine loss in the substantia nigra causes Parkinson disease (bradykinesia, rigidity, resting tremor).",
    question: "Loss of which neurotransmitter/pathway causes Parkinson disease?",
    answer:
      "Dopaminergic neurons of the substantia nigra pars compacta, part of the basal ganglia circuit.",
    priority: "must-know",
  },
  {
    id: "cns-4",
    topicId: "cns",
    fact: "The blood-brain barrier, formed by tight junctions between brain capillary endothelial cells, restricts passage of large/polar molecules and many drugs, protecting the CNS but complicating drug delivery.",
    question: "What structural feature of brain capillaries forms the blood-brain barrier?",
    answer: "Tight junctions between the capillary endothelial cells.",
    priority: "important",
  },
  {
    id: "cns-5",
    topicId: "cns",
    fact: "REM sleep is characterized by rapid eye movements, vivid dreaming, and skeletal muscle atonia (to prevent acting out dreams); non-REM sleep (stages N1-N3) includes slow-wave sleep important for physical restoration.",
    question: "What prevents the body from physically acting out dreams during REM sleep?",
    answer: "Skeletal muscle atonia (near-total paralysis) during REM sleep.",
    priority: "important",
  },
  {
    id: "cns-6",
    topicId: "cns",
    fact: "The Babinski sign (great toe dorsiflexion with fanning of other toes on plantar stimulation) is normal in infants (immature corticospinal tract) but indicates an upper motor neuron lesion in adults.",
    question: "What does a positive Babinski sign indicate in an adult?",
    answer: "An upper motor neuron lesion (corticospinal tract damage).",
    priority: "must-know",
  },
  {
    id: "cns-7",
    topicId: "cns",
    fact: "The flexor (withdrawal) reflex is a polysynaptic, protective reflex that withdraws a limb from a painful stimulus; the accompanying crossed-extensor reflex extends the opposite limb to maintain balance and support body weight.",
    question:
      "Why is the flexor withdrawal reflex classified as polysynaptic rather than monosynaptic?",
    answer:
      "It involves interneurons relaying the signal to multiple motor neurons (flexors of the stimulated limb and extensors of the opposite limb), unlike a direct single-synapse reflex.",
    priority: "important",
  },
  {
    id: "cns-8",
    topicId: "cns",
    fact: "Broca's area (frontal lobe) damage causes expressive (non-fluent) aphasia with intact comprehension; Wernicke's area (temporal lobe) damage causes receptive (fluent but nonsensical) aphasia with impaired comprehension.",
    question: "What distinguishes Broca's aphasia from Wernicke's aphasia?",
    answer:
      "Broca's aphasia is non-fluent speech with preserved comprehension; Wernicke's aphasia is fluent but meaningless speech with impaired comprehension.",
    priority: "must-know",
  },

  // ---- Special Senses ----
  {
    id: "ss-1",
    topicId: "special-senses",
    fact: "Rods are responsible for scotopic (dim-light) vision and are more numerous than cones, which mediate photopic (bright-light) and color vision, concentrated in the fovea.",
    question: "Which photoreceptor is responsible for color vision?",
    answer: "Cones, concentrated in the fovea.",
    priority: "important",
  },
  {
    id: "ss-2",
    topicId: "special-senses",
    fact: "Phototransduction: light causes rhodopsin's retinal to isomerize, activating transducin, which activates phosphodiesterase to break down cGMP, closing Na+ channels and hyperpolarizing the photoreceptor.",
    question: "Does light hyperpolarize or depolarize a photoreceptor cell?",
    answer:
      "Hyperpolarizes it — light closes cGMP-gated Na+ channels, reducing the 'dark current.'",
    priority: "important",
  },
  {
    id: "ss-3",
    topicId: "special-senses",
    fact: "Sound is transduced in the cochlea by hair cells on the basilar membrane; high frequencies are detected near the base (stiff, narrow) and low frequencies near the apex (flexible, wide) — tonotopic organization.",
    question: "Where in the cochlea are high-frequency sounds detected?",
    answer: "Near the base of the cochlea, where the basilar membrane is stiff and narrow.",
    priority: "important",
  },
  {
    id: "ss-4",
    topicId: "special-senses",
    fact: "The vestibular system (semicircular canals for rotation, utricle/saccule for linear acceleration and head position) works with vision and proprioception to maintain balance.",
    question: "What do the semicircular canals detect?",
    answer: "Rotational (angular) acceleration of the head.",
  },
  {
    id: "ss-5",
    topicId: "special-senses",
    fact: "Presbyopia is the age-related loss of lens elasticity, reducing accommodation and near-vision ability — distinct from myopia/hyperopia, which are refractive errors related to eyeball shape.",
    question: "What causes presbyopia?",
    answer:
      "Age-related loss of lens elasticity, reducing the eye's ability to accommodate for near vision.",
    priority: "important",
  },
  {
    id: "ss-6",
    topicId: "special-senses",
    fact: "Taste is mediated by five basic modalities (sweet, sour, salty, bitter, umami) detected by taste receptor cells in taste buds, while smell relies on olfactory receptor neurons directly exposed to the nasal cavity.",
    question: "How many basic taste modalities are classically recognized?",
    answer: "Five — sweet, sour, salty, bitter, and umami.",
  },

  // ---- Cardiovascular System ----
  {
    id: "cvs-1",
    topicId: "cvs",
    fact: "The cardiac cycle consists of systole (ventricular contraction/ejection) and diastole (ventricular relaxation/filling); the first heart sound (S1) marks AV valve closure at the start of systole, S2 marks semilunar valve closure at the start of diastole.",
    question: "What event does the first heart sound (S1) correspond to?",
    answer: "Closure of the AV valves (mitral and tricuspid) at the start of ventricular systole.",
    priority: "must-know",
  },
  {
    id: "cvs-2",
    topicId: "cvs",
    fact: "The SA node is the heart's primary pacemaker due to its fastest intrinsic rate of spontaneous depolarization; if it fails, the AV node (slower) or ventricular tissue (slowest) can take over.",
    question: "Why is the SA node the normal pacemaker of the heart?",
    answer:
      "It has the fastest intrinsic rate of spontaneous depolarization among cardiac conduction tissues.",
    priority: "must-know",
  },
  {
    id: "cvs-3",
    topicId: "cvs",
    fact: "Cardiac output = stroke volume × heart rate; stroke volume is influenced by preload (Frank-Starling law), afterload, and contractility.",
    question: "What is the formula for cardiac output?",
    answer: "Cardiac output = stroke volume × heart rate.",
    priority: "must-know",
  },
  {
    id: "cvs-4",
    topicId: "cvs",
    fact: "The Frank-Starling law states that within physiological limits, increased venous return (preload) stretches cardiac muscle fibers, increasing the force of contraction and stroke volume.",
    question: "What does the Frank-Starling law describe?",
    answer:
      "That increased ventricular filling (preload) increases the force of the subsequent contraction, up to a physiological limit.",
    priority: "must-know",
  },
  {
    id: "cvs-5",
    topicId: "cvs",
    fact: "Baroreceptors in the carotid sinus and aortic arch sense blood pressure changes and, via the vasomotor center, trigger reflex changes in heart rate and vascular tone to buffer acute BP swings.",
    question: "Where are the main arterial baroreceptors located?",
    answer: "The carotid sinus and the aortic arch.",
    priority: "must-know",
  },
  {
    id: "cvs-6",
    topicId: "cvs",
    fact: "Mean arterial pressure (MAP) ≈ diastolic pressure + 1/3 (systolic - diastolic pressure); it represents the average pressure driving tissue perfusion across the cardiac cycle.",
    question: "What is the approximate formula for mean arterial pressure?",
    answer: "MAP ≈ diastolic pressure + 1/3(systolic − diastolic pressure).",
    priority: "must-know",
  },
  {
    id: "cvs-7",
    topicId: "cvs",
    fact: "The QRS complex on an ECG represents ventricular depolarization; the T wave represents ventricular repolarization. The P wave represents atrial depolarization.",
    question: "What does the QRS complex on an ECG represent?",
    answer: "Ventricular depolarization.",
    priority: "must-know",
  },
  {
    id: "cvs-8",
    topicId: "cvs",
    fact: "Physiological splitting of S2 widens during inspiration: negative intrathoracic pressure increases venous return to the right heart, delaying pulmonary valve closure relative to the aortic valve.",
    question: "Why does S2 splitting widen during inspiration?",
    answer:
      "Increased venous return to the right heart during inspiration delays pulmonary valve closure relative to aortic valve closure.",
    priority: "important",
  },
  {
    id: "cvs-9",
    topicId: "cvs",
    fact: "The jugular venous pulse shows three waves: 'a' (atrial contraction), 'c' (tricuspid valve bulging into the atrium during early ventricular systole), and 'v' (venous filling of the atrium against a closed tricuspid valve).",
    question: "Which jugular venous pulse wave corresponds to atrial contraction?",
    answer: "The 'a' wave.",
  },
  {
    id: "cvs-10",
    topicId: "cvs",
    fact: "Unlike other organs, left coronary blood flow occurs mainly during diastole, because ventricular contraction during systole compresses the intramural coronary vessels and impedes flow.",
    question: "Why does most left coronary blood flow occur during diastole rather than systole?",
    answer:
      "Because ventricular systole compresses the intramural coronary vessels, impeding flow — so most left coronary perfusion happens during diastolic relaxation.",
    priority: "must-know",
  },
  {
    id: "cvs-11",
    topicId: "cvs",
    fact: "Local blood flow autoregulation (myogenic and metabolic mechanisms) keeps organ perfusion relatively constant despite changes in arterial pressure — especially well-developed in the brain, heart, and kidney.",
    question: "Which three organs have especially well-developed blood flow autoregulation?",
    answer: "The brain, heart, and kidney.",
    priority: "important",
  },

  // ---- Respiratory System ----
  {
    id: "resp-1",
    topicId: "respiratory",
    fact: "Tidal volume (~500 mL) is the air moved in a normal breath; vital capacity is the maximum air that can be exhaled after maximal inhalation; residual volume (air remaining after maximal exhalation) cannot be measured by spirometry alone.",
    question: "Why can't residual volume be measured directly by spirometry?",
    answer:
      "Because it is the air remaining in the lungs after maximal exhalation — spirometry can only measure volumes that are actually exhaled/inhaled.",
    priority: "must-know",
  },
  {
    id: "resp-2",
    topicId: "respiratory",
    fact: "The oxygen-hemoglobin dissociation curve shifts right (lower O2 affinity, easier unloading to tissues) with increased CO2, decreased pH, increased temperature, and increased 2,3-BPG — the Bohr effect.",
    question: "What is the Bohr effect?",
    answer:
      "A rightward shift of the O2-Hb dissociation curve (reduced O2 affinity) caused by increased CO2/decreased pH, favoring O2 unloading to metabolically active tissue.",
    priority: "must-know",
  },
  {
    id: "resp-3",
    topicId: "respiratory",
    fact: "Most CO2 is transported in blood as bicarbonate (formed via carbonic anhydrase in RBCs), with smaller amounts dissolved in plasma or bound to hemoglobin as carbaminohemoglobin.",
    question: "In what form is most CO2 transported in the blood?",
    answer: "As bicarbonate (HCO3-), formed inside RBCs via carbonic anhydrase.",
    priority: "must-know",
  },
  {
    id: "resp-4",
    topicId: "respiratory",
    fact: "The dorsal respiratory group in the medulla sets the basic rhythm of breathing; the pontine respiratory (pneumotaxic) center fine-tunes rate and depth, particularly limiting inspiration duration.",
    question: "Which brainstem region sets the basic automatic rhythm of breathing?",
    answer: "The dorsal respiratory group in the medulla.",
    priority: "important",
  },
  {
    id: "resp-5",
    topicId: "respiratory",
    fact: "Central chemoreceptors in the medulla respond primarily to CSF pH (reflecting CO2 levels, since CO2 crosses the blood-brain barrier and is hydrated to carbonic acid), making CO2 the dominant driver of minute ventilation under normal conditions.",
    question: "What is the dominant stimulus for central chemoreceptors regulating breathing?",
    answer: "CO2 (via its effect on CSF pH), not O2, under normal conditions.",
    priority: "must-know",
  },
  {
    id: "resp-6",
    topicId: "respiratory",
    fact: "Surfactant, produced by type II pneumocytes, reduces alveolar surface tension, preventing alveolar collapse (atelectasis); its deficiency causes neonatal respiratory distress syndrome in premature infants.",
    question: "What is the physiological role of pulmonary surfactant?",
    answer:
      "It reduces alveolar surface tension, preventing alveolar collapse, especially in smaller alveoli (Laplace's law).",
    priority: "must-know",
  },
  {
    id: "resp-7",
    topicId: "respiratory",
    fact: "Due to gravity, the lung apex has a relatively higher ventilation-perfusion (V/Q) ratio (dead-space-like, over-ventilated relative to perfusion), while the base has a lower V/Q ratio (shunt-like, over-perfused relative to ventilation).",
    question: "Which region of the upright lung has the highest V/Q ratio?",
    answer: "The apex — it is relatively over-ventilated compared to its perfusion.",
    priority: "must-know",
  },
  {
    id: "resp-8",
    topicId: "respiratory",
    fact: "CO2 diffuses across the alveolar-capillary membrane roughly 20 times faster than O2 despite similar molecular size, because CO2 is far more soluble in the membrane — so diffusion-limited gas exchange affects O2 (e.g. in fibrosis) before CO2.",
    question:
      "Why does CO2 diffuse faster than O2 across the alveolar membrane despite similar size?",
    answer:
      "Because CO2 is roughly 20 times more soluble in the alveolar membrane than O2, and diffusion rate depends on solubility as well as size.",
  },
  {
    id: "resp-9",
    topicId: "respiratory",
    fact: "The Hering-Breuer inflation reflex: stretch receptors in the airway smooth muscle, activated by lung distension, signal via the vagus nerve to inhibit further inspiration and prevent overinflation.",
    question: "What triggers the Hering-Breuer reflex and what does it prevent?",
    answer:
      "Lung stretch receptor activation during inspiration, signaling via the vagus nerve to inhibit further inspiration and prevent lung overinflation.",
    priority: "important",
  },
  {
    id: "resp-10",
    topicId: "respiratory",
    fact: "The Haldane effect: deoxygenated hemoglobin has a higher affinity for CO2 and H+ than oxygenated hemoglobin, so deoxygenation in the tissues promotes CO2 loading, while oxygenation in the lungs promotes CO2 unloading.",
    question: "What is the Haldane effect?",
    answer:
      "Deoxyhemoglobin binds CO2/H+ more readily than oxyhemoglobin, so deoxygenation favors CO2 loading in tissues and oxygenation favors CO2 unloading in the lungs.",
    priority: "must-know",
  },

  // ---- Renal Physiology ----
  {
    id: "renal-1",
    topicId: "renal",
    fact: "Glomerular filtration rate (GFR) is normally ~120 mL/min and is estimated clinically using creatinine clearance, since creatinine is freely filtered and minimally secreted/reabsorbed.",
    question: "Why is creatinine used to estimate GFR?",
    answer:
      "Because it is freely filtered at the glomerulus and undergoes minimal tubular reabsorption or secretion, closely reflecting filtration alone.",
    priority: "must-know",
    nmcCompetency: "PY7.3",
  },
  {
    id: "renal-2",
    topicId: "renal",
    fact: "The proximal convoluted tubule reabsorbs the bulk (~65%) of filtered Na+, water, glucose, and amino acids; glucose reabsorption here is via SGLT2 and is saturable (glucosuria occurs above the renal threshold, ~180 mg/dL).",
    question: "What causes glucosuria once blood glucose exceeds the renal threshold?",
    answer:
      "The SGLT2 transporters in the proximal tubule become saturated and can no longer reabsorb all filtered glucose.",
    priority: "must-know",
  },
  {
    id: "renal-3",
    topicId: "renal",
    fact: "The loop of Henle's countercurrent multiplier system (thick ascending limb actively pumps Na-K-2Cl, impermeable to water) creates the medullary concentration gradient that allows the collecting duct to concentrate urine under ADH influence.",
    question:
      "Which nephron segment establishes the medullary osmotic gradient used to concentrate urine?",
    answer: "The loop of Henle (via its countercurrent multiplier mechanism).",
    priority: "must-know",
    nmcCompetency: "PY7.4",
  },
  {
    id: "renal-4",
    topicId: "renal",
    fact: "Aldosterone acts on the distal tubule/collecting duct to increase Na+ reabsorption (and water follows) and K+/H+ secretion, in response to angiotensin II or elevated plasma K+.",
    question: "What are the two main effects of aldosterone on the distal nephron?",
    answer: "Increased Na+ (and water) reabsorption, and increased K+/H+ secretion.",
    priority: "must-know",
    nmcCompetency: "PY7.5",
  },
  {
    id: "renal-5",
    topicId: "renal",
    fact: "The kidney compensates for a primary respiratory acid-base disorder by adjusting bicarbonate reabsorption/generation, but this renal compensation takes days, unlike the rapid (minutes) respiratory compensation for a metabolic disorder.",
    question: "Which compensation mechanism is slower — renal or respiratory?",
    answer: "Renal compensation, which takes days rather than minutes.",
    priority: "important",
    nmcCompetency: "PY7.5",
  },
  {
    id: "renal-6",
    topicId: "renal",
    fact: "Renin, released by juxtaglomerular cells in response to low renal perfusion pressure, low NaCl delivery to the macula densa, or sympathetic stimulation, initiates the renin-angiotensin-aldosterone system.",
    question: "What three stimuli trigger renin release from juxtaglomerular cells?",
    answer:
      "Low renal perfusion pressure, low NaCl delivery to the macula densa, and increased sympathetic activity.",
    priority: "must-know",
    nmcCompetency: "PY7.2",
  },
  {
    id: "renal-7",
    topicId: "renal",
    fact: "Angiotensin II preferentially constricts the efferent arteriole over the afferent arteriole, which raises filtration fraction (GFR/renal plasma flow) and helps preserve GFR even when renal blood flow falls — the rationale for caution with ACE inhibitors in bilateral renal artery stenosis.",
    question:
      "Why can ACE inhibitors precipitate acute kidney injury in bilateral renal artery stenosis?",
    answer:
      "They remove angiotensin II's preferential efferent arteriolar constriction, which was maintaining GFR despite reduced renal blood flow — GFR then falls sharply.",
    priority: "important",
  },
  {
    id: "renal-8",
    topicId: "renal",
    fact: "Distal (type 1) renal tubular acidosis results from failure of the distal tubule to secrete H+ (low urine acidification, urine pH stays above 5.5), while proximal (type 2) RTA results from impaired bicarbonate reabsorption in the proximal tubule.",
    question: "What is the key functional defect in distal (type 1) renal tubular acidosis?",
    answer:
      "Failure of the distal tubule to secrete H+, so the urine cannot be acidified below pH 5.5 even with systemic acidosis.",
  },
  {
    id: "renal-9",
    topicId: "renal",
    fact: "The micturition reflex is a parasympathetic (pelvic nerve) spinal reflex that contracts the detrusor muscle and relaxes the internal urethral sphincter; voluntary control of the external urethral sphincter (pudendal nerve) allows conscious postponement of voiding.",
    question: "Which nerve provides voluntary control over the external urethral sphincter?",
    answer: "The pudendal nerve (somatic, voluntary control).",
  },
  {
    id: "renal-10",
    topicId: "renal",
    fact: "Free water clearance is negative when urine is more concentrated than plasma (net free water reabsorption, high ADH) and positive when urine is more dilute than plasma (net free water excretion, low ADH) — it quantifies the kidney's diluting/concentrating activity.",
    question:
      "Is free water clearance positive or negative when the kidney is producing concentrated urine under high ADH?",
    answer: "Negative — the kidney is net reabsorbing free water to concentrate the urine.",
  },

  // ---- Gastrointestinal System ----
  {
    id: "gi-1",
    topicId: "gi",
    fact: "Gastrin, secreted by G cells in the stomach antrum, stimulates gastric acid secretion by parietal cells; its release is inhibited by low gastric pH (negative feedback).",
    question: "What inhibits gastrin release from G cells?",
    answer: "A low (acidic) gastric pH — a negative feedback loop.",
    priority: "must-know",
  },
  {
    id: "gi-2",
    topicId: "gi",
    fact: "Secretin, released by S cells in the duodenum in response to acidic chyme, stimulates pancreatic bicarbonate secretion to neutralize the acid entering the small intestine.",
    question: "What triggers secretin release, and what is its main action?",
    answer:
      "Acidic chyme entering the duodenum triggers secretin, which stimulates pancreatic bicarbonate secretion.",
    priority: "must-know",
  },
  {
    id: "gi-3",
    topicId: "gi",
    fact: "Cholecystokinin (CCK), released by I cells in response to fat and protein in the duodenum, stimulates gallbladder contraction and pancreatic enzyme secretion, and slows gastric emptying.",
    question: "What stimulates cholecystokinin (CCK) release?",
    answer: "Fat and protein content in the duodenum.",
    priority: "must-know",
  },
  {
    id: "gi-4",
    topicId: "gi",
    fact: "The migrating motor complex (MMC) is a cyclic pattern of GI motility that occurs during fasting to sweep residual contents through the GI tract, and is suppressed by feeding.",
    question: "When does the migrating motor complex occur?",
    answer: "During the fasting state, between meals — it is suppressed by feeding.",
  },
  {
    id: "gi-5",
    topicId: "gi",
    fact: "Intrinsic factor, secreted by gastric parietal cells, is required for vitamin B12 absorption in the terminal ileum; loss of parietal cells (as in pernicious anemia) causes B12 deficiency.",
    question: "Which gastric cell secretes intrinsic factor?",
    answer: "Parietal cells.",
    priority: "must-know",
  },
  {
    id: "gi-6",
    topicId: "gi",
    fact: "The enteric nervous system, embedded in the gut wall (myenteric and submucosal plexuses), can control GI motility and secretion independently of the CNS, earning it the nickname 'the second brain.'",
    question: "What are the two main plexuses of the enteric nervous system?",
    answer: "The myenteric (Auerbach's) plexus and the submucosal (Meissner's) plexus.",
  },
  {
    id: "gi-7",
    topicId: "gi",
    fact: "Bile salts undergo enterohepatic circulation: after aiding fat digestion, ~95% are actively reabsorbed in the terminal ileum and returned to the liver via the portal vein, allowing the same bile salt pool to be recycled several times per meal.",
    question: "Where are bile salts reabsorbed in enterohepatic circulation?",
    answer:
      "The terminal ileum, via active transport, then returned to the liver via the portal vein.",
    priority: "important",
  },
  {
    id: "gi-8",
    topicId: "gi",
    fact: "Pancreatic proteolytic enzymes are secreted as inactive zymogens (trypsinogen, chymotrypsinogen); trypsinogen is activated to trypsin by enterokinase on the duodenal brush border, which then activates the remaining zymogens — protecting the pancreas from autodigestion.",
    question: "What enzyme activates trypsinogen to trypsin in the duodenum?",
    answer: "Enterokinase (enteropeptidase), on the duodenal brush border.",
    priority: "must-know",
  },

  // ---- Endocrine Physiology ----
  {
    id: "endo-1",
    topicId: "endocrine",
    fact: "The hypothalamic-pituitary axis regulates most endocrine glands via releasing hormones (from the hypothalamus) controlling anterior pituitary tropic hormones, which in turn control peripheral gland output — with negative feedback at each level.",
    question: "What is the general 3-tier structure of most hypothalamic-pituitary endocrine axes?",
    answer:
      "Hypothalamic releasing hormone → anterior pituitary tropic hormone → peripheral endocrine gland hormone, with negative feedback throughout.",
  },
  {
    id: "endo-2",
    topicId: "endocrine",
    fact: "Insulin, secreted by pancreatic beta cells in response to rising blood glucose, promotes glucose uptake (via GLUT4 in muscle/fat), glycogenesis, and lipogenesis — the primary anabolic, fed-state hormone.",
    question: "Which GLUT transporter does insulin recruit to the cell membrane in muscle and fat?",
    answer: "GLUT4.",
    priority: "important",
  },
  {
    id: "endo-3",
    topicId: "endocrine",
    fact: "Cortisol, released from the adrenal cortex under ACTH stimulation, raises blood glucose (via gluconeogenesis), has anti-inflammatory/immunosuppressive effects, and follows a diurnal rhythm peaking in the early morning.",
    question: "What is the diurnal pattern of cortisol secretion?",
    answer: "Highest in the early morning, lowest around midnight.",
    priority: "must-know",
  },
  {
    id: "endo-4",
    topicId: "endocrine",
    fact: "Thyroid hormone (T3/T4) increases basal metabolic rate, oxygen consumption, and heat production in most tissues, and is essential for normal growth and neural development, especially in fetal/early life.",
    question: "Why is thyroid hormone particularly critical during fetal development?",
    answer:
      "It is essential for normal neural development — deficiency during this period causes irreversible intellectual disability (cretinism).",
    priority: "must-know",
  },
  {
    id: "endo-5",
    topicId: "endocrine",
    fact: "Parathyroid hormone (PTH) raises serum calcium by increasing bone resorption, renal calcium reabsorption, and renal activation of vitamin D (which increases intestinal calcium absorption).",
    question: "Name the three mechanisms by which PTH raises serum calcium.",
    answer:
      "Increased bone resorption, increased renal Ca2+ reabsorption, and increased renal activation of vitamin D (boosting intestinal absorption).",
    priority: "must-know",
  },
  {
    id: "endo-6",
    topicId: "endocrine",
    fact: "Growth hormone acts both directly (e.g. on lipolysis) and indirectly via IGF-1 (produced mainly by the liver) to promote linear bone growth, protein synthesis, and growth in children and adolescents.",
    question:
      "Through what intermediate does growth hormone exert most of its growth-promoting effects?",
    answer: "IGF-1 (insulin-like growth factor 1), produced mainly by the liver.",
  },
  {
    id: "endo-7",
    topicId: "endocrine",
    fact: "Serum calcium is jointly regulated by PTH (raises calcium), calcitonin (lowers calcium, from thyroid C cells), and activated vitamin D; vitamin D requires sequential hydroxylation in the liver (25-OH) and kidney (1,25-(OH)2, the active form, via 1-alpha-hydroxylase).",
    question: "In which organ does the final activating hydroxylation step of vitamin D occur?",
    answer: "The kidney (1-alpha-hydroxylation to form active 1,25-dihydroxyvitamin D).",
    priority: "important",
  },
  {
    id: "endo-8",
    topicId: "endocrine",
    fact: "ADH (vasopressin) release is stimulated mainly by rising plasma osmolality (sensed by hypothalamic osmoreceptors) and, less sensitively, by falling blood volume/pressure (sensed by baroreceptors); it acts on renal V2 receptors to insert aquaporin-2 channels in the collecting duct.",
    question:
      "Which renal receptor and channel mediate ADH's water-reabsorbing action in the collecting duct?",
    answer:
      "V2 receptors, which trigger insertion of aquaporin-2 water channels into the collecting duct membrane.",
    priority: "must-know",
  },
  {
    id: "endo-9",
    topicId: "endocrine",
    fact: "The adrenal medulla secretes mostly epinephrine (via PNMT, an enzyme induced by the high local cortisol concentration draining from the adjacent adrenal cortex), mediating the fight-or-flight response predominantly through beta-adrenergic receptors.",
    question:
      "Why does the adrenal medulla predominantly produce epinephrine rather than norepinephrine?",
    answer:
      "High local cortisol from the adjacent adrenal cortex induces PNMT, the enzyme that converts norepinephrine to epinephrine.",
  },
  {
    id: "endo-10",
    topicId: "endocrine",
    fact: "Central diabetes insipidus (deficient ADH secretion) and nephrogenic diabetes insipidus (renal resistance to ADH) both cause dilute polyuria, but only central DI responds to desmopressin (synthetic ADH) with reduced urine output.",
    question:
      "How can central and nephrogenic diabetes insipidus be distinguished using desmopressin?",
    answer:
      "Central DI responds to desmopressin with decreased urine output (concentrated urine), while nephrogenic DI does not respond, since the kidney itself is resistant to ADH.",
    priority: "must-know",
  },

  // ---- Reproductive Physiology ----
  {
    id: "repro-1",
    topicId: "reproductive",
    fact: "The menstrual cycle's follicular phase is driven by rising estrogen from the developing follicle; a mid-cycle LH surge (triggered by high estrogen via positive feedback) causes ovulation.",
    question: "What triggers the LH surge that causes ovulation?",
    answer:
      "A sustained high level of estrogen from the dominant follicle, acting via positive feedback on the hypothalamus/pituitary.",
    priority: "must-know",
    nmcCompetency: "PY9.4",
  },
  {
    id: "repro-2",
    topicId: "reproductive",
    fact: "After ovulation, the corpus luteum secretes progesterone, which maintains the secretory endometrium; if fertilization doesn't occur, the corpus luteum regresses, progesterone falls, and menstruation follows.",
    question: "What structure secretes progesterone after ovulation?",
    answer: "The corpus luteum.",
  },
  {
    id: "repro-3",
    topicId: "reproductive",
    fact: "Human chorionic gonadotropin (hCG), secreted by the syncytiotrophoblast after implantation, maintains the corpus luteum (and thus progesterone) until the placenta takes over steroidogenesis around 8-10 weeks.",
    question: "What hormone maintains the corpus luteum in early pregnancy?",
    answer: "Human chorionic gonadotropin (hCG).",
    priority: "must-know",
  },
  {
    id: "repro-4",
    topicId: "reproductive",
    fact: "Spermatogenesis occurs in the seminiferous tubules under FSH (acting on Sertoli cells) and LH (acting on Leydig cells to produce testosterone) stimulation, taking approximately 64-74 days to complete.",
    question: "Which pituitary hormone acts on Leydig cells to stimulate testosterone production?",
    answer: "LH (luteinizing hormone).",
    priority: "important",
    nmcCompetency: "PY9.3",
  },
  {
    id: "repro-5",
    topicId: "reproductive",
    fact: "Oxytocin drives uterine contractions during labor (positive feedback loop — contraction stretches the cervix, further stimulating oxytocin release) and the milk let-down reflex during lactation.",
    question:
      "Why is the oxytocin-driven uterine contraction of labor considered a positive feedback loop?",
    answer:
      "Cervical stretching from contractions stimulates more oxytocin release, which causes stronger contractions, progressively amplifying rather than dampening the response.",
    priority: "must-know",
    nmcCompetency: "PY9.8",
  },
  {
    id: "repro-6",
    topicId: "reproductive",
    fact: "Prolactin stimulates milk production and, at high levels during lactation, suppresses GnRH release, contributing to lactational amenorrhea (a natural, though not fully reliable, contraceptive effect).",
    question: "How does prolactin contribute to lactational amenorrhea?",
    answer: "High prolactin suppresses GnRH release, which reduces LH/FSH and therefore ovulation.",
    priority: "supporting",
    nmcCompetency: "PY9.8",
  },

  // ---- Integrated Physiology ----
  {
    id: "int-1",
    topicId: "integrated",
    fact: "During dynamic exercise, cardiac output rises mainly through increased heart rate (stroke volume plateaus earlier), while total peripheral resistance falls overall as vasodilation in exercising muscle outweighs vasoconstriction elsewhere.",
    question: "What is the main driver of increased cardiac output during dynamic exercise?",
    answer:
      "Increased heart rate — stroke volume rises early but plateaus, so further increases in cardiac output come mainly from heart rate.",
  },
  {
    id: "int-2",
    topicId: "integrated",
    fact: "The hypothalamic thermoregulatory center maintains core temperature via a negative feedback set point; in fever, pyrogens (e.g. IL-1, IL-6) raise this set point itself, so the body generates heat (shivering, vasoconstriction) to reach the new, higher target.",
    question: "What actually changes in the hypothalamus during a fever?",
    answer:
      "The thermoregulatory set point is raised by pyrogens, so the body actively generates and conserves heat to reach the new, higher target temperature.",
    priority: "important",
  },
  {
    id: "int-3",
    topicId: "integrated",
    fact: "Acclimatization to heat increases sweat gland output and reduces sweat sodium concentration (via aldosterone-driven reabsorption in the duct), improving evaporative cooling while conserving electrolytes.",
    question: "What is the key sweat gland adaptation seen with heat acclimatization?",
    answer:
      "Increased total sweat output with reduced sweat sodium concentration, improving cooling while conserving salt.",
  },
  {
    id: "int-4",
    topicId: "integrated",
    fact: "Ageing is associated with a progressive decline in maximal heart rate, VO2 max, GFR, and homeostatic reserve generally — the reduced ability to respond to physiological stress rather than resting values changing dramatically.",
    question: "What best characterizes the physiological effect of normal ageing on organ systems?",
    answer:
      "A reduced homeostatic reserve — the capacity to respond to stress declines more than resting baseline function.",
  },
  {
    id: "int-5",
    topicId: "integrated",
    fact: "In obesity and metabolic syndrome, expanded adipose tissue (especially visceral fat) secretes excess free fatty acids and inflammatory adipokines that promote insulin resistance in muscle and liver, raising the risk of type 2 diabetes.",
    question: "How does visceral adiposity contribute to insulin resistance?",
    answer:
      "It releases excess free fatty acids and pro-inflammatory adipokines that impair insulin signaling in muscle and liver.",
    priority: "important",
  },
  {
    id: "int-6",
    topicId: "integrated",
    fact: "Brain death is defined by the irreversible loss of all brainstem functions (including brainstem reflexes and the capacity to breathe spontaneously) despite a still-beating heart, and is a clinical diagnosis distinct from a persistent vegetative state.",
    question: "What distinguishes brain death from a persistent vegetative state?",
    answer:
      "Brain death is irreversible loss of all brainstem function, including the drive to breathe; in a vegetative state, brainstem function (including spontaneous breathing) is preserved.",
    priority: "must-know",
  },
  {
    id: "int-7",
    topicId: "integrated",
    fact: "In adult basic life support, high-quality chest compressions (rate 100-120/min, depth ~5-6 cm, allowing full chest recoil) generate forward blood flow mainly via direct cardiac compression and thoracic pump mechanisms, sustaining perfusion to the brain and heart until defibrillation/advanced care.",
    question: "What is the recommended chest compression rate in adult BLS?",
    answer: "100-120 compressions per minute, with a depth of about 5-6 cm and full chest recoil.",
    priority: "must-know",
    nmcCompetency: "PY11.14",
  },
  {
    id: "int-8",
    topicId: "integrated",
    fact: "Slow, controlled yogic breathing (pranayama) and meditation increase parasympathetic and reduce sympathetic tone, lowering heart rate and blood pressure — measurable via increased heart rate variability, and studied as adjuncts in hypertension and stress management.",
    question: "What autonomic shift is associated with slow yogic breathing and meditation?",
    answer:
      "A shift toward parasympathetic dominance and reduced sympathetic tone, reflected in increased heart rate variability.",
  },
];

// Revision-priority tiers per module — a study-navigation aid, NOT an
// official NBEMS/NMC blueprint or published weightage. We deliberately
// avoid showing percentages or claimed question counts here.
export const WEIGHTAGE_META: Record<
  Weightage,
  { label: string; description: string; color: { bg: string; fg: string; ring: string } }
> = {
  "very-high": {
    label: "VERY HIGH",
    description: "High-Yield Priority — among the modules most worth prioritizing in revision.",
    color: { bg: "oklch(0.91 0.1 15)", fg: "oklch(0.4 0.16 15)", ring: "oklch(0.58 0.19 15)" },
  },
  high: {
    label: "HIGH",
    description: "High-Yield Priority — comes up reliably, often integrated with medicine.",
    color: { bg: "oklch(0.92 0.12 45)", fg: "oklch(0.4 0.13 45)", ring: "oklch(0.62 0.17 45)" },
  },
  moderate: {
    label: "MODERATE",
    description: "High-Yield Priority — a steadier, smaller share of revision time.",
    color: { bg: "oklch(0.92 0.08 195)", fg: "oklch(0.34 0.09 210)", ring: "oklch(0.55 0.11 200)" },
  },
  foundational: {
    label: "FOUNDATION",
    description: "High-Yield Priority — groundwork other modules build on.",
    color: { bg: "oklch(0.95 0.015 105)", fg: "oklch(0.42 0.03 260)", ring: "oklch(0.6 0.02 260)" },
  },
};

export const PRIORITY_META: Record<
  NonNullable<FactItem["priority"]>,
  { label: string; emoji: string }
> = {
  "must-know": { label: "MUST KNOW", emoji: "🔴" },
  important: { label: "IMPORTANT", emoji: "🟠" },
  supporting: { label: "SUPPORTING", emoji: "⚪" },
};
