start "Install rubygems-update" /wait cmd /c gem install rubygems-update
start "Update RubyGems" /wait cmd /c "update_rubygems && gem update --system"
