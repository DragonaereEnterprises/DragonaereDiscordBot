import { LavalinkManager } from "lavalink-client/dist/types";
import { BotClient } from "../types";

export function NodesEvents(client:BotClient, lavalink: LavalinkManager) {
  lavalink.nodeManager.on("raw", (node, payload) => {
    console.log(node.id, " :: RAW :: ", payload);
  }).on("disconnect", (node, reason) => {
    console.log(node.id, " :: DISCONNECT :: ", reason);
  }).on("connect", (node) => {
    console.log(node.id, " :: CONNECTED :: ");
  }).on("reconnecting", (node) => {
    console.log(node.id, " :: RECONNECTING :: ");
  }).on("create", (node) => {
    console.log(node.id, " :: CREATED :: ");
  }).on("destroy", (node) => {
    console.log(node.id, " :: DESTROYED :: ");
  }).on("error", (node, error, payload) => {
    console.log(node.id, " :: ERRORED :: ", error, " :: PAYLOAD :: ", payload);
  });
}