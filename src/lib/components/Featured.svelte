<script lang="ts">
  import Text from "./Text.svelte";
</script>

<div>
  <div class="flex flex-col py-2">
    <Text><div class="text-h2">Featured</div></Text>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-2 py-2 mx-0">
    <img
      src="/featured_1.png"
      class="w-full min-w-[240px] max-w-[320px] md:max-w-[480px]"
      alt="Connect your Github account"
    />
    <img
      src="/featured_2.png"
      class="w-full min-w-[240px] max-w-[320px] md:max-w-[480px]"
      alt="Generate your card"
    />
    <img
      src="/featured_3.png"
      class="w-full min-w-[240px] max-w-[320px] md:max-w-[480px]"
      alt="Share with friends"
    />
  </div>
</div>
