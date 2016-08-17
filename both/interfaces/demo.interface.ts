export interface Demo {
    _id?: string;
    name: string;
    description?: string;
    location: Location;
    public: boolean;
    invited?: string[];
    owner?: string;
    rsvps?: RSVP[];
}

interface Location {
    name: string;
    lat?: number;
    lng?: number;
}

interface RSVP {
    userId: string;
    response: string;
}
