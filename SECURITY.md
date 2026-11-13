# Security

## Credentials

This plugin does not use a Feishu App Secret. It reads and writes the Base through `lark-cli` with the current user's login.

Do not commit:

- `.env`
- `APP_ID` / `APP_Secret`
- Base Token
- `lark-cli` tokens or cookies
- screenshots that contain account or tenant URLs

The repository ships a fictional snapshot so the page can render without any credentials.

## If a token was exposed

1. Revoke the token or rotate the Feishu app secret.
2. Run `lark-cli auth logout` and `lark-cli auth login` again.
3. Remove the value from the repository and from its history before pushing.
4. Check the Base's collaborators and remove anyone who should not have access.

## Reporting

Open a private security advisory or contact the maintainer instead of filing a public issue with credentials.
