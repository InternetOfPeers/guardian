
/**
 * NFT
 */
export class RawNFT {
    /**
     * Identifier
     */
    id!: string;

    /**
     * Token identifier
     */
    tokenId: string;

    /**
     * Last update
     */
    lastUpdate: number;

    /**
     * Serial number
     */
    serialNumber: number;

    /**
     * Metadata
     */
    metadata: string;

    /**
     * Analytics
     */
    analytics?: any;
}
