// Convex client utilities for Astro
export async function callConvexMutation(functionName: string, args: any = {}) {
  const CONVEX_URL = import.meta.env.PUBLIC_CONVEX_URL;
  
  const response = await fetch(`${CONVEX_URL}/api/mutation`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      path: functionName,
      args,
    }),
  });

  if (!response.ok) {
    throw new Error(`Convex mutation failed: ${response.statusText}`);
  }

  const result = await response.json();
  if (result.errorMessage) {
    throw new Error(result.errorMessage);
  }
  
  return result.value;
}

export async function callConvexQuery(functionName: string, args: any = {}) {
  const CONVEX_URL = import.meta.env.PUBLIC_CONVEX_URL;
  
  const response = await fetch(`${CONVEX_URL}/api/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      path: functionName,
      args,
    }),
  });

  if (!response.ok) {
    throw new Error(`Convex query failed: ${response.statusText}`);
  }

  const result = await response.json();
  if (result.errorMessage) {
    throw new Error(result.errorMessage);
  }
  
  return result.value;
}