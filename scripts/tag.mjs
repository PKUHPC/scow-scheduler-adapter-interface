/**
 * Copyright (c) 2022 Peking University and Peking University Institute for Computing and Digital Economy
 * SCOW is licensed under Mulan PSL v2.
 * You can use this software according to the terms and conditions of the Mulan PSL v2.
 * You may obtain a copy of Mulan PSL v2 at:
 *          http://license.coscl.org.cn/MulanPSL2
 * THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND,
 * EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
 * MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
 * See the Mulan PSL v2 for more details.
 */

/**
 * Compare the version of the current package.json with the version of the last commit
 * If the version is changed, create a tag and push it to the remote repository
 *
 * Usage:
 *   node scripts/tag.mjs
 *   node scripts/tag.mjs --dry-run: only print the command to be executed
 */

import { execSync } from "child_process";
import { readFileSync } from "fs";

const dryRun = process.argv.includes("--dry-run");

const exec = (cmd) => {
  if (!dryRun) {
    execSync(cmd, { stdio: "inherit", encoding: "utf-8" });
  } else {
    console.log("Trying to run command: %s", cmd);
  }
};

function getVersion(path) {
  const lastFile = execSync(`git --no-pager show HEAD^1:${path}`, { encoding: "utf-8" });

  const currentFile = readFileSync(path, { encoding: "utf-8" });

  const last = JSON.parse(lastFile).version;

  const current = JSON.parse(currentFile).version;

  return { last, current };
}

// Tag SCOW Release
let changed = false;
const rootVersion = getVersion("package.json");

if (rootVersion.current !== rootVersion.last) {
  changed = true;
  console.log("API version is changed from %s to %s", rootVersion.last, rootVersion.current);
  exec(`git tag -a v${rootVersion.current} -m 'Release v${rootVersion.current}'`);
} else {
  console.log("API version %s is not changed.", rootVersion.current);
}

if (changed) {
  console.log("New Tag Created. Push tags.");
  exec("git push --tags");
}
