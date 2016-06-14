
export NVM_DIR="~/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm
ulimit -n 2000


alias npm-destroy="sudo rm -rf ./node_modules; sudo rm -rf ~/tmp; npm cache clear"
export PATH=$HOME/.binctl:$PATH
