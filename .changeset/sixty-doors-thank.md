---
"@scow/scow-scheduler-adapter-interface": patch
---

在 submitScriptAsJob 下增加可选查询参数 script_file_full_path，当脚本内容中没有指定工作目录时，将脚本文件所在的绝对路径作为默认工作目录
