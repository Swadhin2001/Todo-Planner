export type Task = {
    id: string;
    taskName: string;
    check: boolean;
    editCheck: boolean;
    isCompleted: boolean;
}

export type postedTask = {
    taskName : string;
    isCompleted: boolean;
}

export type signUpDetails = {
    name: string,
    password: string,
    email: string,
}
