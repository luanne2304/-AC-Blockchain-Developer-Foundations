import crypto from "crypto";

export type Block = {
  index: number;
  timestamp: string;
  transactions: any[];
  previous_hash: string;
  current_hash: string;
};

function calculateHash(index: number, timestamp: string, transactions: any[], previous_hash: string): string {
  const value = index + timestamp + JSON.stringify(transactions) + previous_hash;
  return crypto.createHash("sha256").update(value).digest("hex");
}

export function isValidBlock(block: Block): boolean {
  const expectedHash = calculateHash(
    block.index,
    block.timestamp,
    block.transactions,
    block.previous_hash
  );
  return block.current_hash === expectedHash;
}
