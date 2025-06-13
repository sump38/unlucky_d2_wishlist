# D2 Wishlist Formatter

This repository contains a Node.js script that converts Destiny 2 Little Light wishlist format (JSON) to DIM (Destiny Item Manager) text format.

## Files

- `wishlist.json` - Source wishlist in Little Light format
- `formatter.js` - Node.js script that performs the conversion
- `d2wishlist_latest.txt` - Generated DIM wishlist (auto-updated by GitHub Actions)

## Usage

### Manual Generation

```bash
# Generate with default filename (d2wishlist_latest.txt)
node formatter.js

# Generate with custom filename
node formatter.js my_custom_wishlist.txt
```

### Automatic Generation

The repository is configured with GitHub Actions to automatically:

1. **Trigger** on pushes that modify `wishlist.json` or `formatter.js`
2. **Generate** the `d2wishlist_latest.txt` file using the formatter
3. **Commit** and push the updated file back to the repository

This ensures `d2wishlist_latest.txt` is always up-to-date with the latest changes to `wishlist.json`.

## Format Conversion

### Input Format (Little Light JSON)
```json
{
  "name": "wishlist name",
  "description": "wishlist description", 
  "data": [
    {
      "hash": 3234363830,
      "plugs": [
        [3643424744],
        [365154968]
      ],
      "tags": ["PVE"]
    }
  ]
}
```

### Output Format (DIM Text)
```
title:wishlist name
description:wishlist description

//notes: tags:pve
dimwishlist:item=3234363830&perks=3643424744,365154968
```

## Features

- **Perk Combinations**: Automatically generates all possible combinations when multiple perks are specified per slot
- **Tag Support**: Converts tags to DIM-compatible notes format
- **Clean Output**: Minimal, DIM-compatible format without unnecessary comments
