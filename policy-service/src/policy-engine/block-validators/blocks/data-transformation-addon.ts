import { BlockValidator, IBlockProp } from '../index.js';
import { CommonBlock } from './common.js';

/**
 * Data transformation addon
 */
export class DataTransformationAddon {
  /**
   * Block type
   */
  public static readonly blockType: string = 'dataTransformationAddon';

  /**
   * Validate block options
   * @param validator
   * @param config
   */
  public static async validate(validator: BlockValidator, ref: IBlockProp): Promise<void> {
    await CommonBlock.validate(validator, ref);
  }
}
