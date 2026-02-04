import { fetcher } from "./base-api-client.js";

const GITHUB_API_BASE = "https://api.github.com";
const GITHUB_OAUTH_BASE = "https://github.com/login/oauth";

/**
 * Exchanges authorization code for access token
 * @param {string} code - GitHub authorization code
 * @returns {Promise<string>} Access token
 * @throws {Error} If token exchange fails
 */
export async function getAccessToken(code) {
  if (!code) throw new Error("Authorization code is required");

  const tokenData = await fetcher(`${GITHUB_OAUTH_BASE}/access_token`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code
    })
  });

  if (tokenData.error) {
    throw new Error(tokenData.error_description || "Failed to obtain access token");
  }

  return tokenData.access_token;
}

/**
 * Fetches the authenticated user's profile
 * @param {string} accessToken - GitHub access token
 * @returns {Promise<Object>} User profile data
 * @throws {Error} If user fetch fails
 */
export async function getUser(accessToken) {
  if (!accessToken) throw new Error("Access token is required");

  return fetcher(`${GITHUB_API_BASE}/user`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/vnd.github.v3+json"
    }
  });
}
