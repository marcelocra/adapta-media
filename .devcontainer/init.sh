#!/usr/bin/env bash

alias gs='git status'
# simple and resumed, no branches
alias gss='git status -s'
# simple and resumed, with branches
alias gsb='git status -sb'

alias ga='git add'
alias gaa='git add --all'

alias gb='git branch'
alias gbd='git branch -d'

alias gco='git checkout'
# Go back to previous branch.
alias gco-='git checkout -'

alias gc='git commit -v'
alias gcm='git commit -m'

alias gac='gaa && gc'
alias gacm='gaa && gcm'

alias gd='git d'
alias gdk='git dk'

alias gpl="git pull"
alias gps="git push"
alias gpss="git push --set-upstream"
alias gpd='git push --dry-run'

alias gld="git log --graph --pretty='%Cred%h%Creset -%C(auto)%d%Creset %s %Cgreen(%ad) %C(bold blue)<%an>%Creset'"
alias gl="gld -10"
alias gla="gld"
# git log graph
alias glg='git log --oneline --decorate --graph --all'
# git log simple
alias glsa="git log --oneline --no-decorate"
alias gls="glsa -5"
# git log messages
alias glm='git log --pretty=format:"* %s"'

alias grs='git restore'
alias grss='git restore --staged'
alias grssa='git restore --staged .'

alias gst='git stash'
alias gsta='git stash apply'
alias gstc='git stash clear'
alias gstd='git stash drop'
alias gstl='git stash list'
alias gstp='git stash push -m'
alias gsts='git stash show --text'
alias gstall='git stash --all'

alias gsh='git show'
alias gsps='git show --pretty=short --show-signature'

alias gt='git tag'
alias gta='git tag -a'
alias gts='git tag -s'
alias gtv='git tag | sort -V'

alias git-undo-last='git reset HEAD~'

alias gr='git remote'
alias grc='gr set-url'
alias grco='grc origin'

alias gcct="echo 'git conventional commit types (gcct): fix, feat, build, chore, ci, docs, style, refactor, perf, test'"

# git lfs
alias glfsdry="git lfs push origin main --dry-run --all"
alias glfss="git lfs status"
