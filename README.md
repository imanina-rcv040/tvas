# Reco Traffic Offense

This is a traffic offence detector software such as illegal uturn or illegal parking

## Table of contents
- [Reco Traffic Offense](#reco-traffic-offense)
  - [Table of contents](#table-of-contents)
  - [Architecture](#architecture)
  - [How to start the app](#how-to-start-the-app)
  - [Reference](#reference)


## Architecture

The architecture overview is [here](./docs/ARCHITECTURE.md).

## How to start the app

1.  Build docker image
    ```bash
    ./.dev/build-docker.sh
    ```

2.  Start docker (run either one script only)
    ```bash
    # Option 1: For deployment only
    ./.dev/run-server.sh

    # Option 2: For development only
    ./.dev/dev-server.sh
    ```

3.  Goto web browser and enter the IP address defined in the `docker-compose.yml` file.

## Reference

- [How to write a readme? You may refer to this](https://github.com/opengovsg/FormSG/blob/develop/README.md)
