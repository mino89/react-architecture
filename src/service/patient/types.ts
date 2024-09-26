export type Parameter = {
    id: number;
    name: string;
    value: number;
    alarm: boolean;
}

export type Patient = {
    id: number;
    familyName: string;
    givenName: string;
    birthDate: string;
    sex: string;
    parameters: Parameter[];
}