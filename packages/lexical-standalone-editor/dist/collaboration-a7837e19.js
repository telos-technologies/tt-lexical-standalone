/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

var yWebsocket = require('y-websocket');
var yjs = require('yjs');

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const WEBSOCKET_ENDPOINT = params.get('collabEndpoint') || 'ws://localhost:1234';
const WEBSOCKET_SLUG = 'playground';
const WEBSOCKET_ID = params.get('collabId') || '0';

// parent dom -> child doc
function createWebsocketProvider(id, yjsDocMap) {
  let doc = yjsDocMap.get(id);
  if (doc === undefined) {
    doc = new yjs.Doc();
    yjsDocMap.set(id, doc);
  } else {
    doc.load();
  }

  // @ts-expect-error
  return new yWebsocket.WebsocketProvider(WEBSOCKET_ENDPOINT, WEBSOCKET_SLUG + '/' + WEBSOCKET_ID + '/' + id, doc, {
    connect: false
  });
}

exports.createWebsocketProvider = createWebsocketProvider;
