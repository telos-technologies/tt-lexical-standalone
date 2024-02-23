/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const hostName = window.location.hostname;
export const isDevPlayground: boolean =
  hostName !== 'playground.lexical.dev' &&
  hostName !== 'lexical-playground.vercel.app';

type DEFAULT_SETTINGS_TYPE = {
  disableBeforeInput?: boolean;
  isAutocomplete?: boolean;
  isCharLimit?: boolean;
  isCharLimitUtf8?: boolean;
  isCollab?: boolean;
  isMaxLength?: boolean;
  isRichText?: boolean;
  measureTypingPerf?: boolean;
  shouldUseLexicalContextMenu?: boolean;
  showNestedEditorTreeView?: boolean;
  showTableOfContents?: boolean;
  showTreeView?: boolean;
  tableCellBackgroundColor?: boolean;
  tableCellMerge?: boolean;
};

export const DEFAULT_SETTINGS: DEFAULT_SETTINGS_TYPE = {
  disableBeforeInput: false,
  isAutocomplete: false,
  isCharLimit: false,
  isCharLimitUtf8: false,
  isCollab: false,
  isMaxLength: false,
  isRichText: true,
  measureTypingPerf: false,
  shouldUseLexicalContextMenu: false,
  showNestedEditorTreeView: false,
  showTableOfContents: false,
  showTreeView: true,
  tableCellBackgroundColor: true,
  tableCellMerge: true,
};

export type SettingName = keyof DEFAULT_SETTINGS_TYPE;

export type Settings = DEFAULT_SETTINGS_TYPE;
