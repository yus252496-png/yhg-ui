import { forwardRef as e, useCallback as t, useEffect as n, useMemo as r, useRef as i, useState as a } from "react";
import { Fragment as o, jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/utils/cn.ts
function l(...e) {
	return e.filter(Boolean).join(" ");
}
var u = {
	button: "_button_1qvw6_8",
	loading: "_loading_1qvw6_37",
	block: "_block_1qvw6_44",
	sm: "_sm_1qvw6_51",
	md: "_md_1qvw6_58",
	lg: "_lg_1qvw6_64",
	primary: "_primary_1qvw6_72",
	secondary: "_secondary_1qvw6_88",
	outline: "_outline_1qvw6_104",
	ghost: "_ghost_1qvw6_120",
	danger: "_danger_1qvw6_133",
	content: "_content_1qvw6_149",
	icon: "_icon_1qvw6_154",
	spinner: "_spinner_1qvw6_162",
	spin: "_spin_1qvw6_162"
}, d = e(function({ variant: e = "primary", size: t = "md", disabled: n = !1, loading: r = !1, block: i = !1, icon: a, children: o, className: d, onClick: f, ...p }, m) {
	return /* @__PURE__ */ c("button", {
		ref: m,
		className: l(u.button, u[e], u[t], i && u.block, r && u.loading, d),
		disabled: n || r,
		"aria-disabled": n || r,
		"aria-busy": r,
		onClick: (e) => {
			n || r || f?.(e);
		},
		...p,
		children: [r ? /* @__PURE__ */ s("span", {
			className: u.spinner,
			"aria-hidden": "true"
		}) : a && /* @__PURE__ */ s("span", {
			className: u.icon,
			children: a
		}), o && /* @__PURE__ */ s("span", {
			className: u.content,
			children: o
		})]
	});
}), f = {
	wrapper: "_wrapper_i6tic_6",
	tableContainer: "_tableContainer_i6tic_14",
	table: "_table_i6tic_14",
	th: "_th_i6tic_28",
	sortable: "_sortable_i6tic_42",
	thContent: "_thContent_i6tic_50",
	sortIcons: "_sortIcons_i6tic_58",
	sortArrow: "_sortArrow_i6tic_67",
	sortActive: "_sortActive_i6tic_73",
	tr: "_tr_i6tic_80",
	clickable: "_clickable_i6tic_93",
	td: "_td_i6tic_99",
	alignCenter: "_alignCenter_i6tic_107",
	alignRight: "_alignRight_i6tic_111",
	fixedLeft: "_fixedLeft_i6tic_117",
	fixedRight: "_fixedRight_i6tic_124",
	loadingCell: "_loadingCell_i6tic_133",
	loadingOverlay: "_loadingOverlay_i6tic_138",
	spinner: "_spinner_i6tic_147",
	spin: "_spin_i6tic_147",
	emptyCell: "_emptyCell_i6tic_163",
	paginationBar: "_paginationBar_i6tic_172",
	pagination: "_pagination_i6tic_172",
	pageBtn: "_pageBtn_i6tic_188",
	disabled: "_disabled_i6tic_205",
	active: "_active_i6tic_205",
	ellipsis: "_ellipsis_i6tic_221",
	pageInfo: "_pageInfo_i6tic_226"
};
//#endregion
//#region src/Table/Pagination.tsx
function p({ current: e, pageSize: t, total: n, onChange: r }) {
	let i = Math.ceil(n / t);
	if (i <= 1) return null;
	let a = [], u = Math.max(1, e - 2), d = Math.min(i, e + 2);
	for (let e = u; e <= d; e++) a.push(e);
	return /* @__PURE__ */ c("div", {
		className: f.pagination,
		children: [
			/* @__PURE__ */ s("button", {
				className: l(f.pageBtn, e <= 1 && f.disabled),
				disabled: e <= 1,
				onClick: () => r?.(e - 1, t),
				"aria-label": "上一页",
				children: "‹"
			}),
			u > 1 && /* @__PURE__ */ c(o, { children: [/* @__PURE__ */ s("button", {
				className: f.pageBtn,
				onClick: () => r?.(1, t),
				children: "1"
			}), u > 2 && /* @__PURE__ */ s("span", {
				className: f.ellipsis,
				children: "…"
			})] }),
			a.map((n) => /* @__PURE__ */ s("button", {
				className: l(f.pageBtn, n === e && f.active),
				onClick: () => r?.(n, t),
				children: n
			}, n)),
			d < i && /* @__PURE__ */ c(o, { children: [d < i - 1 && /* @__PURE__ */ s("span", {
				className: f.ellipsis,
				children: "…"
			}), /* @__PURE__ */ s("button", {
				className: f.pageBtn,
				onClick: () => r?.(i, t),
				children: i
			})] }),
			/* @__PURE__ */ s("button", {
				className: l(f.pageBtn, e >= i && f.disabled),
				disabled: e >= i,
				onClick: () => r?.(e + 1, t),
				"aria-label": "下一页",
				children: "›"
			}),
			/* @__PURE__ */ c("span", {
				className: f.pageInfo,
				children: [
					e,
					"/",
					i
				]
			})
		]
	});
}
//#endregion
//#region src/Table/Table.tsx
function m(e, t) {
	return typeof t == "function" ? t(e) : String(e[t]);
}
function h({ columns: e, dataSource: n, rowKey: i, loading: o = !1, pagination: u, emptyText: d = "暂无数据", onRow: h, className: g, style: _ }) {
	let [v, y] = a(null), [b, x] = a(null), S = t((e) => {
		e.sortable && (v === e.key ? x((e) => e === "asc" ? "desc" : e === "desc" ? null : "asc") : (y(e.key), x("asc")));
	}, [v]), C = r(() => {
		if (!v || !b) return n;
		let t = e.find((e) => e.key === v);
		return t ? [...n].sort((e, n) => {
			let r = t.sorter;
			if (r) return b === "asc" ? r(e, n) : r(n, e);
			let i = t.dataIndex ? e[t.dataIndex] : void 0, a = t.dataIndex ? n[t.dataIndex] : void 0;
			return i == null ? 1 : a == null ? -1 : typeof i == "number" && typeof a == "number" ? b === "asc" ? i - a : a - i : b === "asc" ? String(i).localeCompare(String(a)) : String(a).localeCompare(String(i));
		}) : n;
	}, [
		n,
		v,
		b,
		e
	]), w = u?.pageSize ?? 0, T = u?.current ?? 1, E = w > 0 ? C.slice((T - 1) * w, T * w) : C, D = u?.total ?? C.length, O = (e) => {
		if (!e.sortable) return null;
		let t = v === e.key;
		return /* @__PURE__ */ c("span", {
			className: f.sortIcons,
			children: [/* @__PURE__ */ s("span", {
				className: l(f.sortArrow, f.sortUp, t && b === "asc" && f.sortActive),
				children: "▲"
			}), /* @__PURE__ */ s("span", {
				className: l(f.sortArrow, f.sortDown, t && b === "desc" && f.sortActive),
				children: "▼"
			})]
		});
	};
	return /* @__PURE__ */ c("div", {
		className: l(f.wrapper, g),
		style: _,
		children: [/* @__PURE__ */ s("div", {
			className: f.tableContainer,
			children: /* @__PURE__ */ c("table", {
				className: f.table,
				children: [/* @__PURE__ */ s("thead", { children: /* @__PURE__ */ s("tr", { children: e.map((e) => /* @__PURE__ */ s("th", {
					className: l(f.th, e.sortable && f.sortable, e.align && f[`align${e.align.charAt(0).toUpperCase() + e.align.slice(1)}`], e.fixed === "left" && f.fixedLeft, e.fixed === "right" && f.fixedRight),
					style: { width: e.width },
					onClick: () => S(e),
					"aria-sort": v === e.key ? b === "asc" ? "ascending" : b === "desc" ? "descending" : "none" : void 0,
					children: /* @__PURE__ */ c("span", {
						className: f.thContent,
						children: [e.title, O(e)]
					})
				}, e.key)) }) }), /* @__PURE__ */ s("tbody", { children: o ? /* @__PURE__ */ s("tr", { children: /* @__PURE__ */ s("td", {
					colSpan: e.length,
					className: f.loadingCell,
					children: /* @__PURE__ */ c("div", {
						className: f.loadingOverlay,
						children: [/* @__PURE__ */ s("span", { className: f.spinner }), /* @__PURE__ */ s("span", { children: "加载中..." })]
					})
				}) }) : E.length === 0 ? /* @__PURE__ */ s("tr", { children: /* @__PURE__ */ s("td", {
					colSpan: e.length,
					className: f.emptyCell,
					children: d
				}) }) : E.map((t, n) => {
					let r = m(t, i), a = h?.(t);
					return /* @__PURE__ */ s("tr", {
						className: l(f.tr, a?.onClick && f.clickable),
						onClick: a?.onClick,
						children: e.map((e) => {
							let r = e.dataIndex ? t[e.dataIndex] : void 0, i = e.render ? e.render(r, t, n) : r;
							return /* @__PURE__ */ s("td", {
								className: l(f.td, e.align && f[`align${e.align.charAt(0).toUpperCase() + e.align.slice(1)}`], e.fixed === "left" && f.fixedLeft, e.fixed === "right" && f.fixedRight),
								children: i ?? "—"
							}, e.key);
						})
					}, r);
				}) })]
			})
		}), u && !o && D > 0 && /* @__PURE__ */ s("div", {
			className: f.paginationBar,
			children: /* @__PURE__ */ s(p, {
				current: T,
				pageSize: w,
				total: D,
				onChange: u.onChange
			})
		})]
	});
}
//#endregion
//#region src/Form/validator.ts
function g(e, t) {
	let n = t[e.name], r = e.rules ?? [];
	if (e.required && (n == null || n === "")) return {
		name: e.name,
		message: `${e.label}不能为空`
	};
	for (let t of r) {
		let r = _(t, n, e.label);
		if (r) return {
			name: e.name,
			message: r
		};
	}
	return null;
}
function _(e, t, n) {
	if (e.required && (t == null || t === "")) return e.message || `${n}不能为空`;
	if (e.min !== void 0 && typeof t == "number" && t < e.min) return e.message || `${n}不能小于${e.min}`;
	if (e.max !== void 0 && typeof t == "number" && t > e.max) return e.message || `${n}不能大于${e.max}`;
	if (e.pattern && typeof t == "string" && !e.pattern.test(t)) return e.message || `${n}格式不正确`;
	if (e.validator && t !== void 0) {
		let r = e.validator(t);
		if (typeof r == "boolean" && !r) return e.message || `${n}验证失败`;
	}
	return null;
}
var v = {
	form: "_form_1bsiv_5",
	horizontal: "_horizontal_1bsiv_13",
	field: "_field_1bsiv_13",
	label: "_label_1bsiv_20",
	control: "_control_1bsiv_27",
	vertical: "_vertical_1bsiv_33",
	inline: "_inline_1bsiv_48",
	required: "_required_1bsiv_78",
	input: "_input_1bsiv_85",
	inputError: "_inputError_1bsiv_111",
	textarea: "_textarea_1bsiv_144",
	switch: "_switch_1bsiv_153",
	switchInput: "_switchInput_1bsiv_159",
	switchTrack: "_switchTrack_1bsiv_166",
	switchThumb: "_switchThumb_1bsiv_179",
	error: "_error_1bsiv_196",
	actions: "_actions_1bsiv_205",
	submitBtn: "_submitBtn_1bsiv_216",
	resetBtn: "_resetBtn_1bsiv_217"
};
//#endregion
//#region src/Form/FieldRenderer.tsx
function y({ field: e, value: t, onChange: n, onBlur: r, hasError: i }) {
	let a = e.name;
	if (e.component) return /* @__PURE__ */ s(o, { children: e.component });
	let l = `${v.input} ${i ? v.inputError : ""}`.trim();
	switch (e.type) {
		case "text": return /* @__PURE__ */ s("input", {
			id: a,
			className: l,
			type: "text",
			value: t ?? "",
			placeholder: e.placeholder,
			onChange: (e) => n(e.target.value),
			onBlur: r
		});
		case "number": return /* @__PURE__ */ s("input", {
			id: a,
			className: l,
			type: "number",
			value: t ?? "",
			placeholder: e.placeholder,
			onChange: (e) => n(e.target.value === "" ? "" : Number(e.target.value)),
			onBlur: r
		});
		case "select": return /* @__PURE__ */ c("select", {
			id: a,
			className: l,
			value: t ?? "",
			onChange: (e) => n(e.target.value),
			onBlur: r,
			children: [/* @__PURE__ */ s("option", {
				value: "",
				disabled: !0,
				children: e.placeholder ?? "请选择"
			}), e.options?.map((e) => /* @__PURE__ */ s("option", {
				value: e.value,
				children: e.label
			}, e.value))]
		});
		case "switch": {
			let e = !!t;
			return /* @__PURE__ */ c("label", {
				className: v.switch,
				children: [/* @__PURE__ */ s("input", {
					id: a,
					type: "checkbox",
					checked: e,
					onChange: (e) => n(e.target.checked),
					onBlur: r,
					className: v.switchInput
				}), /* @__PURE__ */ s("span", {
					className: v.switchTrack,
					children: /* @__PURE__ */ s("span", { className: v.switchThumb })
				})]
			});
		}
		case "textarea": return /* @__PURE__ */ s("textarea", {
			id: a,
			className: `${l} ${v.textarea}`,
			value: t ?? "",
			placeholder: e.placeholder,
			onChange: (e) => n(e.target.value),
			onBlur: r,
			rows: 3
		});
		default: return /* @__PURE__ */ s("input", {
			id: a,
			className: l,
			type: "text",
			value: t ?? "",
			onChange: (e) => n(e.target.value),
			onBlur: r
		});
	}
}
//#endregion
//#region src/Form/Form.tsx
function b({ fields: e, layout: n = "horizontal", initialValues: i, onSubmit: o, onReset: u, submitText: d = "提交", resetText: f = "重置", className: p, style: m }) {
	let [h, _] = a(i ?? {}), [b, x] = a([]), [S, C] = a(/* @__PURE__ */ new Set()), w = r(() => {
		let e = /* @__PURE__ */ new Map();
		for (let t of b) e.set(t.name, t.message);
		return e;
	}, [b]), T = t((t, n) => {
		_((e) => ({
			...e,
			[t]: n
		})), C((r) => (r.has(t) && x((r) => {
			let i = e.find((e) => e.name === t);
			if (!i) return r;
			let a = r.filter((e) => e.name !== t), o = g(i, {
				...h,
				[t]: n
			});
			return o ? [...a, o] : a;
		}), r));
	}, [e, h]), E = t((t) => {
		C((e) => {
			if (e.has(t)) return e;
			let n = new Set(e);
			return n.add(t), n;
		});
		let n = e.find((e) => e.name === t);
		n && x((e) => {
			let r = e.filter((e) => e.name !== t), i = g(n, h);
			return i ? [...r, i] : r;
		});
	}, [e, h]), D = t(async () => {
		let t = [];
		for (let n of e) {
			let e = g(n, h);
			e && t.push(e);
		}
		for (let n of e) {
			let e = n.rules?.find((e) => e.validator);
			e?.validator && (await e.validator(h[n.name]) || t.push({
				name: n.name,
				message: e.message
			}));
		}
		return x(t), C(new Set(e.map((e) => e.name))), t.length === 0;
	}, [e, h]), O = t(async (e) => {
		e.preventDefault(), await D() && o?.(h);
	}, [
		D,
		o,
		h
	]), k = t(() => {
		_(i ?? {}), x([]), C(/* @__PURE__ */ new Set()), u?.();
	}, [i, u]);
	return /* @__PURE__ */ c("form", {
		className: l(v.form, v[n], p),
		style: m,
		onSubmit: O,
		onReset: k,
		noValidate: !0,
		children: [e.map((e) => /* @__PURE__ */ c("div", {
			className: l(v.field, e.required && v.isRequired),
			children: [/* @__PURE__ */ c("label", {
				className: v.label,
				htmlFor: e.name,
				children: [e.label, e.required && /* @__PURE__ */ s("span", {
					className: v.required,
					children: "*"
				})]
			}), /* @__PURE__ */ c("div", {
				className: v.control,
				children: [/* @__PURE__ */ s(y, {
					field: e,
					value: h[e.name],
					onChange: (t) => T(e.name, t),
					onBlur: () => E(e.name),
					hasError: S.has(e.name) && w.has(e.name)
				}), S.has(e.name) && w.has(e.name) && /* @__PURE__ */ s("div", {
					className: v.error,
					children: w.get(e.name)
				})]
			})]
		}, e.name)), /* @__PURE__ */ c("div", {
			className: v.actions,
			children: [/* @__PURE__ */ s("button", {
				type: "submit",
				className: v.submitBtn,
				children: d
			}), /* @__PURE__ */ s("button", {
				type: "reset",
				className: v.resetBtn,
				children: f
			})]
		})]
	});
}
var x = {
	message: "_message_mtqim_1",
	user: "_user_mtqim_8",
	assistant: "_assistant_mtqim_13",
	avatar: "_avatar_mtqim_17",
	bubble: "_bubble_mtqim_29",
	role: "_role_mtqim_42",
	content: "_content_mtqim_48",
	cursor: "_cursor_mtqim_58",
	blink: "_blink_mtqim_1",
	errorMsg: "_errorMsg_mtqim_74"
};
//#endregion
//#region src/ChatMessage/ChatMessage.tsx
function S({ role: e, content: t, streaming: n = !1, error: r = !1, className: i }) {
	return /* @__PURE__ */ c("div", {
		className: l(x.message, e === "user" ? x.user : x.assistant, r && x.errorMsg, i),
		children: [/* @__PURE__ */ s("div", {
			className: x.avatar,
			children: e === "user" ? "👤" : "🤖"
		}), /* @__PURE__ */ c("div", {
			className: x.bubble,
			children: [/* @__PURE__ */ s("div", {
				className: x.role,
				children: e === "user" ? "你" : "AI"
			}), /* @__PURE__ */ c("div", {
				className: x.content,
				children: [t || (n ? "" : "..."), n && /* @__PURE__ */ s("span", { className: x.cursor })]
			})]
		})]
	});
}
var C = {
	wrapper: "_wrapper_5qv60_1",
	textarea: "_textarea_5qv60_10",
	sendBtn: "_sendBtn_5qv60_40"
};
//#endregion
//#region src/ChatInput/ChatInput.tsx
function w({ onSend: e, disabled: n = !1, placeholder: r = "输入消息...", maxLength: o = 2e3, className: u }) {
	let [d, f] = a(""), p = i(null), m = t(() => {
		let t = d.trim();
		!t || n || (e(t), f(""), p.current && (p.current.style.height = "auto"));
	}, [
		d,
		n,
		e
	]), h = t((e) => {
		e.key === "Enter" && !e.shiftKey && (e.preventDefault(), m());
	}, [m]), g = t((e) => {
		let t = e.target.value;
		t.length <= o && f(t);
		let n = e.target;
		n.style.height = "auto", n.style.height = `${Math.min(n.scrollHeight, 120)}px`;
	}, [o]);
	return /* @__PURE__ */ c("div", {
		className: l(C.wrapper, u),
		children: [/* @__PURE__ */ s("textarea", {
			ref: p,
			className: C.textarea,
			value: d,
			onChange: g,
			onKeyDown: h,
			placeholder: r,
			disabled: n,
			rows: 1,
			maxLength: o,
			"aria-label": "输入消息"
		}), /* @__PURE__ */ s("button", {
			className: C.sendBtn,
			onClick: m,
			disabled: n || !d.trim(),
			"aria-label": "发送",
			children: "↑"
		})]
	});
}
//#endregion
//#region src/hooks/useStreamChat.ts
var T = (e) => {
	if (!e.startsWith("data: ")) return null;
	let t = e.slice(6);
	if (t === "[DONE]") return null;
	try {
		return JSON.parse(t).choices?.[0]?.delta?.content || null;
	} catch {
		return null;
	}
}, E = (e) => ({
	model: "deepseek-v4-flash",
	messages: e.map((e) => ({
		role: e.role,
		content: e.content
	})),
	stream: !0
});
function D(e = {}) {
	let { url: n = "https://api.deepseek.com/chat/completions", headers: r, parseChunk: o = T, buildBody: s = E, doneToken: c = "[DONE]", onError: l, fetch: u } = e, [d, f] = a([]), [p, m] = a(!1), [h, g] = a(null), _ = i(null);
	return {
		messages: d,
		loading: p,
		error: h,
		send: t(async (e) => {
			if (!e.trim() || p) return;
			g(null), m(!0);
			let t = {
				id: `msg-${Date.now()}`,
				role: "user",
				content: e.trim(),
				timestamp: Date.now()
			}, i = `msg-${Date.now() + 1}`, a = {
				id: i,
				role: "assistant",
				content: "",
				timestamp: Date.now()
			};
			f((e) => [
				...e,
				t,
				a
			]);
			let h = new AbortController();
			_.current = h;
			try {
				let e = [...d, t], a = s(e), l;
				if (l = u ? await u(e) : await fetch(n, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						...r
					},
					body: JSON.stringify(a),
					signal: h.signal
				}), !l.ok) {
					let e = await l.text().catch(() => "Unknown error");
					throw Error(`API ${l.status}: ${e}`);
				}
				let p = l.body?.getReader();
				if (!p) throw Error("Response body is not readable");
				let g = new TextDecoder(), _ = "", v = "";
				for (;;) {
					let { done: e, value: t } = await p.read();
					if (e) break;
					_ += g.decode(t, { stream: !0 });
					let n = _.split("\n");
					_ = n.pop() || "";
					for (let e of n) {
						let t = e.trim();
						if (!t || t === `data: ${c}`) continue;
						let n = o(t);
						n && (v += n, f((e) => e.map((e) => e.id === i ? {
							...e,
							content: v
						} : e)));
					}
				}
				m(!1);
			} catch (e) {
				if (e instanceof DOMException && e.name === "AbortError") {
					m(!1);
					return;
				}
				let t = e instanceof Error ? e.message : "请求失败";
				g(t), m(!1), l?.(e instanceof Error ? e : Error(t));
			}
		}, [
			n,
			r,
			o,
			s,
			c,
			l,
			p,
			d,
			u
		]),
		abort: t(() => {
			_.current?.abort(), _.current = null, m(!1);
		}, []),
		clear: t(() => {
			f([]), g(null);
		}, []),
		removeMessage: t((e) => {
			f((t) => t.filter((t) => t.id !== e));
		}, [])
	};
}
var O = {
	chat: "_chat_12jn0_1",
	header: "_header_12jn0_15",
	title: "_title_12jn0_23",
	clearBtn: "_clearBtn_12jn0_29",
	list: "_list_12jn0_47",
	empty: "_empty_12jn0_58",
	emptyIcon: "_emptyIcon_12jn0_67",
	emptyText: "_emptyText_12jn0_72",
	errorBar: "_errorBar_12jn0_78",
	inputArea: "_inputArea_12jn0_90",
	stopBar: "_stopBar_12jn0_94",
	stopBtn: "_stopBtn_12jn0_105"
};
//#endregion
//#region src/Chat/Chat.tsx
function k({ options: e, initialMessages: t, placeholder: r, className: a, style: o }) {
	let { messages: u, loading: d, error: f, send: p, abort: m, clear: h } = D(e), g = i(null), _ = i(!1);
	n(() => {
		t && !_.current && (_.current = !0);
	}, [t]), n(() => {
		g.current && (g.current.scrollTop = g.current.scrollHeight);
	}, [u]);
	let v = t && !_.current ? t.map((e, t) => ({
		id: `init-${t}`,
		role: e.role,
		content: e.content,
		timestamp: Date.now() + t
	})) : u;
	return /* @__PURE__ */ c("div", {
		className: l(O.chat, a),
		style: o,
		children: [
			/* @__PURE__ */ c("div", {
				className: O.header,
				children: [/* @__PURE__ */ s("span", {
					className: O.title,
					children: "AI 对话"
				}), v.length > 0 && /* @__PURE__ */ s("button", {
					className: O.clearBtn,
					onClick: h,
					"aria-label": "清空对话",
					children: "清空"
				})]
			}),
			/* @__PURE__ */ c("div", {
				ref: g,
				className: O.list,
				children: [v.length === 0 ? /* @__PURE__ */ c("div", {
					className: O.empty,
					children: [/* @__PURE__ */ s("div", {
						className: O.emptyIcon,
						children: "🤖"
					}), /* @__PURE__ */ s("div", {
						className: O.emptyText,
						children: "输入消息开始对话"
					})]
				}) : v.map((e, t) => {
					let n = t === v.length - 1 && e.role === "assistant";
					return /* @__PURE__ */ s(S, {
						role: e.role,
						content: e.content,
						streaming: n && d,
						error: n && !!f
					}, e.id);
				}), f && /* @__PURE__ */ s("div", {
					className: O.errorBar,
					children: f
				})]
			}),
			/* @__PURE__ */ c("div", {
				className: O.inputArea,
				children: [d && /* @__PURE__ */ c("div", {
					className: O.stopBar,
					children: [/* @__PURE__ */ s("span", { children: "AI 正在回复..." }), /* @__PURE__ */ s("button", {
						className: O.stopBtn,
						onClick: m,
						children: "中止"
					})]
				}), /* @__PURE__ */ s(w, {
					onSend: p,
					disabled: d,
					placeholder: r
				})]
			})
		]
	});
}
//#endregion
//#region src/hooks/useControllable.ts
function A(e, n, r) {
	let [i, o] = a(n), s = e !== void 0;
	return [s ? e : i, t((e) => {
		s || o(e), r?.(e);
	}, [s, r])];
}
//#endregion
//#region src/hooks/useMergeRefs.ts
function j(...e) {
	return t((t) => {
		for (let n of e) n && (typeof n == "function" ? n(t) : "current" in n && (n.current = t));
	}, e);
}
//#endregion
//#region src/utils/isPromise.ts
function M(e) {
	return typeof e == "object" && !!e && "then" in e && typeof e.then == "function";
}
//#endregion
export { d as Button, k as Chat, w as ChatInput, S as ChatMessage, b as Form, h as Table, l as cn, M as isPromise, A as useControllable, j as useMergeRefs, D as useStreamChat };

//# sourceMappingURL=index.js.map