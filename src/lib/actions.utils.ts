export type ActionSuccessResponse<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- any is needed here
  TExecutedFN extends (...args: any[]) => unknown
> = {
  success: true;
  data: Awaited<ReturnType<TExecutedFN>>;
};

export type ActionErrorResponse<TError extends string | null> = {
  success: false;
  error: TError;
};

export type Action<
  TError extends string | null,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- any is needed here
  TExecutedFN extends (...args: any[]) => unknown
> = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- any is needed here
  ...args: any[]
) => Promise<ActionSuccessResponse<TExecutedFN> | ActionErrorResponse<TError>>;

export enum CommonActionErrors {
  USER_NOT_FOUND = "user_not_found",
  LIMIT_EXCEEDED = "limit_exceeded",
  INVALID_INPUT = "invalid_input",
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- any is needed here
export const success = <TExecutedFN extends (...args: any[]) => unknown>(
  data: Awaited<ReturnType<TExecutedFN>>
): ActionSuccessResponse<TExecutedFN> => ({
  success: true,
  data,
});

export const error = <TError extends string | null>(
  error: TError
): ActionErrorResponse<TError> => ({
  success: false,
  error,
});
