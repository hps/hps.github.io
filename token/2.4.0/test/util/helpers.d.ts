/// <reference types="mocha" />
import { HPS } from "../../src/HPS";
import { TokenizationResponse } from "../../src/types/TokenizationResponse";
export declare const HeartlandTest: {
    public_key: string;
    check_for_token: (assert: any, done: MochaDone, callback?: () => void) => (response: TokenizationResponse) => void;
    default_error: (assert: any, done: MochaDone, callback?: () => void) => (response: TokenizationResponse) => void;
    addHandler: (target: string | EventTarget, event: string, callback: EventListener) => void;
    setCardData: (hps: HPS, child?: boolean) => void;
    makeDiv: (id: string) => void;
};
