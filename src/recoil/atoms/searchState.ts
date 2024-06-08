import { atom } from "recoil";

export const searchState = atom<String>({
    key: 'searchState',
    default: 'korea',
})