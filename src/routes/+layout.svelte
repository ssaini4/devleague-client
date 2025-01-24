<script lang="ts">
  import Footer from "$lib/components/Footer.svelte";
  import "../app.css";
</script>

<div
  class="min-h-screen max-w-screen px-10 md:px-20 py-28 bg-primary-container"
>
  <slot />
</div>
<Footer />
