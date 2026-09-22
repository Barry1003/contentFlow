(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/providers.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Providers",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$neondatabase$2f$auth$2d$ui$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__NeonAuthUIProvider__as__M$3e$__$3c$export__M__as__NeonAuthUIProvider$3e$__ = __turbopack_context__.i("[project]/node_modules/@neondatabase/auth-ui/dist/index.mjs [app-client] (ecmascript) <locals> <export NeonAuthUIProvider as M> <export M as NeonAuthUIProvider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$neon$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/neon.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function Providers({ children }) {
    _s();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Providers.useEffect": ()=>{
            setMounted(true);
        }
    }["Providers.useEffect"], []);
    if (!mounted) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$neondatabase$2f$auth$2d$ui$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__NeonAuthUIProvider__as__M$3e$__$3c$export__M__as__NeonAuthUIProvider$3e$__["NeonAuthUIProvider"], {
        authClient: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$neon$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["neon"].auth,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/app/providers.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_s(Providers, "LrrVfNW3d1raFE0BNzCTILYmIfo=");
_c = Providers;
var _c;
__turbopack_context__.k.register(_c, "Providers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/neon.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "neon",
    ()=>neon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$neondatabase$2f$neon$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@neondatabase/neon-js/dist/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$neondatabase$2f$auth$2f$dist$2f$better$2d$auth$2d$react$2d$adapter$2d$DMizSZtB$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__t__as__BetterAuthReactAdapter$3e$__ = __turbopack_context__.i("[project]/node_modules/@neondatabase/auth/dist/better-auth-react-adapter-DMizSZtB.mjs [app-client] (ecmascript) <export t as BetterAuthReactAdapter>");
;
;
const authUrl = ("TURBOPACK compile-time value", "https://ep-delicate-glade-b4wedf4u.neonauth.c-6.us-east-2.aws.neon.tech/neondb/auth") || '';
const neon = ("TURBOPACK compile-time truthy", 1) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$neondatabase$2f$neon$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])({
    auth: {
        url: authUrl,
        adapter: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$neondatabase$2f$auth$2f$dist$2f$better$2d$auth$2d$react$2d$adapter$2d$DMizSZtB$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__t__as__BetterAuthReactAdapter$3e$__["BetterAuthReactAdapter"])()
    }
}) : "TURBOPACK unreachable";
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_0j7wn5p._.js.map