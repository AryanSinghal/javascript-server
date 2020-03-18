interface Iuser {
    traineeEmail: string;
    reviewerEmail: string;
}

interface Iauthority {
    all: string[];
    read: string[];
    write: string[];
    delete: string[];
}

interface Ipermission {
    [key: string]: Iauthority;
}

export { Ipermission, Iuser };
