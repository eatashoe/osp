import { createState, useState } from '@hookstate/core';

const globalFolderStates = createState({});
const globalFolderIdStates = createState(0);
const globalDeleteStates = createState({})
const globalDarkModeState = createState(false);

const wrapState = (s) => ({
    get: () => s.value,
})

export const globalFolder = () => wrapState(globalFolderStates)
export const useGlobalFolder = () => useState(globalFolderStates)

export const globalFolderId = () => wrapState(globalFolderIdStates)
export const useGlobalFolderId = () => useState(globalFolderIdStates)

export const globalDelete = () => wrapState(globalDeleteStates)
export const useGlobalDelete = () => useState(globalDeleteStates)

export const useDarkMode = () => useState(globalDarkModeState);

