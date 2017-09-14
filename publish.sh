function parse_git_dirty {
  [[ $(git status 2> /dev/null | tail -n1) != "nothing to commit, working tree clean" ]] && echo "*"
}

function parse_git_branch {
  git branch --no-color 2> /dev/null | sed -e '/^[^*]/d' -e "s/* \(.*\)/(\1$(parse_git_dirty))/"
}

BRANCH=$(parse_git_branch)
if [ $BRANCH == "(development*)" ]; then
  echo "\033[31m[错误] $BRANCH 尚未完成本地提交。\033[0m"
  echo
elif [ $BRANCH != "(development)" ]; then
  echo "\033[31m[错误] 当前 $BRANCH 不是 development 分支，请先执行 git checkout development 切换分支。\033[0m"
  echo
else
  echo "\033[32m开始云端导报和发布... \033[0m"
  echo
  echo "\033[32m[远程] 正在提交到 development 分支... \033[0m"
  echo
  git push origin development
  echo
  echo "\033[32m[本地] 正在将 development 与 master 分支合并... \033[0m"
  echo
  git checkout master
  git merge development --no-ff --quiet --no-edit
  echo
  echo "\033[32m[远程] 正在提交到 master 分支... \033[0m"
  echo
  git push origin master
  echo
  echo "\033[32m[远程] 已完成 master 分支合并，并已触发云端打包发布流程。 \033[0m"
  echo
  git checkout development
  echo
  echo "\033[32m[本地] 已返回 development 分支。 \033[0m"
  echo
  echo "请在 Travis Dashboard 中查看结果:"
  echo "\033[36mhttps://www.travis-ci.org/MagicCube/cdn-pub-automation/ \033[0m"
  echo
  echo "如果 Travis 正处在运行高峰，云端打包会出现延迟，你也可以在这里查看结果:"
  echo "\033[36mhttps://www.travis-ci.org/MagicCube/cdn-pub-automation/branches \033[0m"
  echo
fi
