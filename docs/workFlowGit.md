---
title: Git 入门手册
tags:
  - git
  - Git Bash
---

混 Github 同性社区 git 是必备的。公司代码协作也从 SVN 迁移到 git ，趁机把日常用到的一些简单命令做个梳理，以备脑短路时查阅。本文会持续更正更新...

<!-- more -->

## 1. Git 起步


### 1.1. 仓库的概念

  Git 由 工作区（workspace）、暂存区（index）、本地仓库（local repository），远程仓库（remote repository）组成

#### 1.1.1 解释说明

  - 远程仓库： 远程仓库是指托管在网络上的项目仓库，它们是一些无法移动的本地分支；只有在 Git 进行网络交互时才会更新。同他人协作开发某个项目时，需要管理这些远程仓库，以便推送或拉取数据，分享各自的工作进展。
  - 远程分支： 远程引用是对远程仓库的引用（指针），包括分支、标签等等，只有在 Git 进行网络交互时才会更新。我理解的是 *远程分支* 存放在 *本地仓库*

#### 1.1.2 文件的三种状态

  对于任何一个文件，在 Git 内都只有三种状态：已提交（committed），已修改（modified）和已暂存（staged）。

  - 已提交表示该文件已经被安全地保存在本地数据库中了；
  - 已修改表示修改了某个文件，但还没有提交保存；
  - 已暂存表示把已修改的文件放在下次提交时要保存的清单中。

#### 1.1.3 基本的 Git 工作流程

  1. 在工作目录中修改某些文件。
  2. 对修改后的文件进行快照，然后保存到暂存区域。
  3. 提交更新，将保存在暂存区域的文件快照永久转储到 Git 目录中。近乎所有操作都是本地执行，也是 *分布式工作流程* 的魅力所在
  4. 功能开发完毕推送到远程仓库，便可协同开发了


### 1.2. 安装 Git Bash

  - windows平台下载安装 [<https://git-for-windows.github.io/>]
  - `git --help git` git帮助文档


### 1.3. 运行 Git 前的配置

  - 设置全局Name和Email地址

    > git config --global user.name "Your Name" git config --global user.email "email@example.com"

  - 也可以给指定项目单独设置信息

    > git config user.name "Your Name" git config user.email "email@example.com" git config --list 查看配置信息

  - 文本编辑器，Git 需要你输入一些额外消息的时候，默认 Vi 或者 Vim

    > git config --global core.editor atom

  - 查看配置信息

    > git config --list



## 2. Git 基础

### 2.2. Git 基础操作

#### 2.2.1. 取得项目的 Git 仓库

##### 进入工作目录

  - `mkdir HtmlCode` 创建工作区
  - `cd HtmlCode` 进入文件夹
  - `pwd` 显示当前目录

##### 在此目录初始化仓库 或 从现有仓库克隆一份

  - `git init` 在工作区创建git管理仓库 or *clone一个远程库*
  - `git clone [url] D://HtmlCode` 克隆远程版本库并更名

#### 2.2.2.  记录每次更新到仓库

  - `git status` 检查当前仓库文件状态
  - `git add .` 指明要追踪文件，把目标文件放入暂存区域
  - `git commit -m "说明话术"` 现在，你的改动已经提交到了 HEAD，但是还没到你的远端仓库
  - `git push` 推送到远程仓库

#### 2.2.3. 查看提交历史

  - `git log` 默认不用任何参数的话，git log 会按提交时间列出所有的更新，最近的更新排在最上面。看到了吗，每次更新都有一个 SHA-1 校验和、作者的名字和电子邮件地址、提交时间，最后缩进一个段落显示提交说明。
  - `git log -p -2` 我们常用 -p 选项展开显示每次提交的内容差异，用 -2 则仅显示最近的两次更新
  - `git log --oneline` 精简模式
  - `git reflog` 查看命令历史，以便回到未来的版本


### 2.3. 撤消操作

#### 2.3.1. 修改最后一次提交

  有时候我们提交完了才发现漏掉了几个文件没有加，或者提交信息写错了。想要撤消刚才的提交操作，可以使用--amend 选项重新提交：

  ```
  git commit -m 'initial commit'
  git add forgotten_file
  git commit --amend
  ```

  上面的三条命令最终只是产生一个提交，第二个提交命令修正了第一个的提交内容。

#### 2.3.2. 取消已经暂存的文件

  ```
  git reset HEAD <files>
  ```


### 2.4. 回退文件

  ![工作区、版本库、暂存区原理图](/article_images/D1_git-stage.png)

  - `git checkout -- <file1> <file2>` 此命令会使用 HEAD 中的最新内容替换掉你的工作目录中的文件。这个操作很危险，会清除工作区中未添加到暂存区的改动,已添加到缓存区的改动，以及新文件，都不受影响
  - `git checkout -f` 丢弃工作区、缓存区所有修改。清除commit之前的所有修改
  - `git checkout <commitID>` 干净的版本回退，将丢弃工作区、缓存区所有修改
  - `git checkout HEAD <file>` 从最新的版本替换工作区文件
  - `git reset --soft HEAD^` 从最新版本库回退到工作区
  - `git reset --soft <commitID>` 从最新版本库回退到工作区

    ```
    --soft – 缓存区和工作目录都不会被改变
    --mixed – 默认选项。缓存区和你指定的提交同步，但工作目录不受影响
    --hard – 缓存区和工作目录都同步到你指定的提交
    ```

  - `git reset <commit_id>` 在历史版本间回滚，消除commit信息，文件放回工作区
  - `git rm --cached <file1> <file2>` 直接从暂存区删除文件，工作区则不做出改变


### 2.5.  清理untracked文件

  - `git clean -f` 删除所有 untracked 文件
  - `git clean -fd` 连同 untracked 目录一并删除 _建议删除前加上 -n 预览会删除哪些文件，以免误删_ `git clear -nfd`


## 3. Git 分支

### 3.1 分支管理

  - `git fetch –p` 更新分支列表
  - `git branch` 查看当前分支，当前分支前面会标一个「*」
  - `git branch -r` 查看远程分支
  - `git branch -a` 查看所有分支
  - `git branch -va` 查看所有分支+log
  - `git branch -ar` 查看本地+远程分支及最后一次log
  - `git branch <branch>` 创建分支
  - `git checkout <branch>` 切换分支
  - `git checkout -b <branch>` 创建+切换分支
  - `git merge <branch>` 合并某分支到当前分支
  - `git branch -D <branch>` 删除某分支


### 3.2. 与远程仓库交互

#### 3.2.1. 更新远程分支信息

  - `git fetch` 将远程主机的更新全部取回本地，fetch 回来的分支，用 origin/branch_xx 格式访问
  - `git fetch origin master` 取回 origin 主机的 master 分支


#### 3.2.1. 从远程分支开新分支

  1. `git fetch origin <remoteBranch>` 从远程仓库取回指定分支作为远程分支
  2. `git checkout -b <localBranch> <origin/remoteBranch>` 在此远程分支上创建一个新分支


#### 3.2.2. 远程主机上的分支 合并到 本地分支

  - `git pull origin <remoteBranch>` 将远程仓库指定分支与当前分支合并
  - `git pull origin <remoteBranch>:<localBranch>` 将远程某分支与指定的本地分支合并
  - `git merge origin/<remoteBranch>` 将远程分支merge到本分支

##### pull 和 merge 的区别

  - git pull 等同于先做 `git fetch`,再做 `git merge`
  - git fetch是将远程仓库的更新获取到本地仓库，不影响其他区域
  - git pull则是一次性将远程仓库的代码更新到工作区（同时也会更新本地仓库）。


  ```
  git fetch origin <remoteBranch>
  git merge <origin/remoteBranch>
  ```


#### 3.2.3. 推送本地分支推送到远程仓库

  - `git push -u origin <branch>` 将本地分支推送到远程仓库同时指定默认主机，之后不用加任何参数直接使用 `git push`
  - `git push <origin> <localBranch>:<remoteBranch>` 本地分支推送到远程仓库，如果远程不存在此分支则会被新建
  - `git branch --set-upstream-to=origin/<branch>` 本地当前分支与远程分支建立追踪关系
  - `git branch -vv` 查看追踪关系
  - `git push <origin>` 如果当前分支与远程分支存在追踪关系，则可直接push到主机
  - `git push` 如果当前分支有且只有一个追踪分支，那么主机名亦可省略

##### 删除本地及远程分支

  -  `git branch -D <branch1> <branch2>` 同时删除本地若干分支
  -  `git push origin :<remoteBranch>` 推送时省略本地分支则会删除指定的远程的分支，同事从远程仓库指针。 *注意不要省略`:`前的空格


## 4. Git WorkFlow

### 4.1. 一次完整的 bugFix 流程

  1. `git fetch orign master` 从远程仓库指定一个分支拉取到本地远程分支
  2. `git checkout -b <bug_xxx> origin/master` 从远程master分支创建 bug_xxx 分支
  2. 本地分支开发代码
  6. `git add .` `git commit -m "话术"` commit 本次更改
  7. `git push -u origin <branch_feature>` 推送本分支到远程作为一个远程新分支
  8. 发起「pull request」,将 <bug_xxx> 合并到 master
  11. PR 被管理员接受即完成本次流程，已废弃分支建议及时删除



## 5. Git tips

### 5.1. 解决 pullRequest 冲突

  eg. vNext_promotion 合并到 vNext 时冲突

  - `git pull`拉取最新代码到本地，工作区不能有 modified 文件；若有，先 `git stash` 代码，再 `git pull`,再将 `stash` 的代码 `git stash pop` 恢复到工作区
  - `git fetch origin vNext` & `git merge origin/vNext` 手动合并代码，发现并解决冲突后再推送代码
  - `git push` 发起PR



建议优先参考 [GitBook](https://git-scm.com/book/zh/v2)