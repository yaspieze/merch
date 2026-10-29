# merch

The Yaspieze store. Lives at **store.fngl.ir**.

Eight pieces, each printed with the character in her outfit for the season:
two tees, a hoodie, joggers, a bucket hat, a mug, a canvas tote and a phone
case. Every image is artwork — nothing is typeset onto the garments.

## How it is built

Sources live in `dev/store/` of the main workspace, not here. This repository
only ever contains the generated output in the root:

```
python3 dev/store/build_store.py     # writes "Yaspieze Merch/", then sync it here
```

The build inlines the CSS and the JavaScript, and writes the
Content-Security-Policy from the sha256 hashes of the page's own inline
scripts, so the policy can never drift from the code.

One thing to watch when syncing: the sync mirrors the built folder exactly,
so a file that lives only in this repository (this README, for instance)
gets deleted. Put repository-only files back after syncing.

## Turning on GitHub Pages

One setting, in the repository:

**Settings → Pages → Source → Deploy from a branch → `main` / `/ (root)`**

Then point DNS at it:

```
store.fngl.ir   CNAME   yaspieze.github.io
```

The `CNAME` file in the root already says `store.fngl.ir`, so once the record
propagates GitHub will serve the custom domain and issue the certificate on
its own.

## The shelf follows the calendar

Each season has its own painted banner, with her standing in it in that
season's outfit, and its own weather falling past the page: leaves in
autumn, snow in winter, blossom in spring, light in summer.

Autumn and winter: hoodie, joggers, bucket hat, mug, both tees, phone case.
Spring: bucket hat, canvas tote, both tees, phone case.
Summer: canvas tote, both tees, phone case.

Nothing needs editing when the month turns over — it reads the date.

## Checkout

There is no payment processor wired up. The basket builds an order summary
the buyer copies and sends over Discord or email, because stock and postage
are confirmed by hand. When a Stripe Payment Link exists, it replaces the
`data-checkout` handler in `dev/store/store.js`.
