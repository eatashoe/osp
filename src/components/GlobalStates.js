import { createState, useState } from '@hookstate/core';

const globalFolderStates = createState({});
const globalCopyStates = createState(null);
const globalFolderIdStates = createState(0);
const globalDeskItemStates = createState([]);
const globalDeleteStates = createState({})

const wrapState = (s) => ({
    get: () => s.value,
})

export const globalFolder = () => wrapState(globalFolderStates)
export const useGlobalFolder = () => useState(globalFolderStates)

export const globalCopy = () => wrapState(globalCopyStates)
export const useGlobalCopy = () => useState(globalCopyStates)

export const globalFolderId = () => wrapState(globalFolderIdStates)
export const useGlobalFolderId = () => useState(globalFolderIdStates)

export const globalDeskItem = () => wrapState(globalDeskItemStates)
export const useGlobalDeskItem = () => useState(globalDeskItemStates)

export const globalDelete = () => wrapState(globalDeleteStates)
export const useGlobalDelete = () => useState(globalDeleteStates)

