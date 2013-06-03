# Grunt + themes tests

## Installation instructions

### Installing the source from Git

```Shell
cd /path/to/www/
git clone https://github.com/benjamindulau/grunt-test.git
cd grunt-test/
```

### Configuration

You have to copy the `app/config/parameters.dist.yml` file to `app/config/parameters.yml`

```Shell
cp app/config/parameters.dist.yml app/config/parameters.yml
```

Edit app/config/parameters.yml and update values according to your environment.

### Installing required Node modules

#### Grunt

Install `grunt-cli` if it's not already done (require NodeJS > 0.8.0):

```Shell
sudo npm install -g grunt-cli
```

#### Bower

Install bower if it's not already done (require NodeJS):

```Shell
sudo npm install -g bower
```

### Installing vendors

Install composer if it's not already done:

```Shell
curl -s http://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
```

That being done, to install php vendors, just run (from the project's root directory)

```Shell
composer install
```

### Installing assets

```Shell
grunt dev
```

**Note**: use the option `--no-symlink` if you're operating system doesn't support symlinks.

### Watching for assets changes

```Shell
grunt watch
```