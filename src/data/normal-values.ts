export interface NormalValue {
  id: string;
  topicId: string;
  parameter: string;
  value: string;
  note: string;
}

export const NORMAL_VALUES: NormalValue[] = [
  // General / Body fluids
  { id: "nv-01", topicId: "general", parameter: "Total body water", value: "~60% of body weight", note: "Two-thirds intracellular, one-third extracellular." },
  { id: "nv-02", topicId: "general", parameter: "Plasma osmolality", value: "275–295 mOsm/kg", note: "Tightly regulated by ADH and thirst." },
  { id: "nv-03", topicId: "general", parameter: "Resting membrane potential (neuron)", value: "−70 mV", note: "Set mainly by the K+ gradient and membrane K+ permeability." },
  { id: "nv-04", topicId: "general", parameter: "Body temperature (core)", value: "37°C (98.6°F)", note: "Regulated by the hypothalamic thermoregulatory center." },

  // Blood
  { id: "nv-05", topicId: "blood", parameter: "Hemoglobin (male)", value: "13.5–17.5 g/dL", note: "Lower reference range in females (12–15.5 g/dL)." },
  { id: "nv-06", topicId: "blood", parameter: "Hematocrit (male)", value: "40–50%", note: "36–44% in females." },
  { id: "nv-07", topicId: "blood", parameter: "RBC count", value: "4.5–5.9 million/µL (male)", note: "4.1–5.1 million/µL in females." },
  { id: "nv-08", topicId: "blood", parameter: "WBC count (total)", value: "4,000–11,000/µL", note: "Neutrophils are normally the most abundant (~60%)." },
  { id: "nv-09", topicId: "blood", parameter: "Platelet count", value: "150,000–450,000/µL", note: "Thrombocytopenia below 150,000; risk of spontaneous bleeding below ~20,000." },
  { id: "nv-10", topicId: "blood", parameter: "Bleeding time", value: "2–7 minutes", note: "Tests platelet plug (primary hemostasis) formation." },
  { id: "nv-11", topicId: "blood", parameter: "Prothrombin time (PT)", value: "11–13.5 seconds", note: "Tests the extrinsic and common coagulation pathways; monitors warfarin therapy (as INR)." },
  { id: "nv-12", topicId: "blood", parameter: "Activated partial thromboplastin time (aPTT)", value: "25–35 seconds", note: "Tests the intrinsic and common pathways; monitors heparin therapy." },
  { id: "nv-13", topicId: "blood", parameter: "Reticulocyte count", value: "0.5–2.5%", note: "Reflects marrow RBC production rate; rises in hemolysis/blood loss." },

  // Cardiovascular
  { id: "nv-14", topicId: "cvs", parameter: "Resting heart rate", value: "60–100 bpm", note: "Bradycardia below 60, tachycardia above 100." },
  { id: "nv-15", topicId: "cvs", parameter: "Blood pressure (normal)", value: "~120/80 mmHg", note: "Hypertension classically defined as ≥140/90 (older criteria) or ≥130/80 (newer ACC/AHA)." },
  { id: "nv-16", topicId: "cvs", parameter: "Mean arterial pressure (MAP)", value: "70–100 mmHg", note: "MAP ≈ diastolic + 1/3(systolic − diastolic); organ perfusion generally requires MAP ≥ 60." },
  { id: "nv-17", topicId: "cvs", parameter: "Cardiac output (resting)", value: "~5 L/min", note: "= stroke volume × heart rate; rises several-fold with exercise." },
  { id: "nv-18", topicId: "cvs", parameter: "Stroke volume", value: "~70 mL/beat", note: "Determined by preload, afterload, and contractility." },
  { id: "nv-19", topicId: "cvs", parameter: "Ejection fraction", value: "55–70%", note: "Fraction of end-diastolic volume ejected each beat; reduced in systolic heart failure." },
  { id: "nv-20", topicId: "cvs", parameter: "Central venous pressure", value: "2–8 mmHg", note: "Reflects right atrial pressure/preload; elevated in right heart failure or volume overload." },

  // Respiratory
  { id: "nv-21", topicId: "respiratory", parameter: "Respiratory rate (adult, resting)", value: "12–20 breaths/min", note: "Tachypnea above 20; bradypnea below 12." },
  { id: "nv-22", topicId: "respiratory", parameter: "Tidal volume", value: "~500 mL", note: "Air moved in one normal, quiet breath." },
  { id: "nv-23", topicId: "respiratory", parameter: "Vital capacity", value: "~4.5–5 L", note: "Maximum air exhaled after maximal inhalation." },
  { id: "nv-24", topicId: "respiratory", parameter: "Residual volume", value: "~1.2 L", note: "Air remaining after maximal exhalation; cannot be measured by spirometry alone." },
  { id: "nv-25", topicId: "respiratory", parameter: "PaO2 (arterial)", value: "80–100 mmHg", note: "Hypoxemia below ~60 mmHg is generally considered clinically significant." },
  { id: "nv-26", topicId: "respiratory", parameter: "PaCO2 (arterial)", value: "35–45 mmHg", note: "The primary driver of central respiratory chemoreceptor activity." },
  { id: "nv-27", topicId: "respiratory", parameter: "Arterial O2 saturation (SpO2)", value: "95–100%", note: "Reflects the flat top of the O2-hemoglobin dissociation curve." },
  { id: "nv-28", topicId: "respiratory", parameter: "Arterial pH", value: "7.35–7.45", note: "Acidosis below 7.35, alkalosis above 7.45." },

  // Renal
  { id: "nv-29", topicId: "renal", parameter: "Glomerular filtration rate (GFR)", value: "~120 mL/min", note: "Estimated clinically via creatinine clearance." },
  { id: "nv-30", topicId: "renal", parameter: "Renal plasma flow", value: "~600–700 mL/min", note: "GFR/renal plasma flow gives the filtration fraction (~20%)." },
  { id: "nv-31", topicId: "renal", parameter: "Serum creatinine", value: "0.6–1.2 mg/dL", note: "Rises when GFR falls significantly — a lagging marker of kidney function." },
  { id: "nv-32", topicId: "renal", parameter: "Blood urea nitrogen (BUN)", value: "7–20 mg/dL", note: "Affected by protein intake and hydration status, unlike creatinine." },
  { id: "nv-33", topicId: "renal", parameter: "Urine output (normal)", value: "~1–2 L/day", note: "Oliguria defined as <400–500 mL/day (or <0.5 mL/kg/hr)." },
  { id: "nv-34", topicId: "renal", parameter: "Renal threshold for glucose", value: "~180 mg/dL", note: "Above this plasma glucose, SGLT2 transporters saturate and glucosuria occurs." },

  // GI
  { id: "nv-35", topicId: "gi", parameter: "Gastric pH", value: "1.5–3.5", note: "Maintained by parietal cell HCl secretion; activates pepsinogen to pepsin." },
  { id: "nv-36", topicId: "gi", parameter: "Small intestine transit time", value: "~3–5 hours", note: "Much faster than large intestine transit (~1–2 days)." },
  { id: "nv-37", topicId: "gi", parameter: "Bile production (daily)", value: "~600–1000 mL/day", note: "Produced by hepatocytes, concentrated and stored in the gallbladder." },

  // Endocrine
  { id: "nv-38", topicId: "endocrine", parameter: "Fasting blood glucose", value: "70–100 mg/dL", note: "Prediabetes 100–125 mg/dL; diabetes ≥126 mg/dL (fasting), per ADA criteria." },
  { id: "nv-39", topicId: "endocrine", parameter: "HbA1c (normal)", value: "<5.7%", note: "Reflects average glycemic control over ~3 months; diabetes diagnosed at ≥6.5%." },
  { id: "nv-40", topicId: "endocrine", parameter: "TSH (normal range)", value: "0.4–4.0 mIU/L", note: "The most sensitive first-line screen for thyroid dysfunction." },
  { id: "nv-41", topicId: "endocrine", parameter: "Serum calcium (total)", value: "8.5–10.5 mg/dL", note: "Regulated by PTH, vitamin D, and calcitonin." },
  { id: "nv-42", topicId: "endocrine", parameter: "Serum potassium", value: "3.5–5.0 mEq/L", note: "Both hypo- and hyperkalemia are cardiac arrhythmia risks." },
  { id: "nv-43", topicId: "endocrine", parameter: "Serum sodium", value: "135–145 mEq/L", note: "The main determinant of plasma osmolality and ADH secretion." },

  // Nerve/Muscle & Reproductive
  { id: "nv-44", topicId: "nerve-muscle", parameter: "Nerve conduction velocity (A-alpha fibers)", value: "70–120 m/s", note: "Fastest fiber type — large diameter, heavily myelinated." },
  { id: "nv-45", topicId: "reproductive", parameter: "Menstrual cycle length (average)", value: "28 days (21–35 normal)", note: "Ovulation typically occurs ~14 days before the next expected period." },
  { id: "nv-46", topicId: "reproductive", parameter: "Sperm count (normal)", value: ">15 million/mL", note: "WHO reference threshold; oligospermia below this value." },
];
