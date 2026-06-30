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
//#region src/hooks/useControllable.ts
function m(e, n, i) {
	let [a, o] = r(n), s = e !== void 0;
	return [s ? e : a, t((e) => {
		s || o(e), i?.(e);
	}, [s, i])];
}
//#endregion
//#region src/hooks/useMergeRefs.ts
function h(...e) {
	return t((t) => {
		for (let n of e) n && (typeof n == "function" ? n(t) : "current" in n && (n.current = t));
	}, e);
}
//#endregion
//#region src/utils/isPromise.ts
function g(e) {
	return typeof e == "object" && !!e && "then" in e && typeof e.then == "function";
}
//#endregion
export { l as Button, p as Table, s as cn, g as isPromise, m as useControllable, h as useMergeRefs };

//# sourceMappingURL=index.js.map