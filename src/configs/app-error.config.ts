export class AppError extends Error {
    constructor(
        public statusCode: number,
        public message: string,
        public isOperational: boolean = true,
        public data: any = null
    ) {
        super(message);
        Object.setPrototypeOf(this, AppError.prototype);
    }
}