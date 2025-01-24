<script lang="ts">
  import { ArrowRightIcon } from "lucide-svelte";

  const { onclick, children } = $props();
</script>

<button
  {onclick}
  class="p-3 border pl-5 bg-gradient-to-b from-primary-black-blue to-primary-container flex items-center justify-center flex-row w-auto h-[60px] gap-[4px] border-teal-950 rounded-md text-primary-text min-w-[150px]"
>
  {@render children?.()}
  <ArrowRightIcon />
</button>
