<script lang="ts">
  import { onMount } from "svelte";
  import { popup } from "@lib/message";
  import { getToken } from "@lib/auth";
  import { formatJobType, formatShortDeadline, getGradient } from "@lib/jobs";

  import type { JobListing } from "@lib/jobs";

  const apiBase = import.meta.env.PUBLIC_BACKEND_URL;

  let jobs: JobListing[] = [];
  let loading = true;
  let error = "";

  async function fetchJobs() {
    loading = true;
    error = "";

    try {
      const token = getToken();

      const response = await fetch(`${apiBase}/v1/jobs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        error = data.detail || "Kunne ikke hente jobbannonser.";
        popup(error, "error");
        jobs = [];
        return;
      }

      jobs = Array.isArray(data) ? data : (data.jobs ?? []);
    } catch (err) {
      console.error(err);
      error = "Det skjedde en nettverksfeil.";
      popup(error, "error");
      jobs = [];
    } finally {
      loading = false;
    }
  }

  async function deleteJob(job: JobListing) {
    const confirmed = window.confirm(`Er du sikker på at du vil slette "${job.title}"?`);
    if (!confirmed) return;

    try {
      const token = getToken();

      const response = await fetch(`${apiBase}/v1/jobs/${job.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let data: any = {};
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        popup(data.detail || "Kunne ikke slette jobbannonsen.", "error");
        return;
      }

      jobs = jobs.filter(j => j.id !== job.id);
      popup("Jobbannonsen ble slettet.", "success");
    } catch (err) {
      console.error(err);
      popup("Det skjedde en nettverksfeil.", "error");
    }
  }

  onMount(() => {
    fetchJobs();
  });
</script>

<div class="mx-auto w-full max-w-6xl space-y-6">
  <div class="space-y-2">
    <h1 class="text-3xl font-bold text-fg-base dark:text-dark-fg-base">Administrer jobbannonser</h1>
  </div>

  {#if loading}
    <div
      class="rounded-xl border border-fg-muted/40 bg-bg-raised p-6 text-fg-muted dark:border-dark-fg-muted/40 dark:bg-dark-bg-raised dark:text-dark-fg-muted"
    >
      Laster jobbannonser...
    </div>
  {:else if error}
    <div
      class="rounded-xl border border-red-500/40 bg-red-500/10 p-6 text-red-700 dark:text-red-300"
    >
      {error}
    </div>
  {:else if jobs.length === 0}
    <div
      class="rounded-xl border border-fg-muted/40 bg-bg-raised p-6 text-fg-muted dark:border-dark-fg-muted/40 dark:bg-dark-bg-raised dark:text-dark-fg-muted"
    >
      Ingen jobbannonser funnet.
    </div>
  {:else}
    <div class="space-y-4">
      {#each jobs as job (job.id)}
        <article
          class="overflow-hidden rounded-2xl border border-fg-muted/30 bg-bg-raised shadow-sm dark:border-dark-fg-muted/30 dark:bg-dark-bg-raised"
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
                  class={`flex h-44 w-full items-center justify-center bg-gradient-to-br text-center text-xl font-semibold text-dark-fg-base md:h-full ${getGradient(job.id)}`}
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

                  {#if job.deadline}
                    <span
                      class="rounded-full bg-fg-muted/10 px-3 py-1.5 text-sm text-fg-base dark:bg-dark-fg-muted/10 dark:text-dark-fg-base"
                    >
                      Frist: {formatShortDeadline(job.deadline)}
                    </span>
                  {/if}
                </div>
              </div>

              <div class="flex gap-4 justify-end">
                <a
                  href={`/jobs/${job.id}`}
                  class="inline-flex items-center justify-center rounded-lg border border-fg-muted/40 bg-bg-raised px-4 py-2.5 text-sm font-medium text-fg-base transition hover:bg-fg-muted/10 dark:border-dark-fg-muted/40 dark:bg-dark-bg-raised dark:text-dark-fg-base dark:hover:bg-dark-fg-muted/20"
                >
                  Se annonse
                </a>

                <button
                  type="button"
                  on:click={() => deleteJob(job)}
                  class="rounded-lg border-0 bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
                >
                  Slett annonse
                </button>
              </div>
            </div>
          </div>
        </article>
      {/each}
    </div>
  {/if}

  <div class="pt-4 flex justify-end">
    <a
      href="/admin/jobs/upload"
      class="rounded-lg border-0 bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-accent/80 dark:hover:bg-accent/80"
    >
      Lag ny jobbannonse
    </a>
  </div>
</div>
