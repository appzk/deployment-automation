function parse_git_dirty {
  [[ $(git status 2> /dev/null | tail -n1) != "nothing to commit, working tree clean" ]] && echo "*"
}

function parse_git_branch {
  git branch --no-color 2> /dev/null | sed -e '/^[^*]/d' -e "s/* \(.*\)/(\1$(parse_git_dirty))/"
}

BRANCH=$(parse_git_branch)
if [ $BRANCH == "(development*)" ]; then
  echo "$BRANCH 尚未完成本地提交。"
elif [ $BRANCH != "(development)" ]; then
  echo "当前 $BRANCH 不是 development 分支，请先执行 git checkout development 切换分支"
else
  echo "开始云端导报和发布..."
  echo
  echo "正在提交到远程 development 分支..."
  echo
  git push origin development
  echo
  echo "正在本地与 master 分支合并..."
  echo
  git checkout master
  git merge development --no-ff --quiet --no-edit
  echo
  echo "正在提交到远程 master 分支..."
  echo
  git push origin master
  echo
  echo "已完成 master 分支合并，并已触发云端打包发布流程。"
  echo
  git checkout development
  echo
  echo "已返回本地 development 分支。"
  echo
  echo "请在 Travis Dashboard 中查看结果:"
  echo "https://www.travis-ci.org/MagicCube/cdn-pub-automation/"
  echo
  echo "如果 Travis 正处在运行高峰，云端打包会出现延迟，你也可以在这里查看结果:"
  echo "https://www.travis-ci.org/MagicCube/cdn-pub-automation/branches"
fi
