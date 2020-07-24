
declare type Args = {[key: string]: any}
declare type Parent ={[key: string]: any}
declare type Annotation = {
    id?: number
    sessionId: string
    annotation: string
    accountId: number
}

declare type Annotations = {
    annotations: Annotation[]
    nextPage: number | null
}

declare type ActiveSessionsObj = {
    annotations: string
    members: string[]
    sessionId: string
}
