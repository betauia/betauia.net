export const formatStudy = (study: string): string => {
  const labels: Record<string, string> = {
    ai: "AI",
    cyber: "Cyber",
    software: "Software",
  };

  return labels[study] ?? study;
};

export const formatFullDeadline = (deadline: string | null) => {
  if (!deadline) return null;
  return new Date(deadline).toLocaleDateString("nb-NO");
};

export const formatShortDeadline = (deadline: string | null): string | null => {
  if (!deadline) return null;

  const d = new Date(deadline);
  if (Number.isNaN(d.getTime())) return deadline;

  return new Intl.DateTimeFormat("nb-NO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(d);
};

export const formatJobType = (jobType: string): string => {
  const labels: Record<string, string> = {
    "full-time": "Fulltid",
    "part-time": "Deltid",
    internship: "Internship",
    "summer-job": "Sommerjobb",
    other: "Annet",
  };

  return labels[jobType] ?? jobType;
};

export const formatYears = (years: string[] | null): string | null => {
  if (!years || years.length === 0) return null;

  const nums = years
    .map(y => Number.parseInt(y, 10))
    .filter(n => !Number.isNaN(n))
    .sort((a, b) => a - b);

  if (nums.length === 0) return null;
  if (nums.length === 1) return `${nums[0]}.`;

  const consecutive = nums.every((n, i) => i === 0 || n === nums[i - 1] + 1);

  if (consecutive) {
    return `${nums[0]}. - ${nums[nums.length - 1]}.`;
  }

  if (nums.length === 2) {
    return `${nums[0]}. og ${nums[1]}.`;
  }

  const last = nums[nums.length - 1];
  const first = nums
    .slice(0, -1)
    .map(n => `${n}.`)
    .join(", ");
  return `${first}. og ${last}.`;
};

export const getGradient = (id: number): string => {
  const gradients = [
    "from-blue-500 to-green-400",
    "from-rose-500 to-pink-400",
    "from-violet-600 to-green-400",
    "from-pink-500 to-orange-400",
    "from-purple-500 to-pink-500",
    "from-orange-500 to-red-500",
    "from-indigo-600 to-rose-400",
  ];

  return gradients[id % gradients.length];
};

export type JobListing = {
  id: number;
  title: string;
  company: string;
  locations: string;
  job_type: string;
  deadline?: string | null;
  image_url?: string | null;
  image_path?: string;
  years?: string[] | null;
  studies?: string[];
};
