<script>
  import { XIcon } from "lucide-svelte";

  let isVisible = $state(true);

  const closeAd = () => {
    isVisible = false;
  };
</script>

<div
  class="flex justify-start items-center my-16 md:mx-20 max-w-[1200px]"
  class:translate-y-[-100%]={!isVisible}
>
  <a
    href="https://getdash.ai?utm_source=devleague&utm_medium=big_banner"
    target="_blank"
  >
    <img
      src="/dash_big.png"
      alt="Dash AI - Email made simple"
      class="rounded-lg self-center hidden md:block"
    />
    <img
      src="/dash_small.png"
      alt="Dash AI - Email made simple"
      class="rounded-lg w-full self-center block md:hidden"
    />
  </a>
</div>
