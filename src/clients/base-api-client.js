async function handleError(response) {
  if (!response.ok) {
    let errorMessage = `${response.status} ${response.statusText}`;

    try {
      const errorData = await response.json();
      if (errorData.error) {
        errorMessage = errorData.error;
      } else if (errorData.message) {
        errorMessage = errorData.message;
      } else if (errorData.error_description) {
        errorMessage = errorData.error_description;
      }
    } catch (e) {
      // Use default error message if JSON parsing fails
    }

    const error = new Error(errorMessage);
    error.status = response.status;
    throw error;
  }
}

export async function fetcher(url, options = {}) {
  const response = await fetch(url, options);
  await handleError(response);
  return response.json();
}
