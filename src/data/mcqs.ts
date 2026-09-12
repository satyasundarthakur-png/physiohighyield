export interface McqItem {
  id: string;
  topicId: string;
  question: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  explanation: string;
  /**
   * Optional metadata, populated only when verified — left undefined
   * otherwise rather than guessed. System/priority context is otherwise
   * derived at render time from the question's topicId -> Topic lookup.
   */
  nmcCompetency?: string;
  pyq?: boolean;
  priority?: "must-know" | "important" | "supporting";
}

export const MCQS: McqItem[] = [
  {
    id: "mcq-01",
    topicId: "nerve-muscle",
    question:
      "Which phase of the cardiac/nerve action potential is caused by inactivation of voltage-gated Na+ channels?",
    options: [
      { id: "a", text: "Depolarization" },
      { id: "b", text: "Absolute refractory period" },
      { id: "c", text: "Resting potential" },
      { id: "d", text: "Hyperpolarization only" },
    ],
    correctOptionId: "b",
    explanation:
      "Na+ channel inactivation (not just closing) makes the membrane unable to fire a new action potential regardless of stimulus strength — the absolute refractory period.",
  },
  {
    id: "mcq-02",
    topicId: "cvs",
    question:
      "Which heart sound corresponds to closure of the semilunar (aortic and pulmonary) valves?",
    options: [
      { id: "a", text: "S1" },
      { id: "b", text: "S2" },
      { id: "c", text: "S3" },
      { id: "d", text: "S4" },
    ],
    correctOptionId: "b",
    explanation:
      "S2 marks the closure of the aortic and pulmonary valves at the end of ventricular systole, the start of diastole.",
  },
  {
    id: "mcq-03",
    topicId: "respiratory",
    question:
      "A rightward shift of the oxygen-hemoglobin dissociation curve occurs with which of the following?",
    options: [
      { id: "a", text: "Decreased temperature" },
      { id: "b", text: "Decreased 2,3-BPG" },
      { id: "c", text: "Increased CO2 (Bohr effect)" },
      { id: "d", text: "Increased pH" },
    ],
    correctOptionId: "c",
    explanation:
      "Increased CO2 (and the resulting decreased pH) shifts the curve right, reducing hemoglobin's O2 affinity and favoring unloading to tissue — the Bohr effect.",
  },
  {
    id: "mcq-04",
    topicId: "renal",
    question: "Which nephron segment reabsorbs the majority (~65%) of filtered sodium and water?",
    options: [
      { id: "a", text: "Proximal convoluted tubule" },
      { id: "b", text: "Loop of Henle" },
      { id: "c", text: "Distal convoluted tubule" },
      { id: "d", text: "Collecting duct" },
    ],
    correctOptionId: "a",
    explanation:
      "The proximal convoluted tubule reabsorbs roughly two-thirds of filtered Na+, water, glucose, and amino acids.",
  },
  {
    id: "mcq-05",
    topicId: "gi",
    question:
      "Which GI hormone is primarily responsible for stimulating pancreatic bicarbonate secretion?",
    options: [
      { id: "a", text: "Gastrin" },
      { id: "b", text: "Cholecystokinin" },
      { id: "c", text: "Secretin" },
      { id: "d", text: "Motilin" },
    ],
    correctOptionId: "c",
    explanation:
      "Secretin, released in response to acidic chyme in the duodenum, stimulates the pancreas to secrete bicarbonate-rich fluid.",
  },
  {
    id: "mcq-06",
    topicId: "endocrine",
    question: "A patient has high TSH and low free T4. Where is the defect most likely located?",
    options: [
      { id: "a", text: "Hypothalamus" },
      { id: "b", text: "Anterior pituitary" },
      { id: "c", text: "Thyroid gland (primary hypothyroidism)" },
      { id: "d", text: "Peripheral T4-to-T3 conversion" },
    ],
    correctOptionId: "c",
    explanation:
      "High TSH with low T4 is the classic pattern of primary hypothyroidism — the pituitary is appropriately responding to low thyroid hormone by increasing TSH.",
  },
  {
    id: "mcq-07",
    topicId: "cns",
    question:
      "A patient shows ipsilateral ataxia and intention tremor. Which structure is most likely damaged?",
    options: [
      { id: "a", text: "Motor cortex" },
      { id: "b", text: "Cerebellum" },
      { id: "c", text: "Basal ganglia" },
      { id: "d", text: "Corticospinal tract" },
    ],
    correctOptionId: "b",
    explanation:
      "Cerebellar lesions classically cause ipsilateral ataxia, intention tremor, and dysdiadochokinesia — unlike most motor cortex/corticospinal lesions, which are contralateral.",
  },
  {
    id: "mcq-08",
    topicId: "blood",
    question:
      "Which blood type is considered the universal plasma donor (for plasma transfusion, not whole blood)?",
    options: [
      { id: "a", text: "Type O" },
      { id: "b", text: "Type AB" },
      { id: "c", text: "Type A" },
      { id: "d", text: "Type B" },
    ],
    correctOptionId: "b",
    explanation:
      "Type AB plasma contains neither anti-A nor anti-B antibodies, making it safe to give to recipients of any ABO type (opposite logic to universal RBC donor O).",
  },
  {
    id: "mcq-09",
    topicId: "reproductive",
    question: "What triggers ovulation in the normal menstrual cycle?",
    options: [
      { id: "a", text: "A sustained rise in progesterone" },
      { id: "b", text: "An FSH surge" },
      { id: "c", text: "An LH surge triggered by high estrogen (positive feedback)" },
      { id: "d", text: "A drop in estrogen" },
    ],
    correctOptionId: "c",
    explanation:
      "Sustained high estrogen from the dominant follicle switches from negative to positive feedback on the hypothalamus/pituitary, causing the LH surge that triggers ovulation.",
  },
  {
    id: "mcq-10",
    topicId: "general",
    question:
      "Which ion's transmembrane gradient is the primary determinant of the resting membrane potential in most cells?",
    options: [
      { id: "a", text: "Na+" },
      { id: "b", text: "K+" },
      { id: "c", text: "Ca2+" },
      { id: "d", text: "Cl-" },
    ],
    correctOptionId: "b",
    explanation:
      "The membrane's resting permeability is far higher for K+ than for other ions, so the resting potential sits close to the K+ equilibrium potential.",
  },
  {
    id: "mcq-11",
    topicId: "special-senses",
    question:
      "In phototransduction, what happens to cGMP-gated Na+ channels when light strikes a photoreceptor?",
    options: [
      { id: "a", text: "They open, causing depolarization" },
      { id: "b", text: "They close, causing hyperpolarization" },
      { id: "c", text: "They remain unchanged" },
      { id: "d", text: "They open only in cones, not rods" },
    ],
    correctOptionId: "b",
    explanation:
      "Light activates a cascade that breaks down cGMP, closing Na+ channels and hyperpolarizing the photoreceptor — the opposite of most sensory transduction.",
  },
  {
    id: "mcq-12",
    topicId: "cvs",
    question:
      "According to the Frank-Starling law, what happens to stroke volume when venous return (preload) increases, within physiological limits?",
    options: [
      { id: "a", text: "It decreases" },
      { id: "b", text: "It stays the same" },
      { id: "c", text: "It increases" },
      { id: "d", text: "It becomes unpredictable" },
    ],
    correctOptionId: "c",
    explanation:
      "Increased preload stretches cardiac muscle fibers, increasing the force of the subsequent contraction and therefore stroke volume — the Frank-Starling mechanism.",
  },
  {
    id: "mcq-13",
    topicId: "nerve-muscle",
    question: "Myasthenia gravis is caused by autoantibodies against which receptor?",
    options: [
      { id: "a", text: "Muscarinic acetylcholine receptor" },
      { id: "b", text: "Nicotinic acetylcholine receptor" },
      { id: "c", text: "GABA-A receptor" },
      { id: "d", text: "Voltage-gated calcium channel (presynaptic)" },
    ],
    correctOptionId: "b",
    explanation:
      "Myasthenia gravis targets postsynaptic nicotinic ACh receptors at the neuromuscular junction, causing fatigable weakness.",
  },
  {
    id: "mcq-14",
    topicId: "respiratory",
    question:
      "What is the main determinant of central chemoreceptor drive to breathe under normal conditions?",
    options: [
      { id: "a", text: "Arterial O2 level" },
      { id: "b", text: "CSF pH (reflecting CO2)" },
      { id: "c", text: "Hemoglobin concentration" },
      { id: "d", text: "Plasma potassium" },
    ],
    correctOptionId: "b",
    explanation:
      "CO2 diffuses into CSF and is hydrated to carbonic acid, lowering CSF pH, which is what central chemoreceptors primarily sense to drive minute ventilation.",
  },
  {
    id: "mcq-15",
    topicId: "renal",
    question:
      "Which hormone increases sodium reabsorption and potassium secretion in the distal nephron?",
    options: [
      { id: "a", text: "ADH (vasopressin)" },
      { id: "b", text: "Aldosterone" },
      { id: "c", text: "Atrial natriuretic peptide" },
      { id: "d", text: "Parathyroid hormone" },
    ],
    correctOptionId: "b",
    explanation:
      "Aldosterone acts on the distal tubule and collecting duct to increase Na+ reabsorption and K+/H+ secretion.",
  },
  {
    id: "mcq-16",
    topicId: "endocrine",
    question:
      "Through what intermediate does growth hormone exert most of its growth-promoting effects on bone?",
    options: [
      { id: "a", text: "Cortisol" },
      { id: "b", text: "IGF-1" },
      { id: "c", text: "Thyroid hormone" },
      { id: "d", text: "Insulin" },
    ],
    correctOptionId: "b",
    explanation:
      "Growth hormone stimulates hepatic (and local) production of IGF-1, which mediates most of its anabolic and growth-promoting effects.",
  },
  {
    id: "mcq-17",
    topicId: "blood",
    question: "What is the primary physiological stimulus for erythropoietin release?",
    options: [
      { id: "a", text: "High blood glucose" },
      { id: "b", text: "Tissue hypoxia" },
      { id: "c", text: "Low blood pressure alone" },
      { id: "d", text: "High plasma iron" },
    ],
    correctOptionId: "b",
    explanation:
      "Erythropoietin is released by the kidney in response to hypoxia, stimulating RBC production in bone marrow.",
  },
  {
    id: "mcq-18",
    topicId: "gi",
    question:
      "Loss of gastric parietal cells (as in pernicious anemia) most directly impairs absorption of which vitamin?",
    options: [
      { id: "a", text: "Vitamin C" },
      { id: "b", text: "Vitamin B12" },
      { id: "c", text: "Vitamin D" },
      { id: "d", text: "Folate" },
    ],
    correctOptionId: "b",
    explanation:
      "Parietal cells secrete intrinsic factor, required for B12 absorption in the terminal ileum; their loss causes B12 deficiency.",
  },
  {
    id: "mcq-19",
    topicId: "cns",
    question:
      "A positive Babinski sign (toe dorsiflexion with fanning) in an adult suggests damage to which pathway?",
    options: [
      { id: "a", text: "Corticospinal (upper motor neuron) tract" },
      { id: "b", text: "Peripheral sensory nerve" },
      { id: "c", text: "Neuromuscular junction" },
      { id: "d", text: "Cerebellar pathway" },
    ],
    correctOptionId: "a",
    explanation:
      "A positive Babinski sign in an adult indicates an upper motor neuron (corticospinal tract) lesion.",
  },
  {
    id: "mcq-20",
    topicId: "reproductive",
    question:
      "Why is the oxytocin-mediated uterine contraction during labor considered a positive feedback loop?",
    options: [
      { id: "a", text: "Contractions inhibit further oxytocin release" },
      { id: "b", text: "Cervical stretch from contractions stimulates more oxytocin release" },
      { id: "c", text: "Oxytocin levels stay constant throughout labor" },
      { id: "d", text: "Progesterone blocks the entire loop" },
    ],
    correctOptionId: "b",
    explanation:
      "Cervical stretching stimulates more oxytocin release, which causes stronger contractions — a self-amplifying (positive feedback) loop, unusual in physiology.",
  },
  {
    id: "mcq-21",
    topicId: "cvs",
    question:
      "Which jugular venous pulse wave results from tricuspid valve bulging into the right atrium during early ventricular systole?",
    options: [
      { id: "a", text: "a wave" },
      { id: "b", text: "c wave" },
      { id: "c", text: "v wave" },
      { id: "d", text: "x descent" },
    ],
    correctOptionId: "b",
    explanation:
      "The c wave reflects tricuspid valve closure bulging toward the atrium as ventricular pressure rises at the start of systole.",
  },
  {
    id: "mcq-22",
    topicId: "cvs",
    question:
      "Left coronary artery blood flow is greatest during which phase of the cardiac cycle?",
    options: [
      { id: "a", text: "Isovolumetric contraction" },
      { id: "b", text: "Systole" },
      { id: "c", text: "Diastole" },
      { id: "d", text: "It is constant throughout the cycle" },
    ],
    correctOptionId: "c",
    explanation:
      "Ventricular systole compresses the intramural coronary vessels, so most left coronary perfusion occurs during diastole.",
  },
  {
    id: "mcq-23",
    topicId: "respiratory",
    question: "Compared to the base of the upright lung, the apex has a:",
    options: [
      { id: "a", text: "Lower V/Q ratio" },
      { id: "b", text: "Higher V/Q ratio" },
      { id: "c", text: "Equal V/Q ratio" },
      { id: "d", text: "V/Q ratio of zero" },
    ],
    correctOptionId: "b",
    explanation:
      "The apex is relatively over-ventilated compared to its perfusion, giving it a higher V/Q ratio than the base.",
  },
  {
    id: "mcq-24",
    topicId: "respiratory",
    question: "The Haldane effect describes which relationship?",
    options: [
      { id: "a", text: "Deoxyhemoglobin binds CO2/H+ more readily than oxyhemoglobin" },
      { id: "b", text: "CO2 shifts the O2-Hb curve to the right" },
      { id: "c", text: "Oxyhemoglobin binds CO2 more readily than deoxyhemoglobin" },
      { id: "d", text: "Temperature has no effect on Hb-O2 affinity" },
    ],
    correctOptionId: "a",
    explanation:
      "Deoxygenated hemoglobin has a higher affinity for CO2 and H+, favoring CO2 loading in the tissues and unloading in the lungs (the Haldane effect) — distinct from the Bohr effect.",
  },
  {
    id: "mcq-25",
    topicId: "renal",
    question: "Distal (type 1) renal tubular acidosis is characterized by which finding?",
    options: [
      { id: "a", text: "Urine pH remains above 5.5 despite systemic acidosis" },
      { id: "b", text: "Impaired proximal bicarbonate reabsorption only" },
      { id: "c", text: "Normal urine acidification" },
      { id: "d", text: "Excess distal H+ secretion" },
    ],
    correctOptionId: "a",
    explanation:
      "In distal (type 1) RTA, the distal tubule cannot secrete H+, so the urine cannot be acidified below pH 5.5 even in the face of systemic acidosis.",
  },
  {
    id: "mcq-26",
    topicId: "renal",
    question:
      "Angiotensin II preferentially constricts which renal vessel, helping preserve GFR when renal blood flow falls?",
    options: [
      { id: "a", text: "Afferent arteriole" },
      { id: "b", text: "Efferent arteriole" },
      { id: "c", text: "Renal vein" },
      { id: "d", text: "Vasa recta only" },
    ],
    correctOptionId: "b",
    explanation:
      "Angiotensin II preferentially constricts the efferent arteriole, raising filtration fraction and helping maintain GFR despite reduced renal plasma flow.",
  },
  {
    id: "mcq-27",
    topicId: "endocrine",
    question:
      "Which renal receptor mediates ADH's action of inserting aquaporin-2 channels into the collecting duct?",
    options: [
      { id: "a", text: "V1 receptor" },
      { id: "b", text: "V2 receptor" },
      { id: "c", text: "Angiotensin AT1 receptor" },
      { id: "d", text: "Mineralocorticoid receptor" },
    ],
    correctOptionId: "b",
    explanation:
      "ADH acts on V2 receptors in the collecting duct principal cells, triggering insertion of aquaporin-2 water channels.",
  },
  {
    id: "mcq-28",
    topicId: "endocrine",
    question:
      "Desmopressin (synthetic ADH) reduces urine output in which type of diabetes insipidus?",
    options: [
      { id: "a", text: "Nephrogenic DI only" },
      { id: "b", text: "Central DI only" },
      { id: "c", text: "Both central and nephrogenic DI equally" },
      { id: "d", text: "Neither type" },
    ],
    correctOptionId: "b",
    explanation:
      "Central DI (deficient ADH secretion) responds to desmopressin with concentrated urine; nephrogenic DI does not respond, since the kidney itself is resistant to ADH.",
  },
  {
    id: "mcq-29",
    topicId: "cns",
    question: "Which feature distinguishes Wernicke's aphasia from Broca's aphasia?",
    options: [
      { id: "a", text: "Non-fluent speech with preserved comprehension" },
      { id: "b", text: "Fluent but meaningless speech with impaired comprehension" },
      { id: "c", text: "Complete loss of speech and comprehension" },
      { id: "d", text: "Preserved writing but lost speech" },
    ],
    correctOptionId: "b",
    explanation:
      "Wernicke's aphasia (temporal lobe) produces fluent but nonsensical speech with impaired comprehension, unlike Broca's non-fluent aphasia with intact comprehension.",
  },
  {
    id: "mcq-30",
    topicId: "gi",
    question: "What activates trypsinogen to trypsin in the duodenum?",
    options: [
      { id: "a", text: "Gastrin" },
      { id: "b", text: "Enterokinase (enteropeptidase)" },
      { id: "c", text: "Secretin" },
      { id: "d", text: "Pepsin" },
    ],
    correctOptionId: "b",
    explanation:
      "Enterokinase, on the duodenal brush border, activates trypsinogen to trypsin, which then activates the other pancreatic zymogens.",
  },
  {
    id: "mcq-31",
    topicId: "integrated",
    question: "In fever, pyrogens such as IL-1 and IL-6 primarily act by:",
    options: [
      { id: "a", text: "Directly damaging the hypothalamus" },
      { id: "b", text: "Raising the hypothalamic thermoregulatory set point" },
      { id: "c", text: "Blocking sweat gland function" },
      { id: "d", text: "Lowering the thermoregulatory set point" },
    ],
    correctOptionId: "b",
    explanation:
      "Pyrogens raise the hypothalamic set point itself, so the body generates and conserves heat (shivering, vasoconstriction) to reach the new, higher target.",
  },
  {
    id: "mcq-32",
    topicId: "integrated",
    question: "What best distinguishes brain death from a persistent vegetative state?",
    options: [
      { id: "a", text: "Brain death preserves spontaneous breathing" },
      { id: "b", text: "Vegetative state involves loss of all brainstem reflexes" },
      {
        id: "c",
        text: "Brain death is irreversible loss of all brainstem function, including the drive to breathe",
      },
      { id: "d", text: "There is no clinical distinction between the two" },
    ],
    correctOptionId: "c",
    explanation:
      "Brain death requires irreversible loss of all brainstem function including the capacity to breathe spontaneously; a vegetative state preserves brainstem function such as breathing.",
  },
];
