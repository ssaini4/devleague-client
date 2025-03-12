<script>
  import { XIcon } from "lucide-svelte";

  let isVisible = $state(true);

  const closeAd = () => {
    isVisible = false;
  };
</script>

<div
  class="hidden md:block w-full -top-[6px] absolute transition-transform duration-300"
  class:translate-y-[-100%]={!isVisible}
>
  <div class="relative">
    <a
      href="https://getdash.ai?utm_source=devleague&utm_medium=small_banner"
      target="_blank"
    >
      <img
        src="/dash_small.png"
        alt="Dash AI - Email made simple"
        class="rounded-lg h-[280px]"
      />
    </a>
    <button
      class="absolute bottom-1 left-[440px] bg-black z-50 rounded-full p-1 hover:bg-opacity-70 transition-colors"
      on:click={closeAd}
      aria-label="Close ad"
    >
      <XIcon size={16} color="#ffffff" />
    </button>
  </div>
</div>
