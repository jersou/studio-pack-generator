import { bgYellow, black } from "../deps.ts";

const stdRes = ["stdin", "stderr", "stdout"];

/**
 * Checks if all resources are closed
 * @param [log=true] If true, the function will log the errors
 * @returns true if there is no open resource
 */
export function checkResources(log = true) {
  let noOpenedRessource = true;
  const res = Deno.resources();
  if (
    Object.keys(res).length !== 3 &&
    Object.values(res).filter((v) => !stdRes.includes(v)).length > 0
  ) {
    log && console.log(
      bgYellow(
        black("Some resources are not closed except stdin/stderr/stdout :"),
      ),
    );
    log && console.log(res);
    noOpenedRessource = false;
  }
  return noOpenedRessource;
}

/**
 * Check if there are any operations in progress.
 * @param [log=true] If true, the function will log the errors
 * @returns true if there is no ops in progress
 */
export function checkOps(log = true) {
  let noOpsInProgress = true;
  const metrics = Deno.metrics();

  const opsMetricsNameGroups: [keyof Deno.Metrics, keyof Deno.Metrics][] = [
    ["opsDispatched", "opsCompleted"],
    ["opsDispatched", "opsCompleted"],
    ["opsDispatchedSync", "opsCompletedSync"],
    ["opsDispatchedAsync", "opsCompletedAsync"],
    ["opsDispatchedAsyncUnref", "opsCompletedAsyncUnref"],
  ];

  opsMetricsNameGroups.forEach((group) => {
    const dispatched = group[0];
    const completed = group[1];
    if (metrics[dispatched] !== metrics[completed]) {
      log && console.log(
        bgYellow(
          black(
            `${metrics[dispatched]} ${dispatched} ` +
              `!== ${metrics[completed]} ${completed}`,
          ),
        ),
      );
      noOpsInProgress = false;
    }
  });
  return noOpsInProgress;
}

/**
 * Sanitize the state of the application
 * @param [log=true] If true, the function will log the errors
 * @returns true il sanitize is OK.
 */
export function sanitize(log = true) {
  const noOpenedRessource = checkResources(log);
  const noOpsInProgress = checkOps(log);
  return noOpenedRessource && noOpsInProgress;
}
