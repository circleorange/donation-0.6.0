<script lang="ts">
  // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import Header from "$lib/Header.svelte";
  import MainNavigator from "$lib/MainNavigator.svelte";
  import type { ChartData } from "../../services/charts";
  import { onMount } from "svelte";
  import { donationService } from "../../services/donation-service";
  import { generateByCandidate, generateByMethod } from "../../services/donation-utils";

  let byCandidate: ChartData;
  let byMethod: ChartData;

  onMount(async () => {
      donationService.reload();

      const donations = await donationService.getDonations();
      const donationsByCandidate = await donationService.getDonationsByAllCandidates();
      byMethod = generateByMethod(donations);
      byCandidate = generateByCandidate(donationsByCandidate);
  });
</script>

<Header>
  <MainNavigator />
</Header>

<div class="columns">
  <div class="column box has-text-centered">
      <h1 class="title is-4">Donations By Method</h1>
      <Chart data={byMethod} type="bar" />
  </div>
  <div class="column box has-text-centered">
      <h1 class="title is-4">Donations to date</h1>
      <Chart data={byCandidate} type="pie" />
  </div>
</div>
