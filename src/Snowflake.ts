import { IParsedSnowflake } from './types/global.interface';

/**
 * Snowflake ID generator.
 */
class Snowflake {
  /**
   * The epoch for snowflakes.
   * @type {number}
   * @static
   */
  public static epoche: number = 1_672_531_200_000;

  /**
   * The process worker ID.
   * @type {number}
   */
  public workerId: number;

  /**
   * The sequence number.
   * @type {number}
   */
  public sequence: number;

  /**
   * Last timestamp.
   * @type {number}
   */
  public lastTimestamp: number;

  /**
   * Creates a new instance of Snowflake.
   */
  constructor() {
    this.workerId = parseInt(process.env.WORKER_ID || '0', 10);
    this.sequence = 0;
    this.lastTimestamp = -1;
  }

  /**
   * Generates a new snowflake ID.
   * @returns {string}
   */
  public generate(): string {
    const timestamp = Date.now();

    if (this.lastTimestamp === timestamp) {
      this.sequence = (this.sequence + 1) & 4095;
      if (this.sequence === 0) {
        while (Date.now() <= timestamp) {
          // Wait for next millisecond.
        }
      }
    } else {
      this.sequence = 0;
    }

    const stampDifference = timestamp - Snowflake.epoche;
    const stampBinary = BigInt(stampDifference).toString(2).padStart(42, '0');
    const workerBinary = BigInt(this.workerId).toString(2).padStart(5, '0');
    const processBinary = BigInt(this.workerId).toString(2).padStart(5, '0');
    const sequenceBinary = BigInt(this.sequence).toString(2).padStart(12, '0');

    const snowflakeBinary = `${stampBinary}${workerBinary}${processBinary}${sequenceBinary}`;

    this.lastTimestamp = timestamp;

    return BigInt('0b' + snowflakeBinary).toString();
  }

  /**
   * Parses a snowflake ID into a more readable format.
   * @param {string} snowflake - The snowflake ID to parse.
   * @returns {IParsedSnowflake}
   */
  public static parse(snowflake: string): IParsedSnowflake {
    const binary = BigInt(snowflake).toString(2).padStart(64, '0');

    const stampBinary = binary.slice(0, 42);
    const parsedStamp = parseInt(stampBinary, 2);
    const workerBinary = binary.slice(42, 47);
    const processBinary = binary.slice(47, 52);

    return {
      createdAt: new Date(parsedStamp + Snowflake.epoche),
      workerId: parseInt(workerBinary, 2),
      processId: parseInt(processBinary, 2)
    };
  }
}

export default Snowflake;
