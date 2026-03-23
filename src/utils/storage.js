const STORAGE_KEY = 'future_salary_predictor_state';

export function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function getSavedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearSavedState() {
  localStorage.removeItem(STORAGE_KEY);
}
