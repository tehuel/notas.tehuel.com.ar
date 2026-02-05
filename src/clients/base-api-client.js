async function handleError(response) {
  if (!response.ok) {
    let errorMessage = `${response.status} ${response.statusText}`;

    try {
      const { error, message, error_description } = await response.json();
      errorMessage = error || message || error_description || errorMessage;
    } catch (e) {}

    throw new Error(errorMessage);
  }
}

export async function fetcher(url, options = {}) {
  const response = await fetch(url, options);
  await handleError(response);
  return response.json();
}
