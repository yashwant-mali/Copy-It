# CopyIt

A React application for saving links and formatted text/email content with add, update, delete, and copy actions. All data is stored locally in the browser using `localStorage`.

## Features

- Add new link or text/email items
- Preserve formatting, line breaks, and spacing for text content
- Edit existing entries
- Delete items
- Copy the text or link to clipboard with one click
- Responsive, polished UI with dark modern styling
- Separate pages for link/text saving and todo list management

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the URL shown in the terminal to use the app.

## Notes

- This project is front-end only
- Saved items remain available across refreshes in the same browser
- Saved data is kept in browser localStorage, so it will persist after reopening the app on the same browser and same deployed origin
