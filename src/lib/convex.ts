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
  
  console.log('=== CONVEX QUERY DEBUG ===');
  console.log('Function:', functionName);
  console.log('Args:', args);
  console.log('CONVEX_URL:', CONVEX_URL);
  
  const queryUrl = `${CONVEX_URL}/api/query`;
  console.log('Full query URL:', queryUrl);
  
  const response = await fetch(queryUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      path: functionName,
      args,
    }),
  });

  console.log('Response status:', response.status);
  console.log('Response ok:', response.ok);

  if (!response.ok) {
    const errorText = await response.text();
    console.log('Error response text:', errorText);
    throw new Error(`Convex query failed: ${response.statusText}`);
  }

  const result = await response.json();
  console.log('Raw result:', result);
  
  if (result.errorMessage) {
    console.log('Result error message:', result.errorMessage);
    throw new Error(result.errorMessage);
  }
  
  console.log('Final result value:', result.value);
  return result.value;
}