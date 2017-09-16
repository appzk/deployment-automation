function parse_git_dirty {
  [[ $(git status 2> /dev/null | tail -n1) != "nothing to commit, working tree clean" ]] && echo "*"
}

function parse_git_branch {
  git branch --no-color 2> /dev/null | sed -e '/^[^*]/d' -e "s/* \(.*\)/(\1$(parse_git_dirty))/"
}

function print_info {
  TEXT=$1
  echo "\033[32m[信息] $TEXT \033[0m"
  echo
}

function print_link {
  TEXT=$1
  LINK=$2
  echo "$TEXT"
  echo "\033[36m$LINK \033[0m"
  echo
}

function print_error {
  TEXT=$1
  echo "\033[31m[错误] $TEXT \033[0m"
  echo
}

BRANCH=$(parse_git_branch)
echo
if [ $BRANCH == "(development*)" ]; then
  print_error "$BRANCH 尚未完成本地提交。"
elif [ $BRANCH != "(development)" ]; then
  print_error "当前 $BRANCH 不是 development 分支，请先执行 git checkout development 切换分支。"
else
  print_info "开始云端自动化部署..."
  print_info "正在将本地更改提交到远程 development 分支..."
  git push origin development
  echo
  print_info "正在将 development 与 master 分支在本地合并..."
  git checkout master
  git merge development --no-ff --quiet --no-edit
  echo
  print_info "正在将合并结果提交到远程 master 分支..."
  git push origin master
  echo
  print_info "已完成 master 分支合并，并已触发云端部署流程。"
  git checkout development
  echo
  print_info "本地已返回 development 分支。"
  print_link "请在 Travis Dashboard 中查看结果:" "https://www.travis-ci.org/MagicCube/deployment-automation/"
  print_link "如果 Travis 正处在运行高峰，云端打包会出现延迟，你也可以在这里查看结果:" "https://www.travis-ci.org/MagicCube/deployment-automation/branches"
fi
