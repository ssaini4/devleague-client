<script lang="ts">
  const { children } = $props();
</script>

<div
  class="text-left font-bold bg-gradient-to-r from-primary-text-light to-primary-text-dark bg-clip-text text-transparent"
>
  {@render children?.()}
</div>
