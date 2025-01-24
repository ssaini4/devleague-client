<script lang="ts">
  import { createCard, getCardCount } from "$lib/api";
  import ImageViewer from "$lib/components/ImageViewer.svelte";
  import { DownloadIcon } from "lucide-svelte";
  import PrimaryButton from "$lib/components/PrimaryButton.svelte";
  import { onMount } from "svelte";
  import SecondaryButton from "./SecondaryButton.svelte";
  import Text from "./Text.svelte";
  import BuyMeCoffee from "./BuyMeCoffee.svelte";
  let username = $state("");
  let cardUrl = $state("");
  let isLoading = $state(false);
  let isFinished = $state(false);
  let cardCount = $state(0);
  let dimensions = $state({
    height: "760px",
    width: "680px",
  });
  let error = $state(false);
  const _createCard = async () => {
    isFinished = false;
    isLoading = true;
    const response = await createCard({ username });
    if (response) {
      cardUrl = response.s3_uri;
      isFinished = true;
    } else {
      error = true;
    }
    isLoading = false;
  };

  onMount(async () => {
    const { count } = await getCardCount();
    cardCount = count;
    if (window.innerWidth < 768) {
      dimensions = {
        height: `${window.innerHeight - 150}px`,
        width: `${window.innerWidth - 5}px`,
      };
    }
  });

  const keyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      _createCard();
    }
    if (error) {
      error = false;
    }
  };
</script>

<div class="flex flex-col md:flex-row">
  <div
    class="items-left flex min-w-[80%] md:min-w-[50%] h-[350px] md:h-[770px] justify-center flex-col gap-[20px]"
  >
    <Text><div class="text-h1">DevLeague</div></Text>
    <div class="text-left text-primary-text">Your code, your card</div>
    <div class="w-full flex flex-col md:flex-row gap-[6px]">
      <input
        class="bg-primary-black placeholder:text-primary-text rounded-md text-primary-text h-[60px] w-full border border-teal-950"
        type="text"
        placeholder="Enter Github Username"
        bind:value={username}
        onkeydown={keyDown}
      />
      <PrimaryButton onclick={_createCard}>Create Card</PrimaryButton>
    </div>
    {#if error}
      <div class="text-red-700">Please enter a valid Github username</div>
    {/if}
    <div class="text-primary-white flex flex-row text-body font-bold">
      <div class="mr-1">{cardCount}+</div>
      cards generated
    </div>
  </div>

  {#if isLoading}
    <div class="self-center justify-center items-center w-full h-full my-10">
      <img
        src={"/loading.png"}
        alt="Loading"
        class="items-center mx-auto justify-center max-w-[320px]"
      />
      <!-- <Loader />
      <div class="text-primary-white text-center">
        {#key currentMessage}
          {currentMessage}
        {/key}
      </div> -->
    </div>
  {:else if isFinished}
    <div class="flex flex-col w-full">
      <div class="self-center items-center justify-center">
        <ImageViewer
          imageUrl={cardUrl}
          height={dimensions.height}
          width={dimensions.width}
        />
      </div>
      <div
        class="w-full self-center flex flex-col md:flex-row gap-[6px] justify-center"
      >
        <!-- <div
          class="p-3 pl-5 w-full md:w-[50%] mx-auto flex items-center justify-center flex-row h-[60px] rounded-md min-w-[150px] gap-[4px]"
        > -->
        <PrimaryButton onclick={_createCard}>New Card</PrimaryButton>
        <!-- </div> -->
        <SecondaryButton onclick={() => window.open(cardUrl, "_blank")}>
          Download
          <DownloadIcon />
        </SecondaryButton>
        <BuyMeCoffee />
      </div>
    </div>
  {:else}
    <div class="flex flex-col w-full">
      <div class="self-center items-center justify-center">
        <img
          src={"/empty_card.png"}
          class="max-w-[320px] md:max-w-[480px]"
          alt="Empty card"
        />
      </div>
    </div>
  {/if}
</div>
