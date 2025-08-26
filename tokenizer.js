import { Tiktoken } from "js-tiktoken";
import o200k_base from "js-tiktoken/ranks/o200k_base";

const encoder = new Tiktoken(o200k_base);
const userQuery = "Hello how are you gs"

const tokens = encoder.encode(userQuery);
console.log(tokens);

const iptokens = [ 13225, 1495, 553, 481, 55253 ]
const decode = encoder.decode(iptokens);
console.log(decode)