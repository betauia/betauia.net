# Adding exams

All exams are built from subject folders inside the `/frontend/src/content/exams/` content folder with a given naming scheme. 

## Folder structure

Under the `exams/` folder, every single subdirectory should be named by their subject code, for example `exams/ma178` and `exams/ma179`. This is where all the exams should be stored and it is ignored in git. Every subject on the page is loaded from these folders.

## Naming exams

Exams should be named with the following syntax inside their subject's folder: `year-part-score-nickname.pdf`

Examples:

- `exams/ma178/2021-3-56-spongebob.pdf`
- `exams/ma179/2024-1-100-sigmar.pdf`
- `exams/ma179/2023-2-69-chungus.pdf`

Since the naming scheme uses `-` as a seperator, DO NOT use `-` in names to avoid problems. If you want to have spaces in your nicknames, use underscore `_` which is replaced with space ` ` at when it is rendered.
If anny part of the naming scheme is not relevant to the given subject, then that part is to be replaced with empty square brakcets e.g `[]`
