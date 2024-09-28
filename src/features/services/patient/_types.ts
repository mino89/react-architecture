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
}

export type PatientListItem  = Patient & {
    numberOfParameters: number;
    hasAlarm: boolean;
}

export type PatientResponse = Patient & {
    parameters: Parameter[];
}
