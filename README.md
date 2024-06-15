# Last Played on Lastfm

Show your last played track on your website.

## Example

- https://dablog.pages.dev/en/
- [![Lastfm](https://img.shields.io/endpoint?url=https://listening.rooyca.workers.dev/v1/last/rooyca)](https://www.last.fm/user/rooyca)

## Usage

1. Replace `<username>` with your last.fm username.

```markdown
[![Lastfm](https://img.shields.io/endpoint?url=https://listening.rooyca.workers.dev/v1/last/<username>)](https://www.last.fm/user/<username>)
```

You can customize badges using query parameters, see [shields.io documentation](https://shields.io/badges/endpoint-badge).

## Development

For this to work locally you would need a `.dev.vars` file in the root directory with the following content:

```bash
URL_END="&limit=1&api_key=YOUR_API_KEY&format=json"
```

If you want to deploy this on Cloudflare Workers you would need to set the environment variable `URL_END` with the same value. For that you would use:

```bash
wrangler secret put URL_END
```

## Contributing

Feel free to contribute by opening an issue or a pull request.

## License

[MIT](LICENSE)