# heartland-documentation

Heartland SDK Documentation

## Requirements

- Ruby (`ruby`)
- RubyGems (`gem`)
- Build tools for native gems

If you do not have Ruby installed on your system, follow these instructions:

```bash
# Mac OS
$ brew install ruby
```

```batch
REM Windows

C:\docs> @powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin
C:\docs> choco install ruby -v 2.2.4
C:\docs> choco install ruby2.devkit
```

After installation, open a new terminal/command window to load any `PATH` changes.

## Build

#### *nix systems:

```bash
$ ./bin/install.sh
$ ./bin/build.sh
```

#### Windows (if cloned to `C:\docs`):

```batch
C:\docs> bin/install.bat
C:\docs> bin/build.bat
```

## Development

This will create a local server on port 4567 (`http://localhost:4567`) that will
watch the directory for changes in all files except the `_config.yml` file.

#### *nix systems:

```bash
$ ./bin/install.sh
$ ./bin/serve.sh
```

#### Windows (if cloned to `C:\docs`):

```batch
C:\docs> bin/install.bat
C:\docs> bin/serve.bat
```
