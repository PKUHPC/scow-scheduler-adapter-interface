# @scow/scow-scheduler-adapter-interface

![npm](https://img.shields.io/npm/v/@scow/scow-scheduler-adapter-interface?label=API)

Interface for SCOW to call different schedulers. 

## Reference Implementations 

- [PKUHPC/scow-slurm-adapter](https://github.com/PKUHPC/scow-slurm-adapter): slurm adapter
- [abhpc/abhpc-scow-slurm-adapter](https://github.com/abhpc/abhpc-scow-slurm-adapter): slurm adapter

## Getting proto files

You can get the proto files using the following methods:

- `git clone` this repository
- `npm install --save @scow/scow-scheduler-adapter-interface@{version number}`
- `buf generate https://github.com/PKUHPC/scow-scheduler-adapter-interface.git`
  - append `#ref={commit hash}` to get a specific commit
  - append `#branch={branch name}` to get a specific branch
  - by default, the latest master is fetched

## Versioning

`package.json` contains the version number of the interface. Each version has a tag attached to respective commit, and are automatically published to npm.

We are using `SemVer 2.0` to version the interfaces.

- Breaking changes raises major version number
- Changes to interfaces that are compatible for existing application raises minor version

