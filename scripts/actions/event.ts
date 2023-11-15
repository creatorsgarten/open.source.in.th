export interface IEvent {
    name: string;
    date: string;
    location: string;
    img: string;
    link: string;
}

export function fetchEvent(existingEvent: IEvent[]): IEvent[] {
    const events = [...existingEvent];

    for (const event of events) {
        const index = events.findIndex((x) => x.name === event.name);
        if (index === -1) {
            events.push(event);
        }
    }

    return events;
}