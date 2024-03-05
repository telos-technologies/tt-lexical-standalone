/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

var LexicalComposerContext = require('@lexical/react/LexicalComposerContext');
var utils = require('@lexical/utils');
var lexical = require('lexical');
var React = require('react');
var Editor = require('./Editor-eb6ebc68.js');
require('@lexical/react/LexicalAutoFocusPlugin');
require('@lexical/react/LexicalCharacterLimitPlugin');
require('@lexical/react/LexicalCheckListPlugin');
require('@lexical/react/LexicalClearEditorPlugin');
require('@lexical/react/LexicalClickableLinkPlugin');
require('@lexical/react/LexicalComposer');
require('@lexical/react/LexicalErrorBoundary');
require('@lexical/react/LexicalHistoryPlugin');
require('@lexical/react/LexicalHorizontalRulePlugin');
require('@lexical/react/LexicalListPlugin');
require('@lexical/react/LexicalPlainTextPlugin');
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
require('@lexical/react/useLexicalNodeSelection');
require('react-dom');
require('@lexical/react/LexicalBlockWithAlignableContents');
require('@lexical/react/LexicalDecoratorBlockNode');
require('@lexical/file');
require('@lexical/markdown');
require('@lexical/react/LexicalCollaborationContext');
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

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
function EquationEditor({
  equation,
  setEquation,
  inline
}, forwardedRef) {
  const onChange = event => {
    setEquation(event.target.value);
  };
  return inline && forwardedRef instanceof HTMLInputElement ? /*#__PURE__*/React.createElement("span", {
    className: "EquationEditor_inputBackground"
  }, /*#__PURE__*/React.createElement("span", {
    className: "EquationEditor_dollarSign"
  }, "$"), /*#__PURE__*/React.createElement("input", {
    className: "EquationEditor_inlineEditor",
    value: equation,
    onChange: onChange,
    autoFocus: true,
    ref: forwardedRef
  }), /*#__PURE__*/React.createElement("span", {
    className: "EquationEditor_dollarSign"
  }, "$")) : /*#__PURE__*/React.createElement("div", {
    className: "EquationEditor_inputBackground"
  }, /*#__PURE__*/React.createElement("span", {
    className: "EquationEditor_dollarSign"
  }, '$$\n'), /*#__PURE__*/React.createElement("textarea", {
    className: "EquationEditor_blockEditor",
    value: equation,
    onChange: onChange,
    ref: forwardedRef
  }), /*#__PURE__*/React.createElement("span", {
    className: "EquationEditor_dollarSign"
  }, '\n$$'));
}
var EquationEditor$1 = /*#__PURE__*/React.forwardRef(EquationEditor);

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
function EquationComponent({
  equation,
  inline,
  nodeKey
}) {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  const [equationValue, setEquationValue] = React.useState(equation);
  const [showEquationEditor, setShowEquationEditor] = React.useState(false);
  const inputRef = React.useRef(null);
  const onHide = React.useCallback(restoreSelection => {
    setShowEquationEditor(false);
    editor.update(() => {
      const node = lexical.$getNodeByKey(nodeKey);
      if (Editor.$isEquationNode(node)) {
        node.setEquation(equationValue);
        if (restoreSelection) {
          node.selectNext(0, 0);
        }
      }
    });
  }, [editor, equationValue, nodeKey]);
  React.useEffect(() => {
    if (!showEquationEditor && equationValue !== equation) {
      setEquationValue(equation);
    }
  }, [showEquationEditor, equation, equationValue]);
  React.useEffect(() => {
    if (showEquationEditor) {
      return utils.mergeRegister(editor.registerCommand(lexical.SELECTION_CHANGE_COMMAND, payload => {
        const activeElement = document.activeElement;
        const inputElem = inputRef.current;
        if (inputElem !== activeElement) {
          onHide();
        }
        return false;
      }, lexical.COMMAND_PRIORITY_HIGH), editor.registerCommand(lexical.KEY_ESCAPE_COMMAND, payload => {
        const activeElement = document.activeElement;
        const inputElem = inputRef.current;
        if (inputElem === activeElement) {
          onHide(true);
          return true;
        }
        return false;
      }, lexical.COMMAND_PRIORITY_HIGH));
    } else {
      return editor.registerUpdateListener(({
        editorState
      }) => {
        const isSelected = editorState.read(() => {
          const selection = lexical.$getSelection();
          return lexical.$isNodeSelection(selection) && selection.has(nodeKey) && selection.getNodes().length === 1;
        });
        if (isSelected) {
          setShowEquationEditor(true);
        }
      });
    }
  }, [editor, nodeKey, onHide, showEquationEditor]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, showEquationEditor ? /*#__PURE__*/React.createElement(EquationEditor$1, {
    equation: equationValue,
    setEquation: setEquationValue,
    inline: inline,
    ref: inputRef
  }) : /*#__PURE__*/React.createElement(Editor.ErrorBoundary, {
    onError: e => editor._onError(e),
    fallback: null
  }, /*#__PURE__*/React.createElement(Editor.KatexRenderer, {
    equation: equationValue,
    inline: inline,
    onDoubleClick: () => setShowEquationEditor(true)
  })));
}

exports["default"] = EquationComponent;
