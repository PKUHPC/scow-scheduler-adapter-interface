# @scow/scow-scheduler-adapter-interface

Interface for SCOW to call different schedulers. 

## Implementations 

- [PKUHPC/scow-slurm-adapter](https://github.com/PKUHPC/scow-slurm-adapter): for slurm

## Getting proto files

You can get the proto files using the following methods:

- `git clone` this repository
- `npm install --save @scow/scow-scheduler-adapter-interface`
- `buf generate https://github.com/PKUHPC/scow-scheduler-adapter-interface.git`

## Versioning

`package.json` contains the version number of the interface.

We are using `SemVer 2.0` to version the interfaces.

- Breaking changes raises major version number
- Changes to interfaces that are compatible for existing application raises minor version

