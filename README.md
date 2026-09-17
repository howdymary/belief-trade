# Belief Trade — Trade Belief.

Three original brand explorations for a product concept where a portfolio expresses a point of view on the future.

## The narrative

**The future starts as someone’s belief.**

A creator starts with a thesis, chooses supported assets and proportions, gives the portfolio an identity, and could eventually package it as a token. Others could inspect the composition and rules before deciding whether to participate. This concept broadens single-asset leveraged tokens into curated portfolio expression; neither the custody nor tokenization infrastructure is implemented here.

The ambition is creative participation and transparent composition. It does not imply universal legal eligibility, permissionless listing of every asset, guaranteed returns, or ownership of assets through these prototypes.

## Routes

- `/belief-trade/` — design comparison gallery
- `/belief-trade/editorial/` — horizontal chapters, chartreuse/ink, oversized typography
- `/belief-trade/studio/` — a clean blue-and-white vertical story
- `/belief-trade/world/` — an original nostalgic illustrated world

The websites include illustrative portfolio details, a manifesto, accessible dialogs, reduced-motion support, mobile layouts, and an original mascot, Bibi. No wallet connections, transactions, token issuance, deposits, analytics, or email collection.

## Design source

[Reusable website prompt](public/design-prompt.md)

[Generated artwork and prompts](public/asset-prompts.md)

The editorial reference is [Grids by Obys](https://www.grids.obys.agency/). The layouts, copy, and artwork are original. The illustrated world's broad inspiration is the sense of discovery in early online games; no game assets are used.

## Development

Requires Node 22.13+ and npm. Run `npm ci`, then `npm run dev`. The app uses React, Vinext, the Sites starter, and the installed Shadcn/Base UI dialog primitive. `npm run build` creates a static export in `out/`; `npx tsc --noEmit` checks types.

The configured base path is `/belief-trade`. GitHub Pages serves the built static files. The production website requires no server, API keys, or private environment variables.
