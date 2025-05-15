// This file should be placed in the same directory where you currently have the encodedRedirect function
import { redirect } from 'next/navigation';

/**
 * Helper function to create a response object for the client
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} message - The message to be shown on the client.
 * @returns {Object} An object with status and message properties.
 */
export function createResponseObject(
  type: "error" | "success",
  message: string,
) {
  return {
    status: type,
    message
  };
}

// Keep this function for cases where you still need redirect with query parameters
export function encodedRedirect(
  type: "error" | "success",
  path: string,
  message: string,
) {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}