export function calculateDOBFromAge(age: number): string {
  const today = new Date();

  // Approx DOB: Jan 1 of birth year (industry standard)
  const birthYear = today.getFullYear() - age;

  const dob = new Date(birthYear, 0, 1);

  return dob.toISOString().split("T")[0]; // YYYY-MM-DD
}
