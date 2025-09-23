// 代码生成时间: 2025-09-23 17:45:05
const fs = require('fs');
const path = require('path');

/**
 * 批量文件重命名工具
 * @param {string} directory - 文件夹路径
 * @param {Object} renameRule - 重命名规则对象
 */
function batchRename(directory, renameRule) {
  // 确保目录存在
  if (!fs.existsSync(directory)) {
    console.error('Directory does not exist:', directory);
    return;
  }

  // 读取目录中的所有文件
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    files.forEach((file) => {
      // 构建原始文件的完整路径
      const fullPath = path.join(directory, file);
      // 检查是否为文件
      if (fs.lstatSync(fullPath).isFile()) {
        // 应用重命名规则
        const newName = renameRule(file);
        if (newName) {
          // 构建新文件的完整路径
          const newFullPath = path.join(directory, newName);
          // 重命名文件
          fs.rename(fullPath, newFullPath, (err) => {
            if (err) {
              console.error('Error renaming file:', err);
            } else {
              console.log(`Renamed ${file} to ${newName}`);
            }
          });
        }
      }
    });
  });
}

/**
 * 简单的重命名规则示例：
 * 给文件名添加前缀
 * @param {string} filename - 原始文件名
 * @return {string|null} - 新文件名或null（如果不符合重命名条件）
 */
function addPrefixRule(prefix) {
  return (filename) => {
    return prefix + filename;
  };
}

/**
 * 使用示例
 * 假设我们有一个文件夹'files'，我们想给里面的每个文件名前添加'new_'前缀
 */
const directoryPath = 'files';
const renameRule = addPrefixRule('new_');
batchRename(directoryPath, renameRule);

// 注意：这个脚本需要在Node.js环境中运行，并且需要适当的文件系统权限。