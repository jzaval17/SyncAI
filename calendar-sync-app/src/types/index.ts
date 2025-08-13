export interface Shift {
    id: string;
    startTime: Date;
    endTime: Date;
    title: string;
    location?: string;
}

export interface Event {
    id: string;
    summary: string;
    start: {
        dateTime: string;
        timeZone: string;
    };
    end: {
        dateTime: string;
        timeZone: string;
    };
}

export interface APIResponse<T> {
    data: T;
    status: number;
    message?: string;
}