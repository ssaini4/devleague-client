<script lang="ts">
  import { CardType } from "$lib/api";

  export let value: CardType;
  export let options: Array<{ label: string; value: CardType }> = [
    { label: "NORMAL", value: CardType.NORMAL },
    { label: "ROAST", value: CardType.ROAST },
  ];
  export let onToggle: (newValue: CardType) => void;
</script>

<div class="flex items-center justify-center gap-4 py-4">
  <div
    class="relative inline-flex w-56 mx-auto items-center h-10 rounded-full px-2 transition-colors focus:outline-none cursor-pointer"
    class:bg-purple-600={value === CardType.NORMAL}
    class:bg-amber-600={value === CardType.ROAST}
  >
    <div class="flex justify-between w-full">
      {#each options as option}
        <span
          class="inline-flex items-center justify-center text-white h-8 rounded-full transition-transform px-4 text-lg font-medium"
          class:bg-black={value === option.value}
          class:bg-transparent={value !== option.value}
          on:click={() => onToggle(option.value)}
        >
          {option.label}
        </span>
      {/each}
    </div>
  </div>
</div>
