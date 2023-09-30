import { Command } from "./command";
import { DiceRoll } from "./commands/fun/diceroll";
import { CoinFlip } from "./commands/fun/coinflip";
import { CheckNSFW } from "./commands/admin/checknsfw";
import { Purge } from "./commands/moderation/purge";
import { ShutDown } from "./commands/botowner/shutdown";
import { EightBall } from "./commands/fun/8ball";
import { Help } from "./commands/other/help";

export const Commands: Command[] = [DiceRoll, CoinFlip, CheckNSFW, Purge, ShutDown, EightBall, Help];