# Getting Started

This is a short prerequisites.

By the end of this section you should have a k6 installation.
If you already have one - you may skip it.

# Ways to check k6 installation

```sh
which k6
```
expect the path in which your `k6` binary is installed.

```sh
k6 --version
```
expect a version output

# Installing

## brew (mac and linux)

(i) Mind that linux distributions have `linuxbrew`, which supports this package.

```sh
brew install k6
```

## windows

Recommended to consider running it in your WSL.

If you want to run it natively - use one of the following:

```
winget install k6
```

```
choco install k6
```

Or, download and run the latest [official installer](https://dl.k6.io/msi/k6-latest-amd64.msi)


## compile from source
Handled in future parts.
At this stage it is only important to note you can enhance k6 with extensions compiled in `go`, which results with a different `k6` binary.
