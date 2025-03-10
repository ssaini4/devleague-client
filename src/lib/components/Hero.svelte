<script lang="ts">
  import { createCard, getCardCount, CardType } from "$lib/api";
  import ImageViewer from "$lib/components/ImageViewer.svelte";
  import { DownloadIcon } from "lucide-svelte";
  import PrimaryButton from "$lib/components/PrimaryButton.svelte";
  import { onMount } from "svelte";
  import SecondaryButton from "./SecondaryButton.svelte";
  import Text from "./Text.svelte";
  import BuyMeCoffee from "./BuyMeCoffee.svelte";
  import ProductHunt from "./ProductHunt.svelte";
  import { cardCache, updateCardCache } from "$lib/stores/cardStore";
  import Toggle from "./Toggle.svelte";
  import SmallAd from "./SmallAd.svelte";

  let username = $state("");
  let cardUrl = $state("");
  let isLoading = $state(false);
  let isFinished = $state(false);
  let cardCount = $state(0);
  let cardType = $state(CardType.NORMAL);
  let dimensions = $state({
    height: "760px",
    width: "680px",
  });
  let error = $state(false);
  let cachedNormal = $state("");
  let cachedRoast = $state("");
  let currentCache = $state({});

  cardCache.subscribe((cache) => {
    currentCache = cache[username] || {};
  });

  $effect(() => {
    cachedNormal = currentCache[CardType.NORMAL] || "";
    cachedRoast = currentCache[CardType.ROAST] || "";
  });
  const _createCard = async () => {
    isFinished = false;
    isLoading = true;

    const cachedUrl = currentCache[cardType];
    if (cachedUrl) {
      cardUrl = cachedUrl;
      isFinished = true;
      isLoading = false;
      return;
    }

    const response = await createCard({ username, type: cardType });
    if (response) {
      cardUrl = response.s3_uri;
      updateCardCache(username, cardType, cardUrl);
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
        height: `${window.innerHeight - 280}px`,
        width: `${window.innerWidth - 10}px`,
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

  const handleToggle = (newType: CardType) => {
    cardType = newType;
    const cachedUrl = currentCache[newType];
    if (cachedUrl) {
      cardUrl = cachedUrl;
      isFinished = true;
    } else if (isFinished) {
      _createCard();
    }
  };
</script>

<div class="flex flex-col md:flex-row">
  <SmallAd />
  <div
    class="items-left flex min-w-[80%] md:min-w-[50%] h-[350px] md:h-[770px] justify-center flex-col gap-[20px]"
  >
    <Text><div class="text-h1">DevLeague</div></Text>
    <div class="text-left text-primary-text">Your code, your card</div>
    <div class="w-full flex flex-col md:flex-row gap-[6px]">
      <input
        class="bg-primary-black placeholder:text-primary-text rounded-md text-primary-text h-[60px] w-[70%] max-w-[3/4] border border-teal-950"
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
      <div class="mr-1 font-bold text-teal-500">{cardCount}+</div>
      cards generated
    </div>
    <ProductHunt />
  </div>
  <div class="w-full flex md:mt-20">
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
          {#if cardType === CardType.ROAST}
            <div class="relative">
              <img
                src={"/burning_laptop.gif"}
                alt="Burning Laptop"
                class="absolute -bottom-20 md:-bottom-14 my-[20px] mdleft-1/4 h-48 bg-transparent"
              />
            </div>
          {/if}
        </div>
        <div class="flex items-center justify-center gap-4 py-4">
          <Toggle
            value={cardType}
            onToggle={handleToggle}
            options={[
              { label: "NORMAL", value: CardType.NORMAL },
              { label: "ROAST", value: CardType.ROAST },
            ]}
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
          <div class="md:hidden">
            <BuyMeCoffee />
          </div>
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
</div>
