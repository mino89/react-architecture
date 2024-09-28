import { interfaces } from "inversify"

export type DiItem = {
    id: interfaces.ServiceIdentifier<unknown>;
    class: interfaces.Newable<unknown>;
}