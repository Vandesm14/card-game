export type CheckFunction<V> = (val: V) => boolean;
export type UseFunction<V, R> = (val: V) => R;

export interface MatchArm<V, R> {
  check: V | V[] | CheckFunction<V>;
  use: R | UseFunction<V, R>;
}

export interface MatchOpts<V, R> {
  default?: R | UseFunction<V, R>;
}

export function match<V, R>(
  value: V,
  arms: MatchArm<V, R>[],
  opts?: MatchOpts<V, R>
): R | null | undefined {
  // Run through each test case ("arm")
  for (const arm of arms) {
    // If the arm has a check function, run it and return the result
    const fnMatch =
      typeof arm.check === 'function'
        ? (arm.check as CheckFunction<V>)(value)
        : false;

    // If the arm has a static value, check if it matches the value
    const staticMatch = Array.isArray(arm.check)
      ? (arm.check as V[]).includes(value)
      : arm.check === value;

    // Combine the results
    const isMatch = fnMatch || staticMatch;

    if (isMatch) {
      // If the arm has a use function, run it and return the result
      return typeof arm.use === 'function'
        ? (arm.use as UseFunction<V, R>)(value)
        : arm.use;
    }
  }

  // If we didn't find a match, look for a "default" arm
  const defaultArm = opts?.default;

  // If we found a default arm, and if it has a use function, run it and return the result
  const result =
    typeof defaultArm === 'function'
      ? (defaultArm as UseFunction<V, R>)(value)
      : defaultArm;

  // If we found a default arm, return its result, otherwise return null
  return result ?? null;
}
