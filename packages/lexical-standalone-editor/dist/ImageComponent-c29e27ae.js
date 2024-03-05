/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

var LexicalAutoFocusPlugin = require('@lexical/react/LexicalAutoFocusPlugin');
var LexicalCollaborationContext = require('@lexical/react/LexicalCollaborationContext');
var LexicalCollaborationPlugin = require('@lexical/react/LexicalCollaborationPlugin');
var LexicalComposerContext = require('@lexical/react/LexicalComposerContext');
var LexicalErrorBoundary = require('@lexical/react/LexicalErrorBoundary');
var LexicalHashtagPlugin = require('@lexical/react/LexicalHashtagPlugin');
var LexicalHistoryPlugin = require('@lexical/react/LexicalHistoryPlugin');
var LexicalNestedComposer = require('@lexical/react/LexicalNestedComposer');
var LexicalRichTextPlugin = require('@lexical/react/LexicalRichTextPlugin');
var useLexicalNodeSelection = require('@lexical/react/useLexicalNodeSelection');
var utils = require('@lexical/utils');
var lexical = require('lexical');
var React = require('react');
var collaboration = require('./collaboration-cc5621ce.js');
var Editor = require('./Editor-f26a1586.js');
var useLexicalTextEntity = require('@lexical/react/useLexicalTextEntity');
var LexicalTypeaheadMenuPlugin = require('@lexical/react/LexicalTypeaheadMenuPlugin');
var ReactDOM = require('react-dom');
require('y-websocket');
require('yjs');
require('@lexical/react/LexicalCharacterLimitPlugin');
require('@lexical/react/LexicalCheckListPlugin');
require('@lexical/react/LexicalClearEditorPlugin');
require('@lexical/react/LexicalClickableLinkPlugin');
require('@lexical/react/LexicalComposer');
require('@lexical/react/LexicalHorizontalRulePlugin');
require('@lexical/react/LexicalListPlugin');
require('@lexical/react/LexicalPlainTextPlugin');
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
require('@lexical/react/LexicalBlockWithAlignableContents');
require('@lexical/react/LexicalDecoratorBlockNode');
require('@lexical/file');
require('@lexical/markdown');
require('@lexical/yjs');
require('@lexical/react/LexicalAutoEmbedPlugin');
require('@lexical/react/LexicalAutoLinkPlugin');
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

const hostName = window.location.hostname;
const isDevPlayground = hostName !== 'playground.lexical.dev' && hostName !== 'lexical-playground.vercel.app';
const DEFAULT_SETTINGS = {
  disableBeforeInput: false,
  emptyEditor: isDevPlayground,
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
  tableCellMerge: true
};

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const Context = /*#__PURE__*/React.createContext({
  setOption: (name, value) => {
    return;
  },
  settings: DEFAULT_SETTINGS
});
const useSettings = () => {
  return React.useContext(Context);
};

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
class KeywordNode extends lexical.TextNode {
  static getType() {
    return 'keyword';
  }
  static clone(node) {
    return new KeywordNode(node.__text, node.__key);
  }
  static importJSON(serializedNode) {
    const node = $createKeywordNode(serializedNode.text);
    node.setFormat(serializedNode.format);
    node.setDetail(serializedNode.detail);
    node.setMode(serializedNode.mode);
    node.setStyle(serializedNode.style);
    return node;
  }
  exportJSON() {
    return {
      ...super.exportJSON(),
      type: 'keyword',
      version: 1
    };
  }
  createDOM(config) {
    const dom = super.createDOM(config);
    dom.style.cursor = 'default';
    dom.className = 'keyword';
    return dom;
  }
  canInsertTextBefore() {
    return false;
  }
  canInsertTextAfter() {
    return false;
  }
  isTextEntity() {
    return true;
  }
}
function $createKeywordNode(keyword) {
  return new KeywordNode(keyword);
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const KEYWORDS_REGEX = /(^|$|[^A-Za-zªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԧԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠࢢ-ࢬऄ-हऽॐक़-ॡॱ-ॷॹ-ॿঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-ళవ-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤜᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎↃↄⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々〆〱-〵〻〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚗꚠ-ꛥꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꪀ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ])(congrats|congratulations|gratuluju|gratuluji|gratulujeme|blahopřeju|blahopřeji|blahopřejeme|Til lykke|Tillykke|Glückwunsch|Gratuliere|felicitaciones|enhorabuena|paljon onnea|onnittelut|Félicitations|gratula|gratulálok|gratulálunk|congratulazioni|complimenti|おめでとう|おめでとうございます|축하해|축하해요|gratulerer|Gefeliciteerd|gratulacje|Parabéns|parabéns|felicitações|felicitări|мои поздравления|поздравляем|поздравляю|gratulujem|blahoželám|ยินดีด้วย|ขอแสดงความยินดี|tebrikler|tebrik ederim|恭喜|祝贺你|恭喜你|恭喜|恭喜|baie geluk|veels geluk|অভিনন্দন|Čestitam|Čestitke|Čestitamo|Συγχαρητήρια|Μπράβο|અભિનંદન|badhai|बधाई|अभिनंदन|Честитам|Свака част|hongera|வாழ்த்துகள்|வாழ்த்துக்கள்|అభినందనలు|അഭിനന്ദനങ്ങൾ|Chúc mừng|מזל טוב|mazel tov|mazal tov)(^|$|[^A-Za-zªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԧԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠࢢ-ࢬऄ-हऽॐक़-ॡॱ-ॷॹ-ॿঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-ళవ-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤜᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎↃↄⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々〆〱-〵〻〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚗꚠ-ꛥꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꪀ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ])/i;
function KeywordsPlugin() {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  React.useEffect(() => {
    if (!editor.hasNodes([KeywordNode])) {
      throw new Error('KeywordsPlugin: KeywordNode not registered on editor');
    }
  }, [editor]);
  const createKeywordNode = React.useCallback(textNode => {
    return $createKeywordNode(textNode.getTextContent());
  }, []);
  const getKeywordMatch = React.useCallback(text => {
    const matchArr = KEYWORDS_REGEX.exec(text);
    if (matchArr === null) {
      return null;
    }
    const hashtagLength = matchArr[2].length;
    const startOffset = matchArr.index + matchArr[1].length;
    const endOffset = startOffset + hashtagLength;
    return {
      end: endOffset,
      start: startOffset
    };
  }, []);
  useLexicalTextEntity.useLexicalTextEntity(getKeywordMatch, KeywordNode, createKeywordNode);
  return null;
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
function convertMentionElement(domNode) {
  const textContent = domNode.textContent;
  if (textContent !== null) {
    const node = $createMentionNode(textContent);
    return {
      node
    };
  }
  return null;
}
const mentionStyle = 'background-color: rgba(24, 119, 232, 0.2)';
class MentionNode extends lexical.TextNode {
  static getType() {
    return 'mention';
  }
  static clone(node) {
    return new MentionNode(node.__mention, node.__text, node.__key);
  }
  static importJSON(serializedNode) {
    const node = $createMentionNode(serializedNode.mentionName);
    node.setTextContent(serializedNode.text);
    node.setFormat(serializedNode.format);
    node.setDetail(serializedNode.detail);
    node.setMode(serializedNode.mode);
    node.setStyle(serializedNode.style);
    return node;
  }
  constructor(mentionName, text, key) {
    super(text ?? mentionName, key);
    this.__mention = mentionName;
  }
  exportJSON() {
    return {
      ...super.exportJSON(),
      mentionName: this.__mention,
      type: 'mention',
      version: 1
    };
  }
  createDOM(config) {
    const dom = super.createDOM(config);
    dom.style.cssText = mentionStyle;
    dom.className = 'mention';
    return dom;
  }
  exportDOM() {
    const element = document.createElement('span');
    element.setAttribute('data-lexical-mention', 'true');
    element.textContent = this.__text;
    return {
      element
    };
  }
  static importDOM() {
    return {
      span: domNode => {
        if (!domNode.hasAttribute('data-lexical-mention')) {
          return null;
        }
        return {
          conversion: convertMentionElement,
          priority: 1
        };
      }
    };
  }
  isTextEntity() {
    return true;
  }
  canInsertTextBefore() {
    return false;
  }
  canInsertTextAfter() {
    return false;
  }
}
function $createMentionNode(mentionName) {
  const mentionNode = new MentionNode(mentionName);
  mentionNode.setMode('segmented').toggleDirectionless();
  return lexical.$applyNodeReplacement(mentionNode);
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const PUNCTUATION = '\\.,\\+\\*\\?\\$\\@\\|#{}\\(\\)\\^\\-\\[\\]\\\\/!%\'"~=<>_:;';
const NAME = '\\b[A-Z][^\\s' + PUNCTUATION + ']';
const DocumentMentionsRegex = {
  NAME,
  PUNCTUATION
};
const PUNC = DocumentMentionsRegex.PUNCTUATION;
const TRIGGERS = ['@'].join('');

// Chars we expect to see in a mention (non-space, non-punctuation).
const VALID_CHARS = '[^' + TRIGGERS + PUNC + '\\s]';

// Non-standard series of chars. Each series must be preceded and followed by
// a valid char.
const VALID_JOINS = '(?:' + '\\.[ |$]|' +
// E.g. "r. " in "Mr. Smith"
' |' +
// E.g. " " in "Josh Duck"
'[' + PUNC + ']|' +
// E.g. "-' in "Salier-Hellendag"
')';
const LENGTH_LIMIT = 75;
const AtSignMentionsRegex = new RegExp('(^|\\s|\\()(' + '[' + TRIGGERS + ']' + '((?:' + VALID_CHARS + VALID_JOINS + '){0,' + LENGTH_LIMIT + '})' + ')$');

// 50 is the longest alias length limit.
const ALIAS_LENGTH_LIMIT = 50;

// Regex used to match alias.
const AtSignMentionsRegexAliasRegex = new RegExp('(^|\\s|\\()(' + '[' + TRIGGERS + ']' + '((?:' + VALID_CHARS + '){0,' + ALIAS_LENGTH_LIMIT + '})' + ')$');

// At most, 5 suggestions are shown in the popup.
const SUGGESTION_LIST_LENGTH_LIMIT = 5;
const mentionsCache = new Map();
const dummyMentionsData = ['Aayla Secura', 'Adi Gallia', 'Admiral Dodd Rancit', 'Admiral Firmus Piett', 'Admiral Gial Ackbar', 'Admiral Ozzel', 'Admiral Raddus', 'Admiral Terrinald Screed', 'Admiral Trench', 'Admiral U.O. Statura', 'Agen Kolar', 'Agent Kallus', 'Aiolin and Morit Astarte', 'Aks Moe', 'Almec', 'Alton Kastle', 'Amee', 'AP-5', 'Armitage Hux', 'Artoo', 'Arvel Crynyd', 'Asajj Ventress', 'Aurra Sing', 'AZI-3', 'Bala-Tik', 'Barada', 'Bargwill Tomder', 'Baron Papanoida', 'Barriss Offee', 'Baze Malbus', 'Bazine Netal', 'BB-8', 'BB-9E', 'Ben Quadinaros', 'Berch Teller', 'Beru Lars', 'Bib Fortuna', 'Biggs Darklighter', 'Black Krrsantan', 'Bo-Katan Kryze', 'Boba Fett', 'Bobbajo', 'Bodhi Rook', 'Borvo the Hutt', 'Boss Nass', 'Bossk', 'Breha Antilles-Organa', 'Bren Derlin', 'Brendol Hux', 'BT-1', 'C-3PO', 'C1-10P', 'Cad Bane', 'Caluan Ematt', 'Captain Gregor', 'Captain Phasma', 'Captain Quarsh Panaka', 'Captain Rex', 'Carlist Rieekan', 'Casca Panzoro', 'Cassian Andor', 'Cassio Tagge', 'Cham Syndulla', 'Che Amanwe Papanoida', 'Chewbacca', 'Chi Eekway Papanoida', 'Chief Chirpa', 'Chirrut Îmwe', 'Ciena Ree', 'Cin Drallig', 'Clegg Holdfast', 'Cliegg Lars', 'Coleman Kcaj', 'Coleman Trebor', 'Colonel Kaplan', 'Commander Bly', 'Commander Cody (CC-2224)', 'Commander Fil (CC-3714)', 'Commander Fox', 'Commander Gree', 'Commander Jet', 'Commander Wolffe', 'Conan Antonio Motti', 'Conder Kyl', 'Constable Zuvio', 'Cordé', 'Cpatain Typho', 'Crix Madine', 'Cut Lawquane', 'Dak Ralter', 'Dapp', 'Darth Bane', 'Darth Maul', 'Darth Tyranus', 'Daultay Dofine', 'Del Meeko', 'Delian Mors', 'Dengar', 'Depa Billaba', 'Derek Klivian', 'Dexter Jettster', 'Dineé Ellberger', 'DJ', 'Doctor Aphra', 'Doctor Evazan', 'Dogma', 'Dormé', 'Dr. Cylo', 'Droidbait', 'Droopy McCool', 'Dryden Vos', 'Dud Bolt', 'Ebe E. Endocott', 'Echuu Shen-Jon', 'Eeth Koth', 'Eighth Brother', 'Eirtaé', 'Eli Vanto', 'Ellé', 'Ello Asty', 'Embo', 'Eneb Ray', 'Enfys Nest', 'EV-9D9', 'Evaan Verlaine', 'Even Piell', 'Ezra Bridger', 'Faro Argyus', 'Feral', 'Fifth Brother', 'Finis Valorum', 'Finn', 'Fives', 'FN-1824', 'FN-2003', 'Fodesinbeed Annodue', 'Fulcrum', 'FX-7', 'GA-97', 'Galen Erso', 'Gallius Rax', 'Garazeb "Zeb" Orrelios', 'Gardulla the Hutt', 'Garrick Versio', 'Garven Dreis', 'Gavyn Sykes', 'Gideon Hask', 'Gizor Dellso', 'Gonk droid', 'Grand Inquisitor', 'Greeata Jendowanian', 'Greedo', 'Greer Sonnel', 'Grievous', 'Grummgar', 'Gungi', 'Hammerhead', 'Han Solo', 'Harter Kalonia', 'Has Obbit', 'Hera Syndulla', 'Hevy', 'Hondo Ohnaka', 'Huyang', 'Iden Versio', 'IG-88', 'Ima-Gun Di', 'Inquisitors', 'Inspector Thanoth', 'Jabba', 'Jacen Syndulla', 'Jan Dodonna', 'Jango Fett', 'Janus Greejatus', 'Jar Jar Binks', 'Jas Emari', 'Jaxxon', 'Jek Tono Porkins', 'Jeremoch Colton', 'Jira', 'Jobal Naberrie', 'Jocasta Nu', 'Joclad Danva', 'Joh Yowza', 'Jom Barell', 'Joph Seastriker', 'Jova Tarkin', 'Jubnuk', 'Jyn Erso', 'K-2SO', 'Kanan Jarrus', 'Karbin', 'Karina the Great', 'Kes Dameron', 'Ketsu Onyo', 'Ki-Adi-Mundi', 'King Katuunko', 'Kit Fisto', 'Kitster Banai', 'Klaatu', 'Klik-Klak', 'Korr Sella', 'Kylo Ren', 'L3-37', 'Lama Su', 'Lando Calrissian', 'Lanever Villecham', 'Leia Organa', 'Letta Turmond', 'Lieutenant Kaydel Ko Connix', 'Lieutenant Thire', 'Lobot', 'Logray', 'Lok Durd', 'Longo Two-Guns', 'Lor San Tekka', 'Lorth Needa', 'Lott Dod', 'Luke Skywalker', 'Lumat', 'Luminara Unduli', 'Lux Bonteri', 'Lyn Me', 'Lyra Erso', 'Mace Windu', 'Malakili', 'Mama the Hutt', 'Mars Guo', 'Mas Amedda', 'Mawhonic', 'Max Rebo', 'Maximilian Veers', 'Maz Kanata', 'ME-8D9', 'Meena Tills', 'Mercurial Swift', 'Mina Bonteri', 'Miraj Scintel', 'Mister Bones', 'Mod Terrik', 'Moden Canady', 'Mon Mothma', 'Moradmin Bast', 'Moralo Eval', 'Morley', 'Mother Talzin', 'Nahdar Vebb', 'Nahdonnis Praji', 'Nien Nunb', 'Niima the Hutt', 'Nines', 'Norra Wexley', 'Nute Gunray', 'Nuvo Vindi', 'Obi-Wan Kenobi', 'Odd Ball', 'Ody Mandrell', 'Omi', 'Onaconda Farr', 'Oola', 'OOM-9', 'Oppo Rancisis', 'Orn Free Taa', 'Oro Dassyne', 'Orrimarko', 'Osi Sobeck', 'Owen Lars', 'Pablo-Jill', 'Padmé Amidala', 'Pagetti Rook', 'Paige Tico', 'Paploo', 'Petty Officer Thanisson', 'Pharl McQuarrie', 'Plo Koon', 'Po Nudo', 'Poe Dameron', 'Poggle the Lesser', 'Pong Krell', 'Pooja Naberrie', 'PZ-4CO', 'Quarrie', 'Quay Tolsite', 'Queen Apailana', 'Queen Jamillia', 'Queen Neeyutnee', 'Qui-Gon Jinn', 'Quiggold', 'Quinlan Vos', 'R2-D2', 'R2-KT', 'R3-S6', 'R4-P17', 'R5-D4', 'RA-7', 'Rabé', 'Rako Hardeen', 'Ransolm Casterfo', 'Rappertunie', 'Ratts Tyerell', 'Raymus Antilles', 'Ree-Yees', 'Reeve Panzoro', 'Rey', 'Ric Olié', 'Riff Tamson', 'Riley', 'Rinnriyin Di', 'Rio Durant', 'Rogue Squadron', 'Romba', 'Roos Tarpals', 'Rose Tico', 'Rotta the Hutt', 'Rukh', 'Rune Haako', 'Rush Clovis', 'Ruwee Naberrie', 'Ryoo Naberrie', 'Sabé', 'Sabine Wren', 'Saché', 'Saelt-Marae', 'Saesee Tiin', 'Salacious B. Crumb', 'San Hill', 'Sana Starros', 'Sarco Plank', 'Sarkli', 'Satine Kryze', 'Savage Opress', 'Sebulba', 'Senator Organa', 'Sergeant Kreel', 'Seventh Sister', 'Shaak Ti', 'Shara Bey', 'Shmi Skywalker', 'Shu Mai', 'Sidon Ithano', 'Sifo-Dyas', 'Sim Aloo', 'Siniir Rath Velus', 'Sio Bibble', 'Sixth Brother', 'Slowen Lo', 'Sly Moore', 'Snaggletooth', 'Snap Wexley', 'Snoke', 'Sola Naberrie', 'Sora Bulq', 'Strono Tuggs', 'Sy Snootles', 'Tallissan Lintra', 'Tarfful', 'Tasu Leech', 'Taun We', 'TC-14', 'Tee Watt Kaa', 'Teebo', 'Teedo', 'Teemto Pagalies', 'Temiri Blagg', 'Tessek', 'Tey How', 'Thane Kyrell', 'The Bendu', 'The Smuggler', 'Thrawn', 'Tiaan Jerjerrod', 'Tion Medon', 'Tobias Beckett', 'Tulon Voidgazer', 'Tup', 'U9-C4', 'Unkar Plutt', 'Val Beckett', 'Vanden Willard', 'Vice Admiral Amilyn Holdo', 'Vober Dand', 'WAC-47', 'Wag Too', 'Wald', 'Walrus Man', 'Warok', 'Wat Tambor', 'Watto', 'Wedge Antilles', 'Wes Janson', 'Wicket W. Warrick', 'Wilhuff Tarkin', 'Wollivan', 'Wuher', 'Wullf Yularen', 'Xamuel Lennox', 'Yaddle', 'Yarael Poof', 'Yoda', 'Zam Wesell', 'Zev Senesca', 'Ziro the Hutt', 'Zuckuss'];
const dummyLookupService = {
  search(string, callback) {
    setTimeout(() => {
      const results = dummyMentionsData.filter(mention => mention.toLowerCase().includes(string.toLowerCase()));
      callback(results);
    }, 500);
  }
};
function useMentionLookupService(mentionString) {
  const [results, setResults] = React.useState([]);
  React.useEffect(() => {
    const cachedResults = mentionsCache.get(mentionString);
    if (mentionString == null) {
      setResults([]);
      return;
    }
    if (cachedResults === null) {
      return;
    } else if (cachedResults !== undefined) {
      setResults(cachedResults);
      return;
    }
    mentionsCache.set(mentionString, null);
    dummyLookupService.search(mentionString, newResults => {
      mentionsCache.set(mentionString, newResults);
      setResults(newResults);
    });
  }, [mentionString]);
  return results;
}
function checkForAtSignMentions(text, minMatchLength) {
  let match = AtSignMentionsRegex.exec(text);
  if (match === null) {
    match = AtSignMentionsRegexAliasRegex.exec(text);
  }
  if (match !== null) {
    // The strategy ignores leading whitespace but we need to know it's
    // length to add it to the leadOffset
    const maybeLeadingWhitespace = match[1];
    const matchingString = match[3];
    if (matchingString.length >= minMatchLength) {
      return {
        leadOffset: match.index + maybeLeadingWhitespace.length,
        matchingString,
        replaceableString: match[2]
      };
    }
  }
  return null;
}
function getPossibleQueryMatch(text) {
  return checkForAtSignMentions(text, 1);
}
class MentionTypeaheadOption extends LexicalTypeaheadMenuPlugin.MenuOption {
  constructor(name, picture) {
    super(name);
    this.name = name;
    this.picture = picture;
  }
}
function MentionsTypeaheadMenuItem({
  index,
  isSelected,
  onClick,
  onMouseEnter,
  option
}) {
  let className = 'item';
  if (isSelected) {
    className += ' selected';
  }
  return /*#__PURE__*/React.createElement("li", {
    key: option.key,
    tabIndex: -1,
    className: className,
    ref: option.setRefElement,
    role: "option",
    "aria-selected": isSelected,
    id: 'typeahead-item-' + index,
    onMouseEnter: onMouseEnter,
    onClick: onClick
  }, option.picture, /*#__PURE__*/React.createElement("span", {
    className: "text"
  }, option.name));
}
function NewMentionsPlugin() {
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  const [queryString, setQueryString] = React.useState(null);
  const results = useMentionLookupService(queryString);
  const checkForSlashTriggerMatch = LexicalTypeaheadMenuPlugin.useBasicTypeaheadTriggerMatch('/', {
    minLength: 0
  });
  const options = React.useMemo(() => results.map(result => new MentionTypeaheadOption(result, /*#__PURE__*/React.createElement("i", {
    className: "icon user"
  }))).slice(0, SUGGESTION_LIST_LENGTH_LIMIT), [results]);
  const onSelectOption = React.useCallback((selectedOption, nodeToReplace, closeMenu) => {
    editor.update(() => {
      const mentionNode = $createMentionNode(selectedOption.name);
      if (nodeToReplace) {
        nodeToReplace.replace(mentionNode);
      }
      mentionNode.select();
      closeMenu();
    });
  }, [editor]);
  const checkForMentionMatch = React.useCallback(text => {
    const slashMatch = checkForSlashTriggerMatch(text, editor);
    if (slashMatch !== null) {
      return null;
    }
    return getPossibleQueryMatch(text);
  }, [checkForSlashTriggerMatch, editor]);
  return /*#__PURE__*/React.createElement(LexicalTypeaheadMenuPlugin.LexicalTypeaheadMenuPlugin, {
    onQueryChange: setQueryString,
    onSelectOption: onSelectOption,
    triggerFn: checkForMentionMatch,
    options: options,
    menuRenderFn: (anchorElementRef, {
      selectedIndex,
      selectOptionAndCleanUp,
      setHighlightedIndex
    }) => anchorElementRef.current && results.length ? /*#__PURE__*/ReactDOM.createPortal( /*#__PURE__*/React.createElement("div", {
      className: "typeahead-popover mentions-menu"
    }, /*#__PURE__*/React.createElement("ul", null, options.map((option, i) => /*#__PURE__*/React.createElement(MentionsTypeaheadMenuItem, {
      index: i,
      isSelected: selectedIndex === i,
      onClick: () => {
        setHighlightedIndex(i);
        selectOptionAndCleanUp(option);
      },
      onMouseEnter: () => {
        setHighlightedIndex(i);
      },
      key: option.key,
      option: option
    })))), anchorElementRef.current) : null
  });
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
const Direction = {
  east: 1 << 0,
  north: 1 << 3,
  south: 1 << 1,
  west: 1 << 2
};
function ImageResizer({
  onResizeStart,
  onResizeEnd,
  buttonRef,
  imageRef,
  maxWidth,
  editor,
  showCaption,
  setShowCaption,
  captionsEnabled
}) {
  const controlWrapperRef = React.useRef(null);
  const userSelect = React.useRef({
    priority: '',
    value: 'default'
  });
  const positioningRef = React.useRef({
    currentHeight: 0,
    currentWidth: 0,
    direction: 0,
    isResizing: false,
    ratio: 0,
    startHeight: 0,
    startWidth: 0,
    startX: 0,
    startY: 0
  });
  const editorRootElement = editor.getRootElement();
  // Find max width, accounting for editor padding.
  const maxWidthContainer = maxWidth ? maxWidth : editorRootElement !== null ? editorRootElement.getBoundingClientRect().width - 20 : 100;
  const maxHeightContainer = editorRootElement !== null ? editorRootElement.getBoundingClientRect().height - 20 : 100;
  const minWidth = 100;
  const minHeight = 100;
  const setStartCursor = direction => {
    const ew = direction === Direction.east || direction === Direction.west;
    const ns = direction === Direction.north || direction === Direction.south;
    const nwse = direction & Direction.north && direction & Direction.west || direction & Direction.south && direction & Direction.east;
    const cursorDir = ew ? 'ew' : ns ? 'ns' : nwse ? 'nwse' : 'nesw';
    if (editorRootElement !== null) {
      editorRootElement.style.setProperty('cursor', `${cursorDir}-resize`, 'important');
    }
    if (document.body !== null) {
      document.body.style.setProperty('cursor', `${cursorDir}-resize`, 'important');
      userSelect.current.value = document.body.style.getPropertyValue('-webkit-user-select');
      userSelect.current.priority = document.body.style.getPropertyPriority('-webkit-user-select');
      document.body.style.setProperty('-webkit-user-select', `none`, 'important');
    }
  };
  const setEndCursor = () => {
    if (editorRootElement !== null) {
      editorRootElement.style.setProperty('cursor', 'text');
    }
    if (document.body !== null) {
      document.body.style.setProperty('cursor', 'default');
      document.body.style.setProperty('-webkit-user-select', userSelect.current.value, userSelect.current.priority);
    }
  };
  const handlePointerDown = (event, direction) => {
    if (!editor.isEditable()) {
      return;
    }
    const image = imageRef.current;
    const controlWrapper = controlWrapperRef.current;
    if (image !== null && controlWrapper !== null) {
      event.preventDefault();
      const {
        width,
        height
      } = image.getBoundingClientRect();
      const positioning = positioningRef.current;
      positioning.startWidth = width;
      positioning.startHeight = height;
      positioning.ratio = width / height;
      positioning.currentWidth = width;
      positioning.currentHeight = height;
      positioning.startX = event.clientX;
      positioning.startY = event.clientY;
      positioning.isResizing = true;
      positioning.direction = direction;
      setStartCursor(direction);
      onResizeStart();
      controlWrapper.classList.add('image-control-wrapper--resizing');
      image.style.height = `${height}px`;
      image.style.width = `${width}px`;
      document.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerup', handlePointerUp);
    }
  };
  const handlePointerMove = event => {
    const image = imageRef.current;
    const positioning = positioningRef.current;
    const isHorizontal = positioning.direction & (Direction.east | Direction.west);
    const isVertical = positioning.direction & (Direction.south | Direction.north);
    if (image !== null && positioning.isResizing) {
      // Corner cursor
      if (isHorizontal && isVertical) {
        let diff = Math.floor(positioning.startX - event.clientX);
        diff = positioning.direction & Direction.east ? -diff : diff;
        const width = clamp(positioning.startWidth + diff, minWidth, maxWidthContainer);
        const height = width / positioning.ratio;
        image.style.width = `${width}px`;
        image.style.height = `${height}px`;
        positioning.currentHeight = height;
        positioning.currentWidth = width;
      } else if (isVertical) {
        let diff = Math.floor(positioning.startY - event.clientY);
        diff = positioning.direction & Direction.south ? -diff : diff;
        const height = clamp(positioning.startHeight + diff, minHeight, maxHeightContainer);
        image.style.height = `${height}px`;
        positioning.currentHeight = height;
      } else {
        let diff = Math.floor(positioning.startX - event.clientX);
        diff = positioning.direction & Direction.east ? -diff : diff;
        const width = clamp(positioning.startWidth + diff, minWidth, maxWidthContainer);
        image.style.width = `${width}px`;
        positioning.currentWidth = width;
      }
    }
  };
  const handlePointerUp = () => {
    const image = imageRef.current;
    const positioning = positioningRef.current;
    const controlWrapper = controlWrapperRef.current;
    if (image !== null && controlWrapper !== null && positioning.isResizing) {
      const width = positioning.currentWidth;
      const height = positioning.currentHeight;
      positioning.startWidth = 0;
      positioning.startHeight = 0;
      positioning.ratio = 0;
      positioning.startX = 0;
      positioning.startY = 0;
      positioning.currentWidth = 0;
      positioning.currentHeight = 0;
      positioning.isResizing = false;
      controlWrapper.classList.remove('image-control-wrapper--resizing');
      setEndCursor();
      onResizeEnd(width, height);
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: controlWrapperRef
  }, !showCaption && captionsEnabled && /*#__PURE__*/React.createElement("button", {
    className: "image-caption-button",
    ref: buttonRef,
    onClick: () => {
      setShowCaption(!showCaption);
    }
  }, "Add Caption"), /*#__PURE__*/React.createElement("div", {
    className: "image-resizer image-resizer-n",
    onPointerDown: event => {
      handlePointerDown(event, Direction.north);
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "image-resizer image-resizer-ne",
    onPointerDown: event => {
      handlePointerDown(event, Direction.north | Direction.east);
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "image-resizer image-resizer-e",
    onPointerDown: event => {
      handlePointerDown(event, Direction.east);
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "image-resizer image-resizer-se",
    onPointerDown: event => {
      handlePointerDown(event, Direction.south | Direction.east);
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "image-resizer image-resizer-s",
    onPointerDown: event => {
      handlePointerDown(event, Direction.south);
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "image-resizer image-resizer-sw",
    onPointerDown: event => {
      handlePointerDown(event, Direction.south | Direction.west);
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "image-resizer image-resizer-w",
    onPointerDown: event => {
      handlePointerDown(event, Direction.west);
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "image-resizer image-resizer-nw",
    onPointerDown: event => {
      handlePointerDown(event, Direction.north | Direction.west);
    }
  }));
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const imageCache = new Set();
const RIGHT_CLICK_IMAGE_COMMAND = lexical.createCommand('RIGHT_CLICK_IMAGE_COMMAND');
function useSuspenseImage(src) {
  if (!imageCache.has(src)) {
    throw new Promise(resolve => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        imageCache.add(src);
        resolve(null);
      };
    });
  }
}
function LazyImage({
  altText,
  className,
  imageRef,
  src,
  width,
  height,
  maxWidth
}) {
  useSuspenseImage(src);
  return /*#__PURE__*/React.createElement("img", {
    className: className || undefined,
    src: src,
    alt: altText,
    ref: imageRef,
    style: {
      height,
      maxWidth,
      width
    },
    draggable: "false"
  });
}
function ImageComponent({
  src,
  altText,
  nodeKey,
  width,
  height,
  maxWidth,
  resizable,
  showCaption,
  caption,
  captionsEnabled
}) {
  const imageRef = React.useRef(null);
  const buttonRef = React.useRef(null);
  const [isSelected, setSelected, clearSelection] = useLexicalNodeSelection.useLexicalNodeSelection(nodeKey);
  const [isResizing, setIsResizing] = React.useState(false);
  const {
    isCollabActive
  } = LexicalCollaborationContext.useCollaborationContext();
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  const [selection, setSelection] = React.useState(null);
  const activeEditorRef = React.useRef(null);
  const onDelete = React.useCallback(payload => {
    if (isSelected && lexical.$isNodeSelection(lexical.$getSelection())) {
      const event = payload;
      event.preventDefault();
      const node = lexical.$getNodeByKey(nodeKey);
      if (Editor.$isImageNode(node)) {
        node.remove();
        return true;
      }
    }
    return false;
  }, [isSelected, nodeKey]);
  const onEnter = React.useCallback(event => {
    const latestSelection = lexical.$getSelection();
    const buttonElem = buttonRef.current;
    if (isSelected && lexical.$isNodeSelection(latestSelection) && latestSelection.getNodes().length === 1) {
      if (showCaption) {
        // Move focus into nested editor
        lexical.$setSelection(null);
        event.preventDefault();
        caption.focus();
        return true;
      } else if (buttonElem !== null && buttonElem !== document.activeElement) {
        event.preventDefault();
        buttonElem.focus();
        return true;
      }
    }
    return false;
  }, [caption, isSelected, showCaption]);
  const onEscape = React.useCallback(event => {
    if (activeEditorRef.current === caption || buttonRef.current === event.target) {
      lexical.$setSelection(null);
      editor.update(() => {
        setSelected(true);
        const parentRootElement = editor.getRootElement();
        if (parentRootElement !== null) {
          parentRootElement.focus();
        }
      });
      return true;
    }
    return false;
  }, [caption, editor, setSelected]);
  const onClick = React.useCallback(payload => {
    const event = payload;
    if (isResizing) {
      return true;
    }
    if (event.target === imageRef.current) {
      if (event.shiftKey) {
        setSelected(!isSelected);
      } else {
        clearSelection();
        setSelected(true);
      }
      return true;
    }
    return false;
  }, [isResizing, isSelected, setSelected, clearSelection]);
  const onRightClick = React.useCallback(event => {
    editor.getEditorState().read(() => {
      const latestSelection = lexical.$getSelection();
      const domElement = event.target;
      if (domElement.tagName === 'IMG' && lexical.$isRangeSelection(latestSelection) && latestSelection.getNodes().length === 1) {
        editor.dispatchCommand(RIGHT_CLICK_IMAGE_COMMAND, event);
      }
    });
  }, [editor]);
  React.useEffect(() => {
    let isMounted = true;
    const rootElement = editor.getRootElement();
    const unregister = utils.mergeRegister(editor.registerUpdateListener(({
      editorState
    }) => {
      if (isMounted) {
        setSelection(editorState.read(() => lexical.$getSelection()));
      }
    }), editor.registerCommand(lexical.SELECTION_CHANGE_COMMAND, (_, activeEditor) => {
      activeEditorRef.current = activeEditor;
      return false;
    }, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical.CLICK_COMMAND, onClick, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(RIGHT_CLICK_IMAGE_COMMAND, onClick, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical.DRAGSTART_COMMAND, event => {
      if (event.target === imageRef.current) {
        // TODO This is just a temporary workaround for FF to behave like other browsers.
        // Ideally, this handles drag & drop too (and all browsers).
        event.preventDefault();
        return true;
      }
      return false;
    }, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical.KEY_DELETE_COMMAND, onDelete, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical.KEY_BACKSPACE_COMMAND, onDelete, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical.KEY_ENTER_COMMAND, onEnter, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical.KEY_ESCAPE_COMMAND, onEscape, lexical.COMMAND_PRIORITY_LOW));
    rootElement?.addEventListener('contextmenu', onRightClick);
    return () => {
      isMounted = false;
      unregister();
      rootElement?.removeEventListener('contextmenu', onRightClick);
    };
  }, [clearSelection, editor, isResizing, isSelected, nodeKey, onDelete, onEnter, onEscape, onClick, onRightClick, setSelected]);
  const setShowCaption = () => {
    editor.update(() => {
      const node = lexical.$getNodeByKey(nodeKey);
      if (Editor.$isImageNode(node)) {
        node.setShowCaption(true);
      }
    });
  };
  const onResizeEnd = (nextWidth, nextHeight) => {
    // Delay hiding the resize bars for click case
    setTimeout(() => {
      setIsResizing(false);
    }, 200);
    editor.update(() => {
      const node = lexical.$getNodeByKey(nodeKey);
      if (Editor.$isImageNode(node)) {
        node.setWidthAndHeight(nextWidth, nextHeight);
      }
    });
  };
  const onResizeStart = () => {
    setIsResizing(true);
  };
  const {
    historyState
  } = Editor.useSharedHistoryContext();
  const {
    settings: {
      showNestedEditorTreeView
    }
  } = useSettings();
  const draggable = isSelected && lexical.$isNodeSelection(selection) && !isResizing;
  const isFocused = isSelected || isResizing;
  return /*#__PURE__*/React.createElement(React.Suspense, {
    fallback: null
  }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    draggable: draggable
  }, /*#__PURE__*/React.createElement(LazyImage, {
    className: isFocused ? `focused ${lexical.$isNodeSelection(selection) ? 'draggable' : ''}` : null,
    src: src,
    altText: altText,
    imageRef: imageRef,
    width: width,
    height: height,
    maxWidth: maxWidth
  })), showCaption && /*#__PURE__*/React.createElement("div", {
    className: "image-caption-container"
  }, /*#__PURE__*/React.createElement(LexicalNestedComposer.LexicalNestedComposer, {
    initialEditor: caption
  }, /*#__PURE__*/React.createElement(LexicalAutoFocusPlugin.AutoFocusPlugin, null), /*#__PURE__*/React.createElement(NewMentionsPlugin, null), /*#__PURE__*/React.createElement(Editor.LinkPlugin, null), /*#__PURE__*/React.createElement(Editor.EmojisPlugin, null), /*#__PURE__*/React.createElement(LexicalHashtagPlugin.HashtagPlugin, null), /*#__PURE__*/React.createElement(KeywordsPlugin, null), isCollabActive ? /*#__PURE__*/React.createElement(LexicalCollaborationPlugin.CollaborationPlugin, {
    id: caption.getKey(),
    providerFactory: collaboration.createWebsocketProvider,
    shouldBootstrap: true
  }) : /*#__PURE__*/React.createElement(LexicalHistoryPlugin.HistoryPlugin, {
    externalHistoryState: historyState
  }), /*#__PURE__*/React.createElement(LexicalRichTextPlugin.RichTextPlugin, {
    contentEditable: /*#__PURE__*/React.createElement(Editor.LexicalContentEditable, {
      className: "ImageNode__contentEditable"
    }),
    placeholder: /*#__PURE__*/React.createElement(Editor.Placeholder, {
      className: "ImageNode__placeholder"
    }, "Enter a caption..."),
    ErrorBoundary: LexicalErrorBoundary
  }), showNestedEditorTreeView === true ? /*#__PURE__*/React.createElement(Editor.TreeViewPlugin, null) : null)), resizable && lexical.$isNodeSelection(selection) && isFocused && /*#__PURE__*/React.createElement(ImageResizer, {
    showCaption: showCaption,
    setShowCaption: setShowCaption,
    editor: editor,
    buttonRef: buttonRef,
    imageRef: imageRef,
    maxWidth: maxWidth,
    onResizeStart: onResizeStart,
    onResizeEnd: onResizeEnd,
    captionsEnabled: captionsEnabled
  })));
}

exports.RIGHT_CLICK_IMAGE_COMMAND = RIGHT_CLICK_IMAGE_COMMAND;
exports["default"] = ImageComponent;
