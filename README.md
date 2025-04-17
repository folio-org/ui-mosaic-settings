# ui-mosaic-settings

Copyright (C) 2025 The Open Library Foundation

This software is distributed under the terms of the Apache License, Version 2.0. See the file "[LICENSE](LICENSE)" for more information.

## Introduction

Congratulations on creating a new Stripes UI app module!  Follow the instructions below to run `ui-mosaic-settings` and start your development.

## Prerequisites

In order to view and log into the platform being served up, a suitable Okapi backend will need to be running. The [testing-backend](https://app.vagrantup.com/folio/boxes/testing-backend) Vagrant box should work if your app does not yet have its own backend module.

## Run your new app

Run the following from the `ui-mosaic-settings` directory to serve your new app using a development server:
```
stripes serve
```

Note: When serving up a newly created app that does not have its own backend permissions established, pass the `--hasAllPerms` option to display the app in the UI navigation. For example:
```
stripes serve --hasAllPerms
```

To specify your own tenant ID or to use an Okapi instance other than `http://localhost:9130` pass the `--okapi` and `--tenant` options.
```
stripes serve --okapi http://my-okapi.example.com:9130 --tenant my-tenant-id
```

## Additional information

Other [modules](https://dev.folio.org/source-code/#client-side).

See project [UIMS](https://folio-org.atlassian.net/browse/UIMS)
at the [FOLIO issue tracker](https://dev.folio.org/guidelines/issue-tracker).

Other FOLIO Developer documentation is at [dev.folio.org](https://dev.folio.org/)

