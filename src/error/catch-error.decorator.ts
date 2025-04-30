// src/error/catch-error.decorator.ts
import { ErrorCode } from './error.enum';
import { ResponseDto } from './response.dto';

export function CatchError<T>() {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor,
    ) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            try {
                const result = await originalMethod.apply(this, args);
                return {
                    status: true,
                    errorCode: ErrorCode.SUCCESS,
                    message: 'Success',
                    data: result,
                } as T;
            } catch (error) {
                console.error(`Error in ${propertyKey}:`, error);

                // Determine error code based on error type
                let errorCode = ErrorCode.UNKNOWN_ERROR;
                let message = 'An unexpected error occurred';

                if (error.status === 404) {
                    errorCode = ErrorCode.NOT_FOUND;
                    message = 'Resource not found';
                } else if (error.status === 401) {
                    errorCode = ErrorCode.UNAUTHORIZED;
                    message = 'Unauthorized access';
                } else if (error.name === 'ValidationError') {
                    errorCode = ErrorCode.VALIDATION_ERROR;
                    message = error.message || 'Validation error';
                }

                return {
                    status: false,
                    errorCode,
                    message,
                    data: null
                } as ResponseDto;
            }
        };

        return descriptor;
    };
}
