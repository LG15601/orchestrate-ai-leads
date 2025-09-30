// API route for capturing leads
export async function captureLead(leadData: any) {
  try {
    const response = await fetch('/api/capture-lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData),
    });

    if (!response.ok) {
      throw new Error('Failed to capture lead');
    }

    return await response.json();
  } catch (error) {
    console.error('Error capturing lead:', error);
    throw error;
  }
}



