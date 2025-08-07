export function generateRandomUser() {
  const names = [
    "Alya",
    "Budi",
    "Chandra",
    "Dewi",
    "Eka",
    "Farhan",
    "Gita",
    "Hendra",
    "Indah",
    "Joko",
  ];

  const jobs = [
    "Supervisor",
    "Leader",
    "Project Manager",
    "Sales",
    "Marketing",
    "Developer",
    "Analyst",
  ];

  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomJob = jobs[Math.floor(Math.random() * jobs.length)];

  const randomSuffix = Math.floor(Math.random() * 1000);
  const name = `${randomName}${randomSuffix}`;

  const job = `${randomJob} ${Math.floor(Math.random() * 5 + 1)}`; // "Sales 3", "PM 2"

  return { name, job };
}
