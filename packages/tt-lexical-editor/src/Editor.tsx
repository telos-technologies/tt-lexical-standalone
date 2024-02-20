/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
import {CharacterLimitPlugin} from '@lexical/react/LexicalCharacterLimitPlugin';
import {CheckListPlugin} from '@lexical/react/LexicalCheckListPlugin';
import {ClearEditorPlugin} from '@lexical/react/LexicalClearEditorPlugin';
import LexicalClickableLinkPlugin from '@lexical/react/LexicalClickableLinkPlugin';
import {CollaborationPlugin} from '@lexical/react/LexicalCollaborationPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import {HashtagPlugin} from '@lexical/react/LexicalHashtagPlugin';
import {HistoryPlugin, HistoryState} from '@lexical/react/LexicalHistoryPlugin';
import {HorizontalRulePlugin} from '@lexical/react/LexicalHorizontalRulePlugin';
import {ListPlugin} from '@lexical/react/LexicalListPlugin';
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {TabIndentationPlugin} from '@lexical/react/LexicalTabIndentationPlugin';
import {TablePlugin} from '@lexical/react/LexicalTablePlugin';
import useLexicalEditable from '@lexical/react/useLexicalEditable';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {CAN_USE_DOM} from 'shared/canUseDOM';
import {createWebsocketProvider} from 'tt-lexical/src/collaboration';
import ActionsPlugin from 'tt-lexical/src/plugins/ActionsPlugin';
import AutocompletePlugin from 'tt-lexical/src/plugins/AutocompletePlugin';
import AutoEmbedPlugin from 'tt-lexical/src/plugins/AutoEmbedPlugin';
import AutoLinkPlugin from 'tt-lexical/src/plugins/AutoLinkPlugin';
import CodeActionMenuPlugin from 'tt-lexical/src/plugins/CodeActionMenuPlugin';
import CodeHighlightPlugin from 'tt-lexical/src/plugins/CodeHighlightPlugin';
import CollapsiblePlugin from 'tt-lexical/src/plugins/CollapsiblePlugin';
import CommentPlugin from 'tt-lexical/src/plugins/CommentPlugin';
import ComponentPickerPlugin from 'tt-lexical/src/plugins/ComponentPickerPlugin';
import ContextMenuPlugin from 'tt-lexical/src/plugins/ContextMenuPlugin';
import DragDropPaste from 'tt-lexical/src/plugins/DragDropPastePlugin';
import DraggableBlockPlugin from 'tt-lexical/src/plugins/DraggableBlockPlugin';
import EmojiPickerPlugin from 'tt-lexical/src/plugins/EmojiPickerPlugin';
import EmojisPlugin from 'tt-lexical/src/plugins/EmojisPlugin';
import EquationsPlugin from 'tt-lexical/src/plugins/EquationsPlugin';
import ExcalidrawPlugin from 'tt-lexical/src/plugins/ExcalidrawPlugin';
import FigmaPlugin from 'tt-lexical/src/plugins/FigmaPlugin';
import FloatingLinkEditorPlugin from 'tt-lexical/src/plugins/FloatingLinkEditorPlugin';
import FloatingTextFormatToolbarPlugin from 'tt-lexical/src/plugins/FloatingTextFormatToolbarPlugin';
import ImagesPlugin from 'tt-lexical/src/plugins/ImagesPlugin';
import InlineImagePlugin from 'tt-lexical/src/plugins/InlineImagePlugin';
import KeywordsPlugin from 'tt-lexical/src/plugins/KeywordsPlugin';
import {LayoutPlugin} from 'tt-lexical/src/plugins/LayoutPlugin/LayoutPlugin';
import LinkPlugin from 'tt-lexical/src/plugins/LinkPlugin';
import ListMaxIndentLevelPlugin from 'tt-lexical/src/plugins/ListMaxIndentLevelPlugin';
import MarkdownShortcutPlugin from 'tt-lexical/src/plugins/MarkdownShortcutPlugin';
import {MaxLengthPlugin} from 'tt-lexical/src/plugins/MaxLengthPlugin';
import MentionsPlugin from 'tt-lexical/src/plugins/MentionsPlugin';
import PageBreakPlugin from 'tt-lexical/src/plugins/PageBreakPlugin';
import PollPlugin from 'tt-lexical/src/plugins/PollPlugin';
import SpeechToTextPlugin from 'tt-lexical/src/plugins/SpeechToTextPlugin';
import TabFocusPlugin from 'tt-lexical/src/plugins/TabFocusPlugin';
import TableCellActionMenuPlugin from 'tt-lexical/src/plugins/TableActionMenuPlugin';
import TableCellResizer from 'tt-lexical/src/plugins/TableCellResizer';
import TableOfContentsPlugin from 'tt-lexical/src/plugins/TableOfContentsPlugin';
import ToolbarPlugin from 'tt-lexical/src/plugins/ToolbarPlugin';
import TreeViewPlugin from 'tt-lexical/src/plugins/TreeViewPlugin';
import TwitterPlugin from 'tt-lexical/src/plugins/TwitterPlugin';
import YouTubePlugin from 'tt-lexical/src/plugins/YouTubePlugin';
import ContentEditable from 'tt-lexical/src/ui/ContentEditable';
import Placeholder from 'tt-lexical/src/ui/Placeholder';

const skipCollaborationInit =
  // @ts-expect-error
  window.parent != null && window.parent.frames.right === window;

type EditorProps = {
  isCollab: boolean;
  isAutocomplete: boolean;
  isMaxLength: boolean;
  isCharLimit: boolean;
  isCharLimitUtf8: boolean;
  isRichText: boolean;
  showTreeView: boolean;
  showTableOfContents: boolean;
  shouldUseLexicalContextMenu: boolean;
  tableCellMerge: boolean;
  tableCellBackgroundColor: boolean;
  historyState: HistoryState | undefined;
};

export default function Editor({
  isCollab,
  isAutocomplete,
  isMaxLength,
  isCharLimit,
  isCharLimitUtf8,
  isRichText,
  showTreeView,
  showTableOfContents,
  shouldUseLexicalContextMenu,
  tableCellMerge,
  tableCellBackgroundColor,
  historyState,
}: EditorProps): JSX.Element {
  const isEditable = useLexicalEditable();
  const text = isCollab
    ? 'Enter some collaborative rich text...'
    : isRichText
    ? 'Enter some rich text...'
    : 'Enter some plain text...';
  const placeholder = <Placeholder>{text}</Placeholder>;
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);
  const [isSmallWidthViewport, setIsSmallWidthViewport] =
    useState<boolean>(false);
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  useEffect(() => {
    const updateViewPortWidth = () => {
      const isNextSmallWidthViewport =
        CAN_USE_DOM && window.matchMedia('(max-width: 1025px)').matches;

      if (isNextSmallWidthViewport !== isSmallWidthViewport) {
        setIsSmallWidthViewport(isNextSmallWidthViewport);
      }
    };
    updateViewPortWidth();
    window.addEventListener('resize', updateViewPortWidth);

    return () => {
      window.removeEventListener('resize', updateViewPortWidth);
    };
  }, [isSmallWidthViewport]);

  return (
    <>
      {isRichText && <ToolbarPlugin setIsLinkEditMode={setIsLinkEditMode} />}
      <div
        className={`editor-container ${showTreeView ? 'tree-view' : ''} ${
          !isRichText ? 'plain-text' : ''
        }`}>
        {isMaxLength && <MaxLengthPlugin maxLength={30} />}
        <DragDropPaste />
        <AutoFocusPlugin />
        <ClearEditorPlugin />
        <ComponentPickerPlugin />
        <EmojiPickerPlugin />
        <AutoEmbedPlugin />

        <MentionsPlugin />
        <EmojisPlugin />
        <HashtagPlugin />
        <KeywordsPlugin />
        <SpeechToTextPlugin />
        <AutoLinkPlugin />
        <CommentPlugin
          providerFactory={isCollab ? createWebsocketProvider : undefined}
        />
        {isRichText ? (
          <>
            {isCollab ? (
              <CollaborationPlugin
                id="main"
                providerFactory={createWebsocketProvider}
                shouldBootstrap={!skipCollaborationInit}
              />
            ) : (
              <HistoryPlugin externalHistoryState={historyState} />
            )}
            <RichTextPlugin
              contentEditable={
                <div className="editor-scroller">
                  <div className="editor" ref={onRef}>
                    <ContentEditable />
                  </div>
                </div>
              }
              placeholder={placeholder}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <MarkdownShortcutPlugin />
            <CodeHighlightPlugin />
            <ListPlugin />
            <CheckListPlugin />
            <ListMaxIndentLevelPlugin maxDepth={7} />
            <TablePlugin
              hasCellMerge={tableCellMerge}
              hasCellBackgroundColor={tableCellBackgroundColor}
            />
            <TableCellResizer />
            <ImagesPlugin />
            <InlineImagePlugin />
            <LinkPlugin />
            <PollPlugin />
            <TwitterPlugin />
            <YouTubePlugin />
            <FigmaPlugin />
            {!isEditable && <LexicalClickableLinkPlugin />}
            <HorizontalRulePlugin />
            <EquationsPlugin />
            <ExcalidrawPlugin />
            <TabFocusPlugin />
            <TabIndentationPlugin />
            <CollapsiblePlugin />
            <PageBreakPlugin />
            <LayoutPlugin />
            {floatingAnchorElem && !isSmallWidthViewport && (
              <>
                <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
                <CodeActionMenuPlugin anchorElem={floatingAnchorElem} />
                <FloatingLinkEditorPlugin
                  anchorElem={floatingAnchorElem}
                  isLinkEditMode={isLinkEditMode}
                  setIsLinkEditMode={setIsLinkEditMode}
                />
                <TableCellActionMenuPlugin
                  anchorElem={floatingAnchorElem}
                  cellMerge={true}
                />
                <FloatingTextFormatToolbarPlugin
                  anchorElem={floatingAnchorElem}
                />
              </>
            )}
          </>
        ) : (
          <>
            <PlainTextPlugin
              contentEditable={<ContentEditable />}
              placeholder={placeholder}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin externalHistoryState={historyState} />
          </>
        )}
        {(isCharLimit || isCharLimitUtf8) && (
          <CharacterLimitPlugin
            charset={isCharLimit ? 'UTF-16' : 'UTF-8'}
            maxLength={5}
          />
        )}
        {isAutocomplete && <AutocompletePlugin />}
        <div>{showTableOfContents && <TableOfContentsPlugin />}</div>
        {shouldUseLexicalContextMenu && <ContextMenuPlugin />}
        <ActionsPlugin isRichText={isRichText} />
      </div>
      {showTreeView && <TreeViewPlugin />}
    </>
  );
}
