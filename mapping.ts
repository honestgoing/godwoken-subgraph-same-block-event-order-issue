import { Test } from "./generated/schema";
import { Trade, AskNew } from "./generated/ERC721NFTMarketV1/ERC721NFTMarketV1";

export function handleTrade(event: Trade): void {
  if (event.block.number.toI32() > 165467) {
    return;
  }

  let contractAddr = event.address.toHex();
  let test = Test.load(contractAddr);
  if (test === null) {
    test = new Test(contractAddr);
    test.history = [];
  }

  let history = test.history;
  history.push("Trade");
  test.history = history;
  test.latest = "Trade";
  test.save();
}

export function handleAskNew(event: AskNew): void {
  if (event.block.number.toI32() > 165467) {
    return;
  }

  let contractAddr = event.address.toHex();
  let test = Test.load(contractAddr);
  if (test === null) {
    test = new Test(contractAddr);
    test.history = [];
  }

  let history = test.history;
  history.push("AskNew");
  test.history = history;
  test.latest = "AskNew";
  test.save();
}
