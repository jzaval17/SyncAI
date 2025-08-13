export function formatDate(date: Date): string {
    return date.toISOString();
}

export function handleApiResponse(response: any): any {
    if (!response || response.error) {
        throw new Error('API response error');
    }
    return response.data;
}

export function logError(error: Error): void {
    console.error('Error:', error.message);
}