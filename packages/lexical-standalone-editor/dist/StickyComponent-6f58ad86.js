/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

var LexicalCollaborationContext = require('@lexical/react/LexicalCollaborationContext');
var LexicalCollaborationPlugin = require('@lexical/react/LexicalCollaborationPlugin');
var LexicalComposerContext = require('@lexical/react/LexicalComposerContext');
var LexicalErrorBoundary = require('@lexical/react/LexicalErrorBoundary');
var LexicalHistoryPlugin = require('@lexical/react/LexicalHistoryPlugin');
var LexicalNestedComposer = require('@lexical/react/LexicalNestedComposer');
var LexicalPlainTextPlugin = require('@lexical/react/LexicalPlainTextPlugin');
var lexical = require('lexical');
var React = require('react');
var Editor = require('./Editor-eb6ebc68.js');
var collaboration = require('./collaboration-c256cac2.js');
require('@lexical/react/LexicalAutoFocusPlugin');
require('@lexical/react/LexicalCharacterLimitPlugin');
require('@lexical/react/LexicalCheckListPlugin');
require('@lexical/react/LexicalClearEditorPlugin');
require('@lexical/react/LexicalClickableLinkPlugin');
require('@lexical/react/LexicalComposer');
require('@lexical/react/LexicalHorizontalRulePlugin');
require('@lexical/react/LexicalListPlugin');
require('@lexical/react/LexicalRichTextPlugin');
require('@lexical/react/LexicalTabIndentationPlugin');
require('@lexical/react/LexicalTablePlugin');
require('@lexical/react/useLexicalEditable');
require('@lexical/code');
require('@lexical/link');
require('@lexical/list');
require('@lexical/mark');
require('@lexical/overflow');
require('@lexical/react/LexicalHorizontalRuleNode');
require('@lexical/rich-text');
require('@lexical/table');
require('@lexical/selection');
require('@lexical/utils');
require('@lexical/react/useLexicalNodeSelection');
require('react-dom');
require('@lexical/react/LexicalBlockWithAlignableContents');
require('@lexical/react/LexicalDecoratorBlockNode');
require('@lexical/file');
require('@lexical/markdown');
require('@lexical/yjs');
require('@lexical/react/LexicalAutoEmbedPlugin');
require('@lexical/react/LexicalAutoLinkPlugin');
require('@lexical/react/LexicalTypeaheadMenuPlugin');
require('@lexical/react/LexicalContextMenuPlugin');
require('@lexical/react/LexicalLinkPlugin');
require('@lexical/react/LexicalMarkdownShortcutPlugin');
require('@lexical/react/LexicalTableOfContents');
require('@lexical/react/LexicalTreeView');
require('@lexical/react/LexicalContentEditable');
require('y-websocket');
require('yjs');

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const theme = {
  ...Editor.baseTheme,
  paragraph: 'StickyEditorTheme__paragraph'
};
var StickyEditorTheme = theme;

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
function positionSticky(stickyElem, positioning) {
  const style = stickyElem.style;
  const rootElementRect = positioning.rootElementRect;
  const rectLeft = rootElementRect !== null ? rootElementRect.left : 0;
  const rectTop = rootElementRect !== null ? rootElementRect.top : 0;
  style.top = rectTop + positioning.y + 'px';
  style.left = rectLeft + positioning.x + 'px';
}
function StickyComponent({
  x,
  y,
  nodeKey,
  color,
  caption
}) {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  const stickyContainerRef = React.useRef(null);
  const positioningRef = React.useRef({
    isDragging: false,
    offsetX: 0,
    offsetY: 0,
    rootElementRect: null,
    x: 0,
    y: 0
  });
  const {
    isCollabActive
  } = LexicalCollaborationContext.useCollaborationContext();
  React.useEffect(() => {
    const position = positioningRef.current;
    position.x = x;
    position.y = y;
    const stickyContainer = stickyContainerRef.current;
    if (stickyContainer !== null) {
      positionSticky(stickyContainer, position);
    }
  }, [x, y]);
  Editor.useLayoutEffect(() => {
    const position = positioningRef.current;
    const resizeObserver = new ResizeObserver(entries => {
      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        const {
          target
        } = entry;
        position.rootElementRect = target.getBoundingClientRect();
        const stickyContainer = stickyContainerRef.current;
        if (stickyContainer !== null) {
          positionSticky(stickyContainer, position);
        }
      }
    });
    const removeRootListener = editor.registerRootListener((nextRootElem, prevRootElem) => {
      if (prevRootElem !== null) {
        resizeObserver.unobserve(prevRootElem);
      }
      if (nextRootElem !== null) {
        resizeObserver.observe(nextRootElem);
      }
    });
    const handleWindowResize = () => {
      const rootElement = editor.getRootElement();
      const stickyContainer = stickyContainerRef.current;
      if (rootElement !== null && stickyContainer !== null) {
        position.rootElementRect = rootElement.getBoundingClientRect();
        positionSticky(stickyContainer, position);
      }
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
      removeRootListener();
    };
  }, [editor]);
  React.useEffect(() => {
    const stickyContainer = stickyContainerRef.current;
    if (stickyContainer !== null) {
      // Delay adding transition so we don't trigger the
      // transition on load of the sticky.
      setTimeout(() => {
        stickyContainer.style.setProperty('transition', 'top 0.3s ease 0s, left 0.3s ease 0s');
      }, 500);
    }
  }, []);
  const handlePointerMove = event => {
    const stickyContainer = stickyContainerRef.current;
    const positioning = positioningRef.current;
    const rootElementRect = positioning.rootElementRect;
    if (stickyContainer !== null && positioning.isDragging && rootElementRect !== null) {
      positioning.x = event.pageX - positioning.offsetX - rootElementRect.left;
      positioning.y = event.pageY - positioning.offsetY - rootElementRect.top;
      positionSticky(stickyContainer, positioning);
    }
  };
  const handlePointerUp = event => {
    const stickyContainer = stickyContainerRef.current;
    const positioning = positioningRef.current;
    if (stickyContainer !== null) {
      positioning.isDragging = false;
      stickyContainer.classList.remove('dragging');
      editor.update(() => {
        const node = lexical.$getNodeByKey(nodeKey);
        if (Editor.$isStickyNode(node)) {
          node.setPosition(positioning.x, positioning.y);
        }
      });
    }
    document.removeEventListener('pointermove', handlePointerMove);
    document.removeEventListener('pointerup', handlePointerUp);
  };
  const handleDelete = () => {
    editor.update(() => {
      const node = lexical.$getNodeByKey(nodeKey);
      if (Editor.$isStickyNode(node)) {
        node.remove();
      }
    });
  };
  const handleColorChange = () => {
    editor.update(() => {
      const node = lexical.$getNodeByKey(nodeKey);
      if (Editor.$isStickyNode(node)) {
        node.toggleColor();
      }
    });
  };
  const {
    historyState
  } = Editor.useSharedHistoryContext();
  return /*#__PURE__*/React.createElement("div", {
    ref: stickyContainerRef,
    className: "sticky-note-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: `sticky-note ${color}`,
    onPointerDown: event => {
      const stickyContainer = stickyContainerRef.current;
      if (stickyContainer == null || event.button === 2 || event.target !== stickyContainer.firstChild) {
        // Right click or click on editor should not work
        return;
      }
      const stickContainer = stickyContainer;
      const positioning = positioningRef.current;
      if (stickContainer !== null) {
        const {
          top,
          left
        } = stickContainer.getBoundingClientRect();
        positioning.offsetX = event.clientX - left;
        positioning.offsetY = event.clientY - top;
        positioning.isDragging = true;
        stickContainer.classList.add('dragging');
        document.addEventListener('pointermove', handlePointerMove);
        document.addEventListener('pointerup', handlePointerUp);
        event.preventDefault();
      }
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handleDelete,
    className: "delete",
    "aria-label": "Delete sticky note",
    title: "Delete"
  }, "X"), /*#__PURE__*/React.createElement("button", {
    onClick: handleColorChange,
    className: "color",
    "aria-label": "Change sticky note color",
    title: "Color"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bucket"
  })), /*#__PURE__*/React.createElement(LexicalNestedComposer.LexicalNestedComposer, {
    initialEditor: caption,
    initialTheme: StickyEditorTheme
  }, isCollabActive ? /*#__PURE__*/React.createElement(LexicalCollaborationPlugin.CollaborationPlugin, {
    id: caption.getKey(),
    providerFactory: collaboration.createWebsocketProvider,
    shouldBootstrap: true
  }) : /*#__PURE__*/React.createElement(LexicalHistoryPlugin.HistoryPlugin, {
    externalHistoryState: historyState
  }), /*#__PURE__*/React.createElement(LexicalPlainTextPlugin.PlainTextPlugin, {
    contentEditable: /*#__PURE__*/React.createElement(Editor.LexicalContentEditable, {
      className: "StickyNode__contentEditable"
    }),
    placeholder: /*#__PURE__*/React.createElement(Editor.Placeholder, {
      className: "StickyNode__placeholder"
    }, "What's up?"),
    ErrorBoundary: LexicalErrorBoundary
  }))));
}

exports["default"] = StickyComponent;
