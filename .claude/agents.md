# Agents Guide — Right Here, Right Now (RhRn)


This file provides guidance for AI coding agents working on this Flutter project.

**Moderation flow update (2026):**
Moderation is now performed by HiveAI by default. Human review is only required for flagged, uncertain, or appealed cases. All AI moderation/classification output should be logged in the moderation_log table for traceability. If a human moderator takes action, that is also logged in moderation_log.

---
## agents.md todo
- as an agent you should add developer notes so the user can understand what the new code does, and how it connects to other parts of the code
- when a new feature is complete, we should log what it is, why it exists, and how it interacts with other parts of the app.
- when a feature is ready to be tested, launch the Chrome debugger via **F5** in VS Code (see [Testing & Debugging](#testing--debugging) below) and inspect the debug console for errors before marking the feature done.
- when done with a feature. log it in changelog/ with a new file
- before marking a task as done, check the Problems panel (Ctrl+Shift+M) in VS Code. If any errors or warnings are present, the task is not complete and must be fixed first.
- while making a plan, research online for best practices, tips, tricks, and pitfalls — this helps find well-supported solutions instead of building them ourselves.
- when working on a new feature: create the plan, push it to GitHub, execute the plan, then wait for the user to test before committing.

---

## Implementation Plan Standard

When a user asks for a plan (or when scoping work before starting implementation), write it to `doc/<feature_name>_plan.md` and follow this template exactly. The goal is to make every plan readable by a non-engineer and reviewable before a single line of code is written.

### Required sections, in order

---

#### 1. Header block

```
# <Feature Name> — Implementation Plan

**Feature:** One-sentence description of what is being built.
**Problem:** The real-world pain point this solves.
**Solution:** How the feature solves it in plain language.

**Overall difficulty:** Easy / Medium / Hard (N / 5)
**Estimated effort:** X–Y days for an experienced Flutter developer.
<One sentence explaining where the complexity sits.>
```

The difficulty rating uses this scale:
- **1–2 Easy:** Mechanical additions (new constant, new enum value, glue code). Low risk of breakage.
- **3 Medium:** Requires architectural thought, new service classes, lifecycle wiring, or integration between two unfamiliar systems. Some risk if done carelessly.
- **4–5 Hard:** Background platform channels, cryptographic logic, complex state machines, or work that touches many files simultaneously with hard-to-test interactions.

---

#### 2. Decisions & Tradeoffs

*This is the most important section for collaboration.* List every meaningful design option that was considered, which one was chosen, which were rejected, and the explicit reasoning. This lets the developer push back on choices before implementation begins.

Format:

```markdown
## Decisions & Tradeoffs

### <Decision title>
**Chosen:** <option>  
**Reason:** <why this option was selected>

**Alternatives considered:**

| Option | Why rejected |
|--------|--------------|
| Option A | <reason> |
| Option B | <reason> |
```

Examples of decisions worth documenting: persistence library choice, queue flush trigger strategy, whether to use a background isolate, whether to add a new screen vs. extending an existing one, how to handle the web platform guard.

---

#### 3. Glossary

Define every technical term used in the document that a developer unfamiliar with Flutter, Hive, Riverpod, or this codebase would need to look up. Aim for one-sentence plain-English definitions.

```markdown
## Glossary

| Term | Meaning in this document |
|------|--------------------------|
| **Term** | Plain-English definition. |
```

---

#### 4. Scope

Always call out all three platforms explicitly. Never leave platform behaviour implicit.

```markdown
## Scope

| Platform | Supported | Notes |
|----------|-----------|-------|
| Android  | Yes / No  | ... |
| iOS      | Yes / No  | ... |
| Web/PWA  | Yes / No  | ... |

<One paragraph explaining any scope boundaries or exclusions.>
```

---

#### 5. New Dependencies

List every new `pubspec.yaml` entry with a comment explaining why it was chosen over the obvious alternative.

```markdown
## New Dependencies (`pubspec.yaml`)

\```yaml
package_name: ^x.y.z   # Why this package, not the obvious alternative
\```
```

---

#### 6. New Files

One subsection per new file. Each subsection includes:
- The file path
- What the class/service does in one sentence
- A plain-English field/method list (no Dart syntax needed)
- Any non-obvious design note

---

#### 7. Modified Files

One subsection per changed file. Each subsection includes:
- What changes and why
- Code snippets for non-trivial logic (pseudocode is fine)
- Explicit mention of any `kIsWeb` guards added

---

#### 8. Data Flow Diagram

An ASCII diagram showing the happy-path data flow from user action to final state. Include at least one branch (e.g., online vs. offline, logged-in vs. guest). Shows every service/repository/provider that data passes through.

---

#### 9. Error Handling & Edge Cases

A table covering every meaningful failure mode.

```markdown
## Error Handling & Edge Cases

| Scenario | Handling |
|----------|----------|
| <what goes wrong> | <how the code responds> |
```

Minimum scenarios to consider: network failure mid-action, app killed mid-action, permission denied, unauthenticated user hitting an authenticated endpoint, web platform receiving native-only code.

---

#### 10. Test Impact

Explicitly answer: do existing tests need to change? Do new tests need to be written?

```markdown
## Test Impact

| Test file | Action needed | Reason |
|-----------|---------------|--------|
| `test/widget_test.dart` | No change / Update / New test | <reason> |
| `test/upload_smoke_test.dart` | No change / Update / New test | <reason> |
```

If a new unit-testable service is added (pure logic, no Flutter widgets), note that a unit test file should be created at `test/<service_name>_test.dart`.

---

#### 11. File Change Summary

A quick reference table for reviewers.

```markdown
## File Change Summary

| File | Change type | Difficulty |
|------|-------------|------------|
| `path/to/file.dart` | New / Edit | Easy / Medium / Hard |
```

---

#### 12. Difficulty Breakdown

One paragraph per difficulty tier (Easy / Medium / Hard) explaining what is in that tier and why. This is where the agent shows its reasoning, not just its conclusions. The developer should be able to read this and decide whether they agree with the estimates or want to de-risk a "Medium" before implementation starts.

---

#### 13. Out of Scope

A bullet list of related things that were explicitly *not* built and why, plus a note on whether they are future-work candidates.

```markdown
## Out of Scope (future work)

- **Feature X** — reason it was excluded. May be revisited in Phase N.
```

---

#### 14. Human Steps

A numbered checklist of every manual task a human must complete before the feature works — things that cannot be done by an agent or committed to the repo. Include exact dashboard paths and commands.

Minimum items to consider: registering or retrieving API keys, setting Edge Function secrets, running SQL migrations manually, setting database config values (`ALTER DATABASE`), deploying Edge Functions, enabling Postgres extensions, and any third-party account setup.

```markdown
## Human Steps (manual tasks required before this feature works)

### 1. <Task title>
- Where to go (e.g., Supabase Dashboard → Settings → API)
- What value to copy or set
- Why it is needed

### 2. <Next task>
...
```

---

### Plan checklist (agent self-review before sharing)

Before presenting a plan to the user, verify:
- [ ] Every section above is present
- [ ] Decisions & Tradeoffs lists at least two alternatives for each major design choice
- [ ] Glossary defines every non-obvious term used in the document
- [ ] Scope table explicitly addresses Android, iOS, and Web/PWA
- [ ] Test Impact answers: existing tests, new unit tests, and manual device tests
- [ ] Data flow diagram has at least one branch
- [ ] Error handling table has at least five rows
- [ ] Human Steps lists every manual task (API keys, secrets, SQL, deploys) with exact dashboard paths
- [ ] Out of Scope is present even if it is short


## Project Overview

**App name:** Right Here, Right Now (RhRn)  
**Package name:** `rh_rn_flutter`  
**Purpose:** Crowdsourced, real-time photo GPS gallery for emergency services, insurance agencies, and disaster response teams. Users upload geotagged incident photos to a live map. Photos expire from public view after 7 days; paid subscribers retain full archive access.

**Full context:** See [RhRn_RFP.md](RhRn_RFP.md) for requirements and [RhRn_BuildPlan.md](RhRn_BuildPlan.md) for the phased build checklist.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Flutter (Android, iOS, Web/PWA) |
| State management | Riverpod (preferred) |
| Routing | `go_router` |
| Map | `flutter_map` + OpenStreetMap tiles |
| Clustering | `flutter_map_marker_cluster` |
| Backend | Supabase (PostgreSQL, Auth, Storage, Realtime, Edge Functions) |
| Payments | Stripe (`flutter_stripe`) |
| GPS | `geolocator` + `permission_handler` |
| Image capture | `image_picker` |
| Image caching | `cached_network_image` (in use across all screens) |
| AI tagging | OpenAI GPT-4o-mini via `tag_photo` Edge Function |
| AI moderation | OpenAI Moderation API (pre-filter) + HiveAI (flagging pipeline) |
| Email | Resend (via Supabase Edge Function) |
| Dart SDK | `^3.11.0` |

> **Note:** Run `flutter pub get` after cloning. All core Phase 2 dependencies are already in `pubspec.yaml`. Use `dart run build_runner build --delete-conflicting-outputs` after editing any `@freezed` model.

---

## Folder Structure

All application code lives under `lib/`. Use this structure and do not deviate:

```
lib/
  main.dart                  # Entry point — RhRnApp (MaterialApp.router + ProviderScope)
  features/
    map/
      map_screen.dart        # MapScreen: OSM tiles, cluster markers, tag filter drawer, photo card
      map_providers.dart     # mapPhotosProvider (Supabase live fetch)
    upload/                  # Photo upload flow, GPS capture, email prompt
    auth/                    # Magic link / email+password auth, session
    gallery/                 # Paid archive browser (tag overlay, TagEditSheet)
    admin/                   # Admin panel (web-only route, is_admin gated; tag editing)
    moderation/              # Moderation queue UI
    profile/                 # User profile screen
  models/
    user.dart
    photo.dart               # includes tags List<String>? field
    photo_tag.dart           # PhotoTag (junction table model)
    cluster_point.dart       # ClusterPoint — client-side cluster {lat, lng, count, photoIds}
    moderation_log.dart
    subscription.dart
    pending_upload.dart      # Offline queue item (native only)
  repositories/
    user_repository.dart
    photo_repository.dart    # includes updateTags(photoId, tags)
    subscription_repository.dart
    local_photo_cache.dart   # Local disk cache helpers
  services/
    supabase_service.dart    # Supabase client init + singleton
    stripe_service.dart
    location_service.dart
    image_service.dart
    exif_service.dart        # EXIF orientation reading
    connectivity_service.dart       # connectivity_plus wrapper
    connectivity_body_attr.dart     # Web-only body attribute helper
    connectivity_body_attr_stub.dart
    offline_queue_service.dart      # Hive-backed offline queue (native only)
  shared/
    widgets/
      tag_edit_sheet.dart    # Reusable 19-chip FilterChip modal for editing photo tags
    theme/                   # App theme, colours, typography
      theme_provider.dart
    router/                  # go_router configuration
    constants.dart           # SupabaseTables, SupabaseBuckets, AppConstants (incl. photoTaxonomy), StripePlans
    env.dart
    providers/
      tag_filter_provider.dart  # tagFilterProvider, filteredMapPhotosProvider, TagFilterNotifier

supabase/
  migrations/
    001_create_tables.sql    # All 4 tables, enums, handle_new_user trigger
    002_rls_policies.sql     # RLS enable, is_admin()/is_paid() helpers, per-tier policies
    003_storage_buckets.sql  # photos + thumbnails buckets + storage object policies
    004_cron_schedule.sql    # pg_cron hourly schedule calling archive_photos Edge Function
    006_nullable_user_id.sql # photos.user_id nullable for guest uploads
    008_photos_anon_insert_policy.sql  # anon role insert policy for guest uploads
    009_photos_anon_update_email.sql   # anon UPDATE policy for submitted_email
    011_photo_tags.sql       # tags text[] column, trigger_tag_photo pg_net trigger, RLS UPDATE
    # (additional migrations 005–028 applied; see Supabase Dashboard for full history)
  functions/
    import_map.json          # Shared Deno import map (@supabase/supabase-js, stripe)
    archive_photos/index.ts  # Sets is_archived=true on photos older than 7 days
    stripe_webhook/index.ts  # Stripe subscription lifecycle handler
    create_subscription/index.ts  # Creates Stripe customer + subscription
    send_email/index.ts      # Resend transactional emailer
    tag_photo/index.ts       # AI tagging: OpenAI Moderation + GPT-4o-mini → photos.tags PATCH

.github/
  workflows/
    ci.yml                   # GitHub Actions: analyze+test → build_web (Firebase Hosting deploy) → build_android (APK)

web/
  index.html                 # Branded loading screen (dark bg, spinner, rotating taglines, flutter-first-frame dismissal)
  manifest.json              # PWA manifest
firebase.json                # Firebase Hosting config (SPA rewrite, cache headers)
```

---

## Data Models

Match these exact field names from the RFP when writing Dart model classes and Supabase table schemas:

```
User:         id, email, created_at, account_type, is_admin, is_flagged,
              stripe_customer_id, stripe_subscription_id

Photo:        id, user_id, url, thumbnail_url, lat, lng, uploaded_at,
              is_approved, is_archived, is_deleted, context_note,
              tags text[] (default '{notag}'), submitted_email

PhotoTag:     id, photo_id, tag  (junction table — photo_tags)

ClusterPoint: lat, lng, count, photoIds  (client-side cluster model)

ModerationLog: id, photo_id, admin_id, action, note, timestamp

Subscription: id, user_id, stripe_subscription_id, status, plan,
              current_period_end
```

`account_type` is an enum: `temp | registered | paid`
`action` (ModerationLog) is an enum: `approved | rejected | deleted`

`tags` is a `text[]` column on `photos`. AI assigns up to 4 values from the 19-value taxonomy defined in `AppConstants.photoTaxonomy`. The special value `notag` indicates the AI did not produce a result (network error, moderation block, or not yet processed). Do not treat `notag` as a real tag in UI — filter it out when displaying tags to users.

---

## Code Conventions

- Use `freezed` + `json_serializable` for model classes (immutability + JSON)
- Use Riverpod `AsyncNotifierProvider` for async state (data fetching, auth)
- Use `go_router` with named routes; define all routes in `lib/shared/router/`
- Keep Supabase calls inside repository classes only — never call Supabase directly from widgets
- Prefix all Supabase table names with the constant in `constants.dart` (e.g. `SupabaseTables.photos`)
- All money amounts are in the smallest currency unit (cents) per Stripe convention
- Never commit `.env` files or API keys — use `--dart-define` or a `.env` loader with `.gitignore`
- Admin-only routes must check `user.is_admin` server-side via Supabase RLS, not only client-side

---

## Environment Variables

Local development uses a **`.env` file** in the project root (excluded from git via `.gitignore`). VS Code's `launch.json` passes it to Flutter via `--dart-define-from-file=.env`, so F5 debug picks up the values automatically. CI passes the same variables as `--dart-define` flags from GitHub Actions secrets.

Expected variables:

```
SUPABASE_URL
SUPABASE_ANON_KEY
STRIPE_PUBLISHABLE_KEY
```

> **Never commit `.env`** — it contains live keys. The file is loaded by `lib/shared/env.dart` via `String.fromEnvironment`.

Sensitive keys (Stripe secret, Supabase service role) must only ever live in Supabase Edge Function environment variables — never in the Flutter client.

**Supabase Edge Function secrets** (set in Dashboard -> Functions -> Secrets or via `supabase secrets set`):

```
STRIPE_SECRET_KEY         # Stripe secret key (sk_live_... / sk_test_...)
STRIPE_WEBHOOK_SECRET     # Stripe webhook signing secret (whsec_...)
STRIPE_PRICE_MONTHLY      # Stripe price ID for monthly plan (price_xxx)
STRIPE_PRICE_ANNUAL       # Stripe price ID for annual plan (price_xxx)
RESEND_API_KEY            # Resend API key — get from resend.com (re_xxx...)
```

> The `SUPABASE_SERVICE_ROLE_KEY` and `SUPABASE_URL` are automatically injected into Edge Functions by the platform -- do not set them manually.

**GitHub Actions secrets** (required for CI builds — set in repository Settings → Secrets → Actions):

```
SUPABASE_URL              # Passed as --dart-define to Flutter builds
SUPABASE_ANON_KEY         # Passed as --dart-define to Flutter builds
STRIPE_PUBLISHABLE_KEY    # Passed as --dart-define to Flutter builds
```

---

## Constants Reference

All shared constants live in [`lib/shared/constants.dart`](lib/shared/constants.dart). **Never use raw strings or magic numbers** — always import from here.

| Class | Constant | Value | Purpose |
|-------|----------|-------|---------|
| `SupabaseTables` | `users` | `'users'` | Supabase table name |
| `SupabaseTables` | `photos` | `'photos'` | Supabase table name |
| `SupabaseTables` | `moderationLog` | `'moderation_log'` | Supabase table name |
| `SupabaseTables` | `subscriptions` | `'subscriptions'` | Supabase table name |
| `SupabaseBuckets` | `photos` | `'photos'` | Supabase Storage bucket |
| `SupabaseBuckets` | `thumbnails` | `'thumbnails'` | Supabase Storage bucket |
| `AppConstants` | `moderationAutoApproveThreshold` | `3` | Approvals before auto-trust (legacy — AI moderation now primary) |
| `AppConstants` | `photoVisibilityDays` | `7` | Days before archival |
| `AppConstants` | `photoTaxonomy` | (19-value list) | Full flat list of all valid tag values |
| `AppConstants` | `incidentTags` | (subset) | Incident-type tags (fire, flood, crash, etc.) |
| `AppConstants` | `unitTags` | (subset) | Responding-unit tags (police, fire_truck, ambulance, etc.) |
| `AppConstants` | `socialTags` | (subset) | Social/other tags (traffic, road_closed, etc.) |
| `StripePlans` | `monthly` | `'monthly'` | Passed to `create_subscription` Edge Function |
| `StripePlans` | `annual` | `'annual'` | Passed to `create_subscription` Edge Function |

Example usage:
```dart
import 'package:rh_rn_flutter/shared/constants.dart';

// In a repository:
supabase.from(SupabaseTables.photos).select();

// In a query filter:
final cutoff = DateTime.now().subtract(
  const Duration(days: AppConstants.photoVisibilityDays),
);
```

---

## Testing & Debugging

When a feature is ready to test:

1. Press **F5** in VS Code (or run **Debug: Start Debugging** from the Command Palette).
2. VS Code will launch the app on **Chrome** in debug mode using the configuration in `.vscode/launch.json`, which passes `.env` via `--dart-define-from-file=.env`.
3. Inspect the **Debug Console** panel in VS Code for Dart/Flutter errors, and the **browser DevTools console** for any web-layer issues.
4. Common things to check:
   - No `DartError` / unhandled exceptions in the debug console.
   - Supabase init log: `***** Supabase init completed *****`
   - No `Platform._operatingSystem` errors (Stripe must be guarded with `if (!kIsWeb)`).
5. Fix any errors before marking the feature complete and logging it in [Current State](#current-state).

### Static analysis — run before every push

CI runs `flutter analyze lib/` as the first step of the `analyze_and_test` job and **fails with exit code 1** if there are any issues, blocking all downstream jobs (build, deploy). Run this locally before committing:

```bash
flutter analyze lib/
```

- Exit code `0` = clean, safe to push.
- Any `info`, `warning`, or `error` line = CI will fail — fix before pushing.

**Common recurring lint:** `unnecessary_underscores` — Dart 3+ allows `_` to be reused as a discard in the same parameter list, so `__` / `___` are flagged. Replace them with `_`.

### Pre-push hook — automatic local checks

A pre-push hook at `tool/hooks/pre-push` runs `flutter analyze lib/` and `flutter test test/widget_test.dart` automatically on every `git push`, aborting the push if either fails. This catches CI-blocking issues before they reach GitHub.

**One-time install per developer (copy from the committed script):**

```bash
# macOS / Linux / Git Bash on Windows
cp tool/hooks/pre-push .git/hooks/pre-push
chmod +x .git/hooks/pre-push   # macOS / Linux only
```

```powershell
# Windows PowerShell
Copy-Item tool/hooks/pre-push .git/hooks/pre-push
```

> **Windows note:** The hook uses `#!/bin/sh` (not `#!/usr/bin/env bash`) so it runs via Git for Windows' built-in shell without requiring WSL.

After installing, every `git push` will run the checks automatically. To bypass in an emergency: `git push --no-verify` (use sparingly — CI will still catch it).

> `flutter_stripe` is **not supported on web**. `StripeService.initialize()` is already guarded with `if (!kIsWeb)` in `main.dart` — do not remove this guard.

### Offline Upload Queue — native-only testing

> **Chrome/F5 is not sufficient for this feature.** All offline-queue code is guarded with `if (kIsWeb) return;` and will be silently skipped in the browser. You must test on Android or iOS.

**Recommended test device:** Android emulator (API 30+) via `flutter run -d <emulator-id>`.

**Steps to verify the offline queue works:**

1. Launch the app on an Android emulator or physical device.
2. Confirm the Hive box initialises without error — look for no exceptions after `SupabaseService.initialize()` in the debug console.
3. **Simulate offline → enqueue:**
   - In the Android emulator: open **Extended Controls** (⋯) → **Cellular** → set **Network type** to `None`, or enable **Airplane mode** in the device quick-settings.
   - Tap the upload FAB, pick an image, capture GPS, tap Submit.
   - Expected: sheet closes with the snackbar `"Photo saved — will upload when signal returns."` and the FAB shows a badge with count `1`.
4. **Restore connectivity → flush:**
   - Re-enable network in emulator Extended Controls (or turn off airplane mode).
   - Expected: `UploadQueueService.processQueue()` fires automatically; badge drops to `0`; success snackbar shows `"1 queued photo uploaded"`; map refreshes.
5. **Persist across restart:**
   - Enqueue a photo while offline, then fully close the app (don't just background it).
   - Reopen the app with network restored.
   - Expected: Hive box loads the queued item on startup and the flush runs on `AppLifecycleState.resumed`.
6. **PWA guard check:**
   - Press F5 to launch in Chrome.
   - Confirm the FAB badge is absent and no Hive/offline-queue code runs (`kIsWeb` guard).
   - The upload flow should behave exactly as before (online-only path).

---

## Key Business Rules

1. **Photo visibility:** Free-tier map query filters `uploaded_at > now() - interval '7 days'` (`AppConstants.photoVisibilityDays`). Paid tier has no date filter.
2. **Moderation flow (AI-first):** All uploads are auto-approved (`is_approved = true`) at insert time. The `tag_photo` Edge Function runs the image through the **OpenAI Moderation API** immediately after INSERT; flagged images are set to `is_approved = false` and assigned `tags = ['notag']`. HiveAI handles further classification of flagged content. Human review is only for appealed or uncertain cases. Do **not** build any client-side "pending review" gate for regular uploads — they appear on the map instantly.
3. **Recency bypass on map:** Photos uploaded within the last 5 minutes are always shown on the map regardless of the active tag filter, giving the uploader immediate visual confirmation while AI tagging runs.
4. **Temporary accounts:** Created on first upload when the user provides an email but has no session. Auth is email magic link.
5. **Photo archival:** A Supabase scheduled Edge Function sets `is_archived = true` after `AppConstants.photoVisibilityDays` days. Do not rely on client-side filtering alone.
6. **Admin panel:** Render only on the web platform (`kIsWeb`). Gate all admin API calls with `is_admin` RLS policy.
7. **Tag taxonomy:** 19 predefined values grouped as incident types, responding units, and social/other. Defined in `AppConstants.photoTaxonomy`, `incidentTags`, `unitTags`, `socialTags`. Always use these constants — never raw strings.

---

## Current State

- **Phase 1 Tasks 1-3 complete.** All foundation work done.
  - `lib/main.dart` -- `RhRnApp` with RhRn theme, `ProviderScope`, `SupabaseService.initialize()`, `StripeService.initialize()`, `MaterialApp.router`.
  - `lib/shared/constants.dart` -- `SupabaseTables`, `SupabaseBuckets`, `AppConstants`, `StripePlans` defined.
  - `lib/shared/env.dart` -- `Env` class for `--dart-define` env vars.
  - `lib/shared/theme/app_theme.dart` -- `AppTheme.light` / `AppTheme.dark` (Material 3, RhRn brand colours).
  - `lib/shared/router/router.dart` -- all named routes wired, auth + admin + paid redirects live.
- **Phase 2 complete (Tasks 4-8).** All core features built:
  - `lib/models/` -- all four models use `freezed` + `json_serializable`; generated files committed.
  - `lib/services/supabase_service.dart` -- `SupabaseService.initialize()` wired into `main()`.
  - `lib/services/location_service.dart` -- `geolocator` GPS with permission flow.
  - `lib/services/image_service.dart` -- `image_picker` camera/gallery.
  - `lib/features/auth/` -- `authStateProvider`, `currentUserProvider`, `AuthNotifier`, `AuthScreen`.
  - `lib/features/map/` -- `MapScreen` (OSM tiles + cluster markers + photo card bottom sheet) + `mapPhotosProvider`.
  - `lib/features/upload/` -- `UploadSheet` (3-step: pick -> GPS -> submit).
  - `lib/repositories/photo_repository.dart` -- full Supabase implementation (fetch map/archive/admin/queue, upload, soft-delete, approve, reject).
- **Supabase backend schema complete (Task 3):**
  - `supabase/migrations/001_create_tables.sql` -- all 4 tables + enums + `handle_new_user` trigger.
  - `supabase/migrations/002_rls_policies.sql` -- RLS + `is_admin()` / `is_paid()` helpers + per-tier policies.
  - `supabase/migrations/003_storage_buckets.sql` -- `photos` + `thumbnails` buckets + storage policies.
  - `supabase/migrations/004_cron_schedule.sql` -- pg_cron hourly schedule for `archive_photos`.
  - `supabase/functions/archive_photos/index.ts` -- Deno archival cron function.
  - `supabase/functions/stripe_webhook/index.ts` -- Stripe subscription lifecycle handler.
  - `supabase/functions/import_map.json` -- shared Deno import map.
- **Phase 3 complete (Tasks 9-11).** Stripe + Admin + Moderation built:
  - `lib/services/stripe_service.dart` -- `initialize()` + `presentSubscriptionPaymentSheet(plan)` via PaymentSheet.
  - `supabase/functions/create_subscription/index.ts` -- creates Stripe customer + subscription, returns PaymentSheet params.
  - `lib/repositories/subscription_repository.dart` -- `fetchByUserId` (active subscription).
  - `lib/repositories/user_repository.dart` -- `fetchById`, `update`, `fetchAll`, `setAccountType`, `setFlag`.
  - `lib/features/auth/subscription_providers.dart` -- `currentUserModelProvider`, `isPaidUserProvider`, `isAdminProvider`.
  - `lib/features/gallery/gallery_screen.dart` -- paid archive grid; free users see Stripe upgrade prompt.
  - `lib/features/moderation/moderation_screen.dart` -- approve/reject queue with note dialog.
  - `lib/features/admin/admin_screen.dart` -- web-only admin panel (Users tab + Photos tab + Moderation link).
  - `lib/shared/constants.dart` -- `StripePlans.monthly` / `StripePlans.annual` added.
- Widget tests pass (`flutter test test/widget_test.dart`).
- **Phase 4 complete (Tasks 12-14).** Quality & Deployment built:
  - `supabase/functions/send_email/index.ts` -- Resend transactional email Edge Function; 4 email types with HTML templates.
  - `supabase/functions/stripe_webhook/index.ts` -- extended to call `send_email` (subscription_confirmed) on subscription activation.
  - `supabase/migrations/005_welcome_email_webhook.sql` -- pg_net trigger fires `send_email` (welcome) on new user creation.
  - `web/manifest.json` -- PWA manifest: name "Right Here, Right Now", short_name "RhRn", theme_color `#1565C0`, categories `["utilities","emergency"]`.
  - `web/index.html` -- PWA meta tags: viewport, theme-color, Apple Web App meta, Open Graph, correct title.
  - `.github/workflows/ci.yml` -- GitHub Actions CI: analyze+test job, build_web job (offline-first PWA artifact), build_android job (debug APK artifact), deploy_web stub.
- **AI photo tagging (changelog 018):**
  - `supabase/migrations/011_photo_tags.sql` — `tags text[]` column, `private.trigger_tag_photo()` pg_net trigger fires on every photo INSERT.
  - `supabase/functions/tag_photo/index.ts` — OpenAI Moderation API pre-filter → GPT-4o-mini classification (up to 4 tags from 19-value taxonomy) → `photos.tags` PATCH. Flagged images: `is_approved=false`, `tags=['notag']`. Fire-and-forget from Flutter client.
  - `lib/shared/providers/tag_filter_provider.dart` — `tagFilterProvider` (NotifierProvider), `filteredMapPhotosProvider` (wraps `mapPhotosProvider`). Recency bypass: photos <5 min old always shown regardless of filter.
  - `lib/shared/widgets/tag_edit_sheet.dart` — 19-chip `FilterChip` modal, used in gallery + admin.
  - `lib/shared/constants.dart` — `AppConstants.photoTaxonomy`, `incidentTags`, `unitTags`, `socialTags` added.
  - `lib/features/map/map_screen.dart` — `endDrawer: _TagFilterDrawer()`, filter badge button, `filteredMapPhotosProvider` in use, no-results banner.
  - Human steps: apply migration 011, set DB config vars, add `OPENAI_API_KEY` Edge Function secret, deploy `tag_photo`.
- **Performance & UX optimisations (changelog 019):**
  - `cached_network_image` activated — all 10 `Image.network`/`NetworkImage` calls replaced with `CachedNetworkImage`/`CachedNetworkImageProvider` across `map_screen.dart`, `gallery_screen.dart`, `profile_screen.dart`, `admin_screen.dart`, `moderation_screen.dart`.
  - Error states standardised — 6 raw `Text('Error: $e')` widgets replaced with icon + message + `FilledButton` retry (calls `ref.invalidate(provider)`).
  - `_sortedPhotos` memoisation in `MapScreen` — sorted list computed once per data emission, not on every pan/zoom rebuild.
  - `const` constructors added to `_LogoButton` and `_AccountButton`.
- **PWA loading screen (2026-03-27):**
  - `web/index.html` — branded dark loading overlay (#111827) with blue spinner, app name, rotating taglines (cycle every 2s), native-app hint. Dismissed via `flutter-first-frame` CustomEvent with 300ms fade. Service worker auto-update pattern (`SKIP_WAITING` + `controllerchange` reload) in place.
- **Upload flow rebuilt (post-Phase 4):**
  - `lib/features/upload/upload_result.dart` — new `UploadResult` enum (`published` / `pendingReview`) returned to `MapScreen`.
  - `lib/features/upload/upload_sheet.dart` — full rewrite; state-machine (`_UploadStep` enum); image picker fires first, auth check comes after; guest uploads supported (`forceQueue=true`); in-sheet "pending review" banner for guests.
  - `lib/repositories/photo_repository.dart` — `upload()` accepts nullable `userId` and `forceQueue` flag; guest photos always land in moderation queue.
  - `lib/features/map/map_screen.dart` — `_onUploadFab()` removes early auth redirect; inspects `UploadResult` to show correct snackbar and conditionally refresh `mapPhotosProvider`.
  - `supabase/migrations/006_nullable_user_id.sql` — drops `NOT NULL` on `photos.user_id`; re-adds FK as `ON DELETE SET NULL`.
- **Firebase Hosting deployment configured:**
  - `firebase.json` -- public dir `build/web`, SPA rewrite (`**` → `/index.html`), cache headers (no-cache on `flutter_service_worker.js` and `manifest.json`, immutable on JS/CSS/WASM/assets).
  - `.firebaserc` -- placeholder `YOUR_FIREBASE_PROJECT_ID`; replace with real Firebase project ID before first deploy.
  - `.github/workflows/ci.yml` -- `deploy_web` job activated; uses `FirebaseExtended/action-hosting-deploy@v0`; triggers on push to `main` only; requires `FIREBASE_SERVICE_ACCOUNT` GitHub secret and `FIREBASE_PROJECT_ID` repo variable.
- **Bug fix — guest upload RLS (migration 008):**
  - `supabase/migrations/008_photos_anon_insert_policy.sql` — adds `"photos: anon insert (guest)"` policy allowing the Supabase `anon` role to insert rows with `user_id IS NULL`. Fixes `PostgrestException code: 42501` for unauthenticated uploads. Migration 007 covered storage bucket access but the table-level insert policy was missing (`NULL = NULL` evaluates to NULL in PostgreSQL, failing the prior `auth.uid() = user_id` check). **Must be applied manually in Supabase Dashboard → SQL Editor on hosted projects.**
- **Upload flow v2 (migration 009):**
  - New step order: `pickImage → captureGps → review → submitting → submitEmail → updatingEmail → done`. Photo is committed to Supabase **before** the email step, so skipping email never loses the upload.
  - `lib/features/upload/upload_sheet.dart` — new `updatingEmail` step; `_onReviewSubmit()` is now unconditional (no auth branch); `_submit()` advances guests to `submitEmail` after upload; new `_patchEmail()` method does the PATCH + magic-link send; close button blocked during both `submitting` and `updatingEmail`.
  - `lib/repositories/photo_repository.dart` — `upload()` generates UUID client-side (`uuid` package) and includes `'id': photoId` in the insert so the row ID is known without a `.select()` round-trip; `submittedEmail` removed from `upload()` signature; new `updateSubmittedEmail(photoId, email)` method sends the one-row PATCH.
  - `pubspec.yaml` — `uuid: ^4.5.1` added as a direct dependency.
  - `supabase/migrations/009_photos_anon_update_email.sql` — new anon UPDATE policy scoped to `user_id IS NULL` rows. **Must be applied manually in Supabase Dashboard → SQL Editor.**

---

## Build Plan Progress

Track work against [RhRn_BuildPlan.md](RhRn_BuildPlan.md). The checklist there is the source of truth for what has and hasn't been built.

---

*agents.md v1.6 -- Right Here, Right Now (RhRn) — updated 2026-03-27 (changelogs 015–019, AI tagging, HiveAI moderation, tag filter, image caching, PWA loading screen)*
