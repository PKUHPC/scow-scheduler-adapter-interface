---
"@scow/scow-scheduler-adapter-interface": minor
---

新增获取集群节点信息接口 GetClusterNodesInfo
在 BlockAccountRequest 中增加兼容型参数 blocked_partitions
在 UnBlockAccountRequest 中增加兼容型参数 unblocked_partitions
在 GetAllAccountsWithUsersResponse 的返回值中变更 blocked 的注释，增加 account_blocked_details
在 QueryAccountBlockStatusRequest 中增加兼容型参数 queried_partitions，Response中变更 blocked 的注释，增加 account_blocked_details
在 getJobsRequest 中增加兼容型参数 job_id 和 job_name