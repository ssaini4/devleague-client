<script>
  import Github from "./Github.svelte";
  import Logo from "./Logo.svelte";
</script>

<footer class="w-full h-[130px] md:h-[90px] bg-primary-black px-16 py-4">
  <div class="w-full h-full flex flex-col md:flex-row items-center">
    <div class="w-full h-full flex flex-row items-center justify-center">
      <Logo />
      <p class="text-primary-white text-md items-center">DevLeague</p>
    </div>
    <Github />

    <div class="w-full text-primary-white text-sm text-right">
      @2025 DevLeague. All rights reserved.
    </div>
  </div>
</footer>
