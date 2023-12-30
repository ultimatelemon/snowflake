import Snowflake from '../src';

test('Creates a new snowflake ID', (): void => {
  const snowflake = new Snowflake();
  const generatedId = snowflake.generate();

  expect(generatedId).not.toBeUndefined();
  expect(generatedId).not.toBeNaN();
});

test('Checks if snowflake ID matches the date', (): void => {
  const snowflake = new Snowflake();
  const generatedId = snowflake.generate();

  const parsedSnowflake = Snowflake.parse(generatedId);
  expect(parsedSnowflake.createdAt.getDate()).toEqual(new Date().getDate());
  expect(parsedSnowflake.createdAt.getMonth()).toEqual(new Date().getMonth());
  expect(parsedSnowflake.createdAt.getFullYear()).toEqual(new Date().getFullYear());
});
