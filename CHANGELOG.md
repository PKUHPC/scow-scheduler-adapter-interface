# @scow/scow-scheduler-adapter-interface

## 1.8.1

### Patch Changes

- aae6839: 将 CancelJobRequest 中 job_id 字段从 int32 修改为 uint32

## 1.8.0

### Minor Changes

- 85099ce: 在 QueryAccountBlockStatus 的 Response 中变更 blocked 的注释，增加 account_blocked_details
  在 ListImplementedOptionalFeatures 中增加可选功能枚举值
  在 account.proto 中增加可选功能 rpc 接口

### Patch Changes

- 24c4889: 在 GetClusterInfoResponse 中增加集群节点信息，作业信息等内容优化查询效率

## 1.7.0

### Minor Changes

- 94fd762: 增加 ConfigService.ListImplementedOptionalFeatures RPC，用于获取适配器实现的可选功能

### Patch Changes

- f3defc7: 新增 deleteUser 和 deleteAccount 接口

## 1.6.0

### Minor Changes

- eb952d6: 新增获取集群节点信息接口 GetClusterNodesInfo
  在 getJobsRequest 中增加兼容型参数 job_id 和 job_name

## 1.5.0

### Minor Changes

- a01a486: 在 submitScriptAsJob 下增加可选请求参数 script_file_full_path，当脚本内容中没有指定工作目录时，将脚本文件所在的绝对路径作为默认工作目录

## 1.4.0

### Minor Changes

- b03718d: 增加获取集群信息的接口 GetClusterInfo

## 1.3.0

### Minor Changes

- f8425c3: 添加交互式应用接口，添加 GetConnectionConfig 用于获取容器内交互式应用的连接配置

## 1.2.0

### Minor Changes

- 3ee9b2e: 新增提交任意文件直接作为作业文本提交到调度器执行接口 SubmitScriptAsJob

## 1.1.0

### Minor Changes

- d472407: 增加 VersionService，用于获取服务器当前实现的 API 版本

## 1.0.1

### Patch Changes

- a1529b3: Bump version to 1.0.1
