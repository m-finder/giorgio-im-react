// @ts-nocheck
// React elements generated from the matching Giorgio IM view.
import { createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, createCommentVNode as _createCommentVNode, normalizeClass as _normalizeClass, vModelText as _vModelText, withKeys as _withKeys, withDirectives as _withDirectives, renderList as _renderList, Fragment as _Fragment, createTextVNode as _createTextVNode, withModifiers as _withModifiers, normalizeStyle as _normalizeStyle, vModelSelect as _vModelSelect, vModelCheckbox as _vModelCheckbox } from "./react-template"

export function render(_ctx, _cache) {
  return (_openBlock(), _createElementBlock("div", {
    class: _normalizeClass(["gim-root", { 'gim-dark': _ctx.theme === 'dark' }]),
    lang: _ctx.locale
  }, [
    (_ctx.customerService ? !_ctx.chatOpen : !_ctx.panelOpen)
      ? (_openBlock(), _createElementBlock("button", {
          key: 0,
          class: _normalizeClass(["gim-launcher", { 'gim-service-launcher': _ctx.customerService }]),
          type: "button",
          "aria-label": _ctx.customerService ? _ctx.t('openSupport') : _ctx.t('openChat'),
          title: _ctx.customerService ? _ctx.displayName(_ctx.customerService) : undefined,
          onClick: _ctx.open
        }, [
          (_openBlock(), _createElementBlock("svg", {
            viewBox: "0 0 24 24",
            "aria-hidden": "true"
          }, [
            _createElementVNode("path", { d: "M20 11.5a7.5 7.5 0 0 1-7.5 7.5 8 8 0 0 1-3.4-.76L4 20l1.76-5.1A8 8 0 0 1 5 11.5a7.5 7.5 0 0 1 15 0Z" }),
            _createElementVNode("path", { d: "M8.5 11.5h8m-8 3h5" })
          ])),
          (_ctx.totalUnread)
            ? (_openBlock(), _createElementBlock("span", {
                key: 0,
                class: "gim-launcher-badge"
              }, _toDisplayString(_ctx.totalUnread > 99 ? '99+' : _ctx.totalUnread), 1 /* TEXT */))
            : _createCommentVNode("v-if", true),
          (_ctx.customerService)
            ? (_openBlock(), _createElementBlock("span", {
                key: 1,
                class: "gim-service-launcher-label"
              }, _toDisplayString(_ctx.t('support')), 1 /* TEXT */))
            : _createCommentVNode("v-if", true)
        ], 10 /* CLASS, PROPS */, ["aria-label", "title", "onClick"]))
      : _createCommentVNode("v-if", true),
    (_ctx.messageNotification !== false && _ctx.notificationUnread)
      ? (_openBlock(), _createElementBlock("button", {
          key: 1,
          ref: "messageAlert",
          class: _normalizeClass(["gim-message-alert", { 'gim-message-alert-panel': _ctx.panelOpen && !_ctx.customerService }]),
          type: "button",
          "aria-label": _ctx.t('viewUnreadMessages', { count: _ctx.notificationUnread }),
          onClick: _ctx.openUnreadMessages
        }, [
          _createElementVNode("span", {
            class: _normalizeClass(["gim-avatar", { 'gim-group-avatar': _ctx.unreadContacts[0].type === 'group' }])
          }, [
            (_ctx.unreadContacts[0].avatar || _ctx.unreadContacts[0].type !== 'group')
              ? (_openBlock(), _createElementBlock("img", {
                  key: 0,
                  src: _ctx.unreadContacts[0].avatar || (_ctx.unreadContacts[0].type === 'ai' ? _ctx.aiAvatar : _ctx.defaultAvatar),
                  alt: ""
                }, null, 8 /* PROPS */, ["src"]))
              : (_openBlock(), _createElementBlock("span", { key: 1 }, _toDisplayString(_ctx.avatarLetter(_ctx.unreadContacts[0])), 1 /* TEXT */))
          ], 2 /* CLASS */),
          _createElementVNode("span", {
            class: "gim-message-alert-copy",
            role: "status",
            "aria-live": "polite",
            "aria-atomic": "true"
          }, [
            _createElementVNode("strong", null, _toDisplayString(_ctx.t('newMessages')), 1 /* TEXT */),
            _createElementVNode("small", null, _toDisplayString(_ctx.unreadContacts.map(_ctx.displayName).join(' · ')), 1 /* TEXT */)
          ]),
          _createElementVNode("span", { class: "gim-message-alert-count" }, _toDisplayString(_ctx.notificationUnread > 99 ? '99+' : _ctx.notificationUnread), 1 /* TEXT */)
        ], 10 /* CLASS, PROPS */, ["aria-label", "onClick"]))
      : _createCommentVNode("v-if", true),
    (_ctx.panelOpen && !_ctx.customerService)
      ? (_openBlock(), _createElementBlock("section", {
          key: 2,
          ref: "panelElement",
          class: "gim-panel gim-window",
          style: _normalizeStyle(_ctx.windowStyle('panel')),
          "aria-label": _ctx.t('contactsPanel'),
          onPointerdown: $event => (_ctx.frontWindow = 'panel')
        }, [
          _createElementVNode("header", {
            class: "gim-profile gim-drag-handle",
            onPointerdown: $event => (_ctx.startDrag($event, 'panel'))
          }, [
            _createElementVNode("button", {
              class: "gim-avatar gim-own-avatar",
              type: "button",
              "aria-label": _ctx.t('changeAvatar'),
              title: _ctx.avatarBusy ? _ctx.t('changingAvatar') : _ctx.t('changeAvatarHint'),
              disabled: _ctx.avatarBusy,
              "aria-busy": _ctx.avatarBusy,
              onClick: $event => (_ctx.avatarInput?.click())
            }, [
              _createElementVNode("img", {
                src: _ctx.userAvatar || _ctx.defaultAvatar,
                alt: _ctx.username
              }, null, 8 /* PROPS */, ["src", "alt"]),
              _createElementVNode("span", {
                class: _normalizeClass(["gim-avatar-edit", { 'gim-avatar-loading': _ctx.avatarBusy }]),
                "aria-hidden": "true"
              }, [
                (_openBlock(), _createElementBlock("svg", { viewBox: "0 0 24 24" }, [
                  _createElementVNode("path", { d: "m8 6 2-3h4l2 3h4v14H4V6Z" }),
                  _createElementVNode("circle", {
                    cx: "12",
                    cy: "12",
                    r: "3"
                  })
                ]))
              ], 2 /* CLASS */)
            ], 8 /* PROPS */, ["aria-label", "title", "disabled", "aria-busy", "onClick"]),
            _createElementVNode("input", {
              ref: "avatarInput",
              type: "file",
              hidden: "",
              accept: "image/png,image/jpeg,image/gif,image/webp,image/avif",
              "aria-label": _ctx.t('chooseAvatar'),
              disabled: _ctx.avatarBusy,
              onChange: _ctx.updateAvatar
            }, null, 40 /* PROPS, NEED_HYDRATION */, ["aria-label", "disabled", "onChange"]),
            _createElementVNode("div", { class: "gim-profile-info" }, [
              _withDirectives(_createElementVNode("input", {
                "onUpdate:modelValue": $event => ((_ctx.usernameDraft) = $event),
                class: "gim-profile-name",
                "aria-label": _ctx.t('nickname'),
                title: _ctx.t('nicknameHint'),
                maxlength: "30",
                onBlur: _ctx.updateUsername,
                onKeydown: _withKeys($event => (!$event.isComposing && ($event.target as HTMLInputElement).blur()), ["enter"])
              }, null, 40 /* PROPS, NEED_HYDRATION */, ["onUpdate:modelValue", "aria-label", "title", "onBlur", "onKeydown"]), [
                [_vModelText, _ctx.usernameDraft]
              ]),
              _withDirectives(_createElementVNode("input", {
                "onUpdate:modelValue": $event => ((_ctx.sign) = $event),
                "aria-label": _ctx.t('signature'),
                title: _ctx.t('signatureHint'),
                placeholder: _ctx.t('signaturePlaceholder'),
                maxlength: "80",
                onBlur: _ctx.updateSign,
                onKeydown: _withKeys($event => (!$event.isComposing && ($event.target as HTMLInputElement).blur()), ["enter"])
              }, null, 40 /* PROPS, NEED_HYDRATION */, ["onUpdate:modelValue", "aria-label", "title", "placeholder", "onBlur", "onKeydown"]), [
                [_vModelText, _ctx.sign]
              ])
            ]),
            _createElementVNode("button", {
              class: "gim-icon-button gim-panel-close",
              type: "button",
              "aria-label": _ctx.t('minimiseContacts'),
              onClick: $event => (_ctx.panelOpen = false)
            }, "×", 8 /* PROPS */, ["aria-label", "onClick"])
          ], 40 /* PROPS, NEED_HYDRATION */, ["onPointerdown"]),
          (_ctx.avatarError)
            ? (_openBlock(), _createElementBlock("p", {
                key: 0,
                class: "gim-avatar-error",
                role: "alert"
              }, _toDisplayString(_ctx.errorText(_ctx.avatarError)), 1 /* TEXT */))
            : _createCommentVNode("v-if", true),
          _createElementVNode("div", { class: "gim-presence" }, [
            _createElementVNode("span", {
              class: _normalizeClass(["gim-status-dot", _ctx.online])
            }, null, 2 /* CLASS */),
            _createElementVNode("select", {
              value: _ctx.online,
              "aria-label": _ctx.t('onlineStatus'),
              onChange: $event => (_ctx.updateOnline(($event.target as HTMLSelectElement).value as 'online' | 'hide'))
            }, [
              _createElementVNode("option", { value: "online" }, _toDisplayString(_ctx.t('online')), 1 /* TEXT */),
              _createElementVNode("option", { value: "hide" }, _toDisplayString(_ctx.t('invisible')), 1 /* TEXT */)
            ], 40 /* PROPS, NEED_HYDRATION */, ["value", "aria-label", "onChange"])
          ]),
          _createElementVNode("nav", {
            class: "gim-tabs",
            "aria-label": _ctx.t('contactTabs')
          }, [
            _createElementVNode("button", {
              type: "button",
              class: _normalizeClass({ active: _ctx.tab === 'friend' }),
              onClick: $event => (_ctx.tab = 'friend')
            }, _toDisplayString(_ctx.t('contacts')), 11 /* TEXT, CLASS, PROPS */, ["onClick"]),
            _createElementVNode("button", {
              type: "button",
              class: _normalizeClass({ active: _ctx.tab === 'group' }),
              onClick: $event => (_ctx.tab = 'group')
            }, _toDisplayString(_ctx.t('groups')), 11 /* TEXT, CLASS, PROPS */, ["onClick"]),
            _createElementVNode("button", {
              type: "button",
              class: _normalizeClass({ active: _ctx.tab === 'history' }),
              onClick: $event => (_ctx.tab = 'history')
            }, _toDisplayString(_ctx.t('recent')), 11 /* TEXT, CLASS, PROPS */, ["onClick"])
          ], 8 /* PROPS */, ["aria-label"]),
          (_ctx.searchOpen)
            ? (_openBlock(), _createElementBlock("div", {
                key: 1,
                class: "gim-search-wrap"
              }, [
                (_openBlock(), _createElementBlock("svg", {
                  viewBox: "0 0 24 24",
                  "aria-hidden": "true"
                }, [
                  _createElementVNode("circle", {
                    cx: "11",
                    cy: "11",
                    r: "6"
                  }),
                  _createElementVNode("path", { d: "m16 16 4 4" })
                ])),
                _withDirectives(_createElementVNode("input", {
                  ref: "searchInput",
                  "onUpdate:modelValue": $event => ((_ctx.search) = $event),
                  "aria-label": _ctx.t('searchCurrentList'),
                  placeholder: _ctx.t('searchCurrentList'),
                  onKeydown: _withKeys(_ctx.toggleSearch, ["esc"])
                }, null, 40 /* PROPS, NEED_HYDRATION */, ["onUpdate:modelValue", "aria-label", "placeholder", "onKeydown"]), [
                  [_vModelText, _ctx.search]
                ]),
                _createElementVNode("button", {
                  type: "button",
                  "aria-label": _ctx.t('closeSearch'),
                  onClick: _ctx.toggleSearch
                }, "×", 8 /* PROPS */, ["aria-label", "onClick"])
              ]))
            : _createCommentVNode("v-if", true),
          _createElementVNode("div", { class: "gim-contact-scroll" }, [
            (_ctx.tab !== 'history')
              ? (_openBlock(), _createElementBlock("div", {
                  key: 0,
                  class: "gim-list-actions"
                }, [
                  (_ctx.tab === 'friend')
                    ? (_openBlock(), _createElementBlock("button", {
                        key: 0,
                        type: "button",
                        "aria-label": _ctx.t('newCategory'),
                        onClick: $event => (_ctx.openUtility('friend-group'))
                      }, "＋ " + _toDisplayString(_ctx.t('newCategory')), 9 /* TEXT, PROPS */, ["aria-label", "onClick"]))
                    : (_openBlock(), _createElementBlock("button", {
                        key: 1,
                        type: "button",
                        "aria-label": _ctx.t('createGroup'),
                        onClick: $event => (_ctx.openUtility('create-group'))
                      }, "＋ " + _toDisplayString(_ctx.t('createGroup')), 9 /* TEXT, PROPS */, ["aria-label", "onClick"]))
                ]))
              : _createCommentVNode("v-if", true),
            (_ctx.tab === 'friend')
              ? (_openBlock(), _createElementBlock(_Fragment, { key: 1 }, [
                  (_ctx.friendMoveBusy)
                    ? (_openBlock(), _createElementBlock("p", {
                        key: 0,
                        class: "gim-form-hint",
                        role: "status"
                      }, _toDisplayString(_ctx.t('movingFriend')), 1 /* TEXT */))
                    : _createCommentVNode("v-if", true),
                  (_ctx.friendMoveError)
                    ? (_openBlock(), _createElementBlock("p", {
                        key: 1,
                        class: "gim-form-error",
                        role: "alert"
                      }, _toDisplayString(_ctx.errorText(_ctx.friendMoveError)), 1 /* TEXT */))
                    : _createCommentVNode("v-if", true),
                  (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.visibleGroups, (group) => {
                    return (_openBlock(), _createElementBlock("section", {
                      key: group.id,
                      class: _normalizeClass(["gim-contact-group", { 'gim-drop-target': _ctx.friendDropTarget === group.id }]),
                      "data-gim-friend-group": group.id
                    }, [
                      _createElementVNode("h3", null, [
                        _createElementVNode("button", {
                          type: "button",
                          "aria-expanded": _ctx.query ? true : !_ctx.collapsedGroups.has(String(group.id)),
                          onClick: $event => (_ctx.toggleGroup(group.id))
                        }, [
                          (_openBlock(), _createElementBlock("svg", {
                            class: _normalizeClass(["gim-group-chevron", { collapsed: _ctx.collapsedGroups.has(String(group.id)) && !_ctx.query }]),
                            viewBox: "0 0 16 16",
                            "aria-hidden": "true"
                          }, [
                            _createElementVNode("path", { d: "m3.5 6 4.5 4.5L12.5 6" })
                          ], 2 /* CLASS */)),
                          _createTextVNode(_toDisplayString(group.groupname) + " ", 1 /* TEXT */),
                          _createElementVNode("span", null, _toDisplayString(group.list.length), 1 /* TEXT */)
                        ], 8 /* PROPS */, ["aria-expanded", "onClick"])
                      ]),
                      (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.query || !_ctx.collapsedGroups.has(String(group.id)) ? group.list : [], (contact) => {
                        return (_openBlock(), _createElementBlock("div", {
                          key: contact.id,
                          class: _normalizeClass(["gim-contact-row", { 'gim-dragging': _ctx.draggedFriend?.id === contact.id, 'gim-actions-open': _ctx.friendActionsId === String(contact.id), 'gim-swiping': _ctx.friendSwipe?.id === String(contact.id) }])
                        }, [
                          (contact.type !== 'ai')
                            ? (_openBlock(), _createElementBlock("div", {
                                key: 0,
                                class: "gim-friend-actions",
                                "aria-label": _ctx.t('friendActions', { name: _ctx.displayName(contact) }),
                                inert: _ctx.friendActionsId !== String(contact.id)
                              }, [
                                _createElementVNode("button", {
                                  type: "button",
                                  "aria-label": _ctx.t('deleteNamedFriend', { name: _ctx.displayName(contact) }),
                                  disabled: _ctx.managementBusy,
                                  onClick: $event => (_ctx.confirmFriendAction('delete-friend', contact))
                                }, _toDisplayString(_ctx.t('deleteFriend')), 9 /* TEXT, PROPS */, ["aria-label", "disabled", "onClick"]),
                                _createElementVNode("button", {
                                  type: "button",
                                  "aria-label": _ctx.t('blockNamedFriend', { name: _ctx.displayName(contact) }),
                                  disabled: _ctx.managementBusy,
                                  onClick: $event => (_ctx.confirmFriendAction('block-friend', contact))
                                }, _toDisplayString(_ctx.t('blockFriend')), 9 /* TEXT, PROPS */, ["aria-label", "disabled", "onClick"])
                              ], 8 /* PROPS */, ["aria-label", "inert"]))
                            : _createCommentVNode("v-if", true),
                          _createElementVNode("button", {
                            class: "gim-contact",
                            type: "button",
                            style: _normalizeStyle(_ctx.friendSwipe?.id === String(contact.id) ? { transform: `translateX(${_ctx.friendSwipe.offset}px)` } : undefined),
                            draggable: false,
                            title: _ctx.t('swipeFriendHint'),
                            onContextmenu: _withModifiers($event => (contact.type !== 'ai' && (_ctx.friendActionsId = _ctx.friendActionsId === String(contact.id) ? null : String(contact.id))), ["prevent"]),
                            onKeydown: [
                              _withKeys(_withModifiers($event => (contact.type !== 'ai' && (_ctx.friendActionsId = String(contact.id))), ["shift","prevent"]), ["f10"]),
                              _withKeys($event => (_ctx.friendActionsId = null), ["esc"])
                            ],
                            onPointerdown: $event => (_ctx.startFriendDrag($event, contact, group.id)),
                            onClick: $event => (!_ctx.friendDragClick && _ctx.chat({ ...contact, type: contact.type === 'ai' ? 'ai' : 'friend' }))
                          }, [
                            _createElementVNode("span", {
                              class: _normalizeClass(["gim-avatar", { 'gim-offline': _ctx.isOffline(contact) }])
                            }, [
                              _createElementVNode("img", {
                                src: contact.avatar || (contact.type === 'ai' ? _ctx.aiAvatar : _ctx.defaultAvatar),
                                alt: contact.username || '',
                                draggable: false
                              }, null, 8 /* PROPS */, ["src", "alt"])
                            ], 2 /* CLASS */),
                            _createElementVNode("span", { class: "gim-contact-copy" }, [
                              _createElementVNode("strong", null, _toDisplayString(_ctx.displayName(contact)), 1 /* TEXT */),
                              _createElementVNode("small", null, _toDisplayString(contact.sign || (_ctx.isOffline(contact) ? _ctx.t('offline') : _ctx.t('online'))), 1 /* TEXT */)
                            ]),
                            ((_ctx.friendStatus[String(contact.id)] || contact.status) === 'online')
                              ? (_openBlock(), _createElementBlock("span", {
                                  key: 0,
                                  class: "gim-online-dot"
                                }))
                              : _createCommentVNode("v-if", true),
                            (_ctx.unread[_ctx.keyOf(contact.type === 'ai' ? 'ai' : 'friend', contact.id)])
                              ? (_openBlock(), _createElementBlock("span", {
                                  key: 1,
                                  class: "gim-unread"
                                }, _toDisplayString(_ctx.unread[_ctx.keyOf(contact.type === 'ai' ? 'ai' : 'friend', contact.id)]), 1 /* TEXT */))
                              : _createCommentVNode("v-if", true)
                          ], 44 /* STYLE, PROPS, NEED_HYDRATION */, ["title", "onContextmenu", "onKeydown", "onPointerdown", "onClick"])
                        ], 2 /* CLASS */))
                      }), 128 /* KEYED_FRAGMENT */))
                    ], 10 /* CLASS, PROPS */, ["data-gim-friend-group"]))
                  }), 128 /* KEYED_FRAGMENT */)),
                  (!_ctx.visibleGroups.some(group => group.list.length))
                    ? (_openBlock(), _createElementBlock("p", {
                        key: 2,
                        class: "gim-empty"
                      }, _toDisplayString(_ctx.t('noContacts')), 1 /* TEXT */))
                    : _createCommentVNode("v-if", true)
                ], 64 /* STABLE_FRAGMENT */))
              : (_ctx.tab === 'group')
                ? (_openBlock(), _createElementBlock(_Fragment, { key: 2 }, [
                    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.visibleChats, (contact) => {
                      return (_openBlock(), _createElementBlock("button", {
                        key: contact.id,
                        class: "gim-contact",
                        type: "button",
                        onClick: $event => (_ctx.chat(contact))
                      }, [
                        _createElementVNode("span", { class: "gim-avatar gim-group-avatar" }, [
                          (contact.avatar)
                            ? (_openBlock(), _createElementBlock("img", {
                                key: 0,
                                src: contact.avatar,
                                alt: _ctx.displayName(contact)
                              }, null, 8 /* PROPS */, ["src", "alt"]))
                            : (_openBlock(), _createElementBlock("span", { key: 1 }, _toDisplayString(_ctx.avatarLetter(contact)), 1 /* TEXT */))
                        ]),
                        _createElementVNode("span", { class: "gim-contact-copy" }, [
                          _createElementVNode("strong", null, _toDisplayString(_ctx.displayName(contact)), 1 /* TEXT */),
                          _createElementVNode("small", null, _toDisplayString(contact.members !== undefined ? _ctx.t('memberCount', { count: contact.members }) : _ctx.t('groupChat')), 1 /* TEXT */)
                        ]),
                        (_ctx.unread[`group:${contact.id}`])
                          ? (_openBlock(), _createElementBlock("span", {
                              key: 0,
                              class: "gim-unread"
                            }, _toDisplayString(_ctx.unread[`group:${contact.id}`]), 1 /* TEXT */))
                          : _createCommentVNode("v-if", true)
                      ], 8 /* PROPS */, ["onClick"]))
                    }), 128 /* KEYED_FRAGMENT */)),
                    (!_ctx.visibleChats.length)
                      ? (_openBlock(), _createElementBlock("p", {
                          key: 0,
                          class: "gim-empty"
                        }, _toDisplayString(_ctx.t('noGroups')), 1 /* TEXT */))
                      : _createCommentVNode("v-if", true)
                  ], 64 /* STABLE_FRAGMENT */))
                : (_openBlock(), _createElementBlock(_Fragment, { key: 3 }, [
                    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.visibleRecent, (key) => {
                      return (_openBlock(), _createElementBlock("button", {
                        key: key,
                        class: _normalizeClass(["gim-contact", { 'gim-blocked-contact': _ctx.isBlockedContact(_ctx.conversations[key]) }]),
                        type: "button",
                        onClick: $event => (_ctx.chat(_ctx.conversations[key]))
                      }, [
                        _createElementVNode("span", {
                          class: _normalizeClass(["gim-avatar", { 'gim-group-avatar': _ctx.conversations[key].type === 'group', 'gim-offline': _ctx.isOffline(_ctx.conversations[key]), 'gim-blocked': _ctx.isBlockedContact(_ctx.conversations[key]) }])
                        }, [
                          (_ctx.conversations[key].avatar || _ctx.conversations[key].type !== 'group')
                            ? (_openBlock(), _createElementBlock("img", {
                                key: 0,
                                src: _ctx.conversations[key].avatar || (_ctx.conversations[key].type === 'ai' ? _ctx.aiAvatar : _ctx.defaultAvatar),
                                alt: _ctx.displayName(_ctx.conversations[key])
                              }, null, 8 /* PROPS */, ["src", "alt"]))
                            : (_openBlock(), _createElementBlock("span", { key: 1 }, _toDisplayString(_ctx.avatarLetter(_ctx.conversations[key])), 1 /* TEXT */))
                        ], 2 /* CLASS */),
                        _createElementVNode("span", { class: "gim-contact-copy" }, [
                          _createElementVNode("strong", null, [
                            _createTextVNode(_toDisplayString(_ctx.displayName(_ctx.conversations[key])), 1 /* TEXT */),
                            (_ctx.isBlockedContact(_ctx.conversations[key]))
                              ? (_openBlock(), _createElementBlock("span", {
                                  key: 0,
                                  class: "gim-blocked-label"
                                }, _toDisplayString(_ctx.t('blockedUser')), 1 /* TEXT */))
                              : _createCommentVNode("v-if", true)
                          ]),
                          _createElementVNode("small", null, _toDisplayString(_ctx.messages[key]?.filter(message => !message.notice).at(-1)?.content || (_ctx.conversations[key].type === 'group' ? _ctx.t('groupChat') : _ctx.t('startChat'))), 1 /* TEXT */)
                        ]),
                        (_ctx.unread[key])
                          ? (_openBlock(), _createElementBlock("span", {
                              key: 0,
                              class: "gim-unread"
                            }, _toDisplayString(_ctx.unread[key]), 1 /* TEXT */))
                          : _createCommentVNode("v-if", true)
                      ], 10 /* CLASS, PROPS */, ["onClick"]))
                    }), 128 /* KEYED_FRAGMENT */)),
                    (!_ctx.visibleRecent.length)
                      ? (_openBlock(), _createElementBlock("p", {
                          key: 0,
                          class: "gim-empty"
                        }, _toDisplayString(_ctx.t('noRecentChats')), 1 /* TEXT */))
                      : _createCommentVNode("v-if", true)
                  ], 64 /* STABLE_FRAGMENT */))
          ]),
          _createElementVNode("footer", { class: "gim-panel-footer gim-tools" }, [
            _createElementVNode("button", {
              type: "button",
              "aria-label": _ctx.t('addFriend'),
              onClick: $event => (_ctx.openUtility('add'))
            }, [
              (_openBlock(), _createElementBlock("svg", {
                viewBox: "0 0 24 24",
                "aria-hidden": "true"
              }, [
                _createElementVNode("path", { d: "M12 4v16M4 12h16" })
              ])),
              _createTextVNode(_toDisplayString(_ctx.t('add')), 1 /* TEXT */)
            ], 8 /* PROPS */, ["aria-label", "onClick"]),
            _createElementVNode("button", {
              type: "button",
              "aria-label": _ctx.t('find'),
              "aria-pressed": _ctx.searchOpen,
              onClick: _ctx.toggleSearch
            }, [
              (_openBlock(), _createElementBlock("svg", {
                viewBox: "0 0 24 24",
                "aria-hidden": "true"
              }, [
                _createElementVNode("circle", {
                  cx: "10.5",
                  cy: "10.5",
                  r: "6.5"
                }),
                _createElementVNode("path", { d: "m16 16 4 4" })
              ])),
              _createTextVNode(_toDisplayString(_ctx.t('find')), 1 /* TEXT */)
            ], 8 /* PROPS */, ["aria-label", "aria-pressed", "onClick"]),
            _createElementVNode("button", {
              type: "button",
              "aria-label": _ctx.t('inbox'),
              onClick: $event => (_ctx.openUtility('inbox'))
            }, [
              (_openBlock(), _createElementBlock("svg", {
                viewBox: "0 0 24 24",
                "aria-hidden": "true"
              }, [
                _createElementVNode("path", { d: "M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" })
              ])),
              _createTextVNode(_toDisplayString(_ctx.t('messages')), 1 /* TEXT */),
              (_ctx.unreadNotices)
                ? (_openBlock(), _createElementBlock("i", {
                    key: 0,
                    class: "gim-tool-badge"
                  }, _toDisplayString(_ctx.unreadNotices), 1 /* TEXT */))
                : _createCommentVNode("v-if", true)
            ], 8 /* PROPS */, ["aria-label", "onClick"]),
            _createElementVNode("button", {
              type: "button",
              "aria-label": _ctx.t('settings'),
              onClick: $event => (_ctx.openUtility('settings'))
            }, [
              (_openBlock(), _createElementBlock("svg", {
                viewBox: "0 0 24 24",
                "aria-hidden": "true"
              }, [
                _createElementVNode("path", { d: "m10 3-.6 2.5-1.6.9-2.5-.7-2 3.5 1.9 1.8v2l-1.9 1.8 2 3.5 2.5-.7 1.6.9.6 2.5h4l.6-2.5 1.6-.9 2.5.7 2-3.5-1.9-1.8v-2l1.9-1.8-2-3.5-2.5.7-1.6-.9L14 3Z" }),
                _createElementVNode("circle", {
                  cx: "12",
                  cy: "12",
                  r: "3"
                })
              ])),
              _createTextVNode(_toDisplayString(_ctx.t('settings')), 1 /* TEXT */)
            ], 8 /* PROPS */, ["aria-label", "onClick"])
          ])
        ], 44 /* STYLE, PROPS, NEED_HYDRATION */, ["aria-label", "onPointerdown"]))
      : _createCommentVNode("v-if", true),
    (_ctx.chatOpen && _ctx.active)
      ? (_openBlock(), _createElementBlock("section", {
          key: 3,
          ref: "chatElement",
          class: _normalizeClass(["gim-chat gim-window", { 'gim-chat-many': !_ctx.customerService && _ctx.openKeys.length > 1, 'gim-service-chat': _ctx.customerService, 'gim-ai-chat': _ctx.active.type === 'ai', 'gim-chat-maximized': _ctx.active.type === 'ai' && _ctx.active.maximized }]),
          style: _normalizeStyle(_ctx.windowStyle('chat')),
          "aria-label": _ctx.t('chatWith', { name: _ctx.displayName(_ctx.active) }),
          onPointerdown: $event => (_ctx.frontWindow = 'chat')
        }, [
          (!_ctx.customerService && _ctx.openKeys.length > 1)
            ? (_openBlock(), _createElementBlock("aside", {
                key: 0,
                class: "gim-conversation-list",
                "aria-label": _ctx.t('openConversations')
              }, [
                _createElementVNode("div", { class: "gim-conversation-label" }, [
                  _createTextVNode(_toDisplayString(_ctx.t('conversations')), 1 /* TEXT */),
                  _createElementVNode("span", null, _toDisplayString(_ctx.openKeys.length), 1 /* TEXT */)
                ]),
                _createElementVNode("div", { class: "gim-conversation-scroll" }, [
                  (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.openKeys, (key) => {
                    return (_openBlock(), _createElementBlock("div", {
                      key: key,
                      class: _normalizeClass(["gim-conversation-row", { active: _ctx.activeKey === key, 'gim-blocked-contact': _ctx.isBlockedContact(_ctx.conversations[key]) }])
                    }, [
                      _createElementVNode("button", {
                        type: "button",
                        "aria-label": _ctx.t('switchConversation', { name: _ctx.displayName(_ctx.conversations[key]) }),
                        onClick: $event => (_ctx.chat(_ctx.conversations[key]))
                      }, [
                        _createElementVNode("span", {
                          class: _normalizeClass(["gim-avatar", { 'gim-group-avatar': _ctx.conversations[key].type === 'group', 'gim-offline': _ctx.isOffline(_ctx.conversations[key]), 'gim-blocked': _ctx.isBlockedContact(_ctx.conversations[key]) }])
                        }, [
                          (_ctx.conversations[key].avatar || _ctx.conversations[key].type !== 'group')
                            ? (_openBlock(), _createElementBlock("img", {
                                key: 0,
                                src: _ctx.conversations[key].avatar || (_ctx.conversations[key].type === 'ai' ? _ctx.aiAvatar : _ctx.defaultAvatar),
                                alt: _ctx.displayName(_ctx.conversations[key])
                              }, null, 8 /* PROPS */, ["src", "alt"]))
                            : (_openBlock(), _createElementBlock("span", { key: 1 }, _toDisplayString(_ctx.avatarLetter(_ctx.conversations[key])), 1 /* TEXT */))
                        ], 2 /* CLASS */),
                        _createElementVNode("span", { class: "gim-conversation-name" }, [
                          _createTextVNode(_toDisplayString(_ctx.displayName(_ctx.conversations[key])), 1 /* TEXT */),
                          (_ctx.isBlockedContact(_ctx.conversations[key]))
                            ? (_openBlock(), _createElementBlock("small", {
                                key: 0,
                                class: "gim-blocked-label"
                              }, _toDisplayString(_ctx.t('blockedUser')), 1 /* TEXT */))
                            : _createCommentVNode("v-if", true)
                        ]),
                        (_ctx.unread[key])
                          ? (_openBlock(), _createElementBlock("i", {
                              key: 0,
                              class: "gim-tab-dot"
                            }))
                          : _createCommentVNode("v-if", true)
                      ], 8 /* PROPS */, ["aria-label", "onClick"]),
                      _createElementVNode("button", {
                        class: "gim-conversation-close",
                        type: "button",
                        "aria-label": _ctx.t('closeConversation', { name: _ctx.displayName(_ctx.conversations[key]) }),
                        onClick: $event => (_ctx.closeChat(key))
                      }, "×", 8 /* PROPS */, ["aria-label", "onClick"])
                    ], 2 /* CLASS */))
                  }), 128 /* KEYED_FRAGMENT */))
                ])
              ], 8 /* PROPS */, ["aria-label"]))
            : _createCommentVNode("v-if", true),
          _createElementVNode("div", { class: "gim-chat-main" }, [
            _createElementVNode("header", {
              class: "gim-chat-header gim-drag-handle",
              onPointerdown: $event => (_ctx.startDrag($event, 'chat'))
            }, [
              _createElementVNode("div", {
                class: _normalizeClass(["gim-avatar", { 'gim-group-avatar': _ctx.active.type === 'group', 'gim-offline': _ctx.isOffline(_ctx.active), 'gim-blocked': _ctx.isBlockedContact(_ctx.active) }])
              }, [
                (_ctx.active.avatar || _ctx.active.type !== 'group')
                  ? (_openBlock(), _createElementBlock("img", {
                      key: 0,
                      src: _ctx.active.avatar || (_ctx.active.type === 'ai' ? _ctx.aiAvatar : _ctx.defaultAvatar),
                      alt: _ctx.displayName(_ctx.active)
                    }, null, 8 /* PROPS */, ["src", "alt"]))
                  : (_openBlock(), _createElementBlock("span", { key: 1 }, _toDisplayString(_ctx.avatarLetter(_ctx.active)), 1 /* TEXT */))
              ], 2 /* CLASS */),
              _createElementVNode("div", {
                class: _normalizeClass(["gim-chat-heading", { 'gim-blocked-contact': _ctx.isBlockedContact(_ctx.active) }])
              }, [
                _createElementVNode("strong", null, [
                  _createTextVNode(_toDisplayString(_ctx.displayName(_ctx.active)), 1 /* TEXT */),
                  (_ctx.isBlockedContact(_ctx.active))
                    ? (_openBlock(), _createElementBlock("span", {
                        key: 0,
                        class: "gim-blocked-label"
                      }, _toDisplayString(_ctx.t('blockedUser')), 1 /* TEXT */))
                    : _createCommentVNode("v-if", true)
                ]),
                _createElementVNode("small", null, _toDisplayString(_ctx.chatStatus[_ctx.activeKey || ''] || _ctx.typingLabel || (_ctx.active.type === 'ai' ? _ctx.composerRestriction ? _ctx.t('replying') : _ctx.t('aiChat') : _ctx.active.type === 'group' ? _ctx.t('groupChat') : _ctx.isOffline(_ctx.active) ? _ctx.t('offline') : _ctx.t('online'))), 1 /* TEXT */)
              ], 2 /* CLASS */),
              (_ctx.active.type === 'group')
                ? (_openBlock(), _createElementBlock("button", {
                    key: 0,
                    type: "button",
                    class: "gim-group-members-trigger",
                    "aria-label": _ctx.t('viewGroupMembers'),
                    title: _ctx.t('viewGroupMembers'),
                    onClick: $event => (_ctx.openUtility('members'))
                  }, [
                    (_openBlock(), _createElementBlock("svg", {
                      viewBox: "0 0 24 24",
                      "aria-hidden": "true"
                    }, [
                      _createElementVNode("circle", {
                        cx: "9",
                        cy: "8",
                        r: "3"
                      }),
                      _createElementVNode("path", { d: "M3 20v-2a6 6 0 0 1 12 0v2M16 5a3 3 0 0 1 0 6m2 3a5 5 0 0 1 3 4v2" })
                    ])),
                    _createElementVNode("span", null, _toDisplayString(_ctx.active.members !== undefined ? _ctx.t('groupMembersCount', { count: _ctx.active.members }) : _ctx.t('groupMembers')), 1 /* TEXT */)
                  ], 8 /* PROPS */, ["aria-label", "title", "onClick"]))
                : _createCommentVNode("v-if", true),
              _createElementVNode("div", { class: "gim-chat-controls" }, [
                (_ctx.active.type === 'ai')
                  ? (_openBlock(), _createElementBlock("button", {
                      key: 0,
                      type: "button",
                      "aria-label": _ctx.active.maximized ? _ctx.t('restoreWindow') : _ctx.t('maximiseWindow'),
                      title: _ctx.active.maximized ? _ctx.t('restoreWindow') : _ctx.t('maximiseWindow'),
                      onClick: $event => (_ctx.active.maximized = !_ctx.active.maximized)
                    }, [
                      (_openBlock(), _createElementBlock("svg", {
                        viewBox: "0 0 24 24",
                        "aria-hidden": "true"
                      }, [
                        (_ctx.active.maximized)
                          ? (_openBlock(), _createElementBlock("path", {
                              key: 0,
                              d: "M8 8V4h12v12h-4M4 8h12v12H4Z"
                            }))
                          : (_openBlock(), _createElementBlock("rect", {
                              key: 1,
                              x: "4",
                              y: "4",
                              width: "16",
                              height: "16",
                              rx: "1"
                            }))
                      ]))
                    ], 8 /* PROPS */, ["aria-label", "title", "onClick"]))
                  : _createCommentVNode("v-if", true),
                _createElementVNode("button", {
                  type: "button",
                  "aria-label": _ctx.t('minimiseChat'),
                  onClick: $event => (_ctx.chatOpen = false)
                }, "−", 8 /* PROPS */, ["aria-label", "onClick"]),
                _createElementVNode("button", {
                  type: "button",
                  "aria-label": _ctx.t('closeChat'),
                  onClick: $event => (_ctx.customerService ? (_ctx.chatOpen = false) : _ctx.activeKey && _ctx.closeChat(_ctx.activeKey))
                }, "×", 8 /* PROPS */, ["aria-label", "onClick"])
              ])
            ], 40 /* PROPS, NEED_HYDRATION */, ["onPointerdown"]),
            _createElementVNode("div", {
              ref: "messageList",
              class: "gim-messages",
              role: "log",
              "aria-live": "polite"
            }, [
              (_ctx.historyError[_ctx.activeKey || ''])
                ? (_openBlock(), _createElementBlock("button", {
                    key: 0,
                    class: "gim-history-error",
                    type: "button",
                    onClick: $event => (_ctx.activeKey && _ctx.fetchHistory(_ctx.activeKey, _ctx.active))
                  }, _toDisplayString(_ctx.t('historyLoadFailed')), 9 /* TEXT, PROPS */, ["onClick"]))
                : _createCommentVNode("v-if", true),
              (!_ctx.activeMessages.length)
                ? (_openBlock(), _createElementBlock("p", {
                    key: 1,
                    class: "gim-message-empty"
                  }, _toDisplayString(_ctx.t('emptyChat', { name: _ctx.displayName(_ctx.active) })), 1 /* TEXT */))
                : _createCommentVNode("v-if", true),
              (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.activeMessages, (message, index) => {
                return (_openBlock(), _createElementBlock(_Fragment, {
                  key: message.mid || `${message.timestamp}-${index}`
                }, [
                  (message.notice)
                    ? (_openBlock(), _createElementBlock("div", {
                        key: 0,
                        class: "gim-chat-notice"
                      }, [
                        _createElementVNode("span", null, [
                          _createElementVNode("time", null, _toDisplayString(_ctx.timeLabel(message.timestamp)), 1 /* TEXT */),
                          _createTextVNode(_toDisplayString(_ctx.chatNoticeText(message)), 1 /* TEXT */)
                        ])
                      ]))
                    : (_openBlock(), _createElementBlock("div", {
                        key: 1,
                        class: _normalizeClass(["gim-message", { mine: message.mine, 'gim-blocked': _ctx.isBlockedMessage(message) }])
                      }, [
                        _createElementVNode("span", { class: "gim-avatar gim-message-avatar" }, [
                          _createElementVNode("img", {
                            src: (message.mine ? _ctx.userAvatar : message.avatar || (_ctx.active.type !== 'group' ? _ctx.active.avatar || (_ctx.active.type === 'ai' ? _ctx.aiAvatar : undefined) : undefined)) || _ctx.defaultAvatar,
                            alt: message.username || ''
                          }, null, 8 /* PROPS */, ["src", "alt"])
                        ]),
                        _createElementVNode("div", { class: "gim-message-body" }, [
                          _createElementVNode("div", { class: "gim-message-meta" }, [
                            _createElementVNode("span", null, _toDisplayString(message.mine ? _ctx.username : message.username || _ctx.displayName(_ctx.active)), 1 /* TEXT */),
                            (_ctx.isBlockedMessage(message))
                              ? (_openBlock(), _createElementBlock("span", {
                                  key: 0,
                                  class: "gim-blocked-label"
                                }, _toDisplayString(_ctx.t('blockedUser')), 1 /* TEXT */))
                              : _createCommentVNode("v-if", true),
                            (_ctx.active.type === 'group' && (message.fromid !== undefined || message.mine))
                              ? (_openBlock(), _createElementBlock(_Fragment, { key: 1 }, [
                                  (_ctx.isGroupOwner({ ..._ctx.active, type: 'group' }, message.mine ? _ctx.init.user.id : message.fromid))
                                    ? (_openBlock(), _createElementBlock("span", {
                                        key: 0,
                                        class: "gim-owner-badge"
                                      }, _toDisplayString(_ctx.t('owner')), 1 /* TEXT */))
                                    : (_ctx.isGroupAdmin({ ..._ctx.active, type: 'group' }, message.mine ? _ctx.init.user.id : message.fromid))
                                      ? (_openBlock(), _createElementBlock("span", {
                                          key: 1,
                                          class: "gim-admin-badge"
                                        }, _toDisplayString(_ctx.t('administrator')), 1 /* TEXT */))
                                      : _createCommentVNode("v-if", true)
                                ], 64 /* STABLE_FRAGMENT */))
                              : _createCommentVNode("v-if", true),
                            _createElementVNode("time", null, _toDisplayString(_ctx.timeLabel(message.timestamp)), 1 /* TEXT */)
                          ]),
                          _createElementVNode("div", { class: "gim-bubble" }, [
                            (message.attachment?.kind === 'image' && _ctx.safeAttachmentUrl(message.attachment.url))
                              ? (_openBlock(), _createElementBlock("img", {
                                  key: 0,
                                  class: "gim-message-image",
                                  src: message.attachment.url,
                                  alt: message.attachment.name
                                }, null, 8 /* PROPS */, ["src", "alt"]))
                              : (message.attachment?.kind === 'audio' && _ctx.safeAttachmentUrl(message.attachment.url))
                                ? (_openBlock(), _createElementBlock("div", {
                                    key: 1,
                                    class: "gim-voice-message"
                                  }, [
                                    _createElementVNode("audio", {
                                      controls: "",
                                      preload: "none",
                                      src: message.attachment.url,
                                      "aria-label": _ctx.t('playVoice')
                                    }, null, 8 /* PROPS */, ["src", "aria-label"]),
                                    (message.attachment.duration)
                                      ? (_openBlock(), _createElementBlock("small", { key: 0 }, _toDisplayString(_ctx.t('durationSeconds', { count: message.attachment.duration })), 1 /* TEXT */))
                                      : _createCommentVNode("v-if", true)
                                  ]))
                                : (message.attachment?.kind === 'file' && _ctx.safeAttachmentUrl(message.attachment.url))
                                  ? (_openBlock(), _createElementBlock("a", {
                                      key: 2,
                                      href: message.attachment.url,
                                      target: "_blank",
                                      rel: "noopener noreferrer",
                                      download: ""
                                    }, _toDisplayString(message.attachment.name) + " ↗", 9 /* TEXT, PROPS */, ["href"]))
                                  : (_ctx.active.type === 'ai' && !message.mine && message.content)
                                    ? (_openBlock(), _createElementBlock("div", {
                                        key: 3,
                                        class: "gim-markdown",
                                        innerHTML: _ctx.markdown.render(message.content)
                                      }, null, 8 /* PROPS */, ["innerHTML"]))
                                    : (_openBlock(), _createElementBlock(_Fragment, { key: 4 }, [
                                        _createTextVNode(_toDisplayString(message.content), 1 /* TEXT */)
                                      ], 64 /* STABLE_FRAGMENT */)),
                            (message.pending)
                              ? (_openBlock(), _createElementBlock("span", {
                                  key: 5,
                                  class: "gim-ai-progress",
                                  role: "status"
                                }, [
                                  _createElementVNode("span", {
                                    class: "gim-ai-dots",
                                    "aria-hidden": "true"
                                  }, "● ● ●"),
                                  _createTextVNode(_toDisplayString(message.content ? _ctx.t('generating') : _ctx.t('thinking')), 1 /* TEXT */)
                                ]))
                              : _createCommentVNode("v-if", true),
                            (message.error || message.errorKey)
                              ? (_openBlock(), _createElementBlock("span", {
                                  key: 6,
                                  class: "gim-ai-error",
                                  role: "alert"
                                }, _toDisplayString(message.errorKey ? _ctx.t(message.errorKey) : message.error), 1 /* TEXT */))
                              : _createCommentVNode("v-if", true)
                          ]),
                          (message.mine && _ctx.active.type !== 'ai')
                            ? (_openBlock(), _createElementBlock("small", {
                                key: 0,
                                class: _normalizeClass(["gim-read-state", { 'is-read': message.readBy?.length }])
                              }, _toDisplayString(message.readBy?.length ? _ctx.active.type === 'group' ? _ctx.t('messageReadCount', { count: message.readBy.length }) : _ctx.t('messageRead') : _ctx.t('messageUnread')), 3 /* TEXT, CLASS */))
                            : _createCommentVNode("v-if", true)
                        ])
                      ], 2 /* CLASS */))
                ], 64 /* STABLE_FRAGMENT */))
              }), 128 /* KEYED_FRAGMENT */))
            ], 512 /* NEED_PATCH */),
            _createElementVNode("div", { class: "gim-composer" }, [
              _createElementVNode("div", { class: "gim-chat-tools" }, [
                (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.toolbarItems, (tool, index) => {
                  return (_openBlock(), _createElementBlock("button", {
                    key: tool.id,
                    type: "button",
                    class: _normalizeClass({ 'gim-tool-right-start': tool.align === 'right' && _ctx.toolbarItems[index - 1]?.align !== 'right', 'gim-tool-text': tool.text !== undefined }),
                    "aria-label": tool.label,
                    title: tool.title || tool.label,
                    disabled: tool.disabled,
                    "aria-busy": _ctx.toolbarBusy.has(`${_ctx.activeKey}:${tool.id}`) || undefined,
                    onClick: $event => (_ctx.runToolbar(tool))
                  }, [
                    (tool.text !== undefined)
                      ? (_openBlock(), _createElementBlock("span", { key: 0 }, _toDisplayString(tool.text), 1 /* TEXT */))
                      : (_openBlock(), _createElementBlock("svg", {
                          key: 1,
                          viewBox: "0 0 24 24",
                          "aria-hidden": "true"
                        }, [
                          _createElementVNode("path", {
                            d: tool.icon || 'M12 5v14M5 12h14'
                          }, null, 8 /* PROPS */, ["d"])
                        ]))
                  ], 10 /* CLASS, PROPS */, ["aria-label", "title", "disabled", "aria-busy", "onClick"]))
                }), 128 /* KEYED_FRAGMENT */)),
                _createElementVNode("input", {
                  ref: "imageInput",
                  type: "file",
                  accept: "image/*",
                  hidden: "",
                  onChange: $event => (_ctx.sendAttachment($event, 'image'))
                }, null, 40 /* PROPS, NEED_HYDRATION */, ["onChange"]),
                _createElementVNode("input", {
                  ref: "fileInput",
                  type: "file",
                  hidden: "",
                  onChange: $event => (_ctx.sendAttachment($event, 'file'))
                }, null, 40 /* PROPS, NEED_HYDRATION */, ["onChange"]),
                (_ctx.emojiOpen && !_ctx.composerRestriction)
                  ? (_openBlock(), _createElementBlock("div", {
                      key: 0,
                      class: "gim-emoji-picker"
                    }, [
                      (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.emojis, (emoji) => {
                        return (_openBlock(), _createElementBlock("button", {
                          key: emoji,
                          type: "button",
                          "aria-label": _ctx.t('insertEmoji', { emoji }),
                          onClick: $event => (_ctx.insertEmoji(emoji))
                        }, _toDisplayString(emoji), 9 /* TEXT, PROPS */, ["aria-label", "onClick"]))
                      }), 128 /* KEYED_FRAGMENT */))
                    ]))
                  : _createCommentVNode("v-if", true)
              ]),
              (_ctx.toolbarError)
                ? (_openBlock(), _createElementBlock("p", {
                    key: 0,
                    class: "gim-toolbar-error",
                    role: "alert"
                  }, _toDisplayString(_ctx.errorText(_ctx.toolbarError)), 1 /* TEXT */))
                : _createCommentVNode("v-if", true),
              (_ctx.voiceState !== 'idle')
                ? (_openBlock(), _createElementBlock("div", {
                    key: 1,
                    class: "gim-voice-recorder"
                  }, [
                    (_ctx.voiceState === 'requesting')
                      ? (_openBlock(), _createElementBlock("span", {
                          key: 0,
                          role: "status"
                        }, _toDisplayString(_ctx.t('requestingMicrophone')), 1 /* TEXT */))
                      : (_ctx.voiceState === 'recording')
                        ? (_openBlock(), _createElementBlock(_Fragment, { key: 1 }, [
                            _createElementVNode("span", {
                              class: "gim-recording-dot",
                              "aria-hidden": "true"
                            }),
                            _createElementVNode("span", { role: "status" }, _toDisplayString(_ctx.t('recordingProgress', { count: _ctx.voiceDuration })), 1 /* TEXT */),
                            _createElementVNode("button", {
                              type: "button",
                              "aria-label": _ctx.t('stopRecording'),
                              onClick: _ctx.stopVoice
                            }, _toDisplayString(_ctx.t('stop')), 9 /* TEXT, PROPS */, ["aria-label", "onClick"])
                          ], 64 /* STABLE_FRAGMENT */))
                        : (_openBlock(), _createElementBlock("audio", {
                            key: 2,
                            controls: "",
                            preload: "metadata",
                            src: _ctx.voicePreview,
                            "aria-label": _ctx.t('previewRecording')
                          }, null, 8 /* PROPS */, ["src", "aria-label"])),
                    _createElementVNode("button", {
                      type: "button",
                      "aria-label": _ctx.t('cancelRecording'),
                      onClick: $event => {_ctx.cancelVoice(); _ctx.voiceSending = false; _ctx.toolbarError = ''}
                    }, _toDisplayString(_ctx.t('cancel')), 9 /* TEXT, PROPS */, ["aria-label", "onClick"])
                  ]))
                : _withDirectives((_openBlock(), _createElementBlock("textarea", {
                    key: 2,
                    "onUpdate:modelValue": $event => ((_ctx.draft) = $event),
                    "aria-label": _ctx.t('messageInput'),
                    disabled: !!_ctx.composerRestriction,
                    placeholder: _ctx.composerRestriction || (_ctx.sendKey === 'enter' ? _ctx.t('messagePlaceholder') : _ctx.t('ctrlMessagePlaceholder')),
                    rows: "3",
                    onInput: _ctx.publishTyping,
                    onKeydown: _ctx.onComposerKeydown,
                    onBlur: _ctx.stopTyping
                  }, null, 40 /* PROPS, NEED_HYDRATION */, ["onUpdate:modelValue", "aria-label", "disabled", "placeholder", "onInput", "onKeydown", "onBlur"])), [
                    [_vModelText, _ctx.draft]
                  ]),
              _createElementVNode("div", { class: "gim-composer-footer" }, [
                _createElementVNode("span", null, _toDisplayString(_ctx.composerRestriction || (_ctx.voiceState !== 'idle' ? _ctx.voiceState === 'preview' ? _ctx.t('voicePreviewHint', { count: _ctx.voiceDuration }) : _ctx.t('stopToPreview') : _ctx.sendKey === 'enter' ? _ctx.t('newLineHint') : _ctx.t('ctrlSend'))), 1 /* TEXT */),
                (_ctx.voiceState !== 'idle')
                  ? (_openBlock(), _createElementBlock("button", {
                      key: 0,
                      type: "button",
                      "aria-label": _ctx.t('sendVoice'),
                      disabled: _ctx.voiceState !== 'preview' || _ctx.voiceSending || !!_ctx.composerRestriction,
                      onClick: _ctx.sendVoice
                    }, [
                      _createTextVNode(_toDisplayString(_ctx.voiceSending ? _ctx.t('uploading') : _ctx.t('send')) + " ", 1 /* TEXT */),
                      _createElementVNode("span", null, "↗")
                    ], 8 /* PROPS */, ["aria-label", "disabled", "onClick"]))
                  : (_openBlock(), _createElementBlock("button", {
                      key: 1,
                      type: "button",
                      disabled: !_ctx.draft.trim() || !!_ctx.composerRestriction,
                      onClick: _ctx.send
                    }, [
                      _createTextVNode(_toDisplayString(_ctx.t('send')) + " ", 1 /* TEXT */),
                      _createElementVNode("span", null, "↗")
                    ], 8 /* PROPS */, ["disabled", "onClick"]))
              ])
            ])
          ])
        ], 46 /* CLASS, STYLE, PROPS, NEED_HYDRATION */, ["aria-label", "onPointerdown"]))
      : _createCommentVNode("v-if", true),
    (_ctx.utility)
      ? (_openBlock(), _createElementBlock("div", {
          key: 4,
          class: "gim-modal-backdrop",
          onClick: _withModifiers($event => (!_ctx.managementBusy && (_ctx.utility = null)), ["self"])
        }, [
          _createElementVNode("section", {
            class: "gim-modal",
            "aria-label": _ctx.utilityTitle
          }, [
            _createElementVNode("header", null, [
              _createElementVNode("strong", null, _toDisplayString(_ctx.utilityTitle), 1 /* TEXT */),
              _createElementVNode("button", {
                type: "button",
                "aria-label": _ctx.t('closeDialog'),
                disabled: _ctx.managementBusy,
                onClick: $event => (_ctx.utility = null)
              }, "×", 8 /* PROPS */, ["aria-label", "disabled", "onClick"])
            ]),
            (_ctx.utility === 'call-info')
              ? (_openBlock(), _createElementBlock("div", {
                  key: 0,
                  class: "gim-management-form gim-call-info",
                  role: "status"
                }, [
                  _createElementVNode("p", null, _toDisplayString(_ctx.t('callRequired')), 1 /* TEXT */),
                  _createElementVNode("p", { class: "gim-form-hint" }, _toDisplayString(_ctx.t('callIntegrationHint')), 1 /* TEXT */),
                  _createElementVNode("footer", { class: "gim-management-footer" }, [
                    _createElementVNode("button", {
                      type: "button",
                      "aria-label": _ctx.t('callIntegrationConfirm'),
                      onClick: $event => (_ctx.utility = null)
                    }, _toDisplayString(_ctx.t('callIntegrationConfirm')), 9 /* TEXT, PROPS */, ["aria-label", "onClick"])
                  ])
                ]))
              : (_ctx.utility === 'add')
                ? (_openBlock(), _createElementBlock(_Fragment, { key: 1 }, [
                    _createElementVNode("form", {
                      class: "gim-find-form",
                      onSubmit: _withModifiers(_ctx.runFind, ["prevent"])
                    }, [
                      _withDirectives(_createElementVNode("input", {
                        "onUpdate:modelValue": $event => ((_ctx.findQuery) = $event),
                        "aria-label": _ctx.t('findUser'),
                        placeholder: _ctx.t('findUserPlaceholder')
                      }, null, 8 /* PROPS */, ["onUpdate:modelValue", "aria-label", "placeholder"]), [
                        [_vModelText, _ctx.findQuery]
                      ]),
                      _createElementVNode("button", { type: "submit" }, _toDisplayString(_ctx.t('find')), 1 /* TEXT */)
                    ], 40 /* PROPS, NEED_HYDRATION */, ["onSubmit"]),
                    (_ctx.findError)
                      ? (_openBlock(), _createElementBlock("p", {
                          key: 0,
                          class: "gim-form-error"
                        }, _toDisplayString(_ctx.errorText(_ctx.findError)), 1 /* TEXT */))
                      : _createCommentVNode("v-if", true),
                    (_ctx.findBusy)
                      ? (_openBlock(), _createElementBlock("p", {
                          key: 1,
                          class: "gim-empty"
                        }, _toDisplayString(_ctx.t('finding')), 1 /* TEXT */))
                      : (_openBlock(), _createElementBlock("div", {
                          key: 2,
                          class: "gim-modal-list"
                        }, [
                          (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.findResults, (contact) => {
                            return (_openBlock(), _createElementBlock("div", {
                              key: `${contact.type}:${contact.id}`,
                              class: "gim-find-row"
                            }, [
                              _createElementVNode("span", {
                                class: _normalizeClass(["gim-avatar", { 'gim-group-avatar': contact.type === 'group' }])
                              }, [
                                (contact.type !== 'group' || contact.avatar)
                                  ? (_openBlock(), _createElementBlock("img", {
                                      key: 0,
                                      src: contact.avatar || _ctx.defaultAvatar,
                                      alt: _ctx.displayName(contact)
                                    }, null, 8 /* PROPS */, ["src", "alt"]))
                                  : (_openBlock(), _createElementBlock("span", { key: 1 }, _toDisplayString(_ctx.avatarLetter(contact)), 1 /* TEXT */))
                              ], 2 /* CLASS */),
                              _createElementVNode("span", null, [
                                _createElementVNode("strong", null, _toDisplayString(_ctx.displayName(contact)), 1 /* TEXT */),
                                _createElementVNode("small", null, _toDisplayString(contact.sign || (contact.type === 'group' ? _ctx.t('groups') : _ctx.t('contactId', { id: contact.id }))), 1 /* TEXT */)
                              ]),
                              (contact.type === 'group')
                                ? (_openBlock(), _createElementBlock("button", {
                                    key: 0,
                                    type: "button",
                                    onClick: $event => {_ctx.chat({ ...contact, type: 'group' }); _ctx.utility = null}
                                  }, _toDisplayString(_ctx.t('chat')), 9 /* TEXT, PROPS */, ["onClick"]))
                                : (_openBlock(), _createElementBlock("button", {
                                    key: 1,
                                    type: "button",
                                    disabled: _ctx.isBlocked(contact.id) || _ctx.friends.some(item => String(item.id) === String(contact.id)) || _ctx.requestedIds.has(String(contact.id)) || _ctx.addBusy === String(contact.id),
                                    onClick: $event => (_ctx.requestAdd(contact))
                                  }, _toDisplayString(_ctx.isBlocked(contact.id) ? _ctx.t('blockedUser') : _ctx.friends.some(item => String(item.id) === String(contact.id)) ? _ctx.t('alreadyAdded') : _ctx.requestedIds.has(String(contact.id)) ? _ctx.t('requested') : _ctx.t('add')), 9 /* TEXT, PROPS */, ["disabled", "onClick"]))
                            ]))
                          }), 128 /* KEYED_FRAGMENT */)),
                          (!_ctx.findResults.length)
                            ? (_openBlock(), _createElementBlock("p", {
                                key: 0,
                                class: "gim-empty"
                              }, _toDisplayString(_ctx.findContacts ? _ctx.t('noResults') : _ctx.t('findContactsRequired')), 1 /* TEXT */))
                            : _createCommentVNode("v-if", true)
                        ]))
                  ], 64 /* STABLE_FRAGMENT */))
                : (_ctx.utility === 'friend-group' || _ctx.utility === 'accept-friend')
                  ? (_openBlock(), _createElementBlock("form", {
                      key: 2,
                      class: "gim-management-form",
                      onSubmit: _withModifiers(_ctx.submitFriendManagement, ["prevent"])
                    }, [
                      (_ctx.managedFriend && _ctx.utility === 'accept-friend')
                        ? (_openBlock(), _createElementBlock("p", { key: 0 }, _toDisplayString(_ctx.t('addToCategory', { name: _ctx.displayName(_ctx.managedFriend) })), 1 /* TEXT */))
                        : _createCommentVNode("v-if", true),
                      (_ctx.utility !== 'friend-group' && !_ctx.creatingFriendGroup)
                        ? (_openBlock(), _createElementBlock("label", { key: 1 }, [
                            _createTextVNode(_toDisplayString(_ctx.t('friendCategory')), 1 /* TEXT */),
                            _withDirectives(_createElementVNode("select", {
                              "onUpdate:modelValue": $event => ((_ctx.selectedGroupId) = $event),
                              "aria-label": _ctx.t('chooseCategory'),
                              disabled: _ctx.managementBusy
                            }, [
                              (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.friendGroups, (group) => {
                                return (_openBlock(), _createElementBlock("option", {
                                  key: group.id,
                                  value: group.id
                                }, _toDisplayString(group.groupname), 9 /* TEXT, PROPS */, ["value"]))
                              }), 128 /* KEYED_FRAGMENT */))
                            ], 8 /* PROPS */, ["onUpdate:modelValue", "aria-label", "disabled"]), [
                              [_vModelSelect, _ctx.selectedGroupId]
                            ])
                          ]))
                        : _createCommentVNode("v-if", true),
                      (_ctx.utility === 'friend-group' || _ctx.creatingFriendGroup)
                        ? (_openBlock(), _createElementBlock("label", { key: 2 }, [
                            _createTextVNode(_toDisplayString(_ctx.t('categoryName')), 1 /* TEXT */),
                            _withDirectives(_createElementVNode("input", {
                              "onUpdate:modelValue": $event => ((_ctx.newFriendGroupName) = $event),
                              "aria-label": _ctx.t('categoryName'),
                              placeholder: _ctx.t('categoryNamePlaceholder'),
                              maxlength: "30",
                              disabled: _ctx.managementBusy
                            }, null, 8 /* PROPS */, ["onUpdate:modelValue", "aria-label", "placeholder", "disabled"]), [
                              [_vModelText, _ctx.newFriendGroupName]
                            ])
                          ]))
                        : _createCommentVNode("v-if", true),
                      (_ctx.utility !== 'friend-group' && !_ctx.creatingFriendGroup)
                        ? (_openBlock(), _createElementBlock("button", {
                            key: 3,
                            type: "button",
                            class: "gim-text-action",
                            disabled: _ctx.managementBusy,
                            onClick: $event => {_ctx.creatingFriendGroup = true; _ctx.newFriendGroupName = ''}
                          }, "＋ " + _toDisplayString(_ctx.t('newCategory')), 9 /* TEXT, PROPS */, ["disabled", "onClick"]))
                        : (_ctx.creatingFriendGroup && _ctx.friendGroups.length)
                          ? (_openBlock(), _createElementBlock("button", {
                              key: 4,
                              type: "button",
                              class: "gim-text-action",
                              disabled: _ctx.managementBusy,
                              onClick: $event => (_ctx.creatingFriendGroup = false)
                            }, _toDisplayString(_ctx.t('chooseExistingCategory')), 9 /* TEXT, PROPS */, ["disabled", "onClick"]))
                          : _createCommentVNode("v-if", true),
                      (_ctx.managementError)
                        ? (_openBlock(), _createElementBlock("p", {
                            key: 5,
                            class: "gim-form-error",
                            role: "alert"
                          }, _toDisplayString(_ctx.errorText(_ctx.managementError)), 1 /* TEXT */))
                        : _createCommentVNode("v-if", true),
                      _createElementVNode("footer", { class: "gim-management-footer" }, [
                        _createElementVNode("button", {
                          type: "button",
                          disabled: _ctx.managementBusy,
                          onClick: $event => (_ctx.utility = _ctx.utility === 'accept-friend' ? 'inbox' : null)
                        }, _toDisplayString(_ctx.t('cancel')), 9 /* TEXT, PROPS */, ["disabled", "onClick"]),
                        _createElementVNode("button", {
                          type: "submit",
                          disabled: _ctx.managementBusy
                        }, _toDisplayString(_ctx.managementBusy ? _ctx.t('saving') : _ctx.utility === 'accept-friend' ? _ctx.t('acceptAndAdd') : _ctx.t('confirm')), 9 /* TEXT, PROPS */, ["disabled"])
                      ])
                    ], 40 /* PROPS, NEED_HYDRATION */, ["onSubmit"]))
                  : (_ctx.utility === 'create-group' || _ctx.utility === 'invite')
                    ? (_openBlock(), _createElementBlock("form", {
                        key: 3,
                        class: "gim-management-form",
                        onSubmit: _withModifiers(_ctx.submitGroupManagement, ["prevent"])
                      }, [
                        (_ctx.utility === 'create-group')
                          ? (_openBlock(), _createElementBlock("label", { key: 0 }, [
                              _createTextVNode(_toDisplayString(_ctx.t('groupName')), 1 /* TEXT */),
                              _withDirectives(_createElementVNode("input", {
                                "onUpdate:modelValue": $event => ((_ctx.newGroupName) = $event),
                                "aria-label": _ctx.t('groupName'),
                                placeholder: _ctx.t('groupNamePlaceholder'),
                                maxlength: "40",
                                disabled: _ctx.managementBusy
                              }, null, 8 /* PROPS */, ["onUpdate:modelValue", "aria-label", "placeholder", "disabled"]), [
                                [_vModelText, _ctx.newGroupName]
                              ])
                            ]))
                          : (_openBlock(), _createElementBlock("p", { key: 1 }, _toDisplayString(_ctx.t('inviteToNamedGroup', { name: _ctx.managedGroup ? _ctx.displayName(_ctx.managedGroup) : '' })), 1 /* TEXT */)),
                        _withDirectives(_createElementVNode("input", {
                          "onUpdate:modelValue": $event => ((_ctx.memberQuery) = $event),
                          "aria-label": _ctx.t('searchSelectableFriends'),
                          placeholder: _ctx.t('searchFriends'),
                          disabled: _ctx.managementBusy
                        }, null, 8 /* PROPS */, ["onUpdate:modelValue", "aria-label", "placeholder", "disabled"]), [
                          [_vModelText, _ctx.memberQuery]
                        ]),
                        (_ctx.utility === 'invite' && _ctx.groupMembersBusy[_ctx.activeKey || ''])
                          ? (_openBlock(), _createElementBlock("p", {
                              key: 2,
                              class: "gim-form-hint"
                            }, _toDisplayString(_ctx.t('loadingMembers')), 1 /* TEXT */))
                          : (_ctx.utility === 'invite' && _ctx.groupMembersError[_ctx.activeKey || ''])
                            ? (_openBlock(), _createElementBlock("button", {
                                key: 3,
                                class: "gim-history-error",
                                type: "button",
                                onClick: $event => (_ctx.managedGroup && _ctx.fetchGroupMembers(_ctx.managedGroup))
                              }, _toDisplayString(_ctx.t('membersLoadFailed')), 9 /* TEXT, PROPS */, ["onClick"]))
                            : _createCommentVNode("v-if", true),
                        _createElementVNode("div", { class: "gim-member-options" }, [
                          (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.selectableFriends, (friend) => {
                            return (_openBlock(), _createElementBlock("label", {
                              key: friend.id,
                              class: "gim-member-option"
                            }, [
                              _withDirectives(_createElementVNode("input", {
                                "onUpdate:modelValue": $event => ((_ctx.selectedMemberIds) = $event),
                                type: "checkbox",
                                value: String(friend.id),
                                disabled: _ctx.managementBusy || (_ctx.utility === 'invite' && (_ctx.existingMemberIds.has(String(friend.id)) || _ctx.groupMembersBusy[_ctx.activeKey || ''] || _ctx.groupMembersError[_ctx.activeKey || '']))
                              }, null, 8 /* PROPS */, ["onUpdate:modelValue", "value", "disabled"]), [
                                [_vModelCheckbox, _ctx.selectedMemberIds]
                              ]),
                              _createElementVNode("span", {
                                class: _normalizeClass(["gim-avatar", { 'gim-offline': _ctx.isOffline(friend) }])
                              }, [
                                _createElementVNode("img", {
                                  src: friend.avatar || _ctx.defaultAvatar,
                                  alt: friend.username || ''
                                }, null, 8 /* PROPS */, ["src", "alt"])
                              ], 2 /* CLASS */),
                              _createElementVNode("span", { class: "gim-contact-copy" }, [
                                _createElementVNode("strong", null, _toDisplayString(_ctx.displayName(friend)), 1 /* TEXT */),
                                _createElementVNode("small", null, _toDisplayString(_ctx.utility === 'invite' && _ctx.existingMemberIds.has(String(friend.id)) ? _ctx.t('alreadyInGroup') : friend.sign || (_ctx.isOffline(friend) ? _ctx.t('offline') : _ctx.t('friend'))), 1 /* TEXT */)
                              ])
                            ]))
                          }), 128 /* KEYED_FRAGMENT */)),
                          (!_ctx.selectableFriends.length)
                            ? (_openBlock(), _createElementBlock("p", {
                                key: 0,
                                class: "gim-form-hint"
                              }, _toDisplayString(_ctx.t('noSelectableFriends')), 1 /* TEXT */))
                            : _createCommentVNode("v-if", true)
                        ]),
                        _createElementVNode("p", { class: "gim-form-hint" }, _toDisplayString(_ctx.t('selectedFriends', { count: _ctx.selectedMemberIds.length })), 1 /* TEXT */),
                        (_ctx.managementError)
                          ? (_openBlock(), _createElementBlock("p", {
                              key: 4,
                              class: "gim-form-error",
                              role: "alert"
                            }, _toDisplayString(_ctx.errorText(_ctx.managementError)), 1 /* TEXT */))
                          : _createCommentVNode("v-if", true),
                        _createElementVNode("footer", { class: "gim-management-footer" }, [
                          _createElementVNode("button", {
                            type: "button",
                            disabled: _ctx.managementBusy,
                            onClick: $event => (_ctx.utility = null)
                          }, _toDisplayString(_ctx.t('cancel')), 9 /* TEXT, PROPS */, ["disabled", "onClick"]),
                          _createElementVNode("button", {
                            type: "submit",
                            disabled: _ctx.managementBusy || (_ctx.utility === 'invite' && (_ctx.groupMembersBusy[_ctx.activeKey || ''] || _ctx.groupMembersError[_ctx.activeKey || '']))
                          }, _toDisplayString(_ctx.managementBusy ? _ctx.t('submitting') : _ctx.utility === 'create-group' ? _ctx.t('createGroupConfirm') : _ctx.t('sendInvites')), 9 /* TEXT, PROPS */, ["disabled"])
                        ])
                      ], 40 /* PROPS, NEED_HYDRATION */, ["onSubmit"]))
                    : (_ctx.utility === 'rename-group')
                      ? (_openBlock(), _createElementBlock("form", {
                          key: 4,
                          class: "gim-management-form",
                          onSubmit: _withModifiers($event => (_ctx.saveGroupProfile()), ["prevent"])
                        }, [
                          _createElementVNode("label", null, [
                            _createTextVNode(_toDisplayString(_ctx.t('groupName')), 1 /* TEXT */),
                            _withDirectives(_createElementVNode("input", {
                              "onUpdate:modelValue": $event => ((_ctx.newGroupName) = $event),
                              "aria-label": _ctx.t('groupName'),
                              placeholder: _ctx.t('groupNamePlaceholder'),
                              maxlength: "40",
                              disabled: _ctx.managementBusy
                            }, null, 8 /* PROPS */, ["onUpdate:modelValue", "aria-label", "placeholder", "disabled"]), [
                              [_vModelText, _ctx.newGroupName]
                            ])
                          ]),
                          (_ctx.managementError)
                            ? (_openBlock(), _createElementBlock("p", {
                                key: 0,
                                class: "gim-form-error",
                                role: "alert"
                              }, _toDisplayString(_ctx.errorText(_ctx.managementError)), 1 /* TEXT */))
                            : _createCommentVNode("v-if", true),
                          _createElementVNode("footer", { class: "gim-management-footer" }, [
                            _createElementVNode("button", {
                              type: "button",
                              disabled: _ctx.managementBusy,
                              onClick: $event => {_ctx.utility = 'members'; _ctx.managementError = ''}
                            }, _toDisplayString(_ctx.t('cancel')), 9 /* TEXT, PROPS */, ["disabled", "onClick"]),
                            _createElementVNode("button", {
                              type: "submit",
                              disabled: _ctx.managementBusy
                            }, _toDisplayString(_ctx.managementBusy ? _ctx.t('saving') : _ctx.t('saveGroupName')), 9 /* TEXT, PROPS */, ["disabled"])
                          ])
                        ], 40 /* PROPS, NEED_HYDRATION */, ["onSubmit"]))
                      : (_ctx.utility === 'remove-member' || _ctx.utility === 'dismiss-group')
                        ? (_openBlock(), _createElementBlock("form", {
                            key: 5,
                            class: "gim-management-form",
                            onSubmit: _withModifiers($event => (_ctx.moderateGroup(_ctx.utility === 'remove-member' ? 'remove' : 'dismiss', _ctx.utility === 'remove-member' ? _ctx.managedMember || undefined : undefined)), ["prevent"])
                          }, [
                            (_ctx.utility === 'remove-member')
                              ? (_openBlock(), _createElementBlock(_Fragment, { key: 0 }, [
                                  _createElementVNode("p", null, _toDisplayString(_ctx.t('confirmRemoveMember', { name: _ctx.managedMember ? _ctx.displayName(_ctx.managedMember) : '', group: _ctx.managedGroup ? _ctx.displayName(_ctx.managedGroup) : '' })), 1 /* TEXT */),
                                  _createElementVNode("p", { class: "gim-form-hint" }, _toDisplayString(_ctx.t('removeMemberHint')), 1 /* TEXT */)
                                ], 64 /* STABLE_FRAGMENT */))
                              : (_openBlock(), _createElementBlock(_Fragment, { key: 1 }, [
                                  _createElementVNode("p", null, _toDisplayString(_ctx.t('confirmDismissGroup', { name: _ctx.managedGroup ? _ctx.displayName(_ctx.managedGroup) : '' })), 1 /* TEXT */),
                                  _createElementVNode("p", { class: "gim-form-hint" }, _toDisplayString(_ctx.t('dismissGroupHint')), 1 /* TEXT */)
                                ], 64 /* STABLE_FRAGMENT */)),
                            (_ctx.managementError)
                              ? (_openBlock(), _createElementBlock("p", {
                                  key: 2,
                                  class: "gim-form-error",
                                  role: "alert"
                                }, _toDisplayString(_ctx.errorText(_ctx.managementError)), 1 /* TEXT */))
                              : _createCommentVNode("v-if", true),
                            _createElementVNode("footer", { class: "gim-management-footer" }, [
                              _createElementVNode("button", {
                                type: "button",
                                disabled: _ctx.managementBusy,
                                onClick: $event => {_ctx.utility = 'members'; _ctx.managementError = ''}
                              }, _toDisplayString(_ctx.t('cancel')), 9 /* TEXT, PROPS */, ["disabled", "onClick"]),
                              _createElementVNode("button", {
                                type: "submit",
                                class: "gim-danger",
                                disabled: _ctx.managementBusy
                              }, _toDisplayString(_ctx.managementBusy ? _ctx.t('submitting') : _ctx.utility === 'remove-member' ? _ctx.t('confirmRemove') : _ctx.t('confirmDismiss')), 9 /* TEXT, PROPS */, ["disabled"])
                            ])
                          ], 40 /* PROPS, NEED_HYDRATION */, ["onSubmit"]))
                        : (_ctx.utility === 'leave-group')
                          ? (_openBlock(), _createElementBlock("form", {
                              key: 6,
                              class: "gim-management-form",
                              onSubmit: _withModifiers(_ctx.submitGroupManagement, ["prevent"])
                            }, [
                              _createElementVNode("p", null, _toDisplayString(_ctx.t('confirmLeaveGroup', { name: _ctx.managedGroup ? _ctx.displayName(_ctx.managedGroup) : '' })), 1 /* TEXT */),
                              _createElementVNode("p", { class: "gim-form-hint" }, _toDisplayString(_ctx.t('leaveGroupHint')), 1 /* TEXT */),
                              (_ctx.managementError)
                                ? (_openBlock(), _createElementBlock("p", {
                                    key: 0,
                                    class: "gim-form-error",
                                    role: "alert"
                                  }, _toDisplayString(_ctx.errorText(_ctx.managementError)), 1 /* TEXT */))
                                : _createCommentVNode("v-if", true),
                              _createElementVNode("footer", { class: "gim-management-footer" }, [
                                _createElementVNode("button", {
                                  type: "button",
                                  disabled: _ctx.managementBusy,
                                  onClick: $event => (_ctx.utility = null)
                                }, _toDisplayString(_ctx.t('cancel')), 9 /* TEXT, PROPS */, ["disabled", "onClick"]),
                                _createElementVNode("button", {
                                  type: "submit",
                                  class: "gim-danger",
                                  disabled: _ctx.managementBusy
                                }, _toDisplayString(_ctx.managementBusy ? _ctx.t('leaving') : _ctx.t('confirmLeave')), 9 /* TEXT, PROPS */, ["disabled"])
                              ])
                            ], 40 /* PROPS, NEED_HYDRATION */, ["onSubmit"]))
                          : (_ctx.utility === 'settings')
                            ? (_openBlock(), _createElementBlock("div", {
                                key: 7,
                                class: "gim-settings"
                              }, [
                                _createElementVNode("button", {
                                  type: "button",
                                  class: "gim-blocklist-entry",
                                  "aria-label": _ctx.t('blocklist'),
                                  onClick: $event => (_ctx.openUtility('blocklist'))
                                }, [
                                  _createTextVNode(_toDisplayString(_ctx.t('blocklist')), 1 /* TEXT */),
                                  _createElementVNode("span", null, _toDisplayString(_ctx.blockedUsers.length) + " ›", 1 /* TEXT */)
                                ], 8 /* PROPS */, ["aria-label", "onClick"]),
                                _createElementVNode("label", null, [
                                  _createTextVNode(_toDisplayString(_ctx.t('darkMode')), 1 /* TEXT */),
                                  _createElementVNode("button", {
                                    class: "gim-theme-switch",
                                    type: "button",
                                    role: "switch",
                                    "aria-label": _ctx.t('darkMode'),
                                    "aria-checked": _ctx.theme === 'dark',
                                    onClick: $event => {_ctx.theme = _ctx.theme === 'dark' ? 'light' : 'dark'; _ctx.saveSettings()}
                                  }, [
                                    _createElementVNode("span", { "aria-hidden": "true" })
                                  ], 8 /* PROPS */, ["aria-label", "aria-checked", "onClick"])
                                ]),
                                _createElementVNode("label", null, [
                                  _createTextVNode(_toDisplayString(_ctx.t('sendShortcut')), 1 /* TEXT */),
                                  _withDirectives(_createElementVNode("select", {
                                    "onUpdate:modelValue": $event => ((_ctx.sendKey) = $event),
                                    onChange: _ctx.saveSettings
                                  }, [
                                    _createElementVNode("option", { value: "enter" }, _toDisplayString(_ctx.t('enterSend')), 1 /* TEXT */),
                                    _createElementVNode("option", { value: "ctrl-enter" }, _toDisplayString(_ctx.t('ctrlSend')), 1 /* TEXT */)
                                  ], 40 /* PROPS, NEED_HYDRATION */, ["onUpdate:modelValue", "onChange"]), [
                                    [_vModelSelect, _ctx.sendKey]
                                  ])
                                ])
                              ]))
                            : ((_ctx.utility === 'delete-friend' || _ctx.utility === 'block-friend') && _ctx.managedFriend)
                              ? (_openBlock(), _createElementBlock("form", {
                                  key: 8,
                                  class: "gim-management-form gim-friend-confirm",
                                  onSubmit: _withModifiers($event => (_ctx.submitFriendAction(_ctx.utility === 'delete-friend' ? 'delete' : 'block', _ctx.managedFriend)), ["prevent"])
                                }, [
                                  _createElementVNode("p", null, _toDisplayString(_ctx.t(_ctx.utility === 'delete-friend' ? 'confirmDeleteFriend' : 'confirmBlockFriend', { name: _ctx.displayName(_ctx.managedFriend) })), 1 /* TEXT */),
                                  (_ctx.managementError)
                                    ? (_openBlock(), _createElementBlock("p", {
                                        key: 0,
                                        class: "gim-form-error",
                                        role: "alert"
                                      }, _toDisplayString(_ctx.errorText(_ctx.managementError)), 1 /* TEXT */))
                                    : _createCommentVNode("v-if", true),
                                  _createElementVNode("footer", { class: "gim-management-footer" }, [
                                    _createElementVNode("button", {
                                      type: "button",
                                      disabled: _ctx.managementBusy,
                                      onClick: $event => (_ctx.utility = null)
                                    }, _toDisplayString(_ctx.t('cancel')), 9 /* TEXT, PROPS */, ["disabled", "onClick"]),
                                    _createElementVNode("button", {
                                      type: "submit",
                                      class: "gim-danger",
                                      disabled: _ctx.managementBusy
                                    }, _toDisplayString(_ctx.managementBusy ? _ctx.t('submitting') : _ctx.utility === 'delete-friend' ? _ctx.t('deleteFriend') : _ctx.t('blockFriend')), 9 /* TEXT, PROPS */, ["disabled"])
                                  ])
                                ], 40 /* PROPS, NEED_HYDRATION */, ["onSubmit"]))
                              : (_ctx.utility === 'blocklist')
                                ? (_openBlock(), _createElementBlock("div", {
                                    key: 9,
                                    class: "gim-modal-list gim-blocklist"
                                  }, [
                                    _createElementVNode("p", { class: "gim-form-hint" }, _toDisplayString(_ctx.t('unblockHint')), 1 /* TEXT */),
                                    (_ctx.managementError)
                                      ? (_openBlock(), _createElementBlock("p", {
                                          key: 0,
                                          class: "gim-form-error",
                                          role: "alert"
                                        }, _toDisplayString(_ctx.errorText(_ctx.managementError)), 1 /* TEXT */))
                                      : _createCommentVNode("v-if", true),
                                    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.blockedUsers, (contact) => {
                                      return (_openBlock(), _createElementBlock("div", {
                                        key: contact.id,
                                        class: "gim-blocklist-row"
                                      }, [
                                        _createElementVNode("span", { class: "gim-avatar gim-blocked" }, [
                                          _createElementVNode("img", {
                                            src: contact.avatar || _ctx.defaultAvatar,
                                            alt: _ctx.displayName(contact)
                                          }, null, 8 /* PROPS */, ["src", "alt"])
                                        ]),
                                        _createElementVNode("span", { class: "gim-contact-copy" }, [
                                          _createElementVNode("strong", null, _toDisplayString(_ctx.displayName(contact)), 1 /* TEXT */),
                                          _createElementVNode("small", null, _toDisplayString(_ctx.t('blockedUser')), 1 /* TEXT */)
                                        ]),
                                        _createElementVNode("button", {
                                          type: "button",
                                          "aria-label": _ctx.t('unblockNamedFriend', { name: _ctx.displayName(contact) }),
                                          disabled: _ctx.managementBusy,
                                          onClick: $event => (_ctx.submitFriendAction('unblock', contact))
                                        }, _toDisplayString(_ctx.t('unblockFriend')), 9 /* TEXT, PROPS */, ["aria-label", "disabled", "onClick"])
                                      ]))
                                    }), 128 /* KEYED_FRAGMENT */)),
                                    (!_ctx.blockedUsers.length)
                                      ? (_openBlock(), _createElementBlock("p", {
                                          key: 1,
                                          class: "gim-empty"
                                        }, _toDisplayString(_ctx.t('emptyBlocklist')), 1 /* TEXT */))
                                      : _createCommentVNode("v-if", true)
                                  ]))
                                : (_ctx.utility === 'inbox')
                                  ? (_openBlock(), _createElementBlock("div", {
                                      key: 10,
                                      class: "gim-modal-list"
                                    }, [
                                      (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.notices, (notice) => {
                                        return (_openBlock(), _createElementBlock("div", {
                                          key: notice.id,
                                          class: "gim-notice"
                                        }, [
                                          _createElementVNode("div", null, [
                                            _createElementVNode("strong", null, _toDisplayString(notice.title), 1 /* TEXT */),
                                            _createElementVNode("small", null, _toDisplayString(notice.timestamp ? _ctx.timeLabel(notice.timestamp) : ''), 1 /* TEXT */)
                                          ]),
                                          _createElementVNode("p", null, _toDisplayString(notice.content), 1 /* TEXT */),
                                          (!notice.resolved)
                                            ? (_openBlock(), _createElementBlock("div", {
                                                key: 0,
                                                class: "gim-notice-actions"
                                              }, [
                                                (notice.type === 'friend-request' && notice.contact)
                                                  ? (_openBlock(), _createElementBlock(_Fragment, { key: 0 }, [
                                                      _createElementVNode("button", {
                                                        type: "button",
                                                        onClick: $event => (_ctx.actOnNotice(notice, 'accept'))
                                                      }, _toDisplayString(_ctx.t('accept')), 9 /* TEXT, PROPS */, ["onClick"]),
                                                      _createElementVNode("button", {
                                                        type: "button",
                                                        onClick: $event => (_ctx.actOnNotice(notice, 'reject'))
                                                      }, _toDisplayString(_ctx.t('reject')), 9 /* TEXT, PROPS */, ["onClick"])
                                                    ], 64 /* STABLE_FRAGMENT */))
                                                  : (!notice.read)
                                                    ? (_openBlock(), _createElementBlock("button", {
                                                        key: 1,
                                                        type: "button",
                                                        onClick: $event => (_ctx.actOnNotice(notice, 'read'))
                                                      }, _toDisplayString(_ctx.t('markRead')), 9 /* TEXT, PROPS */, ["onClick"]))
                                                    : _createCommentVNode("v-if", true)
                                              ]))
                                            : (_openBlock(), _createElementBlock("small", { key: 1 }, _toDisplayString(_ctx.t('resolved')), 1 /* TEXT */))
                                        ]))
                                      }), 128 /* KEYED_FRAGMENT */)),
                                      (!_ctx.notices.length)
                                        ? (_openBlock(), _createElementBlock("p", {
                                            key: 0,
                                            class: "gim-empty"
                                          }, _toDisplayString(_ctx.t('noMessages')), 1 /* TEXT */))
                                        : _createCommentVNode("v-if", true)
                                    ]))
                                  : (_ctx.utility === 'members' && _ctx.managedGroup)
                                    ? (_openBlock(), _createElementBlock("div", {
                                        key: 11,
                                        class: "gim-modal-list"
                                      }, [
                                        _createElementVNode("div", { class: "gim-group-profile" }, [
                                          (_ctx.canManageGroup(_ctx.managedGroup))
                                            ? (_openBlock(), _createElementBlock("button", {
                                                key: 0,
                                                type: "button",
                                                class: "gim-avatar gim-own-avatar gim-group-avatar",
                                                "aria-label": _ctx.t('changeGroupAvatar'),
                                                title: _ctx.managementBusy ? _ctx.t('savingProfile') : _ctx.t('changeGroupAvatarHint'),
                                                disabled: _ctx.managementBusy,
                                                "aria-busy": _ctx.managementBusy,
                                                onClick: $event => (_ctx.groupAvatarInput?.click())
                                              }, [
                                                (_ctx.groupInfo(_ctx.managedGroup).avatar)
                                                  ? (_openBlock(), _createElementBlock("img", {
                                                      key: 0,
                                                      src: _ctx.groupInfo(_ctx.managedGroup).avatar,
                                                      alt: _ctx.displayName(_ctx.groupInfo(_ctx.managedGroup))
                                                    }, null, 8 /* PROPS */, ["src", "alt"]))
                                                  : (_openBlock(), _createElementBlock("span", { key: 1 }, _toDisplayString(_ctx.avatarLetter(_ctx.groupInfo(_ctx.managedGroup))), 1 /* TEXT */)),
                                                _createElementVNode("span", {
                                                  class: "gim-avatar-edit",
                                                  "aria-hidden": "true"
                                                }, [
                                                  (_openBlock(), _createElementBlock("svg", { viewBox: "0 0 24 24" }, [
                                                    _createElementVNode("path", { d: "m8 6 2-3h4l2 3h4v14H4V6Z" }),
                                                    _createElementVNode("circle", {
                                                      cx: "12",
                                                      cy: "12",
                                                      r: "3"
                                                    })
                                                  ]))
                                                ])
                                              ], 8 /* PROPS */, ["aria-label", "title", "disabled", "aria-busy", "onClick"]))
                                            : (_openBlock(), _createElementBlock("span", {
                                                key: 1,
                                                class: "gim-avatar gim-group-avatar"
                                              }, [
                                                (_ctx.groupInfo(_ctx.managedGroup).avatar)
                                                  ? (_openBlock(), _createElementBlock("img", {
                                                      key: 0,
                                                      src: _ctx.groupInfo(_ctx.managedGroup).avatar,
                                                      alt: _ctx.displayName(_ctx.groupInfo(_ctx.managedGroup))
                                                    }, null, 8 /* PROPS */, ["src", "alt"]))
                                                  : (_openBlock(), _createElementBlock("span", { key: 1 }, _toDisplayString(_ctx.avatarLetter(_ctx.groupInfo(_ctx.managedGroup))), 1 /* TEXT */))
                                              ])),
                                          (_ctx.canManageGroup(_ctx.managedGroup))
                                            ? (_openBlock(), _createElementBlock("input", {
                                                key: 2,
                                                ref: "groupAvatarInput",
                                                type: "file",
                                                hidden: "",
                                                accept: "image/png,image/jpeg,image/gif,image/webp,image/avif",
                                                "aria-label": _ctx.t('chooseGroupAvatar'),
                                                disabled: _ctx.managementBusy,
                                                onChange: $event => (_ctx.saveGroupProfile($event))
                                              }, null, 40 /* PROPS, NEED_HYDRATION */, ["aria-label", "disabled", "onChange"]))
                                            : _createCommentVNode("v-if", true),
                                          _createElementVNode("div", { class: "gim-contact-copy" }, [
                                            _createElementVNode("strong", null, _toDisplayString(_ctx.displayName(_ctx.groupInfo(_ctx.managedGroup))), 1 /* TEXT */),
                                            _createElementVNode("small", null, _toDisplayString(_ctx.canManageGroup(_ctx.managedGroup) ? _ctx.t('groupAvatarHint') : _ctx.t('groupProfile')), 1 /* TEXT */)
                                          ]),
                                          (_ctx.canManageGroup(_ctx.managedGroup))
                                            ? (_openBlock(), _createElementBlock("button", {
                                                key: 3,
                                                type: "button",
                                                class: "gim-text-action",
                                                "aria-label": _ctx.t('renameGroup'),
                                                disabled: _ctx.managementBusy,
                                                onClick: $event => (_ctx.openUtility('rename-group'))
                                              }, _toDisplayString(_ctx.t('renameGroup')), 9 /* TEXT, PROPS */, ["aria-label", "disabled", "onClick"]))
                                            : _createCommentVNode("v-if", true)
                                        ]),
                                        _createElementVNode("div", { class: "gim-member-actions" }, [
                                          _createElementVNode("button", {
                                            type: "button",
                                            "aria-label": _ctx.t('inviteToGroup'),
                                            disabled: _ctx.managementBusy,
                                            onClick: $event => (_ctx.openUtility('invite'))
                                          }, "＋ " + _toDisplayString(_ctx.t('inviteFriends')), 9 /* TEXT, PROPS */, ["aria-label", "disabled", "onClick"]),
                                          (_ctx.canManageGroup(_ctx.managedGroup))
                                            ? (_openBlock(), _createElementBlock("button", {
                                                key: 0,
                                                type: "button",
                                                "aria-label": _ctx.isGroupMuted(_ctx.managedGroup) ? _ctx.t('unmuteGroup') : _ctx.t('muteGroup'),
                                                disabled: _ctx.managementBusy,
                                                onClick: $event => (_ctx.moderateGroup('mute'))
                                              }, _toDisplayString(_ctx.isGroupMuted(_ctx.managedGroup) ? _ctx.t('unmuteGroup') : _ctx.t('muteGroup')), 9 /* TEXT, PROPS */, ["aria-label", "disabled", "onClick"]))
                                            : _createCommentVNode("v-if", true),
                                          (_ctx.isGroupOwner(_ctx.managedGroup))
                                            ? (_openBlock(), _createElementBlock("button", {
                                                key: 1,
                                                type: "button",
                                                class: "gim-danger",
                                                "aria-label": _ctx.t('dismissGroup'),
                                                disabled: _ctx.managementBusy,
                                                onClick: $event => (_ctx.openUtility('dismiss-group'))
                                              }, _toDisplayString(_ctx.t('dismissGroup')), 9 /* TEXT, PROPS */, ["aria-label", "disabled", "onClick"]))
                                            : (_openBlock(), _createElementBlock("button", {
                                                key: 2,
                                                type: "button",
                                                class: "gim-danger",
                                                "aria-label": _ctx.t('leaveGroup'),
                                                disabled: _ctx.managementBusy,
                                                onClick: $event => (_ctx.openUtility('leave-group'))
                                              }, _toDisplayString(_ctx.t('leaveGroup')), 9 /* TEXT, PROPS */, ["aria-label", "disabled", "onClick"]))
                                        ]),
                                        (_ctx.isGroupMuted(_ctx.managedGroup))
                                          ? (_openBlock(), _createElementBlock("p", {
                                              key: 0,
                                              class: "gim-form-hint"
                                            }, _toDisplayString(_ctx.t('groupMutedHint')), 1 /* TEXT */))
                                          : _createCommentVNode("v-if", true),
                                        (_ctx.managementError)
                                          ? (_openBlock(), _createElementBlock("p", {
                                              key: 1,
                                              class: "gim-form-error",
                                              role: "alert"
                                            }, _toDisplayString(_ctx.errorText(_ctx.managementError)), 1 /* TEXT */))
                                          : _createCommentVNode("v-if", true),
                                        (_ctx.groupMembersBusy[_ctx.managedGroupKey])
                                          ? (_openBlock(), _createElementBlock("p", {
                                              key: 2,
                                              class: "gim-empty"
                                            }, _toDisplayString(_ctx.t('loadingMembers')), 1 /* TEXT */))
                                          : (_ctx.groupMembersError[_ctx.managedGroupKey])
                                            ? (_openBlock(), _createElementBlock("button", {
                                                key: 3,
                                                type: "button",
                                                class: "gim-history-error",
                                                onClick: $event => (_ctx.fetchGroupMembers(_ctx.managedGroup))
                                              }, _toDisplayString(_ctx.t('membersLoadFailed')), 9 /* TEXT, PROPS */, ["onClick"]))
                                            : (!_ctx.loadGroupMembers && !_ctx.groupMembers[_ctx.managedGroupKey])
                                              ? (_openBlock(), _createElementBlock("p", {
                                                  key: 4,
                                                  class: "gim-empty"
                                                }, _toDisplayString(_ctx.t('membersUnavailable')), 1 /* TEXT */))
                                              : (_openBlock(), _createElementBlock(_Fragment, { key: 5 }, [
                                                  (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.groupMembers[_ctx.managedGroupKey] || [], (member) => {
                                                    return (_openBlock(), _createElementBlock("div", {
                                                      key: member.id,
                                                      class: "gim-member-row"
                                                    }, [
                                                      _createElementVNode("button", {
                                                        type: "button",
                                                        class: "gim-contact",
                                                        disabled: _ctx.managementBusy || String(member.id) === String(_ctx.init.user.id),
                                                        onClick: $event => {_ctx.chat({ ...member, type: 'friend' }); _ctx.utility = null}
                                                      }, [
                                                        _createElementVNode("span", {
                                                          class: _normalizeClass(["gim-avatar", { 'gim-offline': String(member.id) !== String(_ctx.init.user.id) && _ctx.isOffline(member) }])
                                                        }, [
                                                          _createElementVNode("img", {
                                                            src: (String(member.id) === String(_ctx.init.user.id) ? _ctx.userAvatar : member.avatar) || _ctx.defaultAvatar,
                                                            alt: member.username || ''
                                                          }, null, 8 /* PROPS */, ["src", "alt"])
                                                        ], 2 /* CLASS */),
                                                        _createElementVNode("span", { class: "gim-contact-copy" }, [
                                                          _createElementVNode("strong", null, [
                                                            _createElementVNode("span", null, _toDisplayString(String(member.id) === String(_ctx.init.user.id) ? _ctx.username : _ctx.displayName(member)), 1 /* TEXT */),
                                                            (_ctx.isGroupOwner(_ctx.managedGroup, member.id))
                                                              ? (_openBlock(), _createElementBlock("span", {
                                                                  key: 0,
                                                                  class: "gim-owner-badge"
                                                                }, _toDisplayString(_ctx.t('owner')), 1 /* TEXT */))
                                                              : (_ctx.isGroupAdmin(_ctx.managedGroup, member.id))
                                                                ? (_openBlock(), _createElementBlock("span", {
                                                                    key: 1,
                                                                    class: "gim-admin-badge"
                                                                  }, _toDisplayString(_ctx.t('administrator')), 1 /* TEXT */))
                                                                : _createCommentVNode("v-if", true)
                                                          ]),
                                                          _createElementVNode("small", null, [
                                                            (_ctx.isMemberMuted(_ctx.managedGroup, member))
                                                              ? (_openBlock(), _createElementBlock("span", {
                                                                  key: 0,
                                                                  class: "gim-muted-badge"
                                                                }, _toDisplayString(_ctx.t('muted')), 1 /* TEXT */))
                                                              : (_openBlock(), _createElementBlock(_Fragment, { key: 1 }, [
                                                                  _createTextVNode(_toDisplayString(String(member.id) === String(_ctx.init.user.id) ? _ctx.t('me') : member.sign || _ctx.t('privateChatHint')), 1 /* TEXT */)
                                                                ], 64 /* STABLE_FRAGMENT */))
                                                          ])
                                                        ])
                                                      ], 8 /* PROPS */, ["disabled", "onClick"]),
                                                      (_ctx.canManageMember(_ctx.managedGroup, member))
                                                        ? (_openBlock(), _createElementBlock("div", {
                                                            key: 0,
                                                            class: "gim-member-controls"
                                                          }, [
                                                            (_ctx.isGroupOwner(_ctx.managedGroup))
                                                              ? (_openBlock(), _createElementBlock("button", {
                                                                  key: 0,
                                                                  type: "button",
                                                                  class: "gim-admin-action",
                                                                  "aria-label": _ctx.isGroupAdmin(_ctx.managedGroup, member.id) ? _ctx.t('removeNamedAdmin', { name: _ctx.displayName(member) }) : _ctx.t('makeNamedAdmin', { name: _ctx.displayName(member) }),
                                                                  disabled: _ctx.managementBusy,
                                                                  onClick: $event => (_ctx.moderateGroup('admin', member))
                                                                }, _toDisplayString(_ctx.isGroupAdmin(_ctx.managedGroup, member.id) ? _ctx.t('removeAdmin') : _ctx.t('makeAdmin')), 9 /* TEXT, PROPS */, ["aria-label", "disabled", "onClick"]))
                                                              : _createCommentVNode("v-if", true),
                                                            _createElementVNode("button", {
                                                              type: "button",
                                                              "aria-label": _ctx.isMemberMuted(_ctx.managedGroup, member) ? _ctx.t('unmuteNamedMember', { name: _ctx.displayName(member) }) : _ctx.t('muteNamedMember', { name: _ctx.displayName(member) }),
                                                              disabled: _ctx.managementBusy,
                                                              onClick: $event => (_ctx.moderateGroup('mute', member))
                                                            }, _toDisplayString(_ctx.isMemberMuted(_ctx.managedGroup, member) ? _ctx.t('unmute') : _ctx.t('mute')), 9 /* TEXT, PROPS */, ["aria-label", "disabled", "onClick"]),
                                                            _createElementVNode("button", {
                                                              type: "button",
                                                              class: "gim-danger",
                                                              "aria-label": _ctx.t('removeNamedMember', { name: _ctx.displayName(member) }),
                                                              disabled: _ctx.managementBusy,
                                                              onClick: $event => {_ctx.managedMember = member; _ctx.openUtility('remove-member')}
                                                            }, _toDisplayString(_ctx.t('remove')), 9 /* TEXT, PROPS */, ["aria-label", "disabled", "onClick"])
                                                          ]))
                                                        : _createCommentVNode("v-if", true)
                                                    ]))
                                                  }), 128 /* KEYED_FRAGMENT */)),
                                                  (!_ctx.groupMembers[_ctx.managedGroupKey]?.length)
                                                    ? (_openBlock(), _createElementBlock("p", {
                                                        key: 0,
                                                        class: "gim-empty"
                                                      }, _toDisplayString(_ctx.t('noMembers')), 1 /* TEXT */))
                                                    : _createCommentVNode("v-if", true)
                                                ], 64 /* STABLE_FRAGMENT */))
                                      ]))
                                    : (_openBlock(), _createElementBlock("div", {
                                        key: 12,
                                        class: "gim-modal-list"
                                      }, [
                                        (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.activeMessages, (message, index) => {
                                          return (_openBlock(), _createElementBlock("div", {
                                            key: message.mid || index,
                                            class: _normalizeClass(["gim-history-row", { 'gim-blocked': _ctx.isBlockedMessage(message) }])
                                          }, [
                                            _createElementVNode("strong", null, _toDisplayString(message.mine ? _ctx.username : message.username || (_ctx.active && _ctx.displayName(_ctx.active))), 1 /* TEXT */),
                                            (_ctx.isBlockedMessage(message))
                                              ? (_openBlock(), _createElementBlock("span", {
                                                  key: 0,
                                                  class: "gim-blocked-label"
                                                }, _toDisplayString(_ctx.t('blockedUser')), 1 /* TEXT */))
                                              : _createCommentVNode("v-if", true),
                                            _createElementVNode("time", null, _toDisplayString(_ctx.timeLabel(message.timestamp)), 1 /* TEXT */),
                                            _createElementVNode("p", null, _toDisplayString(message.notice ? _ctx.chatNoticeText(message) : message.content), 1 /* TEXT */)
                                          ], 2 /* CLASS */))
                                        }), 128 /* KEYED_FRAGMENT */)),
                                        (!_ctx.activeMessages.length)
                                          ? (_openBlock(), _createElementBlock("p", {
                                              key: 0,
                                              class: "gim-empty"
                                            }, _toDisplayString(_ctx.t('noHistory')), 1 /* TEXT */))
                                          : _createCommentVNode("v-if", true)
                                      ]))
          ], 8 /* PROPS */, ["aria-label"])
        ], 8 /* PROPS */, ["onClick"]))
      : _createCommentVNode("v-if", true)
  ], 10 /* CLASS, PROPS */, ["lang"]))
}