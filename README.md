# CRUDS — Product Management App

A lightweight product management application built with **HTML, CSS, and vanilla JavaScript**. It provides a simple interface for creating, viewing, updating, deleting, and searching product records.

## Features

- **Create products** with a title, price, taxes, ads, discount, and category.
- **Create multiple products** in one operation using the Count field.
- **Calculate the total price** automatically using `Price + Taxes + Ads - Discount`.
- **View products** in a table with their calculated totals.
- **Update product details** after selecting a record.
- **Delete individual products** or remove all saved products at once.
- **Search products** by title or category.
- **Persist product data** in the browser using `localStorage`.
- **Responsive layout** for different screen sizes.

## Technologies Used

- **HTML5** — application structure and form elements.
- **CSS3** — styling, layout, and responsive rules.
- **JavaScript (Vanilla JS)** — CRUD operations, calculations, search, and DOM updates.
- **Web Storage API (`localStorage`)** — client-side data persistence.
- **Font Awesome** — locally included icon stylesheet and font assets.

## Getting Started

This is a static front-end project. It does not require Node.js, npm, Python, a build process, or a backend server.

### 1. Clone the repository

```bash
git clone https://github.com/abdulkarimaklouk/crud-product-frontend.git
```

### 2. Open the project

Open the project folder in your preferred editor.

You can launch `index.html` directly in your browser. For local development, you can also use the **Live Server** extension in Visual Studio Code:

1. Install the Live Server extension.
2. Open `index.html` in Visual Studio Code.
3. Right-click inside the file and select **Open with Live Server**.

Your browser will open the application using a local development address provided by the extension.

## How to Use

1. Enter the product title, price, taxes, ads, discount, and category.
2. Review the automatically calculated total.
3. Optionally enter a number in **Count** to create multiple product entries.
4. Select **Create** to add the product or products to the table.
5. Use **Update** or **Delete** in a product row to manage that record.
6. Choose **Search By Title** or **Search By Category**, then type in the search field to filter the displayed products.
7. Use **Delete All** to remove all product records.

## Data Storage

Product records are saved in the browser's `localStorage`, so they remain available after refreshing the page in the same browser profile.

This project currently uses **client-side storage only**. It does not include an API, backend, or remote database. Data is not automatically shared between browsers or devices, and clearing the browser's site data may remove saved records.

## Project Structure

```text
crud-product-frontend/
├── css/
│   ├── all.min.css
│   ├── normalize.css
│   └── style.css
├── img/
│   ├── background.jpg
│   └── r-project.svg
├── js/
│   └── main.js
├── webfonts/
│   ├── fa-brands-400.ttf
│   ├── fa-brands-400.woff2
│   ├── fa-regular-400.ttf
│   ├── fa-regular-400.woff2
│   ├── fa-solid-900.ttf
│   ├── fa-solid-900.woff2
│   └── Font Awesome compatibility fonts
└── index.html
```

## Author

**Abdulkarim Aklouk**  
[GitHub Profile](https://github.com/abdulkarimaklouk)
