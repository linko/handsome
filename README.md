Setup project
--

0. Setup postgres database (+ Create user in PGAdmin III with all priviliges)
1. Run `cp config/database.yml.template config/database.yml` (+Add your username password to database.yml)
2. Run `bundle install` (It could require to run `bundle update rake` before)
3. Run `rake db:setup`
4. Run `rails s`
