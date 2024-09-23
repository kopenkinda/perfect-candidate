// eslint-disable-next-line @typescript-eslint/ban-types
export type NonExclusiveString = string & {};

export type ActionSuccessResponse<TReturn> = {
  success: true;
  data: TReturn | Awaited<TReturn>;
};

export type ActionErrorResponse<TError extends string | null> = {
  success: false;
  error: TError;
};

export type ActionResult<TError extends string | null, TReturn> =
  | ActionSuccessResponse<TReturn>
  | ActionErrorResponse<TError>;

export enum CommonActionErrors {
  USER_NOT_FOUND = "user_not_found",
  LIMIT_EXCEEDED = "limit_exceeded",
  INVALID_INPUT = "invalid_input",
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- any is needed here
export const success = <TResult>(
  data: TResult
): ActionSuccessResponse<TResult> => ({
  success: true,
  data,
});

export const error = <TError extends string | null>(
  error: TError
): ActionErrorResponse<TError> => ({
  success: false,
  error,
});
