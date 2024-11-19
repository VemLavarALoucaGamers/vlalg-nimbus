# github-stars-button

<br />

This is a Github Stars Web Component for Frontend Projects.

## Installation

##### CDN

```js [Unpkg JS]
  https://unpkg.com/@vlalg-nimbus/github-stars-button/dist/github-stars-button.min.umd.js
```

##### To install

```bash
npm install @vlalg-nimbus/github-stars-button

# or

yarn add @vlalg-nimbus/github-stars-button
```

## Usage

```js
<head>
  <script type="module" src="https://unpkg.com/@vlalg-nimbus/github-stars-button/dist/github-stars-button.min.umd.js"></script>
</head>
<body>
  <github-stars-button
    data-repo-owner="repo owner"
    data-repo-name="repo name"
    data-show-count="true"
    data-go-repo="true"
  >
  </github-stars-button>

  <script>
    const githubStarsButton = document.querySelector('github-stars-button')

    githubStarsButton.addEventListener('webcomp-clicked', function(event) {
      const repoOwner = this.dataset.repoOwner
      const repoName = this.dataset.repoName
      const showCount = this.dataset.showCount

      console.log('Here', repoOwner, repoName, showCount)
      console.log('Custom event triggered:', event.detail.message)
    })
  </script>
</body>
```

## Components list

The components that are part of this lib are:

- <a href="http://nimbus.tec.br/web-components/github-stars-button" target="_blank">github-stars-button</a>

Click on each one above to find out how to use it, properties, events, etc.

## License

[MIT](http://opensource.org/licenses/MIT)
