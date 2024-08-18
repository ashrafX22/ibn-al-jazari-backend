export function calculateAge(dateOfBirth: Date): number {
  return Math.floor(
    (Date.now() - new Date(dateOfBirth).getTime()) /
      (1000 * 60 * 60 * 24 * 365.25),
  );
}
