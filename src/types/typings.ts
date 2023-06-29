export interface tileArea {
    xs: number | undefined,
    xe: number | undefined,
    ys: number | undefined,
    ye: number | undefined,
}

export interface user {
    id: number,
    account: string,
    password: string,
}

export interface bound {
    west: number,
    east: number,
    south: number,
    north: number,
}
