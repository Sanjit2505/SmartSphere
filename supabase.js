// =========================================================
// SUPABASE CLIENT — Smart City App
// =========================================================

let supabaseClient = null;

function initSupabase() {
    if (typeof supabase !== "undefined" && CONFIG.SUPABASE_URL !== "https://YOUR_PROJECT_ID.supabase.co") {
        supabaseClient = supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);
        console.log("✅ Supabase connected");
        return true;
    } else {
        console.warn("⚠️ Supabase not configured — running in demo mode");
        return false;
    }
}

// Auth helpers
async function signIn(email, password) {
    // Always check demo credentials first (works regardless of Supabase connection)
    const demoUser = DEMO_USERS[email];
    if (demoUser && demoUser.password === password) {
        localStorage.setItem("sc_user", JSON.stringify({ email, role: demoUser.role, name: demoUser.name }));
        return { data: demoUser, error: null };
    }

    // If not a demo user, try real Supabase auth
    if (!supabaseClient) {
        return { data: null, error: { message: "Invalid credentials" } };
    }
    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
    if (data?.user) {
        const role = data.user.user_metadata?.role || "user";
        localStorage.setItem("sc_user", JSON.stringify({ email, role, name: data.user.user_metadata?.name || email }));
    }
    return { data, error };
}

async function signOut() {
    localStorage.removeItem("sc_user");
    if (supabaseClient) await supabaseClient.auth.signOut();
    window.location.href = "index.html";
}

function getCurrentUser() {
    const raw = localStorage.getItem("sc_user");
    return raw ? JSON.parse(raw) : null;
}

function requireAuth(allowedRoles = []) {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = "index.html";
        return null;
    }
    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        window.location.href = "index.html";
        return null;
    }
    return user;
}

// Real-time subscription helper
function subscribeToTable(table, callback) {
    if (!supabaseClient) return null;
    return supabaseClient
        .channel(`public:${table}`)
        .on("postgres_changes", { event: "*", schema: "public", table }, callback)
        .subscribe();
}

// Generic DB helpers
async function dbInsert(table, data) {
    if (!supabaseClient) {
        console.log(`[Demo] INSERT into ${table}:`, data);
        return { data, error: null };
    }
    return await supabaseClient.from(table).insert(data).select();
}

async function dbSelect(table, filters = {}) {
    if (!supabaseClient) {
        console.log(`[Demo] SELECT from ${table}:`, filters);
        return { data: [], error: null };
    }
    let query = supabaseClient.from(table).select("*");
    for (const [key, val] of Object.entries(filters)) {
        query = query.eq(key, val);
    }
    return await query.order("created_at", { ascending: false }).limit(50);
}

async function dbUpdate(table, match, updates) {
    if (!supabaseClient) {
        console.log(`[Demo] UPDATE ${table}:`, match, updates);
        return { data: updates, error: null };
    }
    return await supabaseClient.from(table).update(updates).match(match);
}

async function dbUpsert(table, data, options = {}) {
    if (!supabaseClient) {
        console.log(`[Demo] UPSERT into ${table}:`, data);
        return { data, error: null };
    }
    return await supabaseClient.from(table).upsert(data, options);
}
