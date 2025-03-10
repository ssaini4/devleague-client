import { PUBLIC_API_URL } from "$env/static/public";

export enum CardType {
  NORMAL = "NORMAL",
  ROAST = "ROAST",
}

export const createCard = async ({
  username,
  type = CardType.NORMAL,
}: {
  username: string;
  type: CardType;
}) => {
  try {
    const response = await fetch(
      `${PUBLIC_API_URL}/api/generate_card/${username}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type }),
      }
    );
    if (response.ok) {
      return response.json();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error generating card:", error);
    return null;
  }
};

export const getCardCount = async () => {
  const response = await fetch(`${PUBLIC_API_URL}/api/count`, {
    method: "GET",
    credentials: "include",
  });
  return response.json();
};
