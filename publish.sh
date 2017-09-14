function parse_git_dirty {
  [[ $(git status 2> /dev/null | tail -n1) != "nothing to commit (working directory clean)" ]] && echo "*"
}

function parse_git_branch {
  git branch --no-color 2> /dev/null | sed -e '/^[^*]/d' -e "s/* \(.*\)/(\1$(parse_git_dirty))/"
}

BRANCH=$(parse_git_branch)
if [ $BRANCH == "(development*)" ]; then
  echo "$BRANCH 尚未完成本地提交或未 push 到远程。"
elif [ $BRANCH != "(development)" ]; then
  echo "$BRANCH，当前不是 development 分支，请先执行 git checkout development"
fi
