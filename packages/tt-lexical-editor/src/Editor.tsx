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
import {
  InitialEditorStateType,
  LexicalComposer,
} from '@lexical/react/LexicalComposer';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import {HashtagPlugin} from '@lexical/react/LexicalHashtagPlugin';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {HorizontalRulePlugin} from '@lexical/react/LexicalHorizontalRulePlugin';
import {ListPlugin} from '@lexical/react/LexicalListPlugin';
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {TabIndentationPlugin} from '@lexical/react/LexicalTabIndentationPlugin';
import {TablePlugin} from '@lexical/react/LexicalTablePlugin';
import useLexicalEditable from '@lexical/react/useLexicalEditable';
import {createWebsocketProvider} from 'lexical-playground/src/collaboration';
import {SharedAutocompleteContext} from 'lexical-playground/src/context/SharedAutocompleteContext';
import {
  SharedHistoryContext,
  useSharedHistoryContext,
} from 'lexical-playground/src/context/SharedHistoryContext';
import PlaygroundNodes from 'lexical-playground/src/nodes/PlaygroundNodes';
import ActionsPlugin from 'lexical-playground/src/plugins/ActionsPlugin';
import AutocompletePlugin from 'lexical-playground/src/plugins/AutocompletePlugin';
import AutoEmbedPlugin from 'lexical-playground/src/plugins/AutoEmbedPlugin';
import AutoLinkPlugin from 'lexical-playground/src/plugins/AutoLinkPlugin';
import CodeActionMenuPlugin from 'lexical-playground/src/plugins/CodeActionMenuPlugin';
import CodeHighlightPlugin from 'lexical-playground/src/plugins/CodeHighlightPlugin';
import CollapsiblePlugin from 'lexical-playground/src/plugins/CollapsiblePlugin';
import CommentPlugin from 'lexical-playground/src/plugins/CommentPlugin';
import ComponentPickerPlugin from 'lexical-playground/src/plugins/ComponentPickerPlugin';
import ContextMenuPlugin from 'lexical-playground/src/plugins/ContextMenuPlugin';
import DocsPlugin from 'lexical-playground/src/plugins/DocsPlugin';
import DragDropPaste from 'lexical-playground/src/plugins/DragDropPastePlugin';
import DraggableBlockPlugin from 'lexical-playground/src/plugins/DraggableBlockPlugin';
import EmojiPickerPlugin from 'lexical-playground/src/plugins/EmojiPickerPlugin';
import EmojisPlugin from 'lexical-playground/src/plugins/EmojisPlugin';
import EquationsPlugin from 'lexical-playground/src/plugins/EquationsPlugin';
import ExcalidrawPlugin from 'lexical-playground/src/plugins/ExcalidrawPlugin';
import FigmaPlugin from 'lexical-playground/src/plugins/FigmaPlugin';
import FloatingLinkEditorPlugin from 'lexical-playground/src/plugins/FloatingLinkEditorPlugin';
import FloatingTextFormatToolbarPlugin from 'lexical-playground/src/plugins/FloatingTextFormatToolbarPlugin';
import ImagesPlugin from 'lexical-playground/src/plugins/ImagesPlugin';
import InlineImagePlugin from 'lexical-playground/src/plugins/InlineImagePlugin';
import KeywordsPlugin from 'lexical-playground/src/plugins/KeywordsPlugin';
import {LayoutPlugin} from 'lexical-playground/src/plugins/LayoutPlugin/LayoutPlugin';
import LinkPlugin from 'lexical-playground/src/plugins/LinkPlugin';
import ListMaxIndentLevelPlugin from 'lexical-playground/src/plugins/ListMaxIndentLevelPlugin';
import MarkdownShortcutPlugin from 'lexical-playground/src/plugins/MarkdownShortcutPlugin';
import {MaxLengthPlugin} from 'lexical-playground/src/plugins/MaxLengthPlugin';
import MentionsPlugin from 'lexical-playground/src/plugins/MentionsPlugin';
import PageBreakPlugin from 'lexical-playground/src/plugins/PageBreakPlugin';
import PasteLogPlugin from 'lexical-playground/src/plugins/PasteLogPlugin';
import PollPlugin from 'lexical-playground/src/plugins/PollPlugin';
import SpeechToTextPlugin from 'lexical-playground/src/plugins/SpeechToTextPlugin';
import TabFocusPlugin from 'lexical-playground/src/plugins/TabFocusPlugin';
import TableCellActionMenuPlugin from 'lexical-playground/src/plugins/TableActionMenuPlugin';
import TableCellResizer from 'lexical-playground/src/plugins/TableCellResizer';
import TableOfContentsPlugin from 'lexical-playground/src/plugins/TableOfContentsPlugin';
import {TableContext} from 'lexical-playground/src/plugins/TablePlugin';
import TestRecorderPlugin from 'lexical-playground/src/plugins/TestRecorderPlugin';
import ToolbarPlugin from 'lexical-playground/src/plugins/ToolbarPlugin';
import TreeViewPlugin from 'lexical-playground/src/plugins/TreeViewPlugin';
import TwitterPlugin from 'lexical-playground/src/plugins/TwitterPlugin';
import TypingPerfPlugin from 'lexical-playground/src/plugins/TypingPerfPlugin';
import YouTubePlugin from 'lexical-playground/src/plugins/YouTubePlugin';
import PlaygroundEditorTheme from 'lexical-playground/src/themes/PlaygroundEditorTheme';
import ContentEditable from 'lexical-playground/src/ui/ContentEditable';
import Placeholder from 'lexical-playground/src/ui/Placeholder';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {CAN_USE_DOM} from 'shared/canUseDOM';

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
  editorState?: InitialEditorStateType;
  isDevPlayground?: boolean;
  measureTypingPerf?: boolean;
};

function Editor({
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
}: EditorProps): JSX.Element {
  const {historyState} = useSharedHistoryContext();

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

export const LexicalEditor = ({
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
  editorState,
  isDevPlayground = false,
  measureTypingPerf,
}: EditorProps) => {
  const initialConfig = {
    editorState,
    namespace: 'Playground',
    nodes: [...PlaygroundNodes],
    onError: (error: Error) => {
      throw error;
    },
    theme: PlaygroundEditorTheme,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <SharedHistoryContext>
        <TableContext>
          <SharedAutocompleteContext>
            <div className="editor-shell">
              <Editor
                {...{
                  isAutocomplete,
                  isCharLimit,
                  isCharLimitUtf8,
                  isCollab,
                  isMaxLength,
                  isRichText,
                  shouldUseLexicalContextMenu,
                  showTableOfContents,
                  showTreeView,
                  tableCellBackgroundColor,
                  tableCellMerge,
                }}
              />
            </div>
          </SharedAutocompleteContext>
        </TableContext>
      </SharedHistoryContext>
      {isDevPlayground ? <DocsPlugin /> : null}
      {isDevPlayground ? <PasteLogPlugin /> : null}
      {isDevPlayground ? <TestRecorderPlugin /> : null}
      {measureTypingPerf ? <TypingPerfPlugin /> : null}
    </LexicalComposer>
  );
};
