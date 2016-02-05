# heartland-documentation

Heartland SDK Documentation

## Requirements

- Ruby (`ruby`)
- RubyGems (`gem`)
- Build tools for native gems

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
