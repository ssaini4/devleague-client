<script lang="ts">
  import BuyMeCoffee from "./BuyMeCoffee.svelte";
  import Text from "./Text.svelte";
</script>

<div class="my-8">
  <div class="flex flex-col py-4">
    <Text><div class="text-h2">Follow & Support Us</div></Text>
  </div>
  <!-- <div class="text-primary-text">Get our latest updates</div> -->
  <div class="flex md:flex-row flex-col items-center gap-[20px]">
    <button
      class="my-6"
      onclick={() => window.open("https://discord.gg/W9DWgRg6", "_blank")}
      ><img src="/discord.png" class="w-full md:w-96" alt="Discord" />
    </button>
    <BuyMeCoffee />
  </div>
</div>
