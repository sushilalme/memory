export async function submitLeadPayload(payload) {
  const webhookUrl = import.meta.env.VITE_LEAD_WEBHOOK_URL;
  if (!webhookUrl) {
    return { ok: true, mocked: true };
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to submit lead payload');
  }

  return { ok: true, mocked: false };
}
