import { createState, useState } from '@hookstate/core';

const globalFolderStates = createState({});
const globalFolderIdStates = createState(17);
const globalDeleteStates = createState({})
const globalDarkModeState = createState(false);
const globalDeskItem = createState([]);
const globalCopy = createState(null);
const globalDirectory = createState([]);
const globalOpenFolder = createState([]);

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

export const useGlobalDeskItem = () => useState(globalDeskItem);

export const useGlobalCopy = () => useState(globalCopy);

export const useGlobalDirectory = () => useState(globalDirectory);

export const useGlobalOpenFolder = () => useState(globalOpenFolder);


