<script lang="ts">
  import { ArrowRight } from "lucide-svelte";
  import Text from "./Text.svelte";

  const team = [
    {
      name: "Saksham",
      role: "Developer",
      url: "https://www.linkedin.com/in/sakshamsaini/",
      x: "https://x.com/theSakshamSaini",
    },
    {
      name: "Jess",
      role: "Designer",
      url: "https://www.linkedin.com/in/jess-wu-219429269/",
    },
  ];
</script>

<div>
  <Text><div class="text-h2">Team</div></Text>
  <div class="flex flex-col md:flex-row gap-4">
    {#each team as member}
      <div class="py-4 px-2 w-[200px] border border-teal-950 rounded-md">
        <div class="flex flex-row gap-3 py-1">
          <div class="text-primary-text-dark font-bold">{member.name}</div>
          <div class="text-primary-white">{member.role}</div>
        </div>
        <a
          class="py-1 flex flex-row gap-2 text-primary-text-light"
          href={member.url}
        >
          LinkedIn<ArrowRight />
        </a>
        {#if member.x}
          <a
            class="py-1 flex flex-row gap-2 text-primary-text-light"
            href={member.x}
          >
            Twitter/X<ArrowRight />
          </a>
        {/if}
      </div>
    {/each}
  </div>
</div>
