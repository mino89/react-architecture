import { interfaces } from "inversify"

export type DiItem = interfaces.Newable<unknown> | interfaces.ServiceIdentifier<unknown> | interfaces.Abstract<unknown>

