<div align="center">
  <br />
  <h1>UltimateLemon Snowflake ☃️</h1>
  <br />
  <br />
  <p>
      <a href="https://www.typescriptlang.org/" target="_blank"><img src="https://img.shields.io/badge/-TypeScript-000?style=for-the-badge&logo=typescript"></a>
  </p>
</div>

## About 📘

This repository households the source code for the UltimateLemon Snowflake package. We utilize Twitter's snowflake ❄️ format for uniquely identifiable descriptors (IDs).

### Snowflake architecture ☃️

Snowflake IDs are 64-bit unsigned integers that are roughly sortable by time. Because of their length, snowflakes are always stored as strings. Snowflakes are composed of 4 parts:

- Timestamp, milliseconds since 1 January 2023 00:00:00 UTC
- Internal worker ID
- Internal process ID
- Increment, for every ID that is generated on that process

## Installation 📦

```bash
# With npm
npm install @ultimatelemoneu/snowflake

# With yarn
yarn add @ultimatelemoneu/snowflake
```

## Usage 🚀

### Create new snowflake

It is time to create your first snowflake ID. You can do this by creating a new instance of the Snowflake class and calling the generate method.

```ts
import Snowflake from '@ultimatelemoneu/snowflake';

const snowflake = new Snowflake();

// You can use this ID variable to identify a user, a message, a channel, etc.
const id = snowflake.generate();
```

### Parse existing snowflakes

You can also parse existing snowflakes. This is useful when you want more information about a snowflake ID.

```ts
import Snowflake from '@ultimatelemoneu/snowflake';

const snowflakeInfo = Snowflake.parse('131557566537793536');
// {
//   createdAt: 2023-01-01T00:00:00.000Z,
//   workerId: 0,
//   processId: 0
// }
```

## License 📜

This project is licensed under the GPL-3.0 License - see the [LICENSE](LICENSE) file for details.
