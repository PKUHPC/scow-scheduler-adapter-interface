/**
 * Copyright (c) 2023 Peking University and Peking University Institute for Computing and Digital Economy
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
 * Execute pnpm changeset version to bump package versions, and bump root package.json version
 */

import { execSync } from "child_process";
import fm from "front-matter";
import fs, { existsSync } from "fs";
import { mkdir, readdir, readFile, writeFile } from "fs/promises";
import { join } from "path";

const exec = (cmd) => execSync(cmd, { stdio: "inherit" });

const readPackageJson = (path) => JSON.parse(fs.readFileSync(path, { encoding: "utf8" }));
let rootPackageJson = readPackageJson("./package.json");

/**
 * 1. Aggregate current changes by reading changeset files
 */
const CHANGESET_DIR = ".changeset";

const files = await readdir(CHANGESET_DIR);

const changes = [];

for (const file of files) {
  if (!file.endsWith(".md") || file === "README.md") { continue; }
  const changesetFilePath = join(CHANGESET_DIR, file);

  const gitCommit = execSync(`git log -n 1 --pretty=format:%H -- ${changesetFilePath}`, {
    encoding: "utf-8",
  });

  const fileContent = await readFile(changesetFilePath, "utf8");
  const content = fm(fileContent);

  for (const [scowPackage, type] of Object.entries(content.attributes)) {
    if (scowPackage === rootPackageJson.name) {
      changes.push({ type, content: content.body.trim(), gitCommit });
    }
  }
}

/**
 * 2. Run changeset version to update versions of packages
 */
console.log("Run changeset version to bump package versions");
exec("pnpm changeset version");

// Re-read the package json to get new version number
rootPackageJson = readPackageJson("./package.json");

/**
 * 3. Generate changelog
 */
console.log("Generate changelog for version %s", rootPackageJson.version);

const getChangesetLine = (line) =>
  `- ${line.content}` +
  ` ([${line.gitCommit.substring(0, 8)}](${rootPackageJson.repository}/commit/${line.gitCommit}))`;


/**
 * Generate changelog content
 * @returns changelog content
 */
const generateContent = () => {

  // categories changes by type

  const changesByType = { "patch": [], "minor": [], "major":[]};

  for (const change of changes) {
    changesByType[change.type].push(change);
  }

  let content = "";
  if (changesByType.major.length > 0) {
    content += "## 重大更新（含有破坏性改变）\n" + changesByType.major.map(getChangesetLine).join("\n") + "\n\n";
  }

  if (changesByType.minor.length > 0) {
    content += "## 重要更新\n" + changesByType.minor.map(getChangesetLine).join("\n") + "\n\n";
  }

  if (changesByType.patch.length > 0) {
    content += "## 小型更新\n" + changesByType.patch.map(getChangesetLine).join("\n") + "\n\n";
  }

  return content.trim() + "\n\n";
};

const changelogContent = `# v${rootPackageJson.version}

发布于：${new Date().toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" })}

${generateContent()}
`;

const CHANGELOG_BASE_PATH = "changelogs";

if (!existsSync(CHANGELOG_BASE_PATH)) {
  await mkdir(CHANGELOG_BASE_PATH);
}

const CHANGELOG_PATH = join(CHANGELOG_BASE_PATH, `v${rootPackageJson.version}.md`);
await writeFile(CHANGELOG_PATH, changelogContent);

console.log("Generated changelog at %s", CHANGELOG_PATH);
console.debug("Changelog content:\n%s", changelogContent);

