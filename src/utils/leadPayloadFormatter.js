export function formatLeadPayload({ fullName, phoneNumber, answers, scoring, consent }) {
  return {
    full_name: fullName.trim(),
    phone_number: phoneNumber.trim(),
    answers,
    score_breakdown: scoring.breakdown,
    total_score: scoring.totalScore,
    result_bucket: scoring.bucket.id,
    result_label: scoring.bucket.label,
    predicted_salary_range: scoring.bucket.salaryRange,
    consent_to_contact: Boolean(consent),
    timestamp: new Date().toISOString(),
  };
}
