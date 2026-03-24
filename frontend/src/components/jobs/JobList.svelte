<script lang="ts">
  import { onMount } from "svelte";

  import {
    formatJobType,
    formatStudy,
    formatYears,
    formatShortDeadline,
    getGradient,
  } from "@lib/jobs";

  import type { JobListing } from "@lib/jobs";

  let jobs: JobListing[] = [];
  let loading = true;
  let error = "";

  let search = "";
  let selectedJobType = "";
  let selectedStudies: string[] = [];
  let selectedYears: string[] = [];

  const apiBase = import.meta.env.PUBLIC_BACKEND_URL;

  const studyOptions = [
    { value: "ai", label: "AI" },
    { value: "cyber", label: "Cyber" },
    { value: "software", label: "Software" },
  ];

  const yearOptions = [
    { value: "1", label: "1." },
    { value: "2", label: "2." },
    { value: "3", label: "3." },
    { value: "4", label: "4." },
    { value: "5", label: "5." },
  ];

  const jobTypeOptions = [
    { value: "", label: "Alle" },
    { value: "full-time", label: "Fulltid" },
    { value: "part-time", label: "Deltid" },
    { value: "internship", label: "Praksis" },
    { value: "summer-job", label: "Sommerjobb" },
    { value: "other", label: "Annet" },
  ];

  onMount(async () => {
    try {
      const response = await fetch(`${apiBase}/v1/jobs`);

      if (!response.ok) {
        throw new Error(`Fetch failed with status ${response.status}`);
      }

      jobs = await response.json();
    } catch (err) {
      error = err instanceof Error ? err.message : "Unknown error";
      console.error("Failed to fetch jobs:", err);
    } finally {
      loading = false;
    }
  });

  function toggleItem(list: string[], value: string): string[] {
    return list.includes(value) ? list.filter(item => item !== value) : [...list, value];
  }

  function toggleStudy(value: string) {
    selectedStudies = toggleItem(selectedStudies, value);
  }

  function toggleYear(value: string) {
    selectedYears = toggleItem(selectedYears, value);
  }

  function clearFilters() {
    search = "";
    selectedJobType = "";
    selectedStudies = [];
    selectedYears = [];
  }

  $: filteredJobs = jobs.filter(job => {
    const q = search.trim().toLowerCase();

    const matchesSearch =
      q === "" || job.title.toLowerCase().includes(q) || job.company.toLowerCase().includes(q);

    const matchesJobType = selectedJobType === "" || job.job_type === selectedJobType;

    const matchesStudies =
      selectedStudies.length === 0 || selectedStudies.every(study => job.studies?.includes(study));

    const matchesYears =
      selectedYears.length === 0 || selectedYears.every(year => job.years?.includes(year));

    return matchesSearch && matchesJobType && matchesStudies && matchesYears;
  });
</script>

{#if loading}
  <div
    class="rounded-xl border border-fg-muted/40 bg-bg-raised p-6 text-fg-muted dark:border-dark-fg-muted/40 dark:bg-dark-bg-raised dark:text-dark-fg-muted"
  >
    Laster jobbsannonser...
  </div>
{:else if error}
  <div class="rounded-xl border border-red-500/40 bg-red-500/10 p-6 text-red-700 dark:text-red-300">
    {error}
  </div>
{:else}
  <div class="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
    <div
      class="order-1 rounded-2xl border border-fg-muted/30 bg-bg-raised p-5 shadow-sm dark:border-dark-fg-muted/30 dark:bg-dark-bg-raised lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)]"
    >
      <div class="mb-5 flex items-center justify-between gap-3">
        <h2 class="text-lg font-semibold text-fg-base dark:text-dark-fg-base">Filter</h2>
        <button
          type="button"
          on:click={clearFilters}
          class="text-sm text-fg-muted transition hover:text-fg-base dark:text-dark-fg-muted dark:hover:text-dark-fg-base"
        >
          Nullstill
        </button>
      </div>

      <div class="space-y-5">
        <div class="space-y-2">
          <label
            for="job-search"
            class="block text-sm font-medium text-fg-base dark:text-dark-fg-base"
          >
            Søk
          </label>
          <input
            id="job-search"
            bind:value={search}
            type="text"
            placeholder="Tittel eller bedrift"
            class="w-full rounded-md border border-fg-muted/50 bg-bg-base px-3 py-2 text-sm text-fg-base placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-accent dark:border-dark-fg-muted/50 dark:bg-dark-fg-muted/20 dark:text-dark-fg-base dark:placeholder:text-dark-fg-muted"
          />
        </div>

        <div class="space-y-2">
          <label
            for="job-type"
            class="block text-sm font-medium text-fg-base dark:text-dark-fg-base"
          >
            Stillingstype
          </label>
          <select
            id="job-type"
            bind:value={selectedJobType}
            class="w-full rounded-md border border-fg-muted/50 bg-bg-base px-3 py-2 text-sm text-fg-base focus:outline-none focus:ring-2 focus:ring-accent dark:border-dark-fg-muted/50 dark:bg-dark-fg-muted/20 dark:text-dark-fg-base"
          >
            {#each jobTypeOptions as option}
              <option value={option.value}>{option.label}</option>
            {/each}
          </select>
        </div>

        <div class="space-y-2">
          <p class="text-sm font-medium text-fg-base dark:text-dark-fg-base">Studieretning</p>
          <div class="flex flex-wrap gap-2">
            {#each studyOptions as option}
              <button
                type="button"
                on:click={() => toggleStudy(option.value)}
                class="rounded-full border border-fg-muted/30 px-3 py-1.5 text-sm text-fg-base transition hover:border-fg-muted/50 dark:border-dark-fg-muted/30 dark:text-dark-fg-base dark:hover:border-dark-fg-muted/50"
                class:bg-accent={selectedStudies.includes(option.value)}
                class:text-dark-fg-base={selectedStudies.includes(option.value)}
                class:border-transparent={selectedStudies.includes(option.value)}
              >
                {option.label}
              </button>
            {/each}
          </div>
        </div>

        <div class="space-y-2">
          <p class="text-sm font-medium text-fg-base dark:text-dark-fg-base">Årstrinn</p>
          <div class="flex flex-wrap gap-2">
            {#each yearOptions as option}
              <button
                type="button"
                on:click={() => toggleYear(option.value)}
                class="rounded-full border border-fg-muted/30 px-3 py-1.5 text-sm text-fg-base transition hover:border-fg-muted/50 dark:border-dark-fg-muted/30 dark:text-dark-fg-base dark:hover:border-dark-fg-muted/50"
                class:bg-accent={selectedYears.includes(option.value)}
                class:text-dark-fg-base={selectedYears.includes(option.value)}
                class:border-transparent={selectedYears.includes(option.value)}
              >
                {option.label}
              </button>
            {/each}
          </div>
        </div>
      </div>
    </div>

    <div class="order-2 min-w-0 space-y-4">
      {#if filteredJobs.length === 0}
        <div
          class="rounded-xl border border-fg-muted/40 bg-bg-raised p-6 text-fg-muted dark:border-dark-fg-muted/40 dark:bg-dark-bg-raised dark:text-dark-fg-muted"
        >
          Ingen stillingsannonser matcher filtrene.
        </div>
      {:else}
        {#each filteredJobs as job}
          <a
            href={`/jobs/${job.id}`}
            class="block overflow-hidden rounded-2xl border border-fg-muted/30 bg-bg-raised shadow-sm transition hover:border-fg-muted/50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-accent dark:border-dark-fg-muted/30 dark:bg-dark-bg-raised dark:hover:border-dark-fg-muted/50"
          >
            <div class="flex flex-col md:flex-row">
              <div class="md:w-80 md:shrink-0">
                {#if job.image_url}
                  <img
                    src={apiBase + job.image_url}
                    alt={job.title}
                    class="h-40 w-full object-cover md:h-full"
                    loading="lazy"
                  />
                {:else}
                  <div
                    class={`flex h-44 w-full items-center justify-center text-xl  text-dark-fg-base md:h-full bg-gradient-to-br ${getGradient(job.id)}`}
                  >
                    {job.company}
                  </div>
                {/if}
              </div>

              <div class="flex min-w-0 flex-1 flex-col justify-between gap-5 p-5 md:p-6">
                <div class="space-y-4">
                  <div class="space-y-1">
                    <h2
                      class="text-2xl font-semibold leading-tight text-fg-base dark:text-dark-fg-base"
                    >
                      {job.title}
                    </h2>
                    <p class="text-base text-fg-muted dark:text-dark-fg-muted">
                      {job.company}
                    </p>
                  </div>

                  <div class="flex flex-wrap gap-2">
                    <span
                      class="rounded-full bg-fg-muted/10 px-3 py-1.5 text-sm text-fg-base dark:bg-dark-fg-muted/10 dark:text-dark-fg-base"
                    >
                      {formatJobType(job.job_type)}
                    </span>

                    <span
                      class="rounded-full bg-fg-muted/10 px-3 py-1.5 text-sm text-fg-base dark:bg-dark-fg-muted/10 dark:text-dark-fg-base"
                    >
                      {job.locations}
                    </span>

                    {#if job.studies}
                      {#each job.studies as study}
                        <span
                          class="rounded-full bg-fg-muted/10 px-3 py-1.5 text-sm text-fg-base dark:bg-dark-fg-muted/10 dark:text-dark-fg-base"
                        >
                          {formatStudy(study)}
                        </span>
                      {/each}
                    {/if}
                  </div>
                </div>

                <div class="space-y-2 text-sm text-fg-muted dark:text-dark-fg-muted">
                  {#if formatYears(job.years)}
                    <div class="flex items-center gap-2">
                      <span class="font-bold">År:</span>
                      <span>{formatYears(job.years)}</span>
                    </div>
                  {/if}

                  {#if job.deadline}
                    <div class="flex items-center gap-2">
                      <span class="font-bold">Frist:</span>
                      <span>{formatShortDeadline(job.deadline)}</span>
                    </div>
                  {/if}
                </div>
              </div>
            </div>
          </a>
        {/each}
      {/if}
    </div>
  </div>
{/if}
