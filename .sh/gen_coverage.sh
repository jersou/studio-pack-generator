#!/usr/bin/env bash
set -o errexit
d=$(dirname "$0")
cd "$d/.."

rm -rf .cov_profile
deno test --coverage=.cov_profile -A
deno coverage .cov_profile --lcov > .cov_profile/cov_profile.lcov
genhtml -o .cov_profile/html .cov_profile/cov_profile.lcov

