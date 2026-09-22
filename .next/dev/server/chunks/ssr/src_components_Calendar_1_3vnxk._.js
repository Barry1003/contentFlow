module.exports = [
"[project]/src/components/Calendar/CalendarFiltersBar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CalendarFiltersBar",
    ()=>CalendarFiltersBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/funnel.js [app-ssr] (ecmascript) <export default as Filter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-ssr] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AppContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils.ts [app-ssr] (ecmascript)");
;
;
;
;
;
const CalendarFiltersBar = ()=>{
    const { filters, setFilters, settings, overduePosts } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useApp"])();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const activeFilterCount = (filters.search ? 1 : 0) + filters.platforms.length + filters.statuses.length + filters.pillars.length + filters.formats.length + (filters.onlyOverdue ? 1 : 0);
    const clearAllFilters = ()=>{
        setFilters({
            search: '',
            platforms: [],
            statuses: [],
            pillars: [],
            formats: [],
            onlyOverdue: false
        });
    };
    const togglePlatform = (id)=>{
        setFilters((prev)=>({
                ...prev,
                platforms: prev.platforms.includes(id) ? prev.platforms.filter((p)=>p !== id) : [
                    ...prev.platforms,
                    id
                ]
            }));
    };
    const toggleStatus = (st)=>{
        setFilters((prev)=>({
                ...prev,
                statuses: prev.statuses.includes(st) ? prev.statuses.filter((s)=>s !== st) : [
                    ...prev.statuses,
                    st
                ]
            }));
    };
    const togglePillar = (id)=>{
        setFilters((prev)=>({
                ...prev,
                pillars: prev.pillars.includes(id) ? prev.pillars.filter((p)=>p !== id) : [
                    ...prev.pillars,
                    id
                ]
            }));
    };
    const toggleFormat = (fmt)=>{
        setFilters((prev)=>({
                ...prev,
                formats: prev.formats.includes(fmt) ? prev.formats.filter((f)=>f !== fmt) : [
                    ...prev.formats,
                    fmt
                ]
            }));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full bg-[#FFFFFF] dark:bg-[#232321] border-b border-[#E9E7E2] dark:border-[#323230] px-4 py-2 transition-colors",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center justify-between gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative flex-1 min-w-[180px] max-w-xs",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                className: "w-3.5 h-3.5 stroke-[1.5] absolute left-2.5 top-1/2 -translate-y-1/2 text-[#6F6C66] dark:text-[#9A978F]"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Calendar/CalendarFiltersBar.tsx",
                                lineNumber: 71,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                id: "calendar-search-input",
                                type: "text",
                                placeholder: "Search posts...",
                                value: filters.search,
                                onChange: (e)=>setFilters((prev)=>({
                                            ...prev,
                                            search: e.target.value
                                        })),
                                className: "w-full h-7 pl-8 pr-7 text-xs bg-[#F7F6F3] dark:bg-[#1C1C1A] border border-[#E9E7E2] dark:border-[#323230] rounded-[4px] text-[#2A2925] dark:text-[#D9D7D1] placeholder-[#6F6C66] dark:placeholder-[#9A978F] focus:outline-none focus:ring-1 focus:ring-[#2C6E56] dark:focus:ring-[#5AA88C]"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Calendar/CalendarFiltersBar.tsx",
                                lineNumber: 72,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            filters.search && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setFilters((prev)=>({
                                            ...prev,
                                            search: ''
                                        })),
                                className: "absolute right-2 top-1/2 -translate-y-1/2 text-[#6F6C66] dark:text-[#9A978F] hover:text-[#2A2925] dark:hover:text-[#D9D7D1]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "w-3 h-3 stroke-[1.5]"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Calendar/CalendarFiltersBar.tsx",
                                    lineNumber: 86,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/Calendar/CalendarFiltersBar.tsx",
                                lineNumber: 81,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Calendar/CalendarFiltersBar.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1.5 flex-wrap",
                        children: [
                            overduePosts.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                id: "filter-overdue-toggle",
                                type: "button",
                                onClick: ()=>setFilters((prev)=>({
                                            ...prev,
                                            onlyOverdue: !prev.onlyOverdue
                                        })),
                                className: `h-7 inline-flex items-center gap-1.5 px-2.5 rounded-[4px] text-xs border transition-colors focus-ring font-normal ${filters.onlyOverdue ? 'border-[#B42318] dark:border-[#C54A44] text-[#B42318] dark:text-[#C54A44] bg-[#EFECE6] dark:bg-[#2B2B28]' : 'border-[#E9E7E2] dark:border-[#323230] text-[#B42318] dark:text-[#C54A44] hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28]'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-2 h-2 rounded-full bg-[#B42318] dark:bg-[#C54A44]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Calendar/CalendarFiltersBar.tsx",
                                        lineNumber: 107,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "Overdue (",
                                            overduePosts.length,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Calendar/CalendarFiltersBar.tsx",
                                        lineNumber: 108,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Calendar/CalendarFiltersBar.tsx",
                                lineNumber: 95,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                id: "calendar-filter-toggle-btn",
                                type: "button",
                                onClick: ()=>setIsOpen(!isOpen),
                                className: `h-7 inline-flex items-center gap-1.5 px-2.5 rounded-[4px] text-xs border transition-colors focus-ring font-normal ${isOpen || activeFilterCount > 0 ? 'bg-[#EFECE6] dark:bg-[#2B2B28] text-[#2A2925] dark:text-[#D9D7D1] border-[#E9E7E2] dark:border-[#323230]' : 'text-[#6F6C66] dark:text-[#9A978F] border-[#E9E7E2] dark:border-[#323230] hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28] hover:text-[#2A2925] dark:hover:text-[#D9D7D1]'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__["Filter"], {
                                        className: "w-3.5 h-3.5 stroke-[1.5]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Calendar/CalendarFiltersBar.tsx",
                                        lineNumber: 123,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Filter"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Calendar/CalendarFiltersBar.tsx",
                                        lineNumber: 124,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    activeFilterCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-4 h-4 rounded-full bg-[#2C6E56] dark:bg-[#5AA88C] text-[#F3F1EC] dark:text-[#1C1C1A] text-[10px] flex items-center justify-center tabular-nums",
                                        children: activeFilterCount
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Calendar/CalendarFiltersBar.tsx",
                                        lineNumber: 126,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                        className: `w-3 h-3 stroke-[1.5] transition-transform ${isOpen ? 'rotate-180' : ''}`
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Calendar/CalendarFiltersBar.tsx",
                                        lineNumber: 130,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Calendar/CalendarFiltersBar.tsx",
                                lineNumber: 113,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            activeFilterCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                id: "clear-filters-btn",
                                type: "button",
                                onClick: clearAllFilters,
                                className: "h-7 inline-flex items-center gap-1 text-xs text-[#6F6C66] dark:text-[#9A978F] hover:text-[#2A2925] dark:hover:text-[#D9D7D1] px-2 rounded-[4px] hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28] transition-colors focus-ring font-normal",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                        className: "w-3 h-3 stroke-[1.5]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Calendar/CalendarFiltersBar.tsx",
                                        lineNumber: 143,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Reset"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Calendar/CalendarFiltersBar.tsx",
                                        lineNumber: 144,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Calendar/CalendarFiltersBar.tsx",
                                lineNumber: 137,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Calendar/CalendarFiltersBar.tsx",
                        lineNumber: 92,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Calendar/CalendarFiltersBar.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pt-3 mt-2 border-t border-[#E9E7E2] dark:border-[#323230] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-xs text-[#6F6C66] dark:text-[#9A978F] mb-1.5 font-normal",
                                children: "Platform"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Calendar/CalendarFiltersBar.tsx",
                                lineNumber: 155,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-1",
                                children: settings.platforms.map((p)=>{
                                    const isSelected = filters.platforms.includes(p.id);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>togglePlatform(p.id),
                                        className: `text-xs px-2 py-1 rounded-[4px] border transition-colors focus-ring font-normal ${isSelected ? 'bg-[#2C6E56] text-[#F3F1EC] border-[#2C6E56]' : 'bg-[#F7F6F3] dark:bg-[#1C1C1A] text-[#2A2925] dark:text-[#D9D7D1] border-[#E9E7E2] dark:border-[#323230] hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28]'}`,
                                        children: p.name
                                    }, p.id, false, {
                                        fileName: "[project]/src/components/Calendar/CalendarFiltersBar.tsx",
                                        lineNumber: 162,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0));
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/components/Calendar/CalendarFiltersBar.tsx",
                                lineNumber: 158,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Calendar/CalendarFiltersBar.tsx",
                        lineNumber: 154,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-xs text-[#6F6C66] dark:text-[#9A978F] mb-1.5 font-normal",
                                children: "Status"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Calendar/CalendarFiltersBar.tsx",
                                lineNumber: 181,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-1",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ALL_STATUSES"].map((st)=>{
                                    const isSelected = filters.statuses.includes(st);
                                    const cfg = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STATUS_CONFIG"][st];
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>toggleStatus(st),
                                        className: `text-xs px-2 py-1 rounded-[4px] border transition-colors focus-ring font-normal ${isSelected ? 'bg-[#2C6E56] text-[#F3F1EC] border-[#2C6E56]' : 'bg-[#F7F6F3] dark:bg-[#1C1C1A] text-[#2A2925] dark:text-[#D9D7D1] border-[#E9E7E2] dark:border-[#323230] hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28]'}`,
                                        children: cfg.label
                                    }, st, false, {
                                        fileName: "[project]/src/components/Calendar/CalendarFiltersBar.tsx",
                                        lineNumber: 189,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0));
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/components/Calendar/CalendarFiltersBar.tsx",
                                lineNumber: 184,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Calendar/CalendarFiltersBar.tsx",
                        lineNumber: 180,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-xs text-[#6F6C66] dark:text-[#9A978F] mb-1.5 font-normal",
                                children: "Pillar"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Calendar/CalendarFiltersBar.tsx",
                                lineNumber: 208,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-1",
                                children: settings.pillars.map((pil)=>{
                                    const isSelected = filters.pillars.includes(pil.id);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>togglePillar(pil.id),
                                        className: `text-xs px-2 py-1 rounded-[4px] border transition-colors flex items-center gap-1.5 focus-ring font-normal ${isSelected ? 'bg-[#2C6E56] text-[#F3F1EC] border-[#2C6E56]' : 'bg-[#F7F6F3] dark:bg-[#1C1C1A] text-[#2A2925] dark:text-[#D9D7D1] border-[#E9E7E2] dark:border-[#323230] hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28]'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-2 h-2 rounded-full",
                                                style: {
                                                    backgroundColor: pil.color
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Calendar/CalendarFiltersBar.tsx",
                                                lineNumber: 225,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: pil.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Calendar/CalendarFiltersBar.tsx",
                                                lineNumber: 229,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, pil.id, true, {
                                        fileName: "[project]/src/components/Calendar/CalendarFiltersBar.tsx",
                                        lineNumber: 215,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0));
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/components/Calendar/CalendarFiltersBar.tsx",
                                lineNumber: 211,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Calendar/CalendarFiltersBar.tsx",
                        lineNumber: 207,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-xs text-[#6F6C66] dark:text-[#9A978F] mb-1.5 font-normal",
                                children: "Format"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Calendar/CalendarFiltersBar.tsx",
                                lineNumber: 238,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-1",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ALL_FORMATS"].slice(0, 5).map((fmt)=>{
                                    const isSelected = filters.formats.includes(fmt);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>toggleFormat(fmt),
                                        className: `text-xs px-2 py-1 rounded-[4px] border transition-colors focus-ring font-normal ${isSelected ? 'bg-[#2C6E56] text-[#F3F1EC] border-[#2C6E56]' : 'bg-[#F7F6F3] dark:bg-[#1C1C1A] text-[#2A2925] dark:text-[#D9D7D1] border-[#E9E7E2] dark:border-[#323230] hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28]'}`,
                                        children: fmt
                                    }, fmt, false, {
                                        fileName: "[project]/src/components/Calendar/CalendarFiltersBar.tsx",
                                        lineNumber: 245,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0));
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/components/Calendar/CalendarFiltersBar.tsx",
                                lineNumber: 241,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Calendar/CalendarFiltersBar.tsx",
                        lineNumber: 237,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Calendar/CalendarFiltersBar.tsx",
                lineNumber: 152,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Calendar/CalendarFiltersBar.tsx",
        lineNumber: 67,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/src/components/Calendar/CalendarView.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CalendarView",
    ()=>CalendarView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-ssr] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-ssr] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AppContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Calendar$2f$CalendarFiltersBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Calendar/CalendarFiltersBar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Calendar$2f$MonthGrid$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Calendar/MonthGrid.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Calendar$2f$WeekGrid$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Calendar/WeekGrid.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Calendar$2f$ListView$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Calendar/ListView.tsx [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
const CalendarView = ()=>{
    const { calendarViewMode, setCalendarViewMode, currentDate, setCurrentDate, openQuickAdd, settings } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useApp"])();
    const goToPrevious = ()=>{
        setCurrentDate((prev)=>{
            const d = new Date(prev);
            if (calendarViewMode === 'week') {
                d.setDate(d.getDate() - 7);
            } else {
                d.setMonth(d.getMonth() - 1);
            }
            return d;
        });
    };
    const goToNext = ()=>{
        setCurrentDate((prev)=>{
            const d = new Date(prev);
            if (calendarViewMode === 'week') {
                d.setDate(d.getDate() + 7);
            } else {
                d.setMonth(d.getMonth() + 1);
            }
            return d;
        });
    };
    const goToToday = ()=>{
        setCurrentDate(new Date());
    };
    const getHeaderTitle = ()=>{
        if (calendarViewMode === 'month' || calendarViewMode === 'list') {
            return currentDate.toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric'
            });
        }
        const d = new Date(currentDate);
        const day = d.getDay();
        const diff = d.getDate() - day + (settings.weekStartsOnMonday ? day === 0 ? -6 : 1 : 0);
        const startOfWeek = new Date(d.setDate(diff));
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        const startMonth = startOfWeek.toLocaleDateString('en-US', {
            month: 'short'
        });
        const endMonth = endOfWeek.toLocaleDateString('en-US', {
            month: 'short'
        });
        if (startMonth === endMonth) {
            return `${startMonth} ${startOfWeek.getDate()} – ${endOfWeek.getDate()}, ${startOfWeek.getFullYear()}`;
        }
        return `${startMonth} ${startOfWeek.getDate()} – ${endMonth} ${endOfWeek.getDate()}, ${endOfWeek.getFullYear()}`;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        id: "calendar-view-container",
        className: "flex-1 flex flex-col h-full overflow-hidden bg-[#F7F6F3] dark:bg-[#1C1C1A]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-[#FFFFFF] dark:bg-[#232321] border-b border-[#E9E7E2] dark:border-[#323230] px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 sm:gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "page-title text-2xl sm:text-[28px] text-[#2A2925] dark:text-[#D9D7D1] font-medium",
                                children: getHeaderTitle()
                            }, void 0, false, {
                                fileName: "[project]/src/components/Calendar/CalendarView.tsx",
                                lineNumber: 81,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center border border-[#E9E7E2] dark:border-[#323230] rounded-[4px] overflow-hidden h-7",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: goToPrevious,
                                        className: "px-2 h-full hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28] text-[#6F6C66] dark:text-[#9A978F] hover:text-[#2A2925] dark:hover:text-[#D9D7D1] transition-colors focus-ring",
                                        title: "Previous period",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                            className: "w-3.5 h-3.5 stroke-[1.5]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Calendar/CalendarView.tsx",
                                            lineNumber: 92,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Calendar/CalendarView.tsx",
                                        lineNumber: 86,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: goToToday,
                                        className: "px-2.5 h-full text-xs font-normal border-x border-[#E9E7E2] dark:border-[#323230] hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28] text-[#2A2925] dark:text-[#D9D7D1] transition-colors focus-ring",
                                        children: "Today"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Calendar/CalendarView.tsx",
                                        lineNumber: 94,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: goToNext,
                                        className: "px-2 h-full hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28] text-[#6F6C66] dark:text-[#9A978F] hover:text-[#2A2925] dark:hover:text-[#D9D7D1] transition-colors focus-ring",
                                        title: "Next period",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                            className: "w-3.5 h-3.5 stroke-[1.5]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Calendar/CalendarView.tsx",
                                            lineNumber: 107,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Calendar/CalendarView.tsx",
                                        lineNumber: 101,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Calendar/CalendarView.tsx",
                                lineNumber: 85,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Calendar/CalendarView.tsx",
                        lineNumber: 80,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center border border-[#E9E7E2] dark:border-[#323230] rounded-[4px] p-0.5 h-7 bg-[#F7F6F3] dark:bg-[#1C1C1A]",
                                children: [
                                    {
                                        id: 'month',
                                        label: 'Month'
                                    },
                                    {
                                        id: 'week',
                                        label: 'Week'
                                    },
                                    {
                                        id: 'list',
                                        label: 'List'
                                    }
                                ].map((tab)=>{
                                    const isActive = calendarViewMode === tab.id;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        id: `view-tab-${tab.id}`,
                                        onClick: ()=>setCalendarViewMode(tab.id),
                                        className: `px-3 h-full text-xs rounded-[3px] transition-colors font-normal focus-ring ${isActive ? 'bg-[#EFECE6] dark:bg-[#2B2B28] text-[#2A2925] dark:text-[#D9D7D1]' : 'text-[#6F6C66] dark:text-[#9A978F] hover:text-[#2A2925] dark:hover:text-[#D9D7D1]'}`,
                                        children: tab.label
                                    }, tab.id, false, {
                                        fileName: "[project]/src/components/Calendar/CalendarView.tsx",
                                        lineNumber: 125,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0));
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/components/Calendar/CalendarView.tsx",
                                lineNumber: 115,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>openQuickAdd(),
                                className: "inline-flex items-center gap-1.5 h-7 px-3 rounded-[4px] bg-[#2C6E56] hover:bg-[#235946] dark:hover:bg-[#357E65] text-[#F3F1EC] text-xs font-normal transition-colors focus-ring",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                        className: "w-3.5 h-3.5 stroke-[1.5]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Calendar/CalendarView.tsx",
                                        lineNumber: 147,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "New post"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Calendar/CalendarView.tsx",
                                        lineNumber: 148,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Calendar/CalendarView.tsx",
                                lineNumber: 142,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Calendar/CalendarView.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Calendar/CalendarView.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Calendar$2f$CalendarFiltersBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CalendarFiltersBar"], {}, void 0, false, {
                fileName: "[project]/src/components/Calendar/CalendarView.tsx",
                lineNumber: 154,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex flex-col min-h-0 overflow-hidden",
                children: [
                    calendarViewMode === 'month' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Calendar$2f$MonthGrid$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MonthGrid"], {
                        currentDate: currentDate
                    }, void 0, false, {
                        fileName: "[project]/src/components/Calendar/CalendarView.tsx",
                        lineNumber: 158,
                        columnNumber: 42
                    }, ("TURBOPACK compile-time value", void 0)),
                    calendarViewMode === 'week' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Calendar$2f$WeekGrid$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WeekGrid"], {
                        currentDate: currentDate
                    }, void 0, false, {
                        fileName: "[project]/src/components/Calendar/CalendarView.tsx",
                        lineNumber: 159,
                        columnNumber: 41
                    }, ("TURBOPACK compile-time value", void 0)),
                    calendarViewMode === 'list' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Calendar$2f$ListView$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ListView"], {}, void 0, false, {
                        fileName: "[project]/src/components/Calendar/CalendarView.tsx",
                        lineNumber: 160,
                        columnNumber: 41
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Calendar/CalendarView.tsx",
                lineNumber: 157,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Calendar/CalendarView.tsx",
        lineNumber: 73,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/src/components/Calendar/ListView.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ListView",
    ()=>ListView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$tool$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PenTool$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pen-tool.js [app-ssr] (ecmascript) <export default as PenTool>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AppContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils.ts [app-ssr] (ecmascript)");
;
;
;
;
const ListView = ()=>{
    const { posts, filters, setSelectedPost, openContentStudio, setIsCreateModalOpen } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useApp"])();
    const todayKey = new Date().toISOString().split('T')[0];
    const tom = new Date();
    tom.setDate(tom.getDate() + 1);
    const tomKey = tom.toISOString().split('T')[0];
    // Filter posts
    const filteredPosts = posts.filter((post)=>{
        if (filters.search) {
            const q = filters.search.toLowerCase();
            const matchTitle = post.title.toLowerCase().includes(q);
            const matchHook = post.hook.toLowerCase().includes(q);
            const matchTags = post.hashtags.some((t)=>t.toLowerCase().includes(q));
            if (!matchTitle && !matchHook && !matchTags) return false;
        }
        if (filters.platforms.length > 0) {
            if (!post.platforms.some((p)=>filters.platforms.includes(p))) return false;
        }
        if (filters.statuses.length > 0 && !filters.statuses.includes(post.status)) {
            return false;
        }
        if (filters.pillars.length > 0 && !filters.pillars.includes(post.pillarId)) {
            return false;
        }
        if (filters.formats.length > 0 && !filters.formats.includes(post.format)) {
            return false;
        }
        if (filters.onlyOverdue) {
            if (post.status === 'Posted' || post.scheduledDate >= todayKey) return false;
        }
        return true;
    });
    const overdue = [];
    const today = [];
    const tomorrow = [];
    const upcoming = [];
    const postedHistory = [];
    filteredPosts.forEach((post)=>{
        if (post.status === 'Posted') {
            postedHistory.push(post);
        } else if (post.scheduledDate < todayKey) {
            overdue.push(post);
        } else if (post.scheduledDate === todayKey) {
            today.push(post);
        } else if (post.scheduledDate === tomKey) {
            tomorrow.push(post);
        } else {
            upcoming.push(post);
        }
    });
    overdue.sort((a, b)=>a.scheduledDate.localeCompare(b.scheduledDate));
    today.sort((a, b)=>(a.scheduledTime || '').localeCompare(b.scheduledTime || ''));
    tomorrow.sort((a, b)=>(a.scheduledTime || '').localeCompare(b.scheduledTime || ''));
    upcoming.sort((a, b)=>a.scheduledDate.localeCompare(b.scheduledDate));
    postedHistory.sort((a, b)=>b.scheduledDate.localeCompare(a.scheduledDate));
    const renderSection = (title, items)=>{
        if (items.length === 0) return null;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mb-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between pb-1.5 mb-1 border-b border-[#E9E7E2] dark:border-[#323230]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-xs font-normal text-[#6F6C66] dark:text-[#9A978F]",
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/src/components/Calendar/ListView.tsx",
                            lineNumber: 74,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs tabular-nums text-[#6F6C66] dark:text-[#9A978F] font-normal",
                            children: items.length
                        }, void 0, false, {
                            fileName: "[project]/src/components/Calendar/ListView.tsx",
                            lineNumber: 77,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Calendar/ListView.tsx",
                    lineNumber: 73,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "divide-y divide-[#E9E7E2] dark:divide-[#323230]",
                    children: items.map((post)=>{
                        const statusInfo = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STATUS_CONFIG"][post.status];
                        const primaryPlat = post.platforms[0] || 'instagram';
                        const platToken = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PLATFORM_STYLE_TOKENS"][primaryPlat.toLowerCase()];
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            onClick: ()=>setSelectedPost(post),
                            className: "group flex items-center justify-between py-2.5 px-2 rounded-[4px] hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28] cursor-pointer transition-colors focus-ring",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2.5 min-w-0 flex-1 pr-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "w-2 h-2 rounded-full shrink-0",
                                            style: {
                                                backgroundColor: platToken?.dotColor || '#6F6C66'
                                            },
                                            title: primaryPlat
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Calendar/ListView.tsx",
                                            lineNumber: 96,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs font-normal text-[#2A2925] dark:text-[#D9D7D1] truncate",
                                            children: post.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Calendar/ListView.tsx",
                                            lineNumber: 101,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Calendar/ListView.tsx",
                                    lineNumber: 95,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-4 shrink-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-1.5 text-xs text-[#6F6C66] dark:text-[#9A978F] tabular-nums font-normal",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: post.scheduledDate
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Calendar/ListView.tsx",
                                                    lineNumber: 109,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                post.scheduledTime && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "·"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/Calendar/ListView.tsx",
                                                            lineNumber: 112,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: post.scheduledTime
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/Calendar/ListView.tsx",
                                                            lineNumber: 113,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/Calendar/ListView.tsx",
                                                    lineNumber: 111,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/Calendar/ListView.tsx",
                                            lineNumber: 108,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-1.5 text-xs text-[#2A2925] dark:text-[#D9D7D1] w-24 justify-end font-normal",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "w-2 h-2 rounded-full shrink-0",
                                                    style: {
                                                        backgroundColor: statusInfo.dot
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Calendar/ListView.tsx",
                                                    lineNumber: 120,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "truncate",
                                                    children: statusInfo.label
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Calendar/ListView.tsx",
                                                    lineNumber: 124,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/Calendar/ListView.tsx",
                                            lineNumber: 119,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: (e)=>{
                                                e.stopPropagation();
                                                openContentStudio(post.id);
                                            },
                                            className: "opacity-0 group-hover:opacity-100 p-1 rounded-[4px] hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28] text-[#6F6C66] dark:text-[#9A978F] hover:text-[#2A2925] dark:hover:text-[#D9D7D1] transition-opacity focus-ring",
                                            title: "Write content or edit script",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$tool$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PenTool$3e$__["PenTool"], {
                                                className: "w-3.5 h-3.5 stroke-[1.5]"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Calendar/ListView.tsx",
                                                lineNumber: 137,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Calendar/ListView.tsx",
                                            lineNumber: 128,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Calendar/ListView.tsx",
                                    lineNumber: 107,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, post.id, true, {
                            fileName: "[project]/src/components/Calendar/ListView.tsx",
                            lineNumber: 89,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0));
                    })
                }, void 0, false, {
                    fileName: "[project]/src/components/Calendar/ListView.tsx",
                    lineNumber: 82,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Calendar/ListView.tsx",
            lineNumber: 72,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        id: "calendar-list-view",
        className: "flex-1 overflow-y-auto p-4 sm:p-6 max-w-[1100px] w-full",
        children: filteredPosts.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "py-16 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs text-[#6F6C66] dark:text-[#9A978F] mb-3 font-normal",
                    children: "No posts matching current filters."
                }, void 0, false, {
                    fileName: "[project]/src/components/Calendar/ListView.tsx",
                    lineNumber: 155,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: ()=>setIsCreateModalOpen(true),
                    className: "inline-flex items-center px-3 py-1.5 rounded-[4px] text-xs font-normal bg-[#2C6E56] hover:bg-[#235946] dark:hover:bg-[#357E65] text-[#F3F1EC] transition-colors focus-ring",
                    children: "Create post"
                }, void 0, false, {
                    fileName: "[project]/src/components/Calendar/ListView.tsx",
                    lineNumber: 158,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Calendar/ListView.tsx",
            lineNumber: 154,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                renderSection('Overdue', overdue),
                renderSection('Today', today),
                renderSection('Tomorrow', tomorrow),
                renderSection('Upcoming', upcoming),
                renderSection('Published', postedHistory)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Calendar/ListView.tsx",
            lineNumber: 167,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/Calendar/ListView.tsx",
        lineNumber: 149,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/src/components/Calendar/MonthGrid.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MonthGrid",
    ()=>MonthGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-ssr] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AppContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Common$2f$InlineDatePicker$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Common/InlineDatePicker.tsx [app-ssr] (ecmascript)");
;
;
;
;
;
;
const MonthGrid = ({ currentDate })=>{
    const { posts, settings, filters, selectedPost, setSelectedPost, openCreateModalForDate, movePostToDate, updatePost, celebrateMilestone } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useApp"])();
    const [draggedPostId, setDraggedPostId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [dragOverDate, setDragOverDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [moveModalPost, setMoveModalPost] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [expandedDayKey, setExpandedDayKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [inlineEditingId, setInlineEditingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [inlineTitleValue, setInlineTitleValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const dayLabels = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDaysOfWeekLabels"])(settings.weekStartsOnMonday);
    const monthWeeks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMonthMatrix"])(currentDate.getFullYear(), currentDate.getMonth(), settings.weekStartsOnMonday);
    const todayKey = new Date().toISOString().split('T')[0];
    // Filter posts
    const filteredPosts = posts.filter((post)=>{
        if (filters.search) {
            const q = filters.search.toLowerCase();
            const matchTitle = post.title.toLowerCase().includes(q);
            const matchHook = post.hook.toLowerCase().includes(q);
            const matchTags = post.hashtags.some((t)=>t.toLowerCase().includes(q));
            if (!matchTitle && !matchHook && !matchTags) return false;
        }
        if (filters.platforms.length > 0) {
            const matchPlat = post.platforms.some((p)=>filters.platforms.includes(p));
            if (!matchPlat) return false;
        }
        if (filters.statuses.length > 0 && !filters.statuses.includes(post.status)) {
            return false;
        }
        if (filters.pillars.length > 0 && !filters.pillars.includes(post.pillarId)) {
            return false;
        }
        if (filters.formats.length > 0 && !filters.formats.includes(post.format)) {
            return false;
        }
        if (filters.onlyOverdue) {
            if (post.status === 'Posted' || post.scheduledDate >= todayKey) return false;
        }
        return true;
    });
    // Group posts by date
    const postsByDate = {};
    filteredPosts.forEach((post)=>{
        if (!postsByDate[post.scheduledDate]) {
            postsByDate[post.scheduledDate] = [];
        }
        postsByDate[post.scheduledDate].push(post);
    });
    // Drag and Drop
    const handleDragStart = (e, postId)=>{
        e.dataTransfer.setData('text/plain', postId);
        e.dataTransfer.effectAllowed = 'move';
        setDraggedPostId(postId);
    };
    const handleDragOver = (e, dateKey)=>{
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        if (dragOverDate !== dateKey) {
            setDragOverDate(dateKey);
        }
    };
    const handleDragLeave = ()=>{
        setDragOverDate(null);
    };
    const handleDrop = (e, targetDateKey)=>{
        e.preventDefault();
        const postId = e.dataTransfer.getData('text/plain') || draggedPostId;
        if (postId) {
            movePostToDate(postId, targetDateKey);
            celebrateMilestone('Post rescheduled');
        }
        setDraggedPostId(null);
        setDragOverDate(null);
    };
    const startInlineEdit = (post, e)=>{
        e.stopPropagation();
        setInlineEditingId(post.id);
        setInlineTitleValue(post.title);
    };
    const saveInlineEdit = (postId, e)=>{
        e.preventDefault();
        e.stopPropagation();
        if (inlineTitleValue.trim()) {
            updatePost(postId, {
                title: inlineTitleValue.trim()
            });
        }
        setInlineEditingId(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        id: "calendar-month-grid",
        className: "flex-1 flex flex-col min-h-0 bg-[#F7F6F3] dark:bg-[#1C1C1A] select-none",
        children: [
            moveModalPost && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Common$2f$InlineDatePicker$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InlineDatePicker"], {
                currentDateKey: moveModalPost.scheduledDate,
                onSelectDate: (newDate)=>{
                    movePostToDate(moveModalPost.id, newDate);
                    celebrateMilestone('Post rescheduled');
                },
                onClose: ()=>setMoveModalPost(null)
            }, void 0, false, {
                fileName: "[project]/src/components/Calendar/MonthGrid.tsx",
                lineNumber: 134,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-7 border-b border-[#E9E7E2] dark:border-[#323230] bg-[#FFFFFF] dark:bg-[#232321]",
                children: dayLabels.map((lbl, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "py-2 px-3 text-left font-normal text-xs text-[#6F6C66] dark:text-[#9A978F]",
                        children: lbl
                    }, idx, false, {
                        fileName: "[project]/src/components/Calendar/MonthGrid.tsx",
                        lineNumber: 147,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/src/components/Calendar/MonthGrid.tsx",
                lineNumber: 145,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-7 flex-1 auto-rows-fr bg-[#E9E7E2] dark:bg-[#323230] gap-px border-b border-[#E9E7E2] dark:border-[#323230]",
                children: monthWeeks.flat().map((day)=>{
                    const dayPosts = postsByDate[day.dateKey] || [];
                    const isDropTarget = dragOverDate === day.dateKey;
                    const maxVisible = 3;
                    const hasOverflow = dayPosts.length > maxVisible && expandedDayKey !== day.dateKey;
                    const visiblePosts = hasOverflow ? dayPosts.slice(0, maxVisible) : dayPosts;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        id: `calendar-day-${day.dateKey}`,
                        onDragOver: (e)=>handleDragOver(e, day.dateKey),
                        onDragLeave: handleDragLeave,
                        onDrop: (e)=>handleDrop(e, day.dateKey),
                        onClick: (e)=>{
                            if (e.target === e.currentTarget) {
                                openCreateModalForDate(day.dateKey);
                            }
                        },
                        className: `flex flex-col p-1.5 transition-colors relative group min-h-[90px] sm:min-h-[110px] ${day.isCurrentMonth ? 'bg-[#FFFFFF] dark:bg-[#232321]' : 'bg-[#F7F6F3] dark:bg-[#1C1C1A]'} ${isDropTarget ? 'bg-[#EFECE6] dark:bg-[#2B2B28]' : ''}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-1",
                                children: [
                                    day.isToday ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-5 h-5 rounded-full bg-[#2C6E56] text-[#F3F1EC] flex items-center justify-center text-[11px] font-normal tabular-nums",
                                        children: day.dayOfMonth
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Calendar/MonthGrid.tsx",
                                        lineNumber: 190,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `text-xs tabular-nums font-normal ${day.isCurrentMonth ? 'text-[#2A2925] dark:text-[#D9D7D1]' : 'text-[#9A978F] dark:text-[#6B6963]'}`,
                                        children: day.dayOfMonth
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Calendar/MonthGrid.tsx",
                                        lineNumber: 194,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: (e)=>{
                                            e.stopPropagation();
                                            openCreateModalForDate(day.dateKey);
                                        },
                                        className: "opacity-0 group-hover:opacity-100 p-0.5 text-[#6F6C66] hover:text-[#2A2925] dark:text-[#9A978F] dark:hover:text-[#D9D7D1] rounded-[3px] transition-opacity focus-ring",
                                        title: `Add post on ${day.dateKey}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                            className: "w-3.5 h-3.5 stroke-[1.5]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Calendar/MonthGrid.tsx",
                                            lineNumber: 215,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Calendar/MonthGrid.tsx",
                                        lineNumber: 206,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Calendar/MonthGrid.tsx",
                                lineNumber: 188,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 space-y-0.5 overflow-y-auto max-h-[120px]",
                                children: [
                                    visiblePosts.map((post)=>{
                                        const primaryPlat = post.platforms[0] || 'instagram';
                                        const platToken = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PLATFORM_STYLE_TOKENS"][primaryPlat.toLowerCase()];
                                        const isInlineEditing = inlineEditingId === post.id;
                                        const isSelected = selectedPost?.id === post.id;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            id: `post-row-${post.id}`,
                                            draggable: true,
                                            onDragStart: (e)=>handleDragStart(e, post.id),
                                            onClick: (e)=>{
                                                e.stopPropagation();
                                                setSelectedPost(post);
                                            },
                                            className: `group/row flex items-center gap-1.5 px-1 py-0.5 text-xs transition-colors rounded-[3px] cursor-pointer focus-ring ${isSelected ? 'border-l-2 border-l-[#2C6E56] dark:border-l-[#5AA88C] bg-[#EFECE6] dark:bg-[#2B2B28]' : 'border-l-2 border-l-transparent hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28]'} ${draggedPostId === post.id ? 'opacity-30' : ''}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "w-2 h-2 rounded-full shrink-0",
                                                    style: {
                                                        backgroundColor: platToken?.dotColor || '#6F6C66'
                                                    },
                                                    title: `Platform: ${primaryPlat}`
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Calendar/MonthGrid.tsx",
                                                    lineNumber: 244,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                isInlineEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                                    onSubmit: (e)=>saveInlineEdit(post.id, e),
                                                    className: "flex items-center gap-1 flex-1 min-w-0",
                                                    onClick: (e)=>e.stopPropagation(),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            autoFocus: true,
                                                            type: "text",
                                                            value: inlineTitleValue,
                                                            onChange: (e)=>setInlineTitleValue(e.target.value),
                                                            className: "w-full text-xs px-1 py-0 rounded-[3px] border border-[#2C6E56] dark:border-[#5AA88C] bg-[#FFFFFF] dark:bg-[#1C1C1A] text-[#2A2925] dark:text-[#D9D7D1] outline-none"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/Calendar/MonthGrid.tsx",
                                                            lineNumber: 259,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "submit",
                                                            className: "text-[#2C6E56] dark:text-[#5AA88C]",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                className: "w-3 h-3 stroke-[1.5]"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Calendar/MonthGrid.tsx",
                                                                lineNumber: 267,
                                                                columnNumber: 29
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/Calendar/MonthGrid.tsx",
                                                            lineNumber: 266,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/Calendar/MonthGrid.tsx",
                                                    lineNumber: 254,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    onDoubleClick: (e)=>startInlineEdit(post, e),
                                                    className: "truncate flex-1 font-normal text-xs text-[#2A2925] dark:text-[#D9D7D1]",
                                                    title: post.title,
                                                    children: post.title
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Calendar/MonthGrid.tsx",
                                                    lineNumber: 271,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                post.scheduledTime && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[11px] text-[#6F6C66] dark:text-[#9A978F] tabular-nums shrink-0 font-normal",
                                                    children: post.scheduledTime
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Calendar/MonthGrid.tsx",
                                                    lineNumber: 282,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, post.id, true, {
                                            fileName: "[project]/src/components/Calendar/MonthGrid.tsx",
                                            lineNumber: 228,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0));
                                    }),
                                    hasOverflow && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: (e)=>{
                                            e.stopPropagation();
                                            setExpandedDayKey(day.dateKey);
                                        },
                                        className: "w-full py-0.5 text-[11px] text-[#6F6C66] dark:text-[#9A978F] hover:text-[#2A2925] dark:hover:text-[#D9D7D1] text-left px-1 transition-colors font-normal",
                                        children: [
                                            "+",
                                            dayPosts.length - maxVisible,
                                            " more"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Calendar/MonthGrid.tsx",
                                        lineNumber: 292,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Calendar/MonthGrid.tsx",
                                lineNumber: 220,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, day.dateKey, true, {
                        fileName: "[project]/src/components/Calendar/MonthGrid.tsx",
                        lineNumber: 166,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0));
                })
            }, void 0, false, {
                fileName: "[project]/src/components/Calendar/MonthGrid.tsx",
                lineNumber: 157,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Calendar/MonthGrid.tsx",
        lineNumber: 128,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/src/components/Calendar/WeekGrid.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WeekGrid",
    ()=>WeekGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-ssr] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AppContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Common$2f$InlineDatePicker$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Common/InlineDatePicker.tsx [app-ssr] (ecmascript)");
;
;
;
;
;
;
const WeekGrid = ({ currentDate })=>{
    const { posts, settings, filters, selectedPost, setSelectedPost, openCreateModalForDate, movePostToDate, celebrateMilestone } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useApp"])();
    const [draggedPostId, setDraggedPostId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [dragOverDate, setDragOverDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [moveModalPost, setMoveModalPost] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const weekDays = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getWeekDays"])(currentDate, settings.weekStartsOnMonday);
    const todayKey = new Date().toISOString().split('T')[0];
    // Filter posts
    const filteredPosts = posts.filter((post)=>{
        if (filters.search) {
            const q = filters.search.toLowerCase();
            const matchTitle = post.title.toLowerCase().includes(q);
            const matchHook = post.hook.toLowerCase().includes(q);
            if (!matchTitle && !matchHook) return false;
        }
        if (filters.platforms.length > 0) {
            if (!post.platforms.some((p)=>filters.platforms.includes(p))) return false;
        }
        if (filters.statuses.length > 0 && !filters.statuses.includes(post.status)) {
            return false;
        }
        if (filters.pillars.length > 0 && !filters.pillars.includes(post.pillarId)) {
            return false;
        }
        if (filters.formats.length > 0 && !filters.formats.includes(post.format)) {
            return false;
        }
        if (filters.onlyOverdue) {
            if (post.status === 'Posted' || post.scheduledDate >= todayKey) return false;
        }
        return true;
    });
    const postsByDate = {};
    filteredPosts.forEach((p)=>{
        if (!postsByDate[p.scheduledDate]) postsByDate[p.scheduledDate] = [];
        postsByDate[p.scheduledDate].push(p);
    });
    // Drag handlers
    const handleDragStart = (e, postId)=>{
        e.dataTransfer.setData('text/plain', postId);
        setDraggedPostId(postId);
    };
    const handleDragOver = (e, dateKey)=>{
        e.preventDefault();
        if (dragOverDate !== dateKey) setDragOverDate(dateKey);
    };
    const handleDrop = (e, targetDateKey)=>{
        e.preventDefault();
        const postId = e.dataTransfer.getData('text/plain') || draggedPostId;
        if (postId) {
            movePostToDate(postId, targetDateKey);
            celebrateMilestone('Post rescheduled');
        }
        setDraggedPostId(null);
        setDragOverDate(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        id: "calendar-week-grid",
        className: "flex-1 flex flex-col min-h-0 bg-[#F7F6F3] dark:bg-[#1C1C1A] select-none",
        children: [
            moveModalPost && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Common$2f$InlineDatePicker$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InlineDatePicker"], {
                currentDateKey: moveModalPost.scheduledDate,
                onSelectDate: (newDate)=>{
                    movePostToDate(moveModalPost.id, newDate);
                    celebrateMilestone('Post rescheduled');
                },
                onClose: ()=>setMoveModalPost(null)
            }, void 0, false, {
                fileName: "[project]/src/components/Calendar/WeekGrid.tsx",
                lineNumber: 91,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-7 border-b border-[#E9E7E2] dark:border-[#323230] bg-[#FFFFFF] dark:bg-[#232321]",
                children: weekDays.map((day)=>{
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "py-2.5 px-3 flex items-baseline justify-between border-r last:border-r-0 border-[#E9E7E2] dark:border-[#323230]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-[#6F6C66] dark:text-[#9A978F] font-normal",
                                        children: day.date.toLocaleDateString('en-US', {
                                            weekday: 'short'
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Calendar/WeekGrid.tsx",
                                        lineNumber: 110,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    day.isToday ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-5 h-5 rounded-full bg-[#2C6E56] text-[#F3F1EC] flex items-center justify-center text-[11px] font-normal tabular-nums",
                                        children: day.dayOfMonth
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Calendar/WeekGrid.tsx",
                                        lineNumber: 114,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-normal tabular-nums text-[#2A2925] dark:text-[#D9D7D1]",
                                        children: day.dayOfMonth
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Calendar/WeekGrid.tsx",
                                        lineNumber: 118,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Calendar/WeekGrid.tsx",
                                lineNumber: 109,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>openCreateModalForDate(day.dateKey),
                                className: "opacity-0 hover:opacity-100 p-0.5 text-[#6F6C66] dark:text-[#9A978F] hover:text-[#2A2925] dark:hover:text-[#D9D7D1] rounded-[3px] transition-opacity focus-ring",
                                title: `Add post on ${day.dateKey}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                    className: "w-3.5 h-3.5 stroke-[1.5]"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Calendar/WeekGrid.tsx",
                                    lineNumber: 130,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/Calendar/WeekGrid.tsx",
                                lineNumber: 124,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, day.dateKey, true, {
                        fileName: "[project]/src/components/Calendar/WeekGrid.tsx",
                        lineNumber: 105,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0));
                })
            }, void 0, false, {
                fileName: "[project]/src/components/Calendar/WeekGrid.tsx",
                lineNumber: 102,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-7 flex-1 auto-rows-fr bg-[#E9E7E2] dark:bg-[#323230] gap-px border-b border-[#E9E7E2] dark:border-[#323230]",
                children: weekDays.map((day)=>{
                    const dayPosts = postsByDate[day.dateKey] || [];
                    dayPosts.sort((a, b)=>(a.scheduledTime || '').localeCompare(b.scheduledTime || ''));
                    const isTarget = dragOverDate === day.dateKey;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        id: `week-col-${day.dateKey}`,
                        onDragOver: (e)=>handleDragOver(e, day.dateKey),
                        onDragLeave: ()=>setDragOverDate(null),
                        onDrop: (e)=>handleDrop(e, day.dateKey),
                        onClick: (e)=>{
                            if (e.target === e.currentTarget) {
                                openCreateModalForDate(day.dateKey);
                            }
                        },
                        className: `flex flex-col p-2 space-y-1.5 overflow-y-auto transition-colors ${day.isToday ? 'bg-[#FFFFFF] dark:bg-[#232321]' : 'bg-[#FFFFFF] dark:bg-[#232321]'} ${isTarget ? 'bg-[#EFECE6] dark:bg-[#2B2B28]' : ''}`,
                        children: dayPosts.map((post)=>{
                            const primaryPlat = post.platforms[0] || 'instagram';
                            const platToken = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PLATFORM_STYLE_TOKENS"][primaryPlat.toLowerCase()];
                            const platColor = platToken?.dotColor || '#6F6C66';
                            const isSelected = selectedPost?.id === post.id;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                id: `week-post-${post.id}`,
                                draggable: true,
                                onDragStart: (e)=>handleDragStart(e, post.id),
                                onClick: (e)=>{
                                    e.stopPropagation();
                                    setSelectedPost(post);
                                },
                                style: {
                                    borderLeftColor: isSelected ? undefined : platColor
                                },
                                className: `text-left p-2 rounded-[4px] cursor-pointer text-xs transition-colors select-none focus-ring ${isSelected ? 'border-l-2 border-l-[#2C6E56] dark:border-l-[#5AA88C] bg-[#EFECE6] dark:bg-[#2B2B28]' : 'border-l-2 bg-[#F7F6F3] dark:bg-[#1C1C1A] hover:bg-[#EFECE6] dark:hover:bg-[#2B2B28]'} ${draggedPostId === post.id ? 'opacity-30' : ''}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between gap-1 mb-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[11px] text-[#6F6C66] dark:text-[#9A978F] tabular-nums font-normal",
                                                children: post.scheduledTime || '18:00'
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Calendar/WeekGrid.tsx",
                                                lineNumber: 186,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-2 h-2 rounded-full shrink-0",
                                                style: {
                                                    backgroundColor: platColor
                                                },
                                                title: primaryPlat
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Calendar/WeekGrid.tsx",
                                                lineNumber: 189,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Calendar/WeekGrid.tsx",
                                        lineNumber: 185,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-normal text-xs text-[#2A2925] dark:text-[#D9D7D1] line-clamp-2 leading-snug",
                                        children: post.title
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Calendar/WeekGrid.tsx",
                                        lineNumber: 195,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, post.id, true, {
                                fileName: "[project]/src/components/Calendar/WeekGrid.tsx",
                                lineNumber: 169,
                                columnNumber: 19
                            }, ("TURBOPACK compile-time value", void 0));
                        })
                    }, day.dateKey, false, {
                        fileName: "[project]/src/components/Calendar/WeekGrid.tsx",
                        lineNumber: 145,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0));
                })
            }, void 0, false, {
                fileName: "[project]/src/components/Calendar/WeekGrid.tsx",
                lineNumber: 138,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Calendar/WeekGrid.tsx",
        lineNumber: 86,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
];

//# sourceMappingURL=src_components_Calendar_1_3vnxk._.js.map