import { forwardRef as e, useCallback as t, useMemo as n, useState as r } from "react";
import { Fragment as i, jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/utils/cn.ts
function s(...e) {
	return e.filter(Boolean).join(" ");
}
var c = {
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
}, l = e(function({ variant: e = "primary", size: t = "md", disabled: n = !1, loading: r = !1, block: i = !1, icon: l, children: u, className: d, onClick: f, ...p }, m) {
	return /* @__PURE__ */ o("button", {
		ref: m,
		className: s(c.button, c[e], c[t], i && c.block, r && c.loading, d),
		disabled: n || r,
		"aria-disabled": n || r,
		"aria-busy": r,
		onClick: (e) => {
			n || r || f?.(e);
		},
		...p,
		children: [r ? /* @__PURE__ */ a("span", {
			className: c.spinner,
			"aria-hidden": "true"
		}) : l && /* @__PURE__ */ a("span", {
			className: c.icon,
			children: l
		}), u && /* @__PURE__ */ a("span", {
			className: c.content,
			children: u
		})]
	});
}), u = {
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
function d({ current: e, pageSize: t, total: n, onChange: r }) {
	let c = Math.ceil(n / t);
	if (c <= 1) return null;
	let l = [], d = Math.max(1, e - 2), f = Math.min(c, e + 2);
	for (let e = d; e <= f; e++) l.push(e);
	return /* @__PURE__ */ o("div", {
		className: u.pagination,
		children: [
			/* @__PURE__ */ a("button", {
				className: s(u.pageBtn, e <= 1 && u.disabled),
				disabled: e <= 1,
				onClick: () => r?.(e - 1, t),
				"aria-label": "上一页",
				children: "‹"
			}),
			d > 1 && /* @__PURE__ */ o(i, { children: [/* @__PURE__ */ a("button", {
				className: u.pageBtn,
				onClick: () => r?.(1, t),
				children: "1"
			}), d > 2 && /* @__PURE__ */ a("span", {
				className: u.ellipsis,
				children: "…"
			})] }),
			l.map((n) => /* @__PURE__ */ a("button", {
				className: s(u.pageBtn, n === e && u.active),
				onClick: () => r?.(n, t),
				children: n
			}, n)),
			f < c && /* @__PURE__ */ o(i, { children: [f < c - 1 && /* @__PURE__ */ a("span", {
				className: u.ellipsis,
				children: "…"
			}), /* @__PURE__ */ a("button", {
				className: u.pageBtn,
				onClick: () => r?.(c, t),
				children: c
			})] }),
			/* @__PURE__ */ a("button", {
				className: s(u.pageBtn, e >= c && u.disabled),
				disabled: e >= c,
				onClick: () => r?.(e + 1, t),
				"aria-label": "下一页",
				children: "›"
			}),
			/* @__PURE__ */ o("span", {
				className: u.pageInfo,
				children: [
					e,
					"/",
					c
				]
			})
		]
	});
}
//#endregion
//#region src/Table/Table.tsx
function f(e, t) {
	return typeof t == "function" ? t(e) : String(e[t]);
}
function p({ columns: e, dataSource: i, rowKey: c, loading: l = !1, pagination: p, emptyText: m = "暂无数据", onRow: h, className: g, style: _ }) {
	let [v, y] = r(null), [b, x] = r(null), S = t((e) => {
		e.sortable && (v === e.key ? x((e) => e === "asc" ? "desc" : e === "desc" ? null : "asc") : (y(e.key), x("asc")));
	}, [v]), C = n(() => {
		if (!v || !b) return i;
		let t = e.find((e) => e.key === v);
		return t ? [...i].sort((e, n) => {
			let r = t.sorter;
			if (r) return b === "asc" ? r(e, n) : r(n, e);
			let i = t.dataIndex ? e[t.dataIndex] : void 0, a = t.dataIndex ? n[t.dataIndex] : void 0;
			return i == null ? 1 : a == null ? -1 : typeof i == "number" && typeof a == "number" ? b === "asc" ? i - a : a - i : b === "asc" ? String(i).localeCompare(String(a)) : String(a).localeCompare(String(i));
		}) : i;
	}, [
		i,
		v,
		b,
		e
	]), w = p?.pageSize ?? 0, T = p?.current ?? 1, E = w > 0 ? C.slice((T - 1) * w, T * w) : C, D = p?.total ?? C.length, O = (e) => {
		if (!e.sortable) return null;
		let t = v === e.key;
		return /* @__PURE__ */ o("span", {
			className: u.sortIcons,
			children: [/* @__PURE__ */ a("span", {
				className: s(u.sortArrow, u.sortUp, t && b === "asc" && u.sortActive),
				children: "▲"
			}), /* @__PURE__ */ a("span", {
				className: s(u.sortArrow, u.sortDown, t && b === "desc" && u.sortActive),
				children: "▼"
			})]
		});
	};
	return /* @__PURE__ */ o("div", {
		className: s(u.wrapper, g),
		style: _,
		children: [/* @__PURE__ */ a("div", {
			className: u.tableContainer,
			children: /* @__PURE__ */ o("table", {
				className: u.table,
				children: [/* @__PURE__ */ a("thead", { children: /* @__PURE__ */ a("tr", { children: e.map((e) => /* @__PURE__ */ a("th", {
					className: s(u.th, e.sortable && u.sortable, e.align && u[`align${e.align.charAt(0).toUpperCase() + e.align.slice(1)}`], e.fixed === "left" && u.fixedLeft, e.fixed === "right" && u.fixedRight),
					style: { width: e.width },
					onClick: () => S(e),
					"aria-sort": v === e.key ? b === "asc" ? "ascending" : b === "desc" ? "descending" : "none" : void 0,
					children: /* @__PURE__ */ o("span", {
						className: u.thContent,
						children: [e.title, O(e)]
					})
				}, e.key)) }) }), /* @__PURE__ */ a("tbody", { children: l ? /* @__PURE__ */ a("tr", { children: /* @__PURE__ */ a("td", {
					colSpan: e.length,
					className: u.loadingCell,
					children: /* @__PURE__ */ o("div", {
						className: u.loadingOverlay,
						children: [/* @__PURE__ */ a("span", { className: u.spinner }), /* @__PURE__ */ a("span", { children: "加载中..." })]
					})
				}) }) : E.length === 0 ? /* @__PURE__ */ a("tr", { children: /* @__PURE__ */ a("td", {
					colSpan: e.length,
					className: u.emptyCell,
					children: m
				}) }) : E.map((t, n) => {
					let r = f(t, c), i = h?.(t);
					return /* @__PURE__ */ a("tr", {
						className: s(u.tr, i?.onClick && u.clickable),
						onClick: i?.onClick,
						children: e.map((e) => {
							let r = e.dataIndex ? t[e.dataIndex] : void 0, i = e.render ? e.render(r, t, n) : r;
							return /* @__PURE__ */ a("td", {
								className: s(u.td, e.align && u[`align${e.align.charAt(0).toUpperCase() + e.align.slice(1)}`], e.fixed === "left" && u.fixedLeft, e.fixed === "right" && u.fixedRight),
								children: i ?? "—"
							}, e.key);
						})
					}, r);
				}) })]
			})
		}), p && !l && D > 0 && /* @__PURE__ */ a("div", {
			className: u.paginationBar,
			children: /* @__PURE__ */ a(d, {
				current: T,
				pageSize: w,
				total: D,
				onChange: p.onChange
			})
		})]
	});
}
//#endregion
//#region src/Form/validator.ts
function m(e, t) {
	let n = t[e.name], r = e.rules ?? [];
	if (e.required && (n == null || n === "")) return {
		name: e.name,
		message: `${e.label}不能为空`
	};
	for (let t of r) {
		let r = h(t, n, e.label);
		if (r) return {
			name: e.name,
			message: r
		};
	}
	return null;
}
function h(e, t, n) {
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
var g = {
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
function _({ field: e, value: t, onChange: n, onBlur: r, hasError: s }) {
	let c = e.name;
	if (e.component) return /* @__PURE__ */ a(i, { children: e.component });
	let l = `${g.input} ${s ? g.inputError : ""}`.trim();
	switch (e.type) {
		case "text": return /* @__PURE__ */ a("input", {
			id: c,
			className: l,
			type: "text",
			value: t ?? "",
			placeholder: e.placeholder,
			onChange: (e) => n(e.target.value),
			onBlur: r
		});
		case "number": return /* @__PURE__ */ a("input", {
			id: c,
			className: l,
			type: "number",
			value: t ?? "",
			placeholder: e.placeholder,
			onChange: (e) => n(e.target.value === "" ? "" : Number(e.target.value)),
			onBlur: r
		});
		case "select": return /* @__PURE__ */ o("select", {
			id: c,
			className: l,
			value: t ?? "",
			onChange: (e) => n(e.target.value),
			onBlur: r,
			children: [/* @__PURE__ */ a("option", {
				value: "",
				disabled: !0,
				children: e.placeholder ?? "请选择"
			}), e.options?.map((e) => /* @__PURE__ */ a("option", {
				value: e.value,
				children: e.label
			}, e.value))]
		});
		case "switch": {
			let e = !!t;
			return /* @__PURE__ */ o("label", {
				className: g.switch,
				children: [/* @__PURE__ */ a("input", {
					id: c,
					type: "checkbox",
					checked: e,
					onChange: (e) => n(e.target.checked),
					onBlur: r,
					className: g.switchInput
				}), /* @__PURE__ */ a("span", {
					className: g.switchTrack,
					children: /* @__PURE__ */ a("span", { className: g.switchThumb })
				})]
			});
		}
		case "textarea": return /* @__PURE__ */ a("textarea", {
			id: c,
			className: `${l} ${g.textarea}`,
			value: t ?? "",
			placeholder: e.placeholder,
			onChange: (e) => n(e.target.value),
			onBlur: r,
			rows: 3
		});
		default: return /* @__PURE__ */ a("input", {
			id: c,
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
function v({ fields: e, layout: i = "horizontal", initialValues: c, onSubmit: l, onReset: u, submitText: d = "提交", resetText: f = "重置", className: p, style: h }) {
	let [v, y] = r(c ?? {}), [b, x] = r([]), [S, C] = r(/* @__PURE__ */ new Set()), w = n(() => {
		let e = /* @__PURE__ */ new Map();
		for (let t of b) e.set(t.name, t.message);
		return e;
	}, [b]), T = t((t, n) => {
		y((e) => ({
			...e,
			[t]: n
		})), C((r) => (r.has(t) && x((r) => {
			let i = e.find((e) => e.name === t);
			if (!i) return r;
			let a = r.filter((e) => e.name !== t), o = m(i, {
				...v,
				[t]: n
			});
			return o ? [...a, o] : a;
		}), r));
	}, [e, v]), E = t((t) => {
		C((e) => {
			if (e.has(t)) return e;
			let n = new Set(e);
			return n.add(t), n;
		});
		let n = e.find((e) => e.name === t);
		n && x((e) => {
			let r = e.filter((e) => e.name !== t), i = m(n, v);
			return i ? [...r, i] : r;
		});
	}, [e, v]), D = t(async () => {
		let t = [];
		for (let n of e) {
			let e = m(n, v);
			e && t.push(e);
		}
		for (let n of e) {
			let e = n.rules?.find((e) => e.validator);
			e?.validator && (await e.validator(v[n.name]) || t.push({
				name: n.name,
				message: e.message
			}));
		}
		return x(t), C(new Set(e.map((e) => e.name))), t.length === 0;
	}, [e, v]), O = t(async (e) => {
		e.preventDefault(), await D() && l?.(v);
	}, [
		D,
		l,
		v
	]), k = t(() => {
		y(c ?? {}), x([]), C(/* @__PURE__ */ new Set()), u?.();
	}, [c, u]);
	return /* @__PURE__ */ o("form", {
		className: s(g.form, g[i], p),
		style: h,
		onSubmit: O,
		onReset: k,
		noValidate: !0,
		children: [e.map((e) => /* @__PURE__ */ o("div", {
			className: s(g.field, e.required && g.isRequired),
			children: [/* @__PURE__ */ o("label", {
				className: g.label,
				htmlFor: e.name,
				children: [e.label, e.required && /* @__PURE__ */ a("span", {
					className: g.required,
					children: "*"
				})]
			}), /* @__PURE__ */ o("div", {
				className: g.control,
				children: [/* @__PURE__ */ a(_, {
					field: e,
					value: v[e.name],
					onChange: (t) => T(e.name, t),
					onBlur: () => E(e.name),
					hasError: S.has(e.name) && w.has(e.name)
				}), S.has(e.name) && w.has(e.name) && /* @__PURE__ */ a("div", {
					className: g.error,
					children: w.get(e.name)
				})]
			})]
		}, e.name)), /* @__PURE__ */ o("div", {
			className: g.actions,
			children: [/* @__PURE__ */ a("button", {
				type: "submit",
				className: g.submitBtn,
				children: d
			}), /* @__PURE__ */ a("button", {
				type: "reset",
				className: g.resetBtn,
				children: f
			})]
		})]
	});
}
//#endregion
//#region src/hooks/useControllable.ts
function y(e, n, i) {
	let [a, o] = r(n), s = e !== void 0;
	return [s ? e : a, t((e) => {
		s || o(e), i?.(e);
	}, [s, i])];
}
//#endregion
//#region src/hooks/useMergeRefs.ts
function b(...e) {
	return t((t) => {
		for (let n of e) n && (typeof n == "function" ? n(t) : "current" in n && (n.current = t));
	}, e);
}
//#endregion
//#region src/utils/isPromise.ts
function x(e) {
	return typeof e == "object" && !!e && "then" in e && typeof e.then == "function";
}
//#endregion
export { l as Button, v as Form, p as Table, s as cn, x as isPromise, y as useControllable, b as useMergeRefs };

//# sourceMappingURL=index.js.map